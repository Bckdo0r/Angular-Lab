# Práctica 10 — Testing de HTTP y componentes

**Problema laboral:** testear un componente con llamadas HTTP y un validador, **sin red real** y sin renderizar toda la app.

- **Carpeta:** `10-testing-http-componentes/`
- **Ruta:** `/extras/10` → http://localhost:4200/extras/10
- **Solución:** `/extras/10/solucion` → http://localhost:4200/extras/10/solucion
- **Previo:** prácticas 02 (validadores), 03 (HttpClient) y 05 (CRUD).
- **Runner:** el proyecto usa **vitest** (`@angular/build:unit-test` via `npm test`), **no** karma.

## Objetivo

Acá el código de producción ya está completo: el servicio `ProductosApiService`
(`/api/productos`, header `X-Canal: practica-10`, `catchError` que mapea a mensajes amigables)
y el validador puro `stockMinimo(min)` (`validadores.ts`). Tu trabajo es **escribir los
tests** que prueban su comportamiento con `HttpTestingController` y con casos puros.

> ⚠️ La página de la práctica **no** llama al servicio en vivo: el backend falso del
> proyecto no sirve `/api/productos` (sería un 404). La página es solo lectura.

## Criterio de decisión: ¿stub de servicio o `provideHttpClientTesting()`? (★★★)

| Escenario | Herramienta | Por qué |
|---|---|---|
| El **componente** consume un servicio y solo te importa cómo reacciona a los datos que le llegan | **Stub de servicio con valor falso** (`{ provide: X, useValue: fake }`) | Aislar el componente: no te interesa el HTTP debajo, ni mockear `HttpClient`. Testeás la lógica de la vista |
| El **servicio** arma la URL, los `HttpParams`, los headers y mapea errores | **`provideHttpClientTesting()` + `HttpTestingController`** | Justo lo que querés afirmar (params, headers, `flush`/`error`) vive en la capa HTTP; el controlador la captura sin red |
| Una **regla de negocio** (`ValidatorFn`, pipe, función pura) | **Test puro**: ni TestBed ni HTTP | El test más rentable: entrada → salida, sin montar nada |

Regla práctica: testeás la pieza cuyo *contrato* te importa. Si el contrato es "este
servicio manda `?categoria=` y `X-Canal`", el backend de testing es la herramienta. Si el
contrato es "esta pantalla pinta una alerta cuando el servicio falla", alcanza un stub.

## Pasos

Los pasos se hacen en `ejercicio/`: los archivos spec ya traen el `beforeEach` (Paso 1) y
el `afterEach` con `verify()` (Paso 7) escritos, y los demás tests están como `it.todo`.
Los `it.todo` **no fallan**: la suite queda verde y se va poniendo a medida que completás.
(Ojo: vitest falla una suite sin NINGÚN test real — los todo no cuentan — por eso cada
spec del ejercicio trae un test "dado" del Paso 1 que sirve de ancla y de ejemplo.)

1. **Paso 1 (dado)** — Entorno de test: `TestBed.configureTestingModule` con
   `provideHttpClient()` + `provideHttpClientTesting()` (en ese orden: el testing
   intercepta al HttpClient real). Ya está en el `beforeEach`, junto con un test que
   verifica que el servicio y el controlador se inyectan.
2. **`[Paso 2] expectOne + flush: lista exitosa`** — `service.listar().subscribe()`,
   `controller.expectOne('/api/productos')`, afirmar el método `GET`, `req.flush(datos)`
   y verificar que el subscribe recibió exactamente esos datos.
3. **`[Paso 3] error() simula fallo y el catchError mapea`** — `service.obtener(999)`,
   responder con `req.error(new ProgressEvent('error'), { status: 500 })` y afirmar que
   el fallo llega como un `Error` con mensaje **no vacío** (el mapeo del `catchError`
   de la 03). Se prueba el mapeo, no la frase exacta.
4. **`[Paso 4] los HttpParams y el header viajan en la petición`** — `listar({ categoria })`
   y afirmar sobre la petición capturada: `req.request.params.get('categoria')` y
   `req.request.headers.get('X-Canal')`. Detalle fino: cuando la petición lleva query
   params, `expectOne('/api/productos')` no matchea (compara la URL completa); se usa la
   forma con **predicado** y las afirmaciones van sobre `req.request`. No olvidar el
   `flush` final.
5. **`[Paso 5]` casos puros del validador** — en `ejercicio/validadores.spec.ts`: por
   debajo del mínimo → `{ stockMinimo: { min } }`; justo el borde (`== min`) → `null`;
   por encima → `null`; vacío (`''`/`null`) → `null` (lo maneja `Validators.required`).
   Sin DOM, sin HTTP: el test más rentable.
6. **Criterio stub vs HTTP testing (lectura)** — la tabla de arriba; no hay código que escribir.
7. **`[Paso 7] verify() en afterEach caza requests colgados`** — experimento: disparar una
   petición y dejarla colgada para ver cómo `verify()` revienta con
   `Expected no open requests...`. Está en el `afterEach` de ambos specs de HTTP.

## Criterios de aceptación

- `npm test` **verde** (con los `it.todo` sin resolver también: son markers, no fallos).
- **Cambiar el mensaje de error del código no rompe el test del validador**: los tests
  afirman la regla (rechaza/acepta y la data `{ stockMinimo: { min } }`), nunca un texto.
  Lo mismo aplica al test del `catchError`: afirma que llega un `Error` con mensaje, no la frase.
- **Sin `verify()`, el suite falla con un request pendiente**: el `[Paso 7]` de la solución
  lo demuestra en vivo.

## Referencia

La solución completa está en `solucion/` (specs reales + página `/extras/10/solucion`).
Compará tu `ejercicio/*.spec.ts` con `solucion/*.spec.ts` cuando termines.
