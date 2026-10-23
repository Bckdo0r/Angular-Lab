import { Injectable } from '@angular/core';

/**
 * LECCIÓN 19 — Crear un servicio inyectable
 *
 * La inyección de dependencias (DI) es una de las características más
 * potentes de Angular: le permite al framework *proveer* en tiempo de
 * ejecución los recursos que tu aplicación necesita (como un servicio).
 *
 * Usamos @Injectable({ providedIn: 'root' }), que también está disponible
 * en Angular 22. El objetivo es registrar el servicio en el inyector raíz.
 *
 * Abrí http://localhost:4200/tutorial/19 para ver el resultado en vivo.
 * La versión resuelta está en http://localhost:4200/tutorial/19/solucion
 */
// TODO: [Paso 1] - Agregá el decorador @Injectable({ providedIn: 'root' }) a la clase
// Leccion19CarService para marcarla como servicio inyectable por el sistema
// de DI. La página muestra una indicación hasta que completes este paso.
export class Leccion19CarService {
  cars = ['Sunflower GT', 'Flexus Sport', 'Sprout Mach One'];

  getCars(): string[] {
    return this.cars;
  }

  getCar(id: number) {
    return this.cars[id];
  }
}
