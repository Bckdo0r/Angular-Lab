import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * LECCIÓN 14 — Navegación con routerLink
 *
 * Esta clase hace de "shell" de la lección. En su estado inicial los links
 * usan `href`, lo que recarga la página entera en cada clic. El ejercicio es
 * reemplazarlos por la directiva `routerLink` para que la navegación sea
 * del lado del cliente (sin recargar la app).
 *
 * Abrí http://localhost:4200/tutorial/14 para ver el resultado en vivo.
 * La versión resuelta está en http://localhost:4200/tutorial/14/solucion
 *
 * Nota: en el tutorial original los links apuntan a "/" y "/user". En esta
 * app anfitriona las lecciones viven bajo /tutorial/14.
 */
@Component({
  selector: 'leccion-14',
  template: `
    <nav>
      <!-- TODO 2: Reemplazá los atributos "href" por la directiva "routerLink" -->
      <a href="/tutorial/14/home">Home</a>
      |
      <a href="/tutorial/14/user">User</a>
    </nav>
    <router-outlet />
  `,
  // TODO 1: Importá RouterLink desde '@angular/router' y agregalo al array "imports" del decorator
  imports: [RouterOutlet],
})
export class Leccion14 {}
