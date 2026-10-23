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
 * Angular prueba las siguientes candidatas (acá, el '**' → 404), sin borrar
 * la configuración. canActivate decide la activación de la ruta reconocida;
 * tampoco obliga a descargar antes un componente definido con loadComponent.
 */
export const soloAdminCanMatchSolucion: CanMatchFn = (_route, _segments) => {
  // La ruta de admin solo "existe" para quienes el rol simulado dice admin.
  // Los parámetros los recibe la firma de CanMatchFn, pero acá no hacen
  // falta: se marcan con `_` para dejar claro que no se usan.
  return rolSimulado() === 'admin';
};
