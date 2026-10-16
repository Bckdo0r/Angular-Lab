import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * PÁGINA 404 — la ruta comodín '**' (Paso 5). Por qué va última: en el
 * README y en rutas.ts.
 */
@Component({
  selector: 'no-encontrado-page',
  imports: [RouterLink],
  template: `
    <main class="contenedor">
      <p class="codigo" aria-hidden="true">404</p>
      <h1>Página no encontrada</h1>
      <p class="bajada">La dirección que pediste no existe en esta aplicación.</p>
      <a routerLink="/extras/07" class="volver">← Volver al listado</a>
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
    .bajada a {
      color: var(--acento);
      font-weight: 600;
    }
    .bajada a:focus-visible {
      outline: 2px solid var(--acento);
      outline-offset: 2px;
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
export class NoEncontradoPage {}
