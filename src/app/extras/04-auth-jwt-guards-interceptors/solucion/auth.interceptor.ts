import { HttpInterceptorFn } from '@angular/common/http';
import { TOKEN_KEY } from './auth.service';

/**
 * SOLUCIÓN — Interceptor de token: agrega `Authorization: Bearer <jwt>`.
 *
 * Compará con ../ejercicio/auth.interceptor.ts (el stub): la diferencia es
 * leer el token de localStorage y clonar la petición con la cabecera.
 *
 * Nota: el interceptor registrado globalmente en app.config.ts es el del
 * EJERCICIO. Este de acá es la versión de referencia: una vez implementado
 * el del ejercicio, tanto /extras/04 como /extras/04/solucion funcionan.
 */
export const authTokenInterceptorSolucion: HttpInterceptorFn = (req, next) => {
  // [Paso 7] HttpRequest es inmutable: clone() devuelve una copia nueva con
  // la cabecera agregada, sin tocar la petición original.
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    const reqConToken = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    return next(reqConToken);
  }

  // Sin sesión: la petición pasa tal cual (públicas como /api/login).
  return next(req);
};
