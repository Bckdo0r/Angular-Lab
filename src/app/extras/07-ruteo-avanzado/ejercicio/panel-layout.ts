import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { fijarRol, rolSimulado } from './rol.guard';

/**
 * SUB-LAYOUT del panel (Paso 8, rutas hijas): lo que hay acá se ve SIEMPRE y
 * cada hija (equipo, admin) se pinta en el <router-outlet />. El rol simulado
 * (toggle de localStorage) vive acá para poder cambiarlo desde la UI.
 */
@Component({
  selector: 'panel-layout',
  imports: [RouterLink, RouterOutlet],
  template: `
    <main class="contenedor">
      <h1>Panel interno</h1>

      <p class="rol-linea">
        Rol simulado: <strong>{{ rolActual() }}</strong>
        <button type="button" [disabled]="rolActual() === 'admin'" (click)="cambiarRol('admin')">
          Ser admin
        </button>
        <button
          type="button"
          [disabled]="rolActual() === 'visitante'"
          (click)="cambiarRol('visitante')"
        >
          Ser visitante
        </button>
      </p>
      <p class="bajada">El rol simulado se guarda en este navegador (localStorage).</p>

      <nav aria-label="Secciones del panel">
        <!-- TODO: [Paso 6] - Menú semántico con estado activo:
             1. Agregá a cada <a> la directiva routerLinkActive="activo".
             2. Y el refinamiento [routerLinkActiveOptions]="{ exact: true }"
                para que /extras/07/panel a secas no marque ningún ítem.
             3. Navegá entre Equipo y Admin y mirá cómo el ítem de la ruta
                actual queda resaltado (la clase .activo ya está estilada acá
                abajo; routerLinkActive la agrega y la saca sola).
             routerLinkActive es la forma accesible de marcar el ítem actual:
             la clase sigue a la URL, no a clicks ni estados a mano. -->
        <a routerLink="equipo">Equipo</a>
        <a routerLink="admin">Admin</a>
      </nav>

      <router-outlet />
    </main>
  `,
  styles: `
    .contenedor {
      max-width: 640px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }
    .rol-linea {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
      background: var(--acento-suave);
      border: 1px solid color-mix(in srgb, var(--acento) 18%, transparent);
      border-radius: 10px;
      padding: 0.6rem 1rem;
    }
    .rol-linea button {
      border: 1px solid var(--acento);
      background: var(--superficie);
      color: var(--acento);
      border-radius: 8px;
      padding: 0.25rem 0.6rem;
      font: inherit;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.15s ease;
    }
    .rol-linea button:hover:not(:disabled) {
      background: var(--acento);
      color: var(--acento-contraste);
    }
    .rol-linea button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .rol-linea button:focus-visible {
      outline: 2px solid var(--acento);
      outline-offset: 2px;
    }
    .bajada {
      color: var(--texto-suave);
      font-size: 0.9rem;
    }
    nav {
      display: flex;
      gap: 1rem;
      margin: 1rem 0;
    }
    nav a {
      color: var(--texto-suave);
      text-decoration: none;
      font-weight: 600;
      padding: 0.3rem 0.6rem;
      border-radius: 8px;
    }
    nav a:hover {
      color: var(--acento);
    }
    nav a:focus-visible {
      outline: 2px solid var(--acento);
      outline-offset: 2px;
    }
    /* routerLinkActive="activo" agrega/saca esta clase sola (Paso 6). */
    nav a.activo {
      color: var(--acento);
      background: var(--acento-suave);
    }
  `,
})
export class PanelLayout {
  protected readonly rolActual = signal(rolSimulado());

  protected cambiarRol(rol: 'admin' | 'visitante'): void {
    fijarRol(rol);
    this.rolActual.set(rol);
  }
}
