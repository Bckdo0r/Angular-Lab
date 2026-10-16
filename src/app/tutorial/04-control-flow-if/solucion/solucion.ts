import {Component} from '@angular/core';

/**
 * SOLUCIÓN — Lección 4
 *
 * Compará este archivo con ../leccion.ts para ver los cambios.
 */
@Component({
  selector: 'leccion-04-solucion',
  template: `
    @if (isServerRunning) {
      <span>Yes, the server is running</span>
    } @else {
      <span>No, the server is not running</span>
    }
  `,
})
export class Leccion04Solucion {
  isServerRunning = true;
}
