import {Component} from '@angular/core';

/**
 * SOLUCIÓN — Lección 2
 *
 * Compará este archivo con ../leccion.ts para ver los cambios.
 */
@Component({
  selector: 'leccion-02-solucion',
  template: ` Hello {{ city }}, {{ 1 + 1 }} `,
})
export class Leccion02Solucion {
  city = 'San Francisco';
}
