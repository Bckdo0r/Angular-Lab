import { HttpInterceptorFn } from '@angular/common/http';
import { TOKEN_KEY } from './auth.service';

/**
 * SOLUCIÓN — Interceptor de token: agrega `Authorization: Bearer <jwt>`.
 *
 * Compará con ../ejercicio/auth.interceptor.ts (el stub): la diferencia es
 * leer el token de localStorage y clonar la petición con la cabecera.
 *
 * Se registra en rutas.ts junto con un HttpClient propio de la solución.
 * El interceptor del ejercicio sigue registrado globalmente en app.config.ts.
 */
export const authTokenInterceptorSolucion: HttpInterceptorFn = (req, next) => {
  // [Paso 7] HttpRequest es inmutable: clone() devuelve una copia nueva con
  // la cabecera agregada, sin tocar la petición original.
  const token = localStorage.getItem(TOKEN_KEY);
  if (token && req.url === '/api/panel') {
    const reqConToken = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    return next(reqConToken);
  }

  // Sin sesión: la petición pasa tal cual (públicas como /api/login).
  return next(req);
};
