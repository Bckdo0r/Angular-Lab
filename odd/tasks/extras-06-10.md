# Prácticas extras 06–10 (serie del temario)

Implementar las 5 prácticas de `TEMARIO-PRACTICAS-06-10.md` en `src/app/extras/`:
06 RxJS, 07 Ruteo avanzado, 08 Material, 09 NgRx, 10 Testing. Registro en rutas + índice + snapshot.

## Specs

S1: «carpeta en `src/app/extras/NN-nombre/`, subcarpetas `ejercicio/` + `solucion/`, `TODO: [Paso X]` guiados y README con criterios de aceptación verificables en el navegador» (formato de las 01–05).

S2: Práctica 06 — carpeta `06-rxjs-y-asincronia/`, ruta `/extras/06`. Pasos del temario:
  «1. `busqueda$ = new Subject<string>()` + método `buscar(texto)`.» «2. Encadenar `pipe(debounceTime(300), distinctUntilChanged())`.» «3. `switchMap(texto => this.svc.listar(texto))` contra el backend falso de la 03.» «4. Suscripción en el componente + `takeUntilDestroyed()`.» «5. Mapear los estados a signals y pintar `@if (cargando)` / `@if (vacio)` / `@if (error)`.» «6. *(Desafío)* Repetir la misma lógica exponiendo el resultado como signal (`toObservable` inverso).»

S3: Criterios de aceptación 06: «Tipear "san" rápido → en Network aparece **1 sola** petición.» «Escribir "san", borrar y escribir "s" → jamás se pinta tarde la respuesta de "san".» «Navegar fuera de la pantalla → ninguna petición pendiente (cleanup efectivo).»

S4: Práctica 07 — carpeta `07-ruteo-avanzado/`, ruta `/extras/07` con `rutas.ts` propio. «rutas `''` (listado) / `'detalle/:id'` / `'**'` → `withComponentInputBinding` → `navigate` con queryParams → 404 → `routerLinkActive` → lazy load del módulo de detalle → `canMatch` en rutas de admin → rutas hijas con layout propio.»

S5: Criterios de aceptación 07: «Entrar directo a `/extras/07/detalle/9999` muestra la vista (el ID llega por `input()`, no por subscribe).» «Recargar `/extras/07/detalle/7?tab=auditoria` restaura el tab.» «El listado filtrado se puede compartir por link y al abrirlo los filtros reaparecen.» «Cualquier path inválido cae en 404 sin romper el menú.»

S6: Práctica 08 — carpeta `08-angular-material/`, ruta `/extras/08`. «abrir el diálogo desde el listado → inyectar data → `close()` con payload y flujo alta/edición → `MatTable` + `MatPaginator` → `SnackBar` con "deshacer" → `MatError` con los validadores de la 02 → borrar con diálogo de confirmación Material (sin `confirm()` de JS).»

S7: Criterios de aceptación 08: «Editar desde la tabla abre el diálogo precargado por data de entrada (no por `effect` — contrastar con la 05).» «Guardar cierra el diálogo y la fila se actualiza **sin recargar**.» «Eliminar muestra un snackbar con "deshacer" por 5 s.»

S8: Práctica 09 — carpeta `09-ngrx-store/`, ruta `/extras/09`. «estado + acciones → reducer inmutable → feature + selectors → `select` + `toSignal` en la pantalla → dispatch desde el componente → devtools → selector por ID → lectura sobre effects.» Effects **solo teoría**: «devOSSE no los usa (no figuran en su `package.json`); no implementar».

S9: Criterios de aceptación 09: «Cambiar de pantalla y volver → los filtros persisten.» «En DevTools del navegador se ven las acciones apareciendo en orden.» «Un reducer con `push()` a propósito rompe la verificación de inmutabilidad y el alumno lo corrige.»

S10: Práctica 10 — carpeta `10-testing-http-componentes/`, ruta `/extras/10`. «`TestBed.configureTestingModule` + `provideHttpClientTesting()`» · «`HttpTestingController`: `expectOne`, `flush`, `error()`, `verify()`» · «Aserción de parámetros/headers en la petición (`request.params`)» · «Testear la **regla de negocio**, no la implementación: `ValidatorFn` de la 02 con casos puros» · «Componente aislado: stub de servicio con valor falso» · «`verify()` en `afterEach`: cazar requests colgados».

S11: Criterios de aceptación 10: «`npm test` verde.» «Cambiar el mensaje de error del código **no rompe** el test del validador.» «Sin `verify()`, el suite falla con un request pendiente.» El runner del proyecto es vitest (`@angular/build:unit-test`), no karma.

