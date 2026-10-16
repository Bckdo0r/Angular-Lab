import {Component, input} from '@angular/core';

/**
 * SOLUCIÓN — Lección 8
 *
 * Compará este archivo con ../user.ts para ver los cambios.
 */
@Component({
  selector: 'leccion-08-solucion-user',
  template: ` <p>El nombre del usuario es {{ name() }}</p> `,
})
export class Leccion08SolucionUser {
  readonly name = input<string>();
}
