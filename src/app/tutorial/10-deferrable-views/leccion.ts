import {Component} from '@angular/core';
import {Leccion10Comments} from './comments';

/**
 * LECCIÓN 10 — Vistas diferibles (Deferrable Views)
 *
 * Los bloques `@defer`, `@placeholder` y `@loading` permiten cargar
 * partes de la plantilla de forma diferida, por ejemplo cuando el
 * contenido entra en el viewport: `@defer (on viewport) { ... }`.
 *
 * Abrí http://localhost:4200/tutorial/10 para ver el resultado en vivo.
 * La versión resuelta está en http://localhost:4200/tutorial/10/solucion
 */
@Component({
  selector: 'leccion-10',
  template: `
    <div>
      <h1>Lo que pienso de Angular</h1>
      <!-- TODO 6: Agregá los párrafos del post dentro de este <article> (paso 6 del README) -->

      <article></article>

      <!-- TODO 1: Envolver <leccion-10-comments /> con un bloque @defer: @defer { <leccion-10-comments /> } -->
      <!-- TODO 2: Agregar un bloque @placeholder con: <p>Future comments</p> -->
      <!-- TODO 3: Agregar un bloque @loading con: <p>Loading comments...</p> -->
      <!-- TODO 4: Al bloque @loading agregarle una duración mínima: (minimum 2s) -->
      <!-- TODO 5: Al bloque @defer agregarle el disparador de viewport: (on viewport) -->

      <leccion-10-comments />
    </div>
  `,
  imports: [Leccion10Comments],
})
export class Leccion10 {}
