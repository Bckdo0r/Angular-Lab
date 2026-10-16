# Práctica 07 — Ruteo avanzado SPA

**Carpeta:** `07-ruteo-avanzado/` · **Ruta:** `/extras/07` (con `rutas.ts` propio)

## Cómo hacer la práctica

1. Levantá el servidor: `npm start`
2. Ejercicio: <http://localhost:4200/extras/07>
3. Solución para comparar en otra pestaña: <http://localhost:4200/extras/07/solucion>
4. Archivos de trabajo: `src/app/extras/07-ruteo-avanzado/ejercicio/` — buscá los comentarios `// TODO:` (Pasos 1–8). Tu trabajo está en `listado-page.ts` (Pasos 4a y 4b), `detalle-page.ts` (Pasos 2, 3 y 4c), `panel-layout.ts` (Paso 6, en su **plantilla**) y `rol.guard.ts` (Paso 7). Los Pasos 1, 5 y 8 no tienen TODO: son de lectura y experimento sobre `rutas.ts`.
5. El material ya está hecho: `empleados-mock.ts` (en la raíz de la carpeta, compartido entre ejercicio y solución) no tiene TODOs — es ruteo puro, sin HTTP. `rutas.ts` también está completo: **se lee, no se completa**. Dos notas sobre el 404: hay un solo comodín `**` por aplicación, así que el 404 global es el de la página del ejercicio (la de la solución existe como espejo didáctico, sin ruta), y `app.routes.ts` registra esta práctica con un spread (`...rutasPractica07`) **al final** del array global — por eso el comodín no tapa las rutas de las otras prácticas.

## Objetivo

Una mini-intranet: listar empleados → entrar a la ficha por ID → 404 para lo que no existe → menú con el ítem activo → y una pantalla admin "pesada" que solo baja del servidor para cierto rol. Todo ruteo: **sin HTTP**, con datos falsos en memoria (`empleados-mock.ts`). La parte interesante no es dibujar pantallas sino que **la URL sea el estado de la aplicación**:

1. **El ID llega como `input()`**: `withComponentInputBinding()` bindea `:id` y los query params a inputs del componente — nada de `ActivatedRoute` ni subscripciones.
2. **Filtros y pestañas viven en la URL**: un listado filtrado se comparte por link y una recarga restaura exactamente la vista que había.
3. **Lazy por página + guards de composición**: cada pantalla es su propio chunk (`loadComponent`) y `canMatch` decide si la ruta admin siquiera existe antes de bajar su bundle.

## Conceptos clave

### 1. `input()` + `withComponentInputBinding()`

En `app.config.ts` la app se crea con `provideRouter(routes, withComponentInputBinding())`. Con eso, el parámetro de ruta y los query params llegan **bindeados como inputs**, sin `ActivatedRoute`:

```ts
// /extras/07/detalle/3 → id() === '3' (string: todo parámetro de URL es texto)
readonly id = input.required<string>();
protected readonly q = input<string>();     // ?q=ana
protected readonly area = input<string>();  // ?area=QA
```

Si la URL cambia a otro ID, el input se actualiza y los `computed()` se recalculan solos.

### 2. `Router.navigate` vs `routerLink`

`routerLink` es declarativo (el link vive en la plantilla); `Router.navigate` es programático — lo decidís vos desde TypeScript, ideal después de un guardar o un login:

```ts
this.router.navigate(['/extras/07'], {
  queryParams: { q: this.texto().trim() || null, area: this.areaFiltro() || null },
});
```

### 3. Query params: escribir, leer y restaurar

El ciclo completo que practica esta práctica:

- **Escribir**: `navigate` con `queryParams`. Con valor `null` el param **se elimina** de la URL (en vez de quedar `?q=` ensuciando el link).
- **Leer**: llegan como inputs (`q`, `area`) por `withComponentInputBinding`.
- **Restaurar**: al iniciar el componente, volcás los inputs a las signals de los controles del formulario. En la solución, `linkedSignal()` hace el pegamento: se computa desde la URL pero se puede `set()` mientras el usuario tipea.
- En el detalle, `queryParamsHandling: 'merge'` al cambiar de pestaña **conserva** los `?q=` y `?area=` que viajaron del listado.

### 4. `loadComponent` y los chunks en Network

Cada página de `rutas.ts` se carga con `loadComponent: () => import(...)`: Angular baja ese chunk **recién al navegar a su ruta**. En DevTools → **Network** (filtrá por JS) vas a ver que la carga inicial no incluye las páginas de la práctica: `listado-page-*.js`, `detalle-page-*.js`, `panel-layout-*.js` aparecen en el momento exacto en que las navegás.

### 5. Orden de rutas y el comodín `**`

Angular evalúa las rutas **de arriba hacia abajo** y usa la primera que coincide. El `**` coincide con cualquier path, así que debe ser la **última** entrada: si estuviera primera, "comería" todas las URLs y TODA la app caería en el 404. Por eso `app.routes.ts` hace el spread de esta práctica al final del array global.

### 6. `routerLinkActive` + `routerLinkActiveOptions`

```html
<a routerLink="equipo" routerLinkActive="activo"
   [routerLinkActiveOptions]="{ exact: true }">Equipo</a>
```

La directiva agrega y saca la clase sola: la clase sigue a la **URL**, no a clicks. Con `exact: true`, `/extras/07/panel` a secas no marca ningún ítem (si un link tuviera rutas hijas, sin `exact` marcaría también al padre).

### 7. `canMatch` vs `canActivate`

