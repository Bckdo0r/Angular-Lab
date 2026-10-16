import { Component, inject } from '@angular/core';
import { Leccion20SolucionCarService } from './car.service';

/**
 * SOLUCIÓN — Lección 20
 *
 * Compará este archivo con ../leccion.ts para ver los cambios.
 */
@Component({
  selector: 'leccion-20-solucion',
  template: ` <p>Car Listing: {{ display }}</p> `,
})
export class Leccion20Solucion {
  carService = inject(Leccion20SolucionCarService);

  display = this.carService.getCars().join(' ⭐️ ');
}
