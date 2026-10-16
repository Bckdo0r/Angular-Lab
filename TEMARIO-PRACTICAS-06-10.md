# Temario de la serie 06–10 — temas, conceptos y profundidad

> Documento de continuación del `TEMARIO-PRACTICAS.md`: cubre las prácticas que **faltan** para
> completar el laboratorio (`src/app/extras/06/` a `10/`) en función de lo que realmente se
> aplica en el proyecto **devOSSE** (intranet OSSE, Angular 20 con código estilo NgModules).
>
> Mantiene la misma convención de las prácticas 01–05:
> carpeta en `src/app/extras/NN-nombre/`, subcarpetas `ejercicio/` + `solucion/`,
> `TODO: [Paso X]` guiados y README con criterios de aceptación verificables en el navegador.

---

## Escala de profundidad (igual que la serie 01–05)

| Nivel | Nombre | Significado |
|---|---|---|
| ★ | **Explicado** | Se explica con código de ejemplo y el alumno lo **lee y usa tal cual** (plantillas ya maquetadas, servicios ya completos). No tiene TODO asociado. |
| ★★ | **Implementado con guía** | El alumno lo **escribe** en el ejercicio siguiendo el TODO y el README; la solución sirve de contraste. |
| ★★★ | **Dominado (nivel oficina)** | Además de implementarlo, el alumno debe entender **por qué**: patrones, trampas, inmutabilidad, alternativas y consecuencias en apps reales. |

---

## Panorama priorizado

| Práctica | Prioridad | Brecha que cubre | Espejo en devOSSE |
|---|:---:|---|---|
| **06 — RxJS y asincronía** | 🔴 P0 | Tema #1 que faltaba (la práctica 03 solo tocó `map`/`catchError`) | Proyecto lleno de suscripciones; buscadores de mensajes/personas |
| **07 — Ruteo avanzado** | 🔴 P0 | El tutorial se quedó en ruteo estático | `AuthGuard` + `hash/:hash` + lazy loading + 404 |
| **08 — Angular Material: diálogo, tabla y feedback** | 🟡 P1 | Faltaba por completo; el CRUD de la 05 usa modales "caseros" | El ABM de `administracion` (usuarios, perfiles, parámetros) |
| **09 — Estado global con NgRx** | 🟡 P1 | Faltaba por completo; la 01 dio estado local, no global | `modulos/mapa/store/` (state + reducer + service) |
| **10 — Testing de HTTP y componentes** | 🟢 P2 | Marcado como "no cubierto" en el temario original | `app.component.spec.ts`, `karma.conf.js` |

**Orden de ejecución sugerido:** 06 → 07 → 08 → 09 → 10.
El 06 es bloqueante para el 09 (los selectores de store devuelven Observables) y desbloquea la
lectura de cualquier código de la empresa.

---

## 🔴 Práctica 06 — RxJS y asincronía reactiva

**Carpeta:** `06-rxjs-y-asincronia/` · **Ruta:** `/extras/06`
**Problema laboral:** un buscador que dispara peticiones mientras el usuario tipea, sin duplicar llamadas, sin que se pinten respuestas viejas y sin fugas de memoria.

**Previo del tutorial:** clases 19–21 (servicios + inyección) · **Reutiliza:** backend falso de la práctica 03.

| Concepto | Profundidad | Rol del alumno |
|---|:---:|---|
| `Observable` vs Promise: por qué Angular vive de Observables | ★★ | Lee y compara `http.get()` (Observable) vs `fetch()` (Promise) |
| Suscripción y **cleanup**: `takeUntilDestroyed()` / `DestroyRef` | ★★★ | Paso 4: descubre el leak sin cleanup y lo cierra |
| `Subject` como fuente de eventos del input (puente con la práctica 01) | ★★ | Conecta el evento de tipeo al `Subject` |
| Operadores: `debounceTime`, `distinctUntilChanged` | ★★★ | Paso 2: escribe el `pipe()` y explica por qué va cada uno |
| **`switchMap`**: cancelar la respuesta vieja por la nueva | ★★★ | Paso 3: el corazón de la práctica; trampa clásica con `mergeMap` |
| Estados derivados de la llamada con signals (`cargando`, `vacio`, `error`) | ★★ | Receta de la 03 aplicada al flujo reactivo |
| `toObservable()` / `async pipe`: mundo signals ↔ mundo Observables | ★★ | Intercambio bidireccional — clave en un código migrado como devOSSE |
| Cold vs hot: múltiples suscripciones = múltiples ejecuciones | ★★★ | Experimenta con `shareReplay` o evitándolo a propósito |

