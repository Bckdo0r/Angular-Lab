import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, Rol } from './auth.service';

/**
 * GUARD de autenticación: ¿hay sesión abierta?
 *
 * Un CanActivateFn devuelve:
 * - `true` → la ruta se muestra;
 * - `false` → se bloquea;
 * - un `UrlTree` → Angular redirige a esa URL (la forma pro de redirigir).
 *
 * Se usa en las rutas hijas de la práctica (ver ../rutas.ts): canActivate: [authGuard].
 */
export const authGuard: CanActivateFn = (route, state) => {
  // TODO: [Paso 5] - Si hay sesión, dejá pasar: return true;
  //   Si no, redirigí al login conservando adónde iba el usuario:
  //   const auth = inject(AuthService);
  //   const router = inject(Router);
  //   if (auth.usuarioActual()) {
  //     return true;
  //   }
  //   return router.createUrlTree(['/extras/04/login'], {
  //     queryParams: { returnUrl: state.url },
  //   });
  //   `state.url` es la ruta que se quiso visitar: el login la usa (Paso 8)
  //   para volver ahí después de loguear. Este patrón se llama "returnUrl".
  return true; // stub: rutas abiertas hasta implementar el guard
};

/**
 * Fábrica de GUARD de autorización: ¿la sesión tiene el rol correcto?
 *
 * Es una FUNCIÓN que devuelve un CanActivateFn: así el mismo guard sirve
 * para 'admin', 'user' o el rol que haga falta (patrón igual al validador
 * parametrizable de la práctica 02).
 *
 * Se usa en cascada: canActivate: [authGuard, roleGuard('admin')] — primero
 * se pregunta si hay sesión, después si el rol alcanza.
 */
export function roleGuard(rolRequerido: Rol): CanActivateFn {
  return (route, state) => {
    // TODO: [Paso 6] - Tres caminos:
    //   1. sin sesión → redirigir al login (igual que authGuard, con returnUrl).
    //   2. con sesión pero rol distinto de `rolRequerido` → redirigir al perfil:
    //      return router.createUrlTree(['/extras/04/perfil']);
    //   3. rol correcto → return true.
    return true; // stub: rutas abiertas hasta implementar el guard
  };
}
