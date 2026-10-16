import { Component } from '@angular/core';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';

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
      <!-- TODO 1: Usá el pipe "number" con el parámetro '3.2-2' sobre la expresión de num -->
      <li>Number with "decimal" {{ num }}</li>
      <!-- TODO 2: Usá el pipe "date" con el parámetro 'medium' sobre la expresión de birthday -->
      <li>Date with "date" {{ birthday }}</li>
      <!-- TODO 3: Usá el pipe "currency" sobre la expresión de cost -->
      <li>Currency with "currency" {{ cost }}</li>
    </ul>
  `,
  imports: [DecimalPipe, DatePipe, CurrencyPipe],
})
export class Leccion23 {
  num = 103.1234;
  birthday = new Date(2023, 3, 2);
  cost = 4560.34;
}
