import { Component } from '@angular/core';

/**
 * LECCIÓN 12 — Activar el routing
 *
 * Esta clase hace de "shell" de la lección: tiene una barra de navegación y
 * es el lugar donde el router va a mostrar el contenido de cada página.
 *
 * Abrí http://localhost:4200/tutorial/12 para ver el resultado en vivo.
 * La versión resuelta está en http://localhost:4200/tutorial/12/solucion
 *
 * Nota: en el tutorial original los links apuntan a "/" y "/user". En esta
 * app anfitriona las lecciones viven bajo /tutorial/12, así que los links
 * apuntan a /tutorial/12/home y /tutorial/12/user.
 */
@Component({
  selector: 'leccion-12',
  template: `
    <nav>
      <a href="/tutorial/12/home">Home</a>
      |
      <a href="/tutorial/12/user">User</a>
    </nav>
    <!-- TODO: [Paso 3] - Importá RouterOutlet desde '@angular/router', agregalo a imports del componente e insertá <router-outlet /> debajo del nav. -->
  `,
  imports: [],
})
export class Leccion12 {}
