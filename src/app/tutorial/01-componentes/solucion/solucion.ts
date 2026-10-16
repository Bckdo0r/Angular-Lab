import { Component } from '@angular/core';

/**
 * SOLUCIÓN — Lección 1
 *
 * Compará este archivo con ../leccion.ts para ver los cambios.
 */
@Component({
  selector: 'leccion-01-solucion',
  template: `
    <p>Hello Universe</p>
  `,
  styles: `
    :host {
      color: var(--acento);
    }
  `,
})
export class Leccion01Solucion {}
