import { CanMatchFn } from '@angular/router';

/**
 * ROL SIMULADO — un toggle guardado en localStorage para probar canMatch
 * sin backend ni login. Es el mismo mecanismo que usa el ejercicio y la
 * solución (comparten la clave), así que cambiar el rol en una afecta a ambas.
 */
const CLAVE_ROL = 'practica07-rol';

export type RolSimulado = 'admin' | 'visitante';

export function rolSimulado(): RolSimulado {
  const valor = localStorage.getItem(CLAVE_ROL);
  return valor === 'admin' ? 'admin' : 'visitante';
}

export function fijarRol(rol: RolSimulado): void {
  localStorage.setItem(CLAVE_ROL, rol);
}

/**
 * GUARD canMatch: ¿esta ruta EXISTE para el usuario actual?
 *
 * Diferencia con canActivate (la práctica 04 usaba canActivate):
 * - **canActivate** se evalúa DESPUÉS de cargar el bundle de la ruta: la ruta
 *   existe, se bajó el chunk, y el guard recién ahí decide si dejarte pasar
 *   (o redirigirte al login, como en la 04).
 * - **canMatch** se evalúa ANTES: si devuelve false, Angular remueve la ruta
 *   del árbol de matching. La ruta NO existe para vos: no se baja el chunk y,
 *   si no hay otra ruta que coincida, la navegación cae al comodín '**' → 404.
 *
 * Cuándo usar cada uno: canActivate para "estás logueado pero sin permiso,
 * te mando a un lugar con mensaje" (necesitas explicar el rechazo); canMatch
 * para "para vos esta pantalla no existe" (ocultar features, bundles por rol).
 *
 * Se usa en rutas.ts: canMatch: [soloAdminCanMatch].
 */
export const soloAdminCanMatch: CanMatchFn = (route, segments) => {
  // TODO: [Paso 7] - Implementar el canMatch con el rol simulado:
  //   1. const rol = rolSimulado(); (ya está importado acá arriba)
  //   2. return rol === 'admin';
  //   Probalo: en el panel (/extras/07/panel) cambiá el rol a "visitante"
  //   y navegá a "Admin". La ruta desaparece: caés al 404 y en DevTools →
  //   Network NO aparece ningún chunk de admin-page.js (canMatch ni siquiera
  //   pidió el bundle). Después volvé a "admin" y la ruta reaparece.
  //   Extra: mirá con un breakpoint (o console.log(rol)) que el guard corre
  //   antes de que se dispare la carga lazy del componente.
  return true; // stub: ruta abierta hasta implementar el guard (Paso 7)
};
