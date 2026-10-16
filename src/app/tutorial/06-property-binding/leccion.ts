import {Component} from '@angular/core';

/**
 * LECCIÓN 6 — Property Binding
 *
 * Con la sintaxis de corchetes [propiedad] podés asignar dinámicamente
 * el valor de una propiedad de la clase a un atributo del HTML.
 *
 * Abrí http://localhost:4200/tutorial/06 para ver el resultado en vivo.
 * La versión resuelta está en http://localhost:4200/tutorial/06/solucion
 */
@Component({
  selector: 'leccion-06',
  styleUrl: './leccion.css',
  template: `
    <!-- TODO 2: Bindeá el atributo contentEditable del div a la propiedad isEditable usando corchetes: [contentEditable]="isEditable" -->
    <div contentEditable="false"></div>
  `,
})
export class Leccion06 {
  // TODO 1: Agregá acá la propiedad isEditable con valor inicial true
}
