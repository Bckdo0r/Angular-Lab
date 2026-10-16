# Práctica 09 — Estado global con NgRx (visor de capas)

## Cómo hacer la práctica

1. Levantá el servidor: `npm start`
2. Ejercicio: <http://localhost:4200/extras/09>
3. Solución para comparar en otra pestaña: <http://localhost:4200/extras/09/solucion>
4. Archivos de trabajo:
   - `visor.store.ts` (en la raíz de la carpeta, compartido por ejercicio y solución) — el feature NgRx: acciones, reducer y selectors. Buscá los `TODO: [Paso 2]` y `TODO: [Paso 3]`.
   - `ejercicio/visor-page.ts` — la pantalla: el puente a signals (Paso 4) y los dispatch (Paso 5).
5. Ya está resuelto (y es material de lectura): el **estado** (`VisorState`), las **acciones** (Paso 1) y los selectors `selectCapasFiltradas` + `selectCapaPorId`. La versión resuelta íntegra está en `solucion/visor.store.ts`, con la trampa del `push()` comentada.
6. La página de **ayuda** (`ejercicio/ayuda-page.ts` / `solucion/ayuda-page.ts`) **no tiene TODOs**: ya funciona. Es un panel que muestra el estado actual del store en vivo (capas con su visibilidad, filtro activo, capa seleccionada) y sirve para verificar la persistencia navegando dentro de la práctica.

> **Nota — el store vive a nivel de ruta:** los providers del store están en `rutas.ts` (`provideStore` + `provideState` + `provideStoreDevtools` en el `providers` de la ruta `extras/09`), y no en `app.config.ts`. El porqué:
>
> 1. La práctica es **autocontenida**: crea su propio store en este subárbol sin ensuciar el estado global de la app (y el registro en `app.routes.ts` queda siendo un simple spread, como en la 04).
> 2. El estado **sobrevive a las navegaciones internas** de `/extras/09`: al navegar a `/extras/09/ayuda` Angular destruye solo el componente, no el inyector de la ruta padre → el store sigue intacto. Es el criterio «cambiar de pantalla y volver → los filtros persisten».
> 3. Ejercicio y solución llevan features **distintos** (`visorFeature` / `visorFeatureSolucion`) en injectores distintos: cada subárbol tiene su propio store y no se pisan.
>
> Salí de la práctica (a otra de `/extras`) y el inyector sí se destruye: el estado vuelve a cero. El alcance de la ruta es el alcance del estado.

## Objetivo

Un visor de capas estilo mapa de devOSSE: capas que se prenden y apagan, un filtro por nombre y una capa seleccionada — todo ese estado debe **sobrevivir al cambio de pantalla**. Con signals ya sabés manejar estado local; acá lo subís de escala con NgRx:

1. **Acciones como única fuente de mutación**: el componente no cambia nada, *emite intenciones* con `dispatch()`.
2. **Reducer puro e inmutable**: `(estado, acción) → estado nuevo`, sin `push()` ni mutaciones — la trampa que ya viviste en la 05.
3. **`createFeature` + selectors memoizados**: estado derivado (`selectCapasFiltradas`, `selectCapasVisibles`) como un `computed()` pero global.
4. **El puente NgRx ↔ signals**: `store.select()` devuelve Observables (práctica 06), `toSignal()` los convierte para la plantilla moderna.

La prueba de fuego es navegar a la página de ayuda y volver: el filtro y las capas siguen exactos porque el estado vive en el store de la ruta, no en ningún componente.

## Conceptos clave

### 1. ¿Cuándo SÍ y cuándo NO NgRx? (discusión ★)

El temario lo pone como discusión inicial, y en devOSSE parece respetarse: **solo el mapa usa store**, el resto de la app vive con signals y servicios.

- **SÍ NgRx** cuando: el estado es **compartido entre muchas pantallas** y su ciclo de vida excede a cualquier componente; necesitás **trazabilidad** ("¿quién cambió esto y cuándo?" → DevTools con la secuencia de acciones); querés **time-travel** para depurar (rebobinar el estado a una acción anterior); el equipo es grande y un flujo unidireccional estricto (`dispatch → reducer → selector`) evita que cada uno improvise.
- **NO NgRx** cuando: el estado es local a una pantalla (una signal alcanza); es estado de servidor caché (eso lo resuelven resources/queries, no un reducer); o el equipo es chico y el boilerplate de acciones + reducer + selectores no paga su costo. **NgRx no reemplaza a las signals: conviven** — acá mismo las señales llegan por `toSignal()`.

