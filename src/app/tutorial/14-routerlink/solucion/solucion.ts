import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

/**
 * SOLUCIÓN — Lección 14: Navegación con routerLink
 *
 * Compará este archivo con ../leccion.ts para ver los cambios:
 * se importó `RouterLink` y se reemplazaron los atributos `href` por la
 * directiva `routerLink`, de modo que la navegación no recarga la página
 * entera sino que solo cambia el contenido del <router-outlet />.
 *
 * Abrí http://localhost:4200/tutorial/14/solucion para verla en vivo.
 */
@Component({
  selector: 'leccion-14-solucion',
  template: `
    <nav>
      <a routerLink="/tutorial/14/solucion/home">Home</a>
      |
      <a routerLink="/tutorial/14/solucion/user">User</a>
    </nav>
    <router-outlet />
  `,
  imports: [RouterOutlet, RouterLink],
})
export class Leccion14Solucion {}
