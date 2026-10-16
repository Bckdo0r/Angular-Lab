import {Component} from '@angular/core';
import {Leccion11User} from './user';

/**
 * LECCIÓN 11 — Optimizando imágenes
 *
 * Este componente solo envuelve al componente de usuario; el trabajo
 * con imágenes está en user.ts.
 *
 * Abrí http://localhost:4200/tutorial/11 para ver el resultado en vivo.
 * La versión resuelta está en http://localhost:4200/tutorial/11/solucion
 */
@Component({
  selector: 'leccion-11',
  template: ` <leccion-11-user /> `,
  imports: [Leccion11User],
})
export class Leccion11 {}
