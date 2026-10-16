import { Component } from '@angular/core';

/**
 * SOLUCIÓN — Lección 12: Componente "User Page"
 */
@Component({
  selector: 'leccion-12-solucion-user',
  template: ` <div>Username: {{ username }}</div> `,
})
export class Leccion12SolucionUser {
  username = 'youngTech';
}
