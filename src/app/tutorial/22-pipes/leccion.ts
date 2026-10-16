import { Component } from '@angular/core';

/**
 * LECCIÓN 22 — Pipes
 *
 * Los pipes son funciones que transforman datos directamente en las plantillas.
 * En general son funciones "puras" que no causan efectos secundarios. Angular
 * incluye varios pipes útiles que podés importar y usar en tus componentes.
 *
 * Abrí http://localhost:4200/tutorial/22 para ver el resultado en vivo.
 * La versión resuelta está en http://localhost:4200/tutorial/22/solucion
 */
@Component({
  selector: 'leccion-22',
  template: `
    <h2>Pipes</h2>
    <p>Usuario: {{ username }}</p>
  `,
  imports: [],
})
export class Leccion22 {
  username = 'yOunGTECh';
}
