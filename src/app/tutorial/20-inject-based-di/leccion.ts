import { Component, inject } from '@angular/core';
import { Leccion20CarService } from './car.service';

/**
 * LECCIÓN 20 — Inyección de dependencias con inject()
 *
 * Crear un servicio inyectable es la primera parte del sistema de DI de
 * Angular. ¿Cómo lo inyectás en un componente? Angular tiene la función
 * `inject()`, que se puede usar en el contexto adecuado.
 *
 * Es muy común inicializar propiedades de la clase con valores que provee el
 * sistema de DI:
 *
 *   carService = inject(Leccion20CarService);
 *
 * Abrí http://localhost:4200/tutorial/20 para ver el resultado en vivo.
 * La versión resuelta está en http://localhost:4200/tutorial/20/solucion
 */
@Component({
  selector: 'leccion-20',
  // TODO 3: Actualizá la plantilla para mostrar la lista de autos:
  // <p>Car Listing: {{ display }}</p>
  template: ``,
})
export class Leccion20 {
  // TODO 1: Inyectá el Leccion20CarService con la función inject() y
  // asignalo a una propiedad llamada `carService`
  display = '';

  // TODO 2: Inicializá la propiedad `display` con:
  // this.carService.getCars().join(' ⭐️ ')
}
