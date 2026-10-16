import { Component } from '@angular/core';

/**
 * LECCIÓN 13 — Componente "User Page"
 *
 * Es la página que se muestra en la ruta 'user' del shell de la lección 13.
 */
@Component({
  selector: 'leccion-13-user',
  template: ` <div>Username: {{ username }}</div> `,
})
export class Leccion13User {
  username = 'youngTech';
}
