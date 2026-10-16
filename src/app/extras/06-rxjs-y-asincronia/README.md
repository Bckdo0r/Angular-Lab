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

### 2. La tubería completa (lo que armás en los Pasos 1–4)

```ts
busqueda$ = new Subject<string>();                       // Paso 1: fuente de eventos

constructor() {                                          // contexto de inyección
  this.busqueda$.pipe(
    debounceTime(300),                                   // Paso 2: agrupá tipeos
    distinctUntilChanged(),                              // Paso 2: no repitas
    tap(() => { this.cargando.set(true); this.error.set(null); }),
    switchMap((texto) => this.servicio.listar(texto)),   // Paso 3: solo el último gana
    takeUntilDestroyed(),                                // Paso 4: cleanup al destruir
  ).subscribe({
    next: (empleados) => { this.resultado.set(empleados); this.cargando.set(false); },
    error: (err) => { this.error.set(err.message); this.cargando.set(false); },
  });
}
```

**¿Por qué `switchMap` y no `mergeMap`?** (la trampa clásica) `mergeMap` deja todas las peticiones en vuelo y pinta cada respuesta cuando llega, en cualquier orden. Escribís "san", corregís a "s": si "san" tarda más, su respuesta llega **después** y pisa el resultado correcto. `switchMap` cancela la petición anterior apenas llega un texto nuevo: solo la última búsqueda puede pintar. Regla mental: *"muchos a la vez" → mergeMap; "solo el último" → switchMap*.

### 3. Estados como signals (Paso 5)

La receta de la 03 aplicada al flujo reactivo: `cargando` se enciende en un `tap()` antes del `switchMap` y se apaga en `next`/`error`; `resultado` guarda la lista; `vacio` es un `computed()` (`resultado() !== null && length === 0`) y `error` el mensaje traducido por el service. El template solo pregunta con `@if`.

### 4. Cold vs hot (nota de fondo)

- `HttpClient` es **cold**: cada suscripción dispara una petición nueva.
- Un `Subject` es **hot**: los suscriptores comparten el mismo flujo; por eso sirve de fuente de eventos.
- Si varias partes necesitaran el **mismo** resultado sin re-pedir: `shareReplay(1)` cachea la última emisión de la fuente fría. En esta página no hace falta (una sola suscripción), pero en un service compartido entre pantallas es EL patrón.

## Consigna paso a paso (checklist)

Abrí el ejercicio (<http://localhost:4200/extras/06>) y probá: podés tipear pero no pasa nada. Cada `TODO: [Paso X]` del código corresponde a un paso de acá.

- [ ] **Paso 1 — `buscador-page.ts`:** declará `busqueda$ = new Subject<string>()` (importá `Subject` desde `rxjs`) y completá `buscar(texto)` con `this.busqueda$.next(texto)`. El (input) ya llama a `buscar()` vía `alTipear()`.
- [ ] **Paso 2 — `buscador-page.ts`:** en el constructor, encadená `this.busqueda$.pipe(debounceTime(300), distinctUntilChanged())`. Pensá por qué va cada uno: `debounceTime` agrupa la ráfaga de tipeos; `distinctUntilChanged` evita pedir dos veces lo mismo.
- [ ] **Paso 3 — `buscador-page.ts`:** agregá `switchMap((texto) => this.servicio.listar(texto))` al pipe. Experimento sugerido: reemplazalo por `mergeMap` y violá el criterio Nº 2 — después volvé.
- [ ] **Paso 4 — `buscador-page.ts`:** suscribite en el constructor con `.subscribe({ next, error })`, apagando/encendiendo las signals (`cargando` en un `tap()` previo), y cerrá el pipe con `takeUntilDestroyed()` (de `@angular/core/rxjs-interop`). Sin eso: leak.
- [ ] **Paso 5 — template:** los `@if (cargando)` / `@if (vacio)` / `@if (error)` ya están escritos; verificá que se comporten (escribí algo sin resultados, forzá un error si podés).
- [ ] **Paso 6 — (desafío):** repetí la misma lógica exponiendo el resultado como signal: pipeline puro + `toSignal(...)`. Está resuelto como variante comentada en `solucion/buscador-page.ts` (y el inverso es `toObservable()`).
- [ ] **Paso 7:** probá los criterios de aceptación de abajo.

## Criterios de aceptación

Probá en <http://localhost:4200/extras/06> (con DevTools → Network):

1. Tipear "san" rápido → en Network aparece **1 sola** petición.
2. Escribir "san", borrar y escribir "s" → jamás se pinta tarde la respuesta de "san".
3. Navegar fuera de la pantalla → ninguna petición pendiente (cleanup efectivo).

## Para pensar 🔍

- **Cold vs hot:** ¿por qué el `Subject` no dispara peticiones por sí solo, mientras que si dos piezas del componente se suscribieran directo al `HttpClient`, saldrían **dos** peticiones por búsqueda?
- **`shareReplay`:** en un service compartido entre pantallas, ¿dónde lo pondrías? ¿Qué pasa con la respuesta cacheada cuando los datos envejecen (y qué tiene que ver con `refCount` / `timer`)?
- **`toSignal` / `toObservable`:** el desafío del Paso 6 borra el `subscribe()` a mano. ¿Cuándo conviene cada mundo? Pensalo al migrar código con `async pipe` a signals (y viceversa).

## Solución

La versión resuelta y comentada está en `src/app/extras/06-rxjs-y-asincronia/solucion/` y se navega en `/extras/06/solucion`. Incluye el **desafío del Paso 6** (variante con `toSignal`) como código comentado, con las notas de `switchMap` vs `mergeMap` y cold vs hot.
