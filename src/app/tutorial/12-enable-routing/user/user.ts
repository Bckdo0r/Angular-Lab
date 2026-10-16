import { Component } from '@angular/core';

/**
 * LECCIÓN 12 — Componente "User Page"
 *
 * Es la otra página que va a mostrar el router en esta lección.
 */
@Component({
  selector: 'leccion-12-user',
  template: ` <div>Username: {{ username }}</div> `,
})
export class Leccion12User {
  username = 'youngTech';
}
