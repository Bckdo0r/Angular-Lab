import { CanMatchFn } from '@angular/router';

/**
 * ROL SIMULADO — misma clave de localStorage que el ejercicio: cambiar el
 * rol en una práctica afecta a la otra (es el mismo "usuario" simulado).
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
 * SOLUCIÓN del guard canMatch (Paso 7).
 *
 * canMatch se evalúa ANTES de cargar el bundle de la ruta: si devuelve false
 * la ruta se remueve del árbol de matching, no se baja ningún chunk y la
 * navegación sigue con las rutas restantes (acá, el '**' → 404). Eso la
 * distingue de canActivate, que se evalúa con la ruta ya cargada y decide
 * solo si se "entra" o se redirige.
 */
export const soloAdminCanMatchSolucion: CanMatchFn = (route, segments) => {
  // La ruta de admin solo "existe" para quienes el rol simulado dice admin.
  return rolSimulado() === 'admin';
};
