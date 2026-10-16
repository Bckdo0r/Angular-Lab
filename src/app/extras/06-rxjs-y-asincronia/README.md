# Práctica 06 — RxJS y asincronía reactiva

## Cómo hacer la práctica

1. Levantá el servidor: `npm start`
2. Ejercicio: <http://localhost:4200/extras/06>
3. Solución para comparar en otra pestaña: <http://localhost:4200/extras/06/solucion>
4. Archivos de trabajo: `src/app/extras/06-rxjs-y-asincronia/ejercicio/` — buscá los comentarios `// TODO:`. Todo el trabajo está en `buscador-page.ts` (Pasos 1–5); la plantilla y los estilos **ya están maquetados**, y los signals del template ya están conectados.
5. El service ya está hecho: `buscador.service.ts` (en la raíz de la carpeta, compartido entre ejercicio y solución). NO tiene TODOs: pide la lista al backend falso de la práctica 03 (cabecera `X-Canal: practica-03` + `HttpParams nombre=...`) y filtra por nombre del lado del cliente, porque el backend falso ignora el parámetro `nombre`.

## Objetivo

Un buscador que dispara peticiones mientras el usuario tipea, **sin duplicar llamadas, sin que se pinten respuestas viejas y sin fugas de memoria**. La parte difícil no es llamar al service (eso fue la práctica 03): es controlar **cuándo** y **cuántas veces** se llama, y qué pasa con las respuestas que llegan tarde. Acá aparece el corazón de RxJS en Angular:

1. **Un `Subject` como fuente de eventos** del input: el puente entre el DOM y el mundo reactivo.
2. **Operadores de control**: `debounceTime` (agrupar tipeos), `distinctUntilChanged` (no repetir), `switchMap` (cancelar la búsqueda anterior).
3. **Cleanup garantizado** con `takeUntilDestroyed()`, y los estados (`cargando`, `vacio`, `error`) mapeados a signals.

## Conceptos clave

### 1. `Observable` vs Promise

`http.get()` devuelve un **Observable**, no una Promise. La diferencia que importa acá: una Promise corre en cuanto se crea y su resultado es único; un Observable (cold) no hace nada hasta que alguien se suscribe y puede emitir varios valores a lo largo del tiempo. Esa "pereza" es la que permite que `switchMap` **cancele** una petición: cancelar la suscripción interna = abortar el request.

### 2. El `Subject` como fuente de eventos

El Subject es a la vez Observable y "emisor": el input le empuja cada tipeo con `.next()` y la tubería lo consume. Es **hot**: emitir `.next()` no "ejecuta" nada, los suscriptores comparten el mismo flujo. Por eso sirve de fuente de eventos de un input:

```ts
busqueda$ = new Subject<string>();                        // Paso 1: la fuente

buscar(texto: string): void {
  this.busqueda$.next(texto);                             // el input no llama al service directo
}
```

### 3. `debounceTime` + `distinctUntilChanged` (Paso 2)

```ts
this.busqueda$.pipe(
  debounceTime(300),        // espera 300ms de silencio: "san" rápido = 1 petición
  distinctUntilChanged(),   // el mismo texto otra vez ni siquiera dispara la petición
  // ...
)
```

`debounceTime(300)` agrupa la ráfaga de tipeos: si el usuario tipea "san" en menos de 300 ms, solo el último "n" llega al final — 3 tipeos, 1 petición (criterio Nº 1).

### 4. `switchMap` vs `mergeMap` (la trampa clásica, Paso 3)

```ts
switchMap((texto) => this.servicio.listar(texto)),        // solo el último gana
```

**¿Por qué `switchMap` y no `mergeMap`?** `mergeMap` deja todas las peticiones en vuelo y pinta cada respuesta cuando llega, en cualquier orden. Escribís "san", corregís a "s": si "san" tarda más, su respuesta llega **después** y pisa el resultado correcto. `switchMap` cancela la suscripción interna anterior (aborta la petición `HttpClient` en vuelo) apenas llega un texto nuevo: solo la última búsqueda puede pintar. Regla mental: *"muchos a la vez" → mergeMap; "solo el último" → switchMap*.

### 5. Suscripción y cleanup: `takeUntilDestroyed()` / `DestroyRef` (Paso 4)

```ts
this.busqueda$.pipe(
  /* ... */,
  takeUntilDestroyed(),     // debe llamarse en contexto de inyección: el constructor lo es
).subscribe({
  next: (empleados) => { /* ... */ },
  error: (err: Error) => { /* ... */ },
});
```

Sin el cleanup, navegar fuera de la pantalla deja la suscripción viva para siempre: leak + peticiones fantasma (criterio Nº 3 roto). `takeUntilDestroyed()` es el atajo de Angular sobre `DestroyRef`: se destruye el componente, se desuscribe solo. Y `tap()` es el lugar ideal para encender `cargando` **antes** de la petición: hace un efecto secundario sin transformar el flujo.

### 6. Estados como signals (Paso 5)

La receta de la 03 aplicada al flujo reactivo:

