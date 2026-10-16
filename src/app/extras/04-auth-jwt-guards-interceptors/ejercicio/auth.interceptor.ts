import { HttpInterceptorFn } from '@angular/common/http';
import { TOKEN_KEY } from './auth.service';

/**
 * INTERCEPTOR DE TOKEN — agrega `Authorization: Bearer <jwt>` a cada petición.
 *
 * Se registra PRIMERO en app.config.ts, así "envuelve" al resto de los
 * interceptores (incluido el backend falso): cuando el backend falso lee la
 * cabecera Authorization, este interceptor ya la agregó.
 *
 * Estado inicial: el stub hace `return next(req)` sin tocar nada, por eso
 * `/api/panel` responde 401 al principio. Con el Paso 7 implementado, toda
 * petición sale con su Bearer token (si hay sesión guardada).
 */
export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  // TODO: [Paso 7] - Inyectar el token en la petición:
  //   1. const token = localStorage.getItem(TOKEN_KEY);
  //   2. si hay token: cloná la petición con la cabecera y seguí con el clon:
  //      const reqConToken = req.clone({
  //        setHeaders: { Authorization: `Bearer ${token}` },
  //      });
  //      return next(reqConToken);
  //   3. si no hay token: return next(req); (las públicas como /api/login pasan igual)
  //
  //   ¿Por qué req.clone()? HttpRequest es inmutable (igual que HttpParams):
  //   clone() devuelve una copia nueva con los cambios, sin mutar la original.
  return next(req);
};
