# Práctica 10 — Testing de HTTP y validadores

## Cómo hacer la práctica

1. Levantá el servidor: `npm start`
2. Ejercicio: <http://localhost:4200/extras/10>
3. Solución para comparar en otra pestaña: <http://localhost:4200/extras/10/solucion>
4. Ojo con esta práctica: el navegador muestra la **demo del código** (el validador y el servicio ya completos, funcionando en vivo), pero tu trabajo **no** está en la página: está en los **specs**. Corré los tests con `npm test`.
5. Archivos de trabajo: `src/app/extras/10-testing-http-componentes/ejercicio/` — concretamente los specs `productos-api.service.spec.ts` (Pasos 2, 3, 4 y 7) y `validadores.spec.ts` (Paso 5). Buscá los `it.todo(...)` y reemplazalos uno por uno por tests reales.
6. El código a testear **ya está completo, sin TODOs**: `productos-api.service.ts` (GET `/api/productos` con header `X-Canal: practica-10`, `HttpParams` para `?categoria=` y `catchError` que mapea a mensajes amigables) y `validadores.ts` (el validador puro `stockMinimo(min)`). NO los toques: son el material sobre el que trabajás.

## Objetivo

Acá el código de producción ya existe: en esta práctica hacés lo que más se hace en un equipo real, **testearlo**. Sin red real, sin backend y sin renderizar toda la app. La parte difícil no es llamar al `HttpClient` (eso fue la práctica 03) ni validar (la 02): es **controlar el entorno de test** para que las peticiones no salgan a la red y las respuestas las fabricás vos. En el camino:

1. **`TestBed` + `provideHttpClientTesting()`**: un backend de testing que intercepta todo el `HttpClient`.
2. **`HttpTestingController`**: `expectOne` captura la petición, `flush`/`error()` fabrican la respuesta y `verify()` detecta peticiones no capturadas.
3. **Regla de negocio, no implementación**: el validador se testea con casos puros (entrada → salida), afirmando la DATA que devuelve, jamás un texto.

## Conceptos clave

### 1. El entorno: `TestBed` + `provideHttpClientTesting()`

```ts
TestBed.configureTestingModule({
  providers: [
    provideHttpClient(),          // el HttpClient "real"...
    provideHttpClientTesting(),   // ...interceptado por el backend de testing (sin red).
  ],
});
service = TestBed.inject(ProductosApiService);
controller = TestBed.inject(HttpTestingController);
```

Si configurás `provideHttpClient()`, colocá después `provideHttpClientTesting()` para
que sustituya el backend. Angular gestiona TestBed entre pruebas; los resets explícitos
de estos ejemplos son una limpieza adicional, no una regla general de Vitest.

### 2. `HttpTestingController`: `expectOne`, `flush`, `error()`, `verify()`

La receta de un test HTTP es siempre la misma: disparar, capturar, responder, afirmar.

```ts
it('lista exitosa', () => {
  const datos: Producto[] = [{ id: 1, nombre: 'Teclado', categoria: 'perifericos', stock: 12 }];
  const recibido: Producto[][] = [];
  service.listar().subscribe((r) => recibido.push(r));

  const req = controller.expectOne('/api/productos'); // afirma que SALIÓ y te la entrega
  expect(req.request.method).toBe('GET');
  req.flush(datos);                                   // fabricás la respuesta 200

  expect(recibido).toEqual([datos]);
});
```

- **`flush(datos)`** simula éxito; `flush(null, { status: 500, statusText: 'Server Error' })`
  simula un error del servidor. `error(new ProgressEvent('error'))` simula un fallo de red (status 0).
- **`expectOne(url)`** compara la URL **completa**: si la petición lleva query params (`?categoria=...`), no matchea. En ese caso se usa la forma con **predicado** y las afirmaciones van sobre `req.request`.

### 3. Aserción de params y headers en la petición

```ts
service.listar({ categoria: 'perifericos' }).subscribe();

controller.expectOne((req) => req.url === '/api/productos', 'listar con filtro');
// ...capturá la petición y afirmá sobre req.request:
//   req.request.params.get('categoria')  → 'perifericos'   (HttpParams)
//   req.request.headers.get('X-Canal')   → 'practica-10'   (HttpHeaders)
```

El backend de pruebas permite inspeccionar la petición después de que el servicio la
armó, sin depender de una red o de un servidor real.

### 4. Testear la REGLA, no el texto

El validador devuelve **DATA**, no mensajes: valor por debajo del mínimo → `{ stockMinimo: { min } }`; el borde (`== min`) → `null` (el mínimo ES válido); vacío → `null` (lo maneja `Validators.required`).

```ts
const validar = stockMinimo(5);
expect(validar(new FormControl(3))).toEqual({ stockMinimo: { min: 5 } }); // rechaza con data
expect(validar(new FormControl(5))).toBeNull();                           // el borde pasa
```

Por eso "cambiar el mensaje de error del código" nunca puede romper estos tests: se afirma el objeto de errores o `null`, jamás una frase. Lo mismo aplica al `catchError`: se afirma que el fallo llega como un `Error` con mensaje **no vacío** (el mapeo), no la frase exacta.