```ts
resultado = signal<EmpleadoBuscado[] | null>(null);       // null = todavía no hubo búsqueda
cargando  = signal(false);
vacio     = computed(() => this.resultado() !== null && this.resultado()!.length === 0);
error     = signal<string | null>(null);
```

`cargando` se enciende en un `tap()` antes del `switchMap` y se apaga en `next`/`error`; `vacio` es derivado (`computed`): solo es `true` si la lista **ya llegó** y quedó vacía. El template solo pregunta con `@if (cargando())` / `@if (vacio())` / `@if (error())`.

### 7. Cold vs hot + `shareReplay` (nota de fondo)

- `HttpClient` es **cold**: cada suscripción dispara una petición nueva. Si dos piezas del componente se suscribieran directo a la fuente fría, saldrían **dos** peticiones por búsqueda.
- Un `Subject` es **hot**: los suscriptores comparten el mismo flujo; por eso sirve de fuente de eventos.
- Si varias partes necesitaran el **mismo** resultado sin re-pedir: `shareReplay(1)` cachea la última emisión de la fuente fría. En esta página no hace falta (una sola suscripción), pero en un service compartido entre pantallas es EL patrón. ¿Y la respuesta cacheada que envejece? Ahí entran `refCount` y un `timer` de expiración — tema para investigar.

### 8. `toSignal` / `toObservable`: el puente (desafío del Paso 6)

Se puede evitar el `subscribe()` a mano dejando el pipeline "puro" y convirtiendo el Observable final en una signal — Angular se desuscribe solo al destruir el componente:

```ts
private readonly resultados$ = this.busqueda$.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap((texto) => this.servicio.listar(texto)),
  catchError((err: Error, _) => {
    this.error.set(err.message);
    return EMPTY;                 // el flujo sigue vivo para la próxima búsqueda
  }),
);
protected readonly resultado = toSignal(this.resultados$, { initialValue: null });
```

Trade-off honesto: `cargando` queda fuera (`toSignal` no emite "estoy pidiendo"). Y el inverso (signal → Observable) es `toObservable()`: juntos cierran el puente bidireccional signals ↔ Observables, clave al migrar código viejo con `async pipe`.

## Consigna paso a paso (checklist)

Abrí el ejercicio (<http://localhost:4200/extras/06>) y probá: podés tipear pero no pasa nada. Cada `TODO: [Paso X]` del código corresponde a un paso de acá.

- [ ] **Paso 1 — `buscador-page.ts`:** declará `busqueda$ = new Subject<string>()` (importá `Subject` desde `rxjs`) y completá `buscar(texto)` con `this.busqueda$.next(texto)`. El (input) ya llama a `buscar()` vía `alTipear()`.
- [ ] **Paso 2 — `buscador-page.ts`:** en el constructor, encadená `this.busqueda$.pipe(debounceTime(300), distinctUntilChanged())`. Pensá por qué va cada uno: `debounceTime` agrupa la ráfaga de tipeos; `distinctUntilChanged` evita pedir dos veces lo mismo.
- [ ] **Paso 3 — `buscador-page.ts`:** agregá `switchMap((texto) => this.servicio.listar(texto))` al pipe. Experimento sugerido: reemplazalo por `mergeMap` y violá el criterio Nº 2 — después volvé.
- [ ] **Paso 4 — `buscador-page.ts`:** suscribite en el constructor con `.subscribe({ next, error })`, apagando/encendiendo las signals (`cargando` en un `tap()` previo), y cerrá el pipe con `takeUntilDestroyed()` (de `@angular/core/rxjs-interop`). Sin eso: leak.
- [ ] **Paso 5 — template:** los `@if (cargando)` / `@if (vacio)` / `@if (error)` ya están escritos; verificá que se comporten (escribí algo sin resultados, forzá un error si podés).
- [ ] **Paso 6 — (desafío):** repetí la misma lógica exponiendo el resultado como signal: pipeline puro + `toSignal(...)`. Está resuelto como variante comentada en `solucion/buscador-page.ts` (y el inverso es `toObservable()`).
- [ ] **Paso 7 — verificación con Network:** abrí DevTools → pestaña **Network**, filtrá por `empleados`, y recorré los criterios de aceptación de abajo: 1 sola petición por ráfaga de tipeos, ninguna respuesta vieja pintada tarde, y ninguna petición pendiente al navegar fuera.

## Criterios de aceptación

Probá en <http://localhost:4200/extras/06> (con DevTools → pestaña **Network**, filtrando por `empleados`):

1. Tipear "san" rápido → en Network aparece **1 sola** petición (el `debounceTime` agrupó los tipeos).
2. Escribir "san", borrar y escribir "s" → jamás se pinta tarde la respuesta de "san" (el `switchMap` la canceló).
3. Navegar fuera de la pantalla → ninguna petición pendiente (cleanup efectivo de `takeUntilDestroyed()`).

## Solución

La versión resuelta y comentada está en `src/app/extras/06-rxjs-y-asincronia/solucion/` y se navega en `/extras/06/solucion`. Incluye el **desafío del Paso 6** (variante con `toSignal`) como código comentado, con las notas de `switchMap` vs `mergeMap` y cold vs hot.
