import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceSolucion, Rol } from './auth.service';

/**
 * SOLUCIÓN — Guards con createUrlTree.
 *
 * Compará con ../ejercicio/auth.guard.ts (stubs `return true`).
 *
 * Devolver un UrlTree (en vez de false) es la forma pro de redirigir desde
 * un guard: Angular cancela la navegación original y navega a ese UrlTree.
 */
export const authGuardSolucion: CanActivateFn = (route, state) => {
  const auth = inject(AuthServiceSolucion);
  const router = inject(Router);

  // [Paso 5] Con sesión, dejá pasar. Sin sesión, al login con returnUrl.
  if (auth.usuarioActual()) {
    return true;
  }
  return router.createUrlTree(['/extras/04/solucion/login'], {
    queryParams: { returnUrl: state.url },
  });
};

export function roleGuardSolucion(rolRequerido: Rol): CanActivateFn {
  return (route, state) => {
    const auth = inject(AuthServiceSolucion);
    const router = inject(Router);

    // [Paso 6] Cascada de tres preguntas: ¿hay sesión? ¿alcanza el rol? ¿pasa?
    const usuario = auth.usuarioActual();
    if (!usuario) {
      return router.createUrlTree(['/extras/04/solucion/login'], {
        queryParams: { returnUrl: state.url },
      });
    }
    if (usuario.rol !== rolRequerido) {
      // Autenticado pero sin permisos: al perfil, con un mensaje ahí.
      return router.createUrlTree(['/extras/04/solucion/perfil']);
    }
    return true;
  };
}
