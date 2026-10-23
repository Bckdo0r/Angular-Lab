import { Component } from '@angular/core';

/**
 * LECCIÓN 23 — Formatear datos con pipes
 *
 * Podés llevar el uso de pipes más allá configurándolos: los pipes aceptan
 * parámetros usando la sintaxis `:` seguida del valor del parámetro.
 * Ejemplo: `{{ date | date: 'medium' }}` produce `Jun 15, 2015, 9:43:11 PM`.
 *
 * Abrí http://localhost:4200/tutorial/23 para ver el resultado en vivo.
 * La versión resuelta está en http://localhost:4200/tutorial/23/solucion
 */
@Component({
  selector: 'leccion-23',
  template: `
    <h2>Formatear datos con pipes</h2>
    <ul>
      <!-- TODO: [Paso 1] - Importá DecimalPipe desde '@angular/common', agregalo a imports y usá number: '3.2-2' sobre num. -->
      <li>Number with "decimal" {{ num }}</li>
      <!-- TODO: [Paso 2] - Importá DatePipe, agregalo a imports y usá date: 'medium' sobre birthday. -->
      <li>Date with "date" {{ birthday }}</li>
      <!-- TODO: [Paso 3] - Importá CurrencyPipe, agregalo a imports y usá currency sobre cost. -->
      <li>Currency with "currency" {{ cost }}</li>
    </ul>
  `,
  imports: [],
})
export class Leccion23 {
  num = 103.1234;
  birthday = new Date(2023, 3, 2);
  cost = 4560.34;
}