### 2. Acciones: describir, no ejecutar (Paso 1 — ya resuelto)

Una acción es un objeto con `type` y payload opcional, creado con `createAction`. **No hace nada por sí sola**: describe una intención, con el prefijo `[Visor]` para ubicarla rápido en DevTools.

```ts
export const VisorActions = {
  alternarCapa: createAction('[Visor] Alternar Capa', props<{ id: number }>()),
  setFiltro: createAction('[Visor] Set Filtro', props<{ filtro: string }>()),
  seleccionarCapa: createAction('[Visor] Seleccionar Capa', props<{ id: number }>()),
  restablecer: createAction('[Visor] Restablecer'),
} as const;
```

### 3. Reducer puro: la trampa del `push()` (Paso 2)

El reducer es una función pura: `(estado, acción) → estado nuevo`. Nunca muta: spread, `map`, `filter`, `slice` — **JAMÁS `push()`** ni asignar `capa.visible = ...`.

```ts
case VisorActions.alternarCapa.type: {
  const { id } = action as ReturnType<typeof VisorActions.alternarCapa>;
  return {
    ...state,
    capas: state.capas.map((capa) =>
      capa.id === id ? { ...capa, visible: !capa.visible } : capa,
    ),
  };
}
```

¿Qué rompe exactamente el `push()`? La **memoización**: los selectores solo recalculan si cambió la *referencia* de sus entradas. Si el reducer muta el estado y devuelve la misma referencia, NgRx cree que no pasó nada, el Observable no emite, `toSignal()` no actualiza y **la UI queda congelada** — además el historial de DevTools apunta siempre al mismo objeto pisado, así que el time-travel se vuelve mentira. La trampa completa está comentada en `solucion/visor.store.ts` con la explicación paso a paso: te toca encontrarla y corregirla (criterio 3 de abajo).

### 4. `createFeature` + selectors memoizados (Paso 3)

`createFeature({ name: 'visor', reducer })` genera de una pieza el selector del estado completo (`selectVisorState`) y uno por cada propiedad (`selectCapas`, `selectFiltro`, `selectSeleccionadaId`). Los **derivados** se escriben con `createSelector` en `extraSelectors`:

```ts
selectCapasFiltradas: createSelector(selectCapas, selectFiltro, (capas, filtro) => {
  const texto = filtro.trim().toLowerCase();
  if (!texto) return capas;
  return capas.filter((capa) => capa.nombre.toLowerCase().includes(texto));
}),
```

Es el `computed()` de la práctica 01, pero **global y observable**: solo recalcula si cambió alguna entrada, y cualquier parte de la app puede suscribirse (la página de ayuda de esta práctica es el ejemplo: lee el mismo store que el visor con esos selectors).

**Selector por ID (solo lectura ★):** `selectCapaPorId(id)` es una **fábrica** de selectores — el patrón de la normalización (estado por ID, como una base de datos). Por eso el reducer guarda `seleccionadaId` (el número) y no el objeto seleccionado: el objeto se resuelve al leer, y así nunca queda desactualizado. Trampa clásica: cada llamada a la fábrica crea un selector nuevo (con su propia memoización) — llamá una vez por uso, nunca dentro de un `@for`.

### 5. El puente obligatorio: `select` → `toSignal` (Paso 4)

`store.select(selector)` devuelve un **Observable** (práctica 06). La plantilla moderna come **signals**. El puente:

```ts
protected readonly capasFiltradas = toSignal(
  this.store.select(visorFeature.selectCapasFiltradas),
  { initialValue: [] as CapaVisor[] },
);
```

Este es el motivo por el que «cambiar de pantalla y volver → los filtros persisten» funciona: el filtro vive en el **store de la ruta**, no en el componente. Si fuera una `signal('')` local, al ir a `/extras/09/ayuda` y volver el componente se recrearía vacío.

### 6. El componente solo emite intenciones (Paso 5)

Refuerzo de la regla de la 01 — el componente no muta, pide:

```ts
protected alTipearFiltro(event: Event): void {
  const texto = (event.target as HTMLInputElement).value;
  this.store.dispatch(VisorActions.setFiltro({ filtro: texto }));
}
```

Ni un `if` de negocio: decidir el nuevo estado es del **reducer**, filtrar es del **selector**, y el componente solo anuncia lo que pasó.

### 7. Redux DevTools: cómo mirar el store (Paso 6 — observar)