**Estructura de pasos (TODO):**
1. `busqueda$ = new Subject<string>()` + método `buscar(texto)`.
2. Encadenar `pipe(debounceTime(300), distinctUntilChanged())`.
3. `switchMap(texto => this.svc.listar(texto))` contra el backend falso de la 03.
4. Suscripción en el componente + `takeUntilDestroyed()`.
5. Mapear los estados a signals y pintar `@if (cargando)` / `@if (vacio)` / `@if (error)`.
6. *(Desafío)* Repetir la misma lógica exponiendo el resultado como signal (`toObservable` inverso).

**Criterios de aceptación:**
- Tipear "san" rápido → en Network aparece **1 sola** petición.
- Escribir "san", borrar y escribir "s" → jamás se pinta tarde la respuesta de "san".
- Navegar fuera de la pantalla → ninguna petición pendiente (cleanup efectivo).

---

## 🔴 Práctica 07 — Ruteo avanzado SPA

**Carpeta:** `07-ruteo-avanzado/` · **Ruta:** `/extras/07` (usa `rutas.ts` propio)
**Problema laboral:** una mini-intranet con listado → detalle por ID, página 404, menú con ítem activo y pantalla pesada que debe cargar bajo demanda.

**Previo del tutorial:** clases 12–14 · **Reutiliza:** guards de la práctica 04 (los re-escribe).

| Concepto | Profundidad | Rol del alumno |
|---|:---:|---|
| Parámetro de ruta `:id` + `withComponentInputBinding()` → `input()` en el componente | ★★★ | Pasos 1–2: la forma moderna de leer la URL (sin `ActivatedRoute` en el constructor) |
| Navegación programática `Router.navigate([...])` vs `routerLink` | ★★ | Paso 3: botón "volver al listado" preservando filtros |
| **Query params**: escribir/leer filtros en la URL y restaurarlos | ★★★ | Paso 4: el patrón de `mapaHash` de devOSSE (compartir una vista por link) |
| Lazy loading `loadComponent` (releer, no es nuevo) | ★★ | Observa el bundle partido en DevTools → Network |
| Ruta comodín `**` → pantalla 404 | ★★ | Paso 5: el orden de las rutas importa — lo descubre en el intento |
| `routerLinkActive` + menú semántico (`routerLinkActiveOptions`) | ★★ | Paso 6 |
| Guards como composición: `canMatch` vs `canActivate` | ★★★ | Paso 7: `canMatch` evita siquiera cargar el bundle de rutas protegidas |
| Rutas hijas con `children` **escritas por él** (la 04 solo las leyó) | ★★ | Paso 8 |

**Estructura de pasos (TODO):**
rutas `''` (listado) / `'detalle/:id'` / `'**'` → `withComponentInputBinding` → `navigate` con queryParams → 404 → `routerLinkActive` → lazy load del módulo de detalle → `canMatch` en rutas de admin → rutas hijas con layout propio.

**Criterios de aceptación:**
- Entrar directo a `/extras/07/detalle/9999` muestra la vista (el ID llega por `input()`, no por subscribe).
- Recargar `/extras/07/detalle/7?tab=auditoria` restaura el tab.
- El listado filtrado se puede compartir por link y al abrirlo los filtros reaparecen.
- Cualquier path inválido cae en 404 sin romper el menú.

---

## 🟡 Práctica 08 — Angular Material: diálogo, tabla y feedback

**Carpeta:** `08-angular-material/` · **Ruta:** `/extras/08`
**Problema laboral:** refactorizar el CRUD de la práctica 05 a la "forma oficina": tabla paginada Material, alta/edición en `MatDialog` y confirmación con `MatSnackBar`.

