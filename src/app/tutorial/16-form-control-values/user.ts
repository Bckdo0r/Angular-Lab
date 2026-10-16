import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * LECCIÓN 16 — Componente User: leer el valor del control de formulario
 *
 * Acá está el ejercicio: mostrar el valor del input en el template y
 * accederlo desde la clase.
 *
 * Abrí http://localhost:4200/tutorial/16 para ver el resultado en vivo.
 * La versión resuelta está en http://localhost:4200/tutorial/16/solucion
 */
@Component({
  selector: 'leccion-16-user',
  template: `
    <p>Username: {{ username }}</p>
    <!-- TODO 1: Mostrá el valor del input con interpolación, cambiando esta línea por: <p>Framework: {{ favoriteFramework }}</p> -->
    <p>Framework:</p>
    <label for="framework">
      Favorite Framework:
      <input id="framework" type="text" [(ngModel)]="favoriteFramework" />
    </label>
    <button (click)="showFramework()">Show Framework</button>
  `,
  imports: [FormsModule],
})
export class Leccion16User {
  favoriteFramework = '';
  username = 'youngTech';

  showFramework() {
    // TODO 2: Mostrá el valor del input con alert(this.favoriteFramework)
  }
}
