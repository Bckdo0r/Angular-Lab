import { Component } from '@angular/core';
import { Leccion15User } from './user';

/**
 * LECCIÓN 15 — Formularios (template-driven)
 *
 * Shell de la lección: muestra el componente <leccion-15-user />, que es
 * donde está todo el ejercicio.
 *
 * Abrí http://localhost:4200/tutorial/15 para ver el resultado en vivo.
 * La versión resuelta está en http://localhost:4200/tutorial/15/solucion
 */
@Component({
  selector: 'leccion-15',
  template: ` <leccion-15-user /> `,
  imports: [Leccion15User],
})
export class Leccion15 {}
