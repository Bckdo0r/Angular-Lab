import { Component } from '@angular/core';

/**
 * LECCIÓN 15 — Componente User con un formulario template-driven
 *
 * Acá está el ejercicio: crear un input de texto y conectarlo con la
 * propiedad `favoriteFramework` de la clase usando `ngModel`.
 *
 * Abrí http://localhost:4200/tutorial/15 para ver el resultado en vivo.
 * La versión resuelta está en http://localhost:4200/tutorial/15/solucion
 */
@Component({
  selector: 'leccion-15-user',
  template: `
    <p>Username: {{ username }}</p>
    <p>{{ username }}'s favorite framework: {{ favoriteFramework }}</p>
    <!-- TODO 1: Dentro del label, agregá un input de texto con id="framework" y type="text" -->
    <label for="framework">Favorite Framework:</label>
  `,
  // TODO 2: Importá FormsModule desde '@angular/forms' y agregalo a este array `imports`
  imports: [],
})
export class Leccion15User {
  username = 'youngTech';
  favoriteFramework = '';
}
