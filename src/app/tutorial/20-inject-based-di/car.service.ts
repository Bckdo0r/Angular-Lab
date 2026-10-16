import { Injectable } from '@angular/core';

/**
 * LECCIÓN 20 — Servicio de autos
 *
 * Este servicio ya está decorado con @Injectable() (lo hiciste inyectable en
 * la lección 19). En esta lección lo vas a inyectar en el componente con
 * inject().
 */
@Injectable({ providedIn: 'root' })
export class Leccion20CarService {
  cars = ['Sunflower GT', 'Flexus Sport', 'Sprout Mach One'];

  getCars(): string[] {
    return this.cars;
  }

  getCar(id: number) {
    return this.cars[id];
  }
}
