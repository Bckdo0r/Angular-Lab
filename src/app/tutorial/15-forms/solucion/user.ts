import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * SOLUCIÓN — Lección 15: Componente User con un formulario template-driven
 *
 * Compará este archivo con ../user.ts para ver los cambios.
 */
@Component({
  selector: 'leccion-15-solucion-user',
  template: `
    <p>Username: {{ username }}</p>
    <p>{{ username }}'s favorite framework: {{ favoriteFramework }}</p>
    <label for="framework">
      Favorite Framework:
      <input id="framework" type="text" [(ngModel)]="favoriteFramework" />
    </label>
  `,
  imports: [FormsModule],
})
export class Leccion15SolucionUser {
  favoriteFramework = '';
  username = 'youngTech';
}
