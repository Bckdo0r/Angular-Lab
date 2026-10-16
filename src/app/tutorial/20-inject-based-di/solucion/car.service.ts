import { Injectable } from '@angular/core';

/**
 * SOLUCIÓN — Lección 20
 *
 * Compará este archivo con ../car.service.ts para ver los cambios.
 */
@Injectable({ providedIn: 'root' })
export class Leccion20SolucionCarService {
  cars = ['Sunflower GT', 'Flexus Sport', 'Sprout Mach One'];

  getCars(): string[] {
    return this.cars;
  }

  getCar(id: number) {
    return this.cars[id];
  }
}
