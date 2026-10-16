import { Component } from '@angular/core';
import { Leccion16User } from './user';

/**
 * LECCIÓN 16 — Obtener el valor de un control de formulario
 *
 * Shell de la lección: muestra el componente <leccion-16-user />, que es
 * donde está todo el ejercicio.
 *
 * Abrí http://localhost:4200/tutorial/16 para ver el resultado en vivo.
 * La versión resuelta está en http://localhost:4200/tutorial/16/solucion
 */
@Component({
  selector: 'leccion-16',
  template: ` <leccion-16-user /> `,
  imports: [Leccion16User],
})
export class Leccion16 {}