**Previo:** prácticas 05 (el CRUD base) y 02 (validaciones para el form del diálogo).

| Concepto | Profundidad | Rol del alumno |
|---|:---:|---|
| `MatDialog.open()` + `afterClosed()` (flujo imperativo vs el modal casero de la 05) | ★★★ | Pasos 1–2: compara `output()` de la 05 con `dialogRef.close(dato)` |
| `MAT_DIALOG_DATA` para recibir datos y `MatDialogRef.close()` para devolver | ★★★ | Paso 2: inyección en el diálogo, el "contrato" del modal |
| `MatTable` con `matColumnDef` y datos enlazados a signals | ★★ | Paso 3: reemplaza el `@for` casero por la tabla Material |
| `MatPaginator` + conectar con el estado `pagina` (reusar lógica de la 05) | ★★ | Paso 4: `PageEvent` llega del paginator y muta la signal |
| `MatSnackBar` para feedback (no `alert()`) + acción "deshacer" | ★★ | Paso 5 |
| `MatFormField` + `MatInput` + `MatError` (errores Material vs `getError()` de la 02) | ★★ | Paso 6 |
| `provideAnimations()` y el costo de las animaciones en change detection | ★ | Solo lectura — se explica, no se arma |
| Design system interno: cuándo Material y cuándo componentes propios | ★ | Discusión "para pensar": en devOSSE conviven ambos |

**Estructura de pasos (TODO):**
abrir el diálogo desde el listado → inyectar data → `close()` con payload y flujo alta/edición → `MatTable` + `MatPaginator` → `SnackBar` con "deshacer" → `MatError` con los validadores de la 02 → borrar con diálogo de confirmación Material (sin `confirm()` de JS).

**Criterios de aceptación:**
- Editar desde la tabla abre el diálogo precargado por data de entrada (no por `effect` — contrastar con la 05).
- Guardar cierra el diálogo y la fila se actualiza **sin recargar**.
- Eliminar muestra un snackbar con "deshacer" por 5 s.

---

## 🟡 Práctica 09 — Estado global con NgRx

**Carpeta:** `09-ngrx-store/` · **Ruta:** `/extras/09`
**Problema laboral:** un visor con filtros y capas visibles que deben sobrevivir al cambio de pantalla — el patrón del mapa de devOSSE.

**Previo:** prácticas 01 (estado con signals — ahora lo contrasta) y 06 (RxJS: `store.select()` devuelve Observables).

| Concepto | Profundidad | Rol del alumno |
|---|:---:|---|
| Por qué NgRx si ya existen signals: shared state + time-travel + trazabilidad | ★ | Discusión inicial: cuándo SÍ y cuándo NO (en devOSSE parece respetarse: solo el mapa usa store) |
| **Acciones como única fuente de mutación** | ★★★ | Paso 1: define el set de acciones (`[Mapa] Cargar Capa`, etc.) |
| **Reducer puro e inmutable** (`{...state, capas: [...]}`) | ★★★ | Paso 2: el reducer jamás muta — la trampa del `push()` ya vivida en la 05 |
| `createFeature` + selectors memoizados (`selectCapasVisibles`) | ★★★ | Paso 3: estado derivado en el store (equivalente a `computed()` pero global) |
| `Store.select()` → Observable + `toSignal()` para la plantilla moderna | ★★★ | Paso 4: el puente obligatorio entre NgRx y signals |
| `store.dispatch()` desde un componente que solo "emite intenciones" | ★★ | Paso 5: refuerza la regla de la 01 — el componente no muta, pide |
| `provideStoreDevTools()` para inspeccionar acciones | ★ | Paso 6: observar en DevTools del navegador |
| Normalización del estado y selector por ID (`selectById(id)`) | ★ | Solo lectura con comentario — trampa clásica de diseño |
| Effects (`@ngrx/effects`) | ★ | **Solo teoría**: devOSSE no los usa (no figuran en su `package.json`); no implementar |

**Estructura de pasos (TODO):**
estado + acciones → reducer inmutable → feature + selectors → `select` + `toSignal` en la pantalla → dispatch desde el componente → devtools → selector por ID → lectura sobre effects.