S12: Registro: entradas en `LECCIONES`/`PRACTICAS` (índice de extras) y rutas lazy (`loadComponent`) en `src/app/app.routes.ts` para `NN` y `NN/solucion`, siguiendo el patrón de las prácticas 01–05.

S13: Convenciones AGENTS.md: Angular 22 — sin `standalone: true`, OnPush explícito innecesario (es default en v22), `input()`/`output()`/`model()`, control flow nativo, `inject()`, comentarios y README en español, tokens de `src/styles.css` (sin colores hardcodeados), selectores `...-solucion` y clases `...Solucion` en la solución.

S14: «CRITICAL»: «after creating or modifying an exercise, run `npm run snapshot` and commit the updated `snapshot.ts`».

## Tasks

- T1 (S2,S3) [worker-06] Práctica 06 — RxJS: ejercicio + solución + README. → ✅ commit `5a4e923` `feat(extras-06)`
- T2 (S4,S5) [worker-07] Práctica 07 — Ruteo avanzado: ejercicio + solución + `rutas.ts` + README. → ✅ commit `3be0a0b` `feat(extras-07)`
- T3 (S6,S7) [worker-08] Práctica 08 — Material: ejercicio + solución + README (datos del CRUD propios, no reutiliza el service de la 05 para no acoplar carpetas). → ✅ commit registrado en Log
- T4 (S8,S9) [worker-09] Práctica 09 — NgRx: ejercicio + solución + `rutas.ts` (con providers de store a nivel de ruta) + README. → ✅ commit `df0ee6c` `feat(extras-09)`
- T5 (S10,S11) [worker-10] Práctica 10 — Testing: ejercicio (specs con `it.todo`) + solución (specs reales) + README. → ✅ commit `83ea351` `feat(extras-10)`
- T6 (S12) [parent] Registro: `app.routes.ts` + índice de extras. → ✅ commit `3d4307d` `feat(extras-registro)`
- T7 (S1,S11,S13,S14) [parent] Verificación: `npm run build`, `npm test`, `npm run snapshot` + commit snapshot. → ✅ commit `bdecee5` `fix(extras)`

## Log

- L1 (petición original, verbatim): «Hola! Necesito que agregues a la practica extra los problemas de @TEMARIO-PRACTICAS-06-10.md»
- L2 (decisión): instalar `@angular/material`, `@angular/cdk`, `@ngrx/store`, `@ngrx/store-devtools` (requeridos por el temario para 08 y 09). Los `@ngrx/effects` NO se instalan (S8: solo teoría).
- L3 (decisión): ejercicio de la 10 usa `it.todo(...)` como marcadores del alumno, así `npm test` queda verde con los TODO sin resolver (coherente con S1: el ejercicio compila sin errores).
- L4 (decisión): 09 provee el store a nivel de ruta (providers en su `rutas.ts`) para no tocar el `app.config.ts` global.
- L5 (evidencia): T1 verificada por el parent (estructura 8 archivos, TODOs pasos 1–5, sin violaciones AGENTS.md, servicio con X-Canal + filtro client-side) y commiteada como `5a4e923`. Slice de 1019 líneas acumuladas con el commit del temario — los commits restantes van por unidad de práctica, cada uno autocontenido.
- L6 (parent, T6): registro ya realizado — rutas (06/08/10 + spreads 09 y 07 al final), índice PRACTICAS, tema Material en angular.json, withComponentInputBinding en app.config.ts.
- L7 (evidencia): T3 commiteada — desviación aceptada: el TODO "paso 3" es agregar la columna subtotal a la MatTable ya renderizada (evita tabla duplicada y warning NG8113 de imports standalone sin usar). Tema prebuilt ya cubierto por el parent en angular.json.
- L8 (evidencia): T5 commiteada (`83ea351`). El worker dejó los pasos del alumno como comentarios `// TODO:` en vez de `it.todo(...)`; el parent los convirtió a `it.todo` reales (la justificación "vitest falla suites solo-con-todo" no aplicaba: cada suite tiene un test dado). Suite final: 12 passed + 8 todo.
- L9 (evidencia): build de producción detectó 2 errores — import sin cerrar en `07/ejercicio/panel-layout.ts` (bug del worker-07) e import faltante de `withComponentInputBinding` en `app.config.ts` (parent). Corregidos y commiteados con el snapshot (`bdecee5`). Warnings NG8113 restantes son preexistentes de tutorial/12 y 23 (archivos no tocados).
- L10 (cierre): verificación ejecutada — `npm run build` exit 0 (sin warnings nuevos), `npm test` 12 passed + 8 todo, `npm run snapshot` 34 ejercicios / 149 archivos. Pendiente de verificación manual (no automatizable acá): render en navegador de ambas prácticas visuales en modo claro/oscuro y los criterios de aceptación de cada README. Push/PR: decisión del usuario.