1. Instalá la extensión **Redux DevTools** de tu navegador (Chrome/Firefox/Edge).
2. Entrá a la práctica y abrí las DevTools del navegador → pestaña **Redux**.
3. Movete por el visor: vas a ver las acciones apareciendo **en orden** (`[Visor] Set Filtro`, `[Visor] Alternar Capa`, ...), cada una con su payload y el estado resultante al lado.
4. **Time-travel**: clic en cualquier acción de la lista → el estado "rebobina" a ese momento (y la UI con él). El botón 🐞 "Inspector" muestra el diff de cada acción.
5. `maxAge: 25` (en `rutas.ts`) limita el historial a las últimas 25 acciones.

### 8. ¿Y los effects? (solo teoría ★)

`@ngrx/effects` **no está instalado a propósito**: devOSSE no los usa (no figuran en su `package.json`), así que acá se leen, no se implementan. Un *effect* maneja los efectos secundarios que un reducer no puede tener (por ser puro): llamadas HTTP, timers, WebSockets. Escucha acciones, ejecuta el efecto y **despacha una acción nueva** con el resultado — el estado sigue cambiando únicamente por el reducer. Ejemplo mental para este visor: si las capas vinieran de un servidor, un effect escucharía `[Visor] Cargar Capas`, llamaría al servicio HTTP y despacharía `[Visor] Capas Cargadas` con el array; el reducer lo único que haría es guardarlas. En apps chicas, `resource()`/`httpResource()` + signals suelen alcanzar sin necesidad de effects — otra respuesta para la discusión de "cuándo NO NgRx".

## Consigna paso a paso (checklist)

Abrí el ejercicio (<http://localhost:4200/extras/09>) y probá: tildar capas no hace nada, el filtro no filtra y "Restablecer" no funciona. Cada `TODO: [Paso X]` corresponde a un paso de acá.

- [ ] **Paso 1 — `visor.store.ts` (lectura):** las acciones ya están definidas con `createAction`. Entendé qué describe cada una y por qué no cambian nada por sí solas.
- [ ] **Paso 2 — `visor.store.ts`:** implementá el cuerpo del reducer en los tres casos con `TODO`: `alternarCapa` (spread + `map`, JAMÁS `push()`), `setFiltro` (spread + pisar `filtro`) y `restablecer` (devolver `estadoInicialVisor`). El caso `seleccionarCapa` ya está resuelto como ejemplo.
- [ ] **Paso 3 — `visor.store.ts`:** agregá el selector derivado `selectCapasVisibles` (capas con `visible === true`) con `createSelector`. `selectCapasFiltradas` ya está resuelto como ejemplo y `selectCapaPorId` es **solo lectura** (normalización / selector por ID — leé el comentario).
- [ ] **Paso 4 — `ejercicio/visor-page.ts`:** puenté `selectFiltro` y `selectSeleccionadaId` a signals con `toSignal()` y borrá los placeholders. `capasFiltradas` ya está resuelto como ejemplo.
- [ ] **Paso 5 — `ejercicio/visor-page.ts`:** implementá los dispatch: `alternarCapa`, `alTipearFiltro` y `restablecer` (`seleccionarCapa` ya está resuelto como ejemplo).
- [ ] **Paso 6:** instalá Redux DevTools y verificá los criterios de aceptación de abajo.

## Criterios de aceptación

Probá en <http://localhost:4200/extras/09>:

1. **Cambiar de pantalla y volver → los filtros persisten.** (Tipeá un filtro y tildá algunas capas → andá a la página de ayuda — el panel muestra el estado actual del store — → volvé: filtro y capas siguen exactos. Ahora salí a otra práctica y volvé: el estado vuelve a cero, esa es la frontera del scope.)
2. **En DevTools del navegador se ven las acciones apareciendo en orden.** (Con la extensión Redux instalada, la pestaña Redux muestra cada acción `[Visor] ...` con su payload, en orden, y el estado luego de cada una.)
3. **Un reducer con `push()` a propósito rompe la verificación de inmutabilidad y el alumno lo corrige.** (En `solucion/visor.store.ts` está comentado el reducer roto: descomentalo y desactivá el bueno — la UI deja de reaccionar y el historial de DevTools se vuelve inconsistente. Corregilo con el patrón spread + `map`.)

## Solución

La versión resuelta y comentada está en `src/app/extras/09-ngrx-store/solucion/` (`visor.store.ts` con el reducer completo y la trampa del `push()` comentada, y los componentes con sufijo `Solucion`) y se navega en `/extras/09/solucion`.