### 5. ¿Stub de servicio o HTTP testing? (criterio de decisión)

| Escenario | Herramienta | Por qué |
|---|---|---|
| El **componente** consume un servicio y solo importa cómo reacciona a los datos | **Stub de servicio** (`{ provide: X, useValue: fake }`) | Aislás la vista: no te interesa el HTTP debajo. Testeás la lógica del componente |
| El **servicio** arma URL, `HttpParams`, headers y mapea errores | **`provideHttpClientTesting()` + `HttpTestingController`** | Justo lo que querés afirmar vive en la capa HTTP; el controlador la captura sin red |
| Una **regla de negocio** (`ValidatorFn`, pipe, función pura) | **Test puro**: ni TestBed ni HTTP | El test más rentable: entrada → salida, sin montar nada |

Regla práctica: testeás la pieza cuyo *contrato* te importa.

### 6. `verify()`: detectar peticiones no esperadas

```ts
afterEach(() => {
  controller.verify(); // "Expected no open requests..." si algo quedó pendiente
  TestBed.resetTestingModule();
});
```

`verify()` falla si hay peticiones que todavía no capturaste con `expectOne` o `match`.
Una vez capturadas, salen de su lista: **no comprueba por sí solo que hayas llamado a
`flush` o `error`**. Respondé cada petición y afirmá el resultado recibido. El paso 7
deja una petición sin capturar, comprueba el fallo y luego la captura y responde.

### 7. El runner es vitest

El proyecto ejecuta **Vitest** con `@angular/build:unit-test` mediante `npm test`.
Los `it.todo` indican trabajo pendiente y no verifican comportamiento. Los tests dados
del paso 1 comprueban la preparación del entorno. Para ejecutar una sola vez:
`npm test -- --watch=false`.

## Consigna paso a paso (checklist)

Abrí los specs de `ejercicio/` y corré `npm test`: la suite está **verde** con los `it.todo` sin resolver (son markers). Cada `it.todo` corresponde a un paso de acá.

- [ ] **Paso 1 (dado, no se toca) — `productos-api.service.spec.ts`:** el `beforeEach` con `TestBed` + `provideHttpClient()` + `provideHttpClientTesting()` y el test que verifica que el servicio y el controlador se inyectan ya están escritos. Usalos de ancla y de ejemplo.
- [ ] **Paso 2 — `productos-api.service.spec.ts`:** `expectOne + flush`: `service.listar().subscribe()`, `controller.expectOne('/api/productos')`, afirmá el método `GET`, respondé con `req.flush([...])` y verificá que el subscribe recibió EXACTAMENTE esos datos.
- [ ] **Paso 3 — `productos-api.service.spec.ts`:** probá el mapeo de errores de `service.obtener(999)` con `req.flush(null, { status: 500, statusText: 'Server Error' })`. Afirmá que llega un `Error` con mensaje no vacío. Como extensión opcional, probá un fallo de red con `req.error(new ProgressEvent('error'))`.
- [ ] **Paso 4 — `productos-api.service.spec.ts`:** los `HttpParams` y el header viajan en la petición: `service.listar({ categoria })` y afirmá `req.request.params.get('categoria')` y `req.request.headers.get('X-Canal')`. Detalle: con query params, `expectOne('/api/productos')` no matchea; usá la forma con predicado. No olvidés el `flush` final.
- [ ] **Paso 5 — `validadores.spec.ts`:** casos puros de `stockMinimo(5)`: por debajo del mínimo → `{ stockMinimo: { min: 5 } }` (con `toEqual`); justo el borde (`== min`) → `null`; por encima → `null`; vacío (`''`/`null`) → `null` (lo maneja `Validators.required`). Sin DOM, sin HTTP.
- [ ] **Paso 6 (lectura):** la tabla de criterios de arriba (stub de servicio vs HTTP testing vs test puro). No hay código que escribir.
- [ ] **Paso 7 — `productos-api.service.spec.ts`:** `verify()` en `afterEach` caza requests colgados: dispará una petición, dejala colgada y esperá que `expect(() => controller.verify()).toThrow()` pase. Después "descargá" la petición con `controller.expectOne(url).flush([])` para que el `afterEach` no explote de nuevo.
- [ ] **Paso 8:** probá los criterios de aceptación de abajo.

## Criterios de aceptación

1. **`npm test` verde.**
2. **Cambiar el mensaje de error del código no rompe el test del validador.**
3. **Con `verify()`, una petición no capturada hace fallar la comprobación.**

El código obligatorio está en los specs HTTP y del validador. El paso 6 (stub frente
a backend HTTP) es de lectura; esta práctica todavía no propone implementar un test
de componente. La demo web consulta datos del simulador local; los tests preparan
respuestas independientes con `HttpTestingController`.

Referencia: [pruebas de HTTP y tratamiento de errores](https://angular.dev/guide/http/testing).

El runner del proyecto es vitest (`@angular/build:unit-test`), no karma.

## Solución

La versión resuelta y comentada está en `src/app/extras/10-testing-http-componentes/solucion/` (specs reales en `solucion/*.spec.ts` y la misma demo en `/extras/10/solucion`). Compará tu `ejercicio/*.spec.ts` con la referencia cuando termines.
