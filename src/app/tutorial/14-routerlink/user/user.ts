import { Component } from '@angular/core';

/**
 * LECCIÓN 14 — Componente "User Page"
 */
@Component({
  selector: 'leccion-14-user',
  template: ` <div>Username: {{ username }}</div> `,
})
export class Leccion14User {
  username = 'youngTech';
}
