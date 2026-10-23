import { Component, inject } from '@angular/core';
import { Leccion19CarService } from './car.service';

/**
 * LECCIÓN 19 — Crear un servicio inyectable
 *
 * Este componente ya inyecta el servicio con `inject()` y lo usa para mostrar
 * la lista de autos. Tu trabajo está en ./car.service.ts: hacer que la clase
 * se provea en el inyector raíz con @Injectable({ providedIn: 'root' }).
 *
 * Abrí http://localhost:4200/tutorial/19 para ver el resultado en vivo.
 * La versión resuelta está en http://localhost:4200/tutorial/19/solucion
 */
@Component({
  selector: 'leccion-19',
  template: `
    @if (carService; as service) {
      <p>{{ service.getCars() }}</p>
    } @else {
      <p role="status">Completá el paso 1 en car.service.ts para registrar el servicio.</p>
    }
  `,
})
export class Leccion19 {
  // La inyección opcional permite abrir el ejercicio antes de registrar el servicio.
  readonly carService = inject(Leccion19CarService, { optional: true });
}
