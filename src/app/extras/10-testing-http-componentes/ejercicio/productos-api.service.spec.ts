import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ProductosApiService } from '../productos-api.service';

/**
 * EJERCICIO — Specs de HTTP para `ProductosApiService`.
 *
 * CÓMO FUNCIONA ESTE ARCHIVO: el entorno de test (Paso 1) y la red de
 * seguridad (Paso 7) YA ESTÁN ESCRITOS. Tu trabajo son los `it.todo`:
 * reemplazalos uno por uno por tests reales (mirá la solución en
 * `../solucion/productos-api.service.spec.ts` cuando te trabes).
 *
 * La clave de la práctica: el `HttpTestingController` intercepta TODAS las
 * llamadas de `HttpClient` (por eso `provideHttpClientTesting()` va DESPUÉS
 * de `provideHttpClient()`). No hay red, no hay backend: la respuesta la
 * fabricás vos con `flush()` (éxito) o `error()` (fallo).
 */
describe('ProductosApiService', () => {
  let service: ProductosApiService;
  let controller: HttpTestingController;

  // ─── Paso 1 (YA RESUELTO) — armado del entorno de test ─────────────────
  // Este `beforeEach` corre antes de CADA test: crea el TestBed con los dos
  // providers HTTP y te entrega el servicio y el controlador listos para usar.
  beforeEach(() => {
    // Con vitest (isolate: false) todos los specs comparten el MISMO TestBed:
    // arrancar con un reset explícito garantiza que este spec es independiente
    // de qué otros archivos corrieron antes en la misma suite.
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(), // el HttpClient "real"... interceptado por:
        provideHttpClientTesting(), // ...el backend de testing (sin red).
      ],
    });

    service = TestBed.inject(ProductosApiService);
    controller = TestBed.inject(HttpTestingController);
  });

  // ─── Paso 7 (YA RESUELTO) — verify() como red de seguridad ─────────────
  // Este `afterEach` corre después de CADA test: si algún test disparó una
  // petición y no la respondió (ni con flush() ni con error()), acá explota
  // con "Expected no open requests, found 1: ...". Es la red que caza
  // "requests colgados" que nadie contestó.
  afterEach(() => {
    controller.verify();
    // Y dejamos el TestBed limpio para el test que venga después.
    TestBed.resetTestingModule();
  });

  // ─── TU TURNO ──────────────────────────────────────────────────────────
  // Tip: cada `it.todo` se convierte en `it('...', () => { ... })`. La
  // receta general de un test HTTP es SIEMPRE la misma:
  //   1. `service.listar(...).subscribe(...)` (dispara la petición).
  //   2. `controller.expectOne(url)` (afirma que salió y te la devuelve).
  //   3. `req.flush(datos)` (simula la respuesta) o `req.error(...)`.
  //   4. Afirmar lo que recibió el `subscribe`.
  //
  // Nota: vitest falla una suite que NO tiene ningún test real (los
  // `it.todo` no cuentan), por eso el Paso 1 viene ya como test dado acá abajo.

  // [Paso 1] (DADO, no se toca) — el entorno de test quedó armado y el
  // servicio inyectado es el real (interceptado por el backend de testing).
  it('[Paso 1] el entorno de test está armado y el servicio se inyecta', () => {
    expect(service).toBeInstanceOf(ProductosApiService);
    // HttpTestingController es un TOKEN de inyección, no una clase: no hay
    // instanceof. Alcanza con verificar que el controlador existe y expone
    // la API del backend de testing.
    expect(controller).toBeDefined();
    expect(typeof controller.expectOne).toBe('function');
    expect(typeof controller.verify).toBe('function');
  });

  // TODO: [Paso 2] - expectOne + flush: lista exitosa.
  //   Hacé `service.listar().subscribe()` guardando lo que llega en un array.
  //   Pedí la petición con `controller.expectOne('/api/productos')`, afirmá
  //   que el método es GET, respondé con `req.flush([...])` y verificá que
  //   el subscribe recibió EXACTAMENTE esos datos.
  it.todo('[Paso 2] expectOne + flush: lista exitosa');

  // TODO: [Paso 3] - error() simula fallo y el catchError mapea.
  //   Hacé `service.obtener(999).subscribe({ error: ... })`. Pedí la petición
  //   y respondé con `req.error(new ProgressEvent('error'), { status: 500 })`
  //   (fallo, no flush). Afirmá que el error llegó como `Error` con un
  //   mensaje no vacío (el mapeo del catchError) — no la frase exacta.
  it.todo('[Paso 3] error() simula fallo y el catchError mapea');

  // TODO: [Paso 4] - los HttpParams y el header viajan en la petición.
  //   Hacé `service.listar({ categoria: 'perifericos' }).subscribe()`. Pedí
  //   la petición con expectOne y afirmá sobre la MISMA petición:
  //   `req.request.params.get('categoria')` y `req.request.headers.get('X-Canal')`.
  //   No te olvides del `flush` final para que el verify() del afterEach
  //   no explote.
  it.todo('[Paso 4] los HttpParams y el header viajan en la petición');

  // TODO: [Paso 7] - verify() en afterEach caza requests colgados.
  //   Test de EXPERIMENTO: hacé `service.listar().subscribe()` y respondé la
  //   petición... con `expect(() => controller.verify()).toThrow()` dentro
  //   del propio test (el request quedó colgado: verify tiene que explotar).
  //   Después "descargá" la petición con `controller.expectOne(url).flush([])`
  //   para que el afterEach no explote de nuevo. El objetivo es VER el
  //   mensaje de error que da un request pendiente.
  it.todo('[Paso 7] verify() en afterEach caza requests colgados');
});
