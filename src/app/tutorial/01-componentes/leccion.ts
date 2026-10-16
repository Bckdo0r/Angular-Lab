import { Component } from '@angular/core';

/**
 * LECCIÓN 1 — Anatomía de un Componente
 *
 * Un componente tiene 3 partes:
 *   1. La clase TypeScript (esta clase)
 *   2. La plantilla HTML (propiedad `template`)
 *   3. Los estilos CSS (propiedad `styles`)
 *
 * Abrí http://localhost:4200/tutorial/01 para ver el resultado en vivo.
 * La versión resuelta está en http://localhost:4200/tutorial/01/solucion
 */
@Component({
  selector: 'leccion-01',
  template: `
    <!-- TODO 1: Cambiá el texto "Hello" por "Hello Universe" -->
    <p>Hello</p>
  `,
  styles: `
    :host {
      /* TODO 2: Cambiá el color de "cornflowerblue" a la variable de acento del tema: var(--acento) */
      color: cornflowerblue;
    }
  `,
})
export class Leccion01 {}
