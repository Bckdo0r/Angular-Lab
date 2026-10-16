import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, switchMap, throwError, timer } from 'rxjs';

/**
 * BACKEND FALSO — Prácticas 03 y 04 (100% offline)
 *
 * Un único `HttpInterceptorFn` que simula un backend real SIN servidores:
 * intercepta las URLs que empiezan con `/api/` y responde con datos en
 * memoria (con ~400ms de latencia simulada, como una red real). Todo lo
 * demás pasa de largo hacia `next(req)`.
 *
 * Se registra globalmente en `app.config.ts`:
 *   provideHttpClient(withInterceptors([authTokenInterceptor, backendFalso]))
 *
 * Tabla de comportamiento (los casos de error SON el material de estudio):
 * | Petición              | Respuesta simulada                                        |
 * |-----------------------|-----------------------------------------------------------|
 * | GET /api/empleados    | 400 sin la cabecera `X-Canal: practica-03`; 200 con       |
 * |                       | lista (filtra por `?area=IT|RRHH|Ventas` si viene)        |
 * | GET /api/empleados/:id| 200 si existe; 404 si no (ej. id 999). Exige `X-Canal`    |
 * | GET /api/reporte      | 500 SIEMPRE (endpoint "caído" para practicar errores)     |
 * | POST /api/login       | 200 `{ token }` si las credenciales son válidas; 401      |
 * | GET /api/panel        | 401 sin token; 403 con rol distinto de 'admin'; 200 OK    |
 */

/** Áreas del dominio de las prácticas (tipado local, no importa código de las prácticas). */
type Area = 'IT' | 'RRHH' | 'Ventas';

interface EmpleadoBackend {
  id: number;
  nombre: string;
  area: Area;
  seniority: string;
}

interface CredencialesBackend {
  usuario: string;
  clave: string;
}

interface PayloadJwt {
  sub: string;
  nombre: string;
  rol: 'admin' | 'user';
  exp: number;
}

/** Semilla de empleados (6, como espera la práctica 03). */
const EMPLEADOS: EmpleadoBackend[] = [
  { id: 1, nombre: 'Ana Pérez', area: 'IT', seniority: 'Senior' },
  { id: 2, nombre: 'Bruno Díaz', area: 'IT', seniority: 'Junior' },
  { id: 3, nombre: 'Carla Gómez', area: 'RRHH', seniority: 'Semi Senior' },
  { id: 4, nombre: 'Diego Ruiz', area: 'Ventas', seniority: 'Senior' },
  { id: 5, nombre: 'Elena Sosa', area: 'RRHH', seniority: 'Junior' },
  { id: 6, nombre: 'Fabio Luna', area: 'IT', seniority: 'Semi Senior' },
];

/** Credenciales válidas de la práctica 04 (admin y una usuaria común). */
const USUARIOS: Record<string, CredencialesBackend & { payload: Omit<PayloadJwt, 'exp'> }> = {
  admin: { usuario: 'admin', clave: 'admin123', payload: { sub: 'admin', nombre: 'Admin General', rol: 'admin' } },
  ana: { usuario: 'ana', clave: 'ana123', payload: { sub: 'ana', nombre: 'Ana Pérez', rol: 'user' } },
};

/**
 * JWT simulado: tres segmentos separados por puntos, como un JWT real,
 * pero sin firmar (la "firma" es un texto). `btoa` no requiere librerías.
 */
function crearJwt(payload: PayloadJwt): string {
  const encoder = (parte: object) => btoa(JSON.stringify(parte));
  return `${encoder({ alg: 'HS256', typ: 'JWT' })}.${encoder(payload)}.firma-simulada-no-validar`;
}

/** Decodifica el segmento medio de un JWT simulado (solo para leer el rol). */
function leerPayloadJwt(token: string): PayloadJwt | null {
  try {
    return JSON.parse(atob(token.split('.')[1])) as PayloadJwt;
  } catch {
    return null;
  }
}

/**
 * Helper privado: respuesta exitosa con status y URL explícitos,
 * para que `HttpResponse.url` refleje la petición original.
 */
function responder<T>(cuerpo: T, status: number, url: string): Observable<HttpEvent<unknown>> {
  return of(new HttpResponse({ status, body: cuerpo, url }));
}

/** Helper privado: error HTTP con status (sin cuerpo, como los errores reales). */
function fallar(status: number, url: string): Observable<never> {
  return throwError(() => new HttpErrorResponse({ status, url }));
}

export const backendFalso: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  // Solo nos metemos con nuestro "backend"; el resto sigue su camino normal.
  if (!req.url.startsWith('/api/')) {
    return next(req);
  }

  // timer(400) + switchMap = latencia simulada de 400ms antes de responder.
  return timer(400).pipe(
    switchMap(() => manejarPeticion(req)),
  );
};

/** Despacho por URL + método: la lógica de cada endpoint simulado. */
function manejarPeticion(req: HttpRequest<unknown>): Observable<HttpEvent<unknown>> {
  const url = req.urlWithParams;

  // ─── GET /api/empleados (y /:id) — Práctica 03 ───────────────────────────
  if (req.method === 'GET' && req.url.startsWith('/api/empleados')) {
    // Sin la cabecera de canal no hay datos: así el alumno descubre HttpHeaders.
    if (req.headers.get('X-Canal') !== 'practica-03') {
      return fallar(400, url);
    }

    // GET /api/empleados/5 → busca por id; 404 si no existe (ej. 999).
    const matchId = req.url.match(/^\/api\/empleados\/(\d+)$/);
    if (matchId) {
      const empleado = EMPLEADOS.find((e) => e.id === Number(matchId[1]));
      return empleado
        ? responder(empleado, 200, url)
        : fallar(404, url);
    }

    // GET /api/empleados?area=IT → filtra vía HttpParams.
    const area = req.params.get('area') as Area | null;
    const lista = area ? EMPLEADOS.filter((e) => e.area === area) : EMPLEADOS;
    return responder(lista, 200, url);
  }

  // ─── GET /api/reporte — endpoint "caído" a propósito (500 siempre) ───────
  if (req.method === 'GET' && req.url === '/api/reporte') {
    return fallar(500, url);
  }

  // ─── POST /api/login — Práctica 04 ──────────────────────────────────────
  if (req.method === 'POST' && req.url === '/api/login') {
    const credenciales = req.body as CredencialesBackend;
    const usuario = USUARIOS[credenciales?.usuario ?? ''];
    const valido = usuario && usuario.clave === credenciales.clave;
    if (!valido) {
      return fallar(401, url);
    }
    const payload: PayloadJwt = { ...usuario.payload, exp: Date.now() + 1000 * 60 * 60 };
    return responder({ token: crearJwt(payload) }, 200, url);
  }

  // ─── GET /api/panel — exige Bearer token + rol admin ────────────────────
  if (req.method === 'GET' && req.url === '/api/panel') {
    const cabecera = req.headers.get('Authorization') ?? '';
    const token = cabecera.startsWith('Bearer ') ? cabecera.slice('Bearer '.length) : '';
    if (!token) {
      return fallar(401, url); // sin token: no autenticado
    }
    const payload = leerPayloadJwt(token);
    if (payload?.rol !== 'admin') {
      return fallar(403, url); // autenticado pero sin permisos
    }
    return responder(
      {
        rolRecibido: payload.rol,
        secretos: ['El café del equipo es lavar la taza propia', 'Los viernes se deploya temprano', 'El WiFi de invitados es "invitados-2024"'],
      },
      200,
      url,
    );
  }

  // Endpoint /api/ inexistente: 404 genérico.
  return fallar(404, url);
}