**Criterios de aceptación:**
- Cambiar de pantalla y volver → los filtros persisten.
- En DevTools del navegador se ven las acciones apareciendo en orden.
- Un reducer con `push()` a propósito rompe la verificación de inmutabilidad y el alumno lo corrige.

---

## 🟢 Práctica 10 — Testing de HTTP y componentes

**Carpeta:** `10-testing-http-componentes/` · **Ruta:** `/extras/10`
**Problema laboral:** testear un componente con llamadas HTTP y un validador, sin red real y sin renderizar toda la app.

**Previo:** prácticas 02 (validadores), 03 (HttpClient) y 05 (CRUD).

| Concepto | Profundidad | Rol del alumno |
|---|:---:|---|
| `TestBed.configureTestingModule` + `provideHttpClientTesting()` | ★★★ | Paso 1: armado del entorno de test |
| `HttpTestingController`: `expectOne`, `flush`, `error()`, `verify()` | ★★★ | Pasos 2–3: simular éxito **y** fallo (el `catchError` de la 03 se prueba acá) |
| Aserción de parámetros/headers en la petición (`request.params`) | ★★ | Paso 4: ¿el método manda lo que debe? |
| Testear la **regla de negocio**, no la implementación: `ValidatorFn` de la 02 con casos puros | ★★★ | Paso 5: el test más rentable — sin DOM, sin HTTP |
| Componente aislado: stub de servicio con valor falso (sin mockear `HttpClient` debajo) | ★★★ | Paso 6: cuándo stub y cuándo HTTP testing — criterio de decisión |
| `verify()` en `afterEach`: cazar requests colgados | ★★ | Paso 7 |

**Criterios de aceptación:**
- `npm test` verde.
- Cambiar el mensaje de error del código **no rompe** el test del validador (demuestra que testea la regla, no el texto).
- Sin `verify()`, el suite falla con un request pendiente.

---

## Cobertura final del laboratorio

```
Tutorial (24 clases) ──► 01..05 (realizadas)
                          │
                          ├─ 06 RxJS             ← PRÓXIMO (bloqueante para 09)
                          ├─ 07 Ruteo avanzado
                          ├─ 08 Material
                          ├─ 09 NgRx
                          └─ 10 Testing
```

### Prerrequisitos por práctica

| Práctica | Tutorial | Prácticas previas |
|---|---|---|
| 06 | clases 19–21 | 03 (backend falso), 01 (Subject/estado) |
| 07 | clases 12–14 | 04 (guards) |
| 08 | clases 4–9, 17–18 | 05 (CRUD), 02 (validadores) |
| 09 | — | 01 (signals como contraste), 06 (Observables) |
| 10 | clases 17–21 | 02 (validadores), 03 (HttpClient), 05 (CRUD) |

---

## Qué queda deliberadamente FUERA de esta serie (y por qué)

- **`@defer`, i18n, SSR, animaciones:** no los usa devOSSE ni están en la lista de prioridad; si se quieren, van a una serie 3.
- **PWA / Service Worker / IndexedDB** (devOSSE los tiene): interesa, pero requiere entorno de prueba con HTTPS/servidor — no es apto para práctica local liviana. Dejarlo como **lectura guiada** sobre el código de devOSSE, no como ejercicio.
- **Signal forms y `httpResource`** (APIs nuevas de v20): conviene que entren **después** de dominar lo clásico, porque el código a leer mayoritariamente es clásico. Apuntarlos a la serie 3.
- **NgModules:** no es una práctica, es un ejercicio de **lectura** sobre devOSSE mismo — hacerlo cuando se entre a la empresa, con el código real a mano.

---

## Nota de contexto: el estilo de devOSSE vs. lo practicado

devOSSE está en **Angular 20** pero con código estilo NgModules (migrado desde v12):
`standalone: false` por defecto, inyección por constructor, `@Input()`/`@Output()` decoradores y
lazy loading con `loadChildren`. Los **conceptos** de las prácticas 01–10 aplican igual; cambia el
registro (`app.config.ts` vs `app.module.ts`) y la sintaxis de entrada de datos. La regla de oro
al entrar a la empresa: **seguir la convención del archivo que se toca**.
