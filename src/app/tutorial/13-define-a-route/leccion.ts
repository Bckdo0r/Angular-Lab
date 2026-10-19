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
    <section class="descripcion-ejercicio" aria-labelledby="titulo-descripcion-ejercicio">
      <h2 id="titulo-descripcion-ejercicio">¿Qué practicás acá?</h2>
      <p>Definí rutas hijas para navegar entre las páginas Home y User usando el Angular Router.</p>
    </section>
    <nav>
      <a href="/tutorial/13/home">Home</a>
      |
      <a href="/tutorial/13/user">User</a>
    </nav>
    <router-outlet />
  `,
  imports: [RouterOutlet],
  styles: `
    .descripcion-ejercicio {
      margin: 0 0 1rem;
      padding: 0.7rem 0.9rem;
      border: 1px solid color-mix(in srgb, var(--deco-rosa) 28%, var(--borde));
      border-inline-start: 3px solid
        color-mix(in srgb, var(--deco-rosa) 55%, var(--acento));
      border-radius: 8px;
      background: color-mix(in srgb, var(--deco-rosa) 12%, var(--acento-suave));
    }

    .descripcion-ejercicio h2 {
      margin: 0 0 0.35rem;
      color: var(--acento);
      font-size: 0.98rem;
    }

    .descripcion-ejercicio p {
      margin: 0;
      color: var(--texto-suave);
      font-size: 0.9rem;
      line-height: 1.5;
    }
  `,
})
export class Leccion13 {}
