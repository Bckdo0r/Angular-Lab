import { Component } from '@angular/core';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';

/**
 * SOLUCIÓN — Lección 23
 *
 * Compará este archivo con ../leccion.ts para ver los cambios: cada valor
 * de la lista se pasa por su pipe correspondiente con los parámetros pedidos.
 */
@Component({
  selector: 'leccion-23-solucion',
  template: `
    <h2>Formatear datos con pipes</h2>
    <ul>
      <li>Number with "decimal" {{ num | number: '3.2-2' }}</li>
      <li>Date with "date" {{ birthday | date: 'medium' }}</li>
      <li>Currency with "currency" {{ cost | currency }}</li>
    </ul>
  `,
  imports: [DecimalPipe, DatePipe, CurrencyPipe],
})
export class Leccion23Solucion {
  num = 103.1234;
  birthday = new Date(2023, 3, 2);
  cost = 4560.34;
}
