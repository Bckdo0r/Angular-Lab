import {Component} from '@angular/core';
import {Leccion08User} from './user';

/**
 * LECCIÓN 8 — Propiedades input de componentes
 *
 * Los valores de un `input` se establecen en las plantillas con la
 * sintaxis de atributo: `<leccion-08-user name="Simran" />`
 *
 * Abrí http://localhost:4200/tutorial/08 para ver el resultado en vivo.
 * La versión resuelta está en http://localhost:4200/tutorial/08/solucion
 */
@Component({
  selector: 'leccion-08',
  template: `
    <!-- TODO 2: Pasá la propiedad name con el valor "Simran": <leccion-08-user name="Simran" /> -->

    <leccion-08-user />
  `,
  imports: [Leccion08User],
})
export class Leccion08 {}
