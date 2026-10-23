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
 * - canActivate decide si se activa una ruta reconocida, antes de cargar
 *   un componente con loadComponent. Puede bloquear o redirigir.
 * - canMatch participa en el reconocimiento: false descarta esa candidata
 *   para esta navegación y permite probar otras rutas, incluido el comodín.
 *   La configuración no se borra. Ningún guard protege por sí solo una API.
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
