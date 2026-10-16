import { Component } from '@angular/core';

/**
 * SOLUCIÓN — Lección 14: Componente "User Page"
 */
@Component({
  selector: 'leccion-14-solucion-user',
  template: ` <div>Username: {{ username }}</div> `,
})
export class Leccion14SolucionUser {
  username = 'youngTech';
}
