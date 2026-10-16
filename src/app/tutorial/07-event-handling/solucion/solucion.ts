import {Component} from '@angular/core';

/**
 * SOLUCIÓN — Lección 7
 *
 * Compará este archivo con ../leccion.ts para ver los cambios.
 */
@Component({
  selector: 'leccion-07-solucion',
  template: `
    <section (mouseover)="showSecretMessage()">
      Hay un mensaje secreto para vos, pasá el mouse para revelarlo:
      {{ message }}
    </section>
  `,
})
export class Leccion07Solucion {
  message = '';

  showSecretMessage() {
    this.message = 'Way to go 🚀';
  }
}
