import {Component} from '@angular/core';

/**
 * LECCIÓN 4 — Control de Flujo: @if
 *
 * Con @if / @else podés mostrar u ocultar partes de la plantilla
 * según una condición, sin necesidad de directivas.
 *
 * Abrí http://localhost:4200/tutorial/04 para ver el resultado en vivo.
 * La versión resuelta está en http://localhost:4200/tutorial/04/solucion
 */
@Component({
  selector: 'leccion-04',
  template: `
    <!-- TODO 2: Envolver este span en un bloque @if que lo muestre solo si isServerRunning es true -->
    <span>Yes, the server is running</span>
    <!-- TODO 3: Agregar un bloque @else que muestre "No, the server is not running" -->
  `,
})
export class Leccion04 {
  // TODO 1: Agregá acá la propiedad booleana isServerRunning con valor inicial true
}
