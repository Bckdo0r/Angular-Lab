import {Component} from '@angular/core';
import {Leccion08SolucionUser} from './user';

/**
 * SOLUCIÓN — Lección 8
 *
 * Compará este archivo con ../leccion.ts para ver los cambios.
 */
@Component({
  selector: 'leccion-08-solucion',
  template: ` <leccion-08-solucion-user name="Simran" /> `,
  imports: [Leccion08SolucionUser],
})
export class Leccion08Solucion {}
