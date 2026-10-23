import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Producto, ProductosApiService } from '../productos-api.service';

/**
 * SOLUCIÓN — Specs de HTTP para `ProductosApiService`.
 *
 * Compará con ../ejercicio/productos-api.service.spec.ts: acá los `it.todo`
 * son tests reales. La receta de cada test HTTP es siempre la misma:
 *   1. Disparar la llamada (`service.listar(...).subscribe(...)`).
 *   2. `controller.expectOne(url)` → afirma que salió y devuelve la petición.
 *   3. Responder: `flush(datos)` (éxito) o `error(evento, { status })` (fallo).
 *   4. Afirmar lo que recibió el `subscribe`.
 *
 * verify() detecta peticiones sin capturar. Cada test también debe responder
 * las que capturó y comprobar el resultado recibido.
 */
describe('ProductosApiService', () => {
  let service: ProductosApiService;
  let controller: HttpTestingController;

  beforeEach(() => {
    // Limpieza explícita adicional; Angular también gestiona el entorno entre tests.
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(ProductosApiService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Sin esta línea, una petición colgada pasaría desapercibida.
    // Con ella, cualquier petición sin capturar hace fallar esta comprobación.
    controller.verify();

    // Dejamos el TestBed limpio para el spec que venga después (mismo
    // motivo que el reset del beforeEach: la suite es un estado compartido).
    TestBed.resetTestingModule();
  });

  it('[Paso 2] expectOne + flush: lista exitosa', () => {
    // Datos falsos pero con la forma real del modelo.
    const productosDeMentira: Producto[] = [
      { id: 1, nombre: 'Teclado', categoria: 'perifericos', stock: 10 },
      { id: 2, nombre: 'Monitor', categoria: 'perifericos', stock: 4 },
    ];

    // Lo que el componente recibiría por el subscribe.
    const recibidas: Producto[] = [];
    service.listar().subscribe((productos) => recibidas.push(...productos));

    // expectOne: la petición DEBE existir y ser EXACTAMENTE una a esa URL
    // (si el servicio llamara dos veces, o a otra URL, el test falla acá).
    const req = controller.expectOne('/api/productos');
    expect(req.request.method).toBe('GET');

    // Simulamos la respuesta del servidor (sin red: es un flush local).
    req.flush(productosDeMentira);

    expect(recibidas).toEqual(productosDeMentira);
  });

  it('[Paso 3] un error del servidor se transforma en un mensaje comprensible', () => {
    // El error que le llega al componente.
    const errores: Error[] = [];
    service.obtener(999).subscribe({ error: (err: Error) => errores.push(err) });

    const req = controller.expectOne('/api/productos/999');

    // flush con status de error simula una respuesta del servidor; error() es para la red.
    req.flush(null, { status: 500, statusText: 'Server Error' });

    // REGLA, no implementación: probamos que el catchError MAPEA el fallo
    // a un Error con un mensaje amigable (no vacío), que es el contrato con
    // la UI. ⚠️ Cambiar el TEXTO de los mensajes en el servicio NO rompe este
    // test: acá se prueba el mapeo, no la frase exacta (criterio del temario:
    // "testear la regla de negocio, no la implementación").
    expect(errores.length).toBe(1);
    expect(errores[0]).toBeInstanceOf(Error);
    expect(errores[0].message.length).toBeGreaterThan(0);
  });

  it('[Paso 4] los HttpParams y el header viajan en la petición', () => {
    service.listar({ categoria: 'perifericos' }).subscribe();

    // OJO: `expectOne('/api/productos')` NO matchea cuando la petición lleva
    // query params (compara con la URL completa). Cuando hay params se usa
    // la forma con PREDICADO: matcheamos por URL y capturamos la petición,
    // y las afirmaciones de params/headers van abajo sobre `req.request`.
    const req = controller.expectOne(
      (r) => r.url === '/api/productos' && r.method === 'GET',
      'GET /api/productos (con o sin query params)',
    );

    // request.params: el filtro armado con HttpParams en el servicio.
    expect(req.request.params.get('categoria')).toBe('perifericos');

    // request.headers: la cabecera obligatoria de la práctica.
    expect(req.request.headers.get('X-Canal')).toBe('practica-10');

    // Respondemos para que el verify() del afterEach quede limpio.
    req.flush([]);
  });

  it('[Paso 7] verify() en afterEach caza requests colgados', () => {
    // Test de EXPERIMENTO: disparamos la petición y la dejamos COLGADA
    // (ni flush() ni error()). verify() tiene que explotar indicando que
    // quedó un request pendiente — así se ve por qué el afterEach importa.
    service.listar().subscribe();

    expect(() => controller.verify()).toThrow();

    // "Descargamos" la petición para que el verify() del afterEach (que
    // corre después de este test) ya no la encuentre y el suite quede verde.
    controller.expectOne('/api/productos').flush([]);
  });
});
