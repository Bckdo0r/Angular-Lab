import {Component} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

/**
 * SOLUCIÓN — Lección 11
 *
 * Compará este archivo con ../user.ts para ver los cambios.
 */
@Component({
  selector: 'leccion-11-solucion-user',
  template: `
    <p>Usuario: {{ username }}</p>
    <p>Framework preferido:</p>
    <ul>
      <li>
        Imagen estática:
        <img ngSrc="/tut-logo.svg" alt="Logo de Angular" width="32" height="32" />
      </li>
      <li>
        Imagen dinámica:
        <img [ngSrc]="logoUrl" [alt]="logoAlt" width="32" height="32" />
      </li>
    </ul>
  `,
  imports: [NgOptimizedImage],
})
export class Leccion11SolucionUser {
  logoUrl = '/tut-logo.svg';
  logoAlt = 'Logo de Angular';
  username = 'youngTech';
}
