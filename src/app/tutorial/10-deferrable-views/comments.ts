import {Component} from '@angular/core';

/**
 * LECCIÓN 10 — Componente de comentarios del post
 *
 * Este es el componente "pesado" que se carga de forma diferida
 * con el bloque `@defer` de la plantilla principal.
 */
@Component({
  selector: 'leccion-10-comments',
  template: `
    <ul>
      <li>Building for the web is fantastic!</li>
      <li>The new template syntax is great</li>
      <li>I agree with the other comments!</li>
    </ul>
  `,
})
export class Leccion10Comments {}
