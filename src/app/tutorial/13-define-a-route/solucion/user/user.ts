import { Component } from '@angular/core';

/**
 * SOLUCIÓN — Lección 13: Componente "User Page"
 */
@Component({
  selector: 'leccion-13-solucion-user',
  template: ` <div>Username: {{ username }}</div> `,
})
export class Leccion13SolucionUser {
  username = 'youngTech';
}
