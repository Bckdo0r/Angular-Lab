import { Injectable } from '@angular/core';

/**
 * LECCIÓN 19 — Crear un servicio inyectable
 *
 * La inyección de dependencias (DI) es una de las características más
 * potentes de Angular: le permite al framework *proveer* en tiempo de
 * ejecución los recursos que tu aplicación necesita (como un servicio).
 *
 * NOTA: el tutorial oficial usa el decorador `@Service()`, que es muy nuevo.
 * En esta versión de Angular el equivalente es `@Injectable()` (mismo rol).
 *
 * Abrí http://localhost:4200/tutorial/19 para ver el resultado en vivo.
 * La versión resuelta está en http://localhost:4200/tutorial/19/solucion
 */
// TODO 1: Agregá el decorador @Injectable({ providedIn: 'root' }) a la clase
// Leccion19CarService para marcarla como servicio inyectable por el sistema
// de DI. (El tutorial oficial usa @Service(), que se auto-provee; aquí el
// equivalente es providedIn: 'root'.)
export class Leccion19CarService {
  cars = ['Sunflower GT', 'Flexus Sport', 'Sprout Mach One'];

  getCars(): string[] {
    return this.cars;
  }

  getCar(id: number) {
    return this.cars[id];
  }
}
