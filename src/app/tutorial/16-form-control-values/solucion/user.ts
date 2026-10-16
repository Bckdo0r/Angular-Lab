import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * SOLUCIÓN — Lección 16: Componente User: leer el valor del control de formulario
 *
 * Compará este archivo con ../user.ts para ver los cambios.
 */
@Component({
  selector: 'leccion-16-solucion-user',
  template: `
    <p>Username: {{ username }}</p>
    <p>Framework: {{ favoriteFramework }}</p>
    <label for="framework">
      Favorite Framework:
      <input id="framework" type="text" [(ngModel)]="favoriteFramework" />
    </label>
    <button (click)="showFramework()">Show Framework</button>
  `,
  imports: [FormsModule],
})
export class Leccion16SolucionUser {
  favoriteFramework = '';
  username = 'youngTech';

  showFramework() {
    alert(this.favoriteFramework);
  }
}
