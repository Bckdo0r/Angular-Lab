import { Component, inject } from '@angular/core';
import { Leccion19CarService } from './car.service';

/**
 * LECCIÓN 19 — Crear un servicio inyectable
 *
 * Este componente ya inyecta el servicio con `inject()` y lo usa para mostrar
 * la lista de autos. Tu trabajo está en ./car.service.ts: hacer que la clase
 * sea inyectable con el decorador @Service().
 *
 * Abrí http://localhost:4200/tutorial/19 para ver el resultado en vivo.
 * La versión resuelta está en http://localhost:4200/tutorial/19/solucion
 */
@Component({
  selector: 'leccion-19',
  template: '<p> {{ carService.getCars() }} </p>',
})
export class Leccion19 {
  carService = inject(Leccion19CarService);
}
