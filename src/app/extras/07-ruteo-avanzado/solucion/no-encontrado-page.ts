import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * PÁGINA 404 (versión espejo de la solución).
 *
 * Nota de diseño: en rutas.ts solo hay UN comodín '**' por aplicación
 * (Angular usa la primera coincidencia; un segundo '**' sería inalcanzable),
 * y ese comodín apunta a la página 404 del ejercicio. Esta versión existe
 * como espejo didáctico del ejercicio, pero no está ruteada.
 */
@Component({
  selector: 'no-encontrado-page-solucion',
  imports: [RouterLink],
  template: `
    <main class="contenedor">
      <p class="codigo" aria-hidden="true">404</p>
      <h1>Página no encontrada (solución)</h1>
      <p class="bajada">
        La ruta comodín <code>**</code> tiene que ser la <strong>última</strong> del array:
        Angular usa la primera coincidencia, así que si estuviera primera atraparía
        todas las URLs de la aplicación (el paso 5 del README te hace razonar esto).
      </p>
      <a routerLink="/extras/07/solucion" class="volver">← Volver al listado</a>
    </main>
  `,
  styles: `
    .contenedor {
      max-width: 640px;
      margin: 0 auto;
      padding: 3rem 1rem;
      text-align: center;
    }
    .codigo {
      margin: 0;
      font-size: 4rem;
      font-weight: 700;
      color: var(--acento);
      letter-spacing: 0.08em;
    }
    h1 {
      margin: 0.25rem 0 1rem;
    }
    .bajada {
      color: var(--texto-suave);
    }
    .volver {
      display: inline-block;
      margin-top: 1.25rem;
      border: 1px solid var(--acento);
      background: var(--acento-suave);
      color: var(--acento);
      border-radius: 8px;
      padding: 0.45rem 0.9rem;
      font-weight: 600;
      text-decoration: none;
      transition: background-color 0.15s ease;
    }
    .volver:hover {
      background: var(--acento);
      color: var(--acento-contraste);
    }
    .volver:focus-visible {
      outline: 2px solid var(--acento);
      outline-offset: 2px;
    }
  `,
})
export class NoEncontradoPageSolucion {}
