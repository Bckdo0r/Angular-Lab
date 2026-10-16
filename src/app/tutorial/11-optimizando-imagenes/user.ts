import { Component } from '@angular/core';

/**
 * LECCIÓN 11 — Optimizando imágenes con NgOptimizedImage
 *
 * La directiva `NgOptimizedImage` (de `@angular/common`) optimiza la
 * carga de imágenes: usa `ngSrc` en lugar de `src` y exige los
 * atributos `width` y `height` para evitar saltos de layout.
 *
 * El logo está en public/tut-logo.svg y se sirve en la ruta /tut-logo.svg.
 */
@Component({
  selector: 'leccion-11-user',
  template: `
    <p>Usuario: {{ username }}</p>
    <p>Framework preferido:</p>

    <ul>
      <li>
        Imagen estática:
        <!-- TODO 1: Importá NgOptimizedImage desde '@angular/common' y agregalo al array imports de este componente -->
        <!-- TODO 2: Cambiá el atributo src por ngSrc y agregá width="32" height="32" -->

        <img src='/tut-logo.svg' alt="Logo de Angular" />
      </li>
      <li>
        Imagen dinámica:
        <!-- TODO 3: Cambiá el atributo [src] por [ngSrc] y agregá width="32" height="32" -->

        <img [src]="logoUrl" [alt]="logoAlt" />
      </li>
    </ul>
  `,
  imports: [],
})
export class Leccion11User {
  logoUrl = '/tut-logo.svg';
  logoAlt = 'Logo de Angular';
  username = 'youngTech';
}
