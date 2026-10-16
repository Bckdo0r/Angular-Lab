import { Component, inject } from '@angular/core';
import { Leccion19SolucionCarService } from './car.service';

/**
 * SOLUCIÓN — Lección 19
 *
 * Compará este archivo con ../leccion.ts para ver los cambios.
 */
@Component({
  selector: 'leccion-19-solucion',
  template: '<p> {{ carService.getCars() }} </p>',
})
export class Leccion19Solucion {
  carService = inject(Leccion19SolucionCarService);
}