- **canActivate** (práctica 04): la ruta existe y su bundle ya se bajó; el guard decide recién ahí si te deja pasar o te redirige (con mensaje, `returnUrl`, etc.).
- **canMatch**: el guard corre **antes del matching**; si devuelve `false`, la ruta se **remueve del árbol** — para vos esa pantalla no existe, no se baja ningún chunk y la navegación cae al comodín `**` (404). Ideal para ocultar features por rol o feature flag.

```ts
export const soloAdminCanMatch: CanMatchFn = () => rolSimulado() === 'admin';
// en rutas.ts: { path: 'admin', loadComponent: ..., canMatch: [soloAdminCanMatch] }
```

### 8. Rutas hijas (`children`) con sub-layout

El bloque de `panel` en `rutas.ts`: el layout se carga lazy una vez y cada hija (`equipo`, `admin`) se pinta en su `<router-outlet />`:

```ts
{
  path: 'extras/07/panel',
  loadComponent: () => import('./ejercicio/panel-layout').then(m => m.PanelLayout),
  children: [
    { path: '', pathMatch: 'full', redirectTo: 'equipo' },
    { path: 'equipo', loadComponent: () => ... },
    { path: 'admin',  loadComponent: () => ..., canMatch: [soloAdminCanMatch] },
  ],
},
```

## Consigna paso a paso (checklist)

Abrí el ejercicio (<http://localhost:4200/extras/07>) y recorré la app. Cada `TODO: [Paso X]` del código corresponde a un paso de acá.

- [ ] **Paso 1 — lectura de `rutas.ts`:** recorré el árbol: `''` (listado) / `'detalle/:id'` / `panel` con hijas `equipo` y `admin` / `**` (404) al final. Fijate que cada página usa `loadComponent` (lazy) y que `app.routes.ts` hace el spread al final.
- [ ] **Paso 2 — `detalle-page.ts`:** el `id = input.required<string>()` ya está declarado: leé el comentario y probá `/extras/07/detalle/9999` (la vista se muestra igual, con el mensaje de inexistente) y `/extras/07/detalle/3`.
- [ ] **Paso 3 — `detalle-page.ts`:** implementá `volverAlListado()`: `Router.navigate` al listado reenviando los query params `q` y `area` que llegaron como inputs (el link "Ver ficha" los trajo con `queryParamsHandling="preserve"`).
- [ ] **Paso 4a — `listado-page.ts`:** implementá `aplicarFiltros()` y `limpiarFiltros()`: `Router.navigate` con `queryParams` (`q` y `area`; `null` saca el param si está vacío). En `limpiarFiltros()` además reseteá las signals locales.
- [ ] **Paso 4b — `listado-page.ts`:** en el constructor, restaurá los filtros desde los inputs `q` y `area` (`this.texto.set(this.q() ?? '')`, ídem `areaFiltro`). Con eso, un link compartido tipo `/extras/07?q=ana&area=Desarrollo` abre el listado ya filtrado.
- [ ] **Paso 4c — `detalle-page.ts`:** en `seleccionarTab(tab)`, sincronizá la pestaña con la URL (`navigate` con `queryParams: { tab }` y `queryParamsHandling: 'merge'`) y restaurala en el constructor desde un input `tab`. Recargar `/extras/07/detalle/7?tab=auditoria` debe mantener el tab.
- [ ] **Paso 5 — experimento (sin TODO en el código):** razoná (o probá en una copia) qué pasa si `**` estuviera primera en `rutas.ts`: TODA la app caería en el 404. Por eso es la última entrada y el spread global va al final.
- [ ] **Paso 6 — `panel-layout.ts` (plantilla):** agregá a cada `<a>` del menú `routerLinkActive="activo"` y `[routerLinkActiveOptions]="{ exact: true }"`. Navegá entre Equipo y Admin: el ítem de la ruta actual queda resaltado (la clase `.activo` ya está estilada).
- [ ] **Paso 7 — `rol.guard.ts`:** implementá `soloAdminCanMatch` leyendo el rol simulado de localStorage (clave `practica07-rol`; el toggle vive en el panel). Con rol "visitante", la ruta `admin` **desaparece**: caés al 404 y en Network **no baja ningún chunk** de la página admin.
- [ ] **Paso 8 — lectura de `rutas.ts`:** recorré línea por línea el bloque de `panel`: el layout se carga lazy una vez y `equipo`/`admin` se pintan en su `<router-outlet />` (en la 04 solo leíste esta estructura; acá está escrita entera).
- [ ] **Paso final:** probá los criterios de aceptación de abajo.

## Criterios de aceptación

Probá en <http://localhost:4200/extras/07>:

1. **Detalle por input():** entrar directo a `/extras/07/detalle/9999` muestra la vista (el ID llega por `input()`, no por subscribe).
2. **Tab restaurado:** recargar `/extras/07/detalle/7?tab=auditoria` restaura el tab.
3. **Listado compartible:** el listado filtrado se puede compartir por link y al abrirlo los filtros reaparecen.
4. **404 sin romper nada:** cualquier path inválido cae en 404 sin romper el menú.

## Solución

La versión resuelta y comentada está en `src/app/extras/07-ruteo-avanzado/solucion/` y se navega en `/extras/07/solucion`. Detalles para comparar:

- El rol simulado **comparte la clave de localStorage** con el ejercicio: es el mismo "usuario" en las dos, así que cambiar el rol en una afecta a la otra.
- En el listado, la solución usa `linkedSignal()` para los controles del formulario: nacen del query param, se pueden editar mientras se tipea, y vuelven a computarse si la URL cambia.
- Para ver el lazy: DevTools → **Network** (filtrá por JS) — cada página baja su chunk recién al navegar a su ruta, y con rol "visitante" la ruta admin **no baja ninguno** (`canMatch` la remueve antes de pedir el bundle).
