import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * LECCIÓN 13 — Definir una ruta
 *
 * Esta clase hace de "shell" de la lección: tiene una barra de navegación y
 * el <router-outlet /> donde el router muestra las páginas Home y User.
 *
 * ⚠️ El ejercicio de esta lección NO está acá: está en `src/app/app.routes.ts`.
 * Tenés que agregar las rutas hijas de /tutorial/13 (Home y User) al array
 * `children` de esa ruta. Mirá el README de la lección para el snippet exacto.
 *
 * Hasta que agregues esas rutas, http://localhost:4200/tutorial/13/home y
 * http://localhost:4200/tutorial/13/user no van a funcionar.
 *
 * La versión resuelta está en http://localhost:4200/tutorial/13/solucion
 *
 * Nota: en el tutorial original los links apuntan a "/" y "/user". En esta
 * app anfitriona las lecciones viven bajo /tutorial/13.
 */
@Component({
  selector: 'leccion-13',
  template: `
    <nav>
      <a href="/tutorial/13/home">Home</a>
      |
      <a href="/tutorial/13/user">User</a>
    </nav>
    <router-outlet />
  `,
  imports: [RouterOutlet],
})
export class Leccion13 {}
