import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { fijarRol, rolSimulado } from './rol.guard';

/**
 * SOLUCIÓN — sub-layout del panel (Paso 8) con menú que marca el ítem
 * activo (Paso 6).
 *
 * Paso 6 — routerLinkActive: la directiva agrega la clase 'activo' al link
 * cuya URL coincide con la actual, y la saca sola al navegar. Con
 * routerLinkActiveOptions exact: true, /extras/07/solucion/panel a secas no
 * marca ningún ítem (si tuviera hijos, false marcaría al padre también).
 * Es la forma accesible de marcar "dónde estás": la clase sigue a la URL,
 * no a clicks manuales ni estados duplicados.
 */
@Component({
  selector: 'panel-layout-solucion',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <main class="contenedor">
      <h1>Panel interno (solución)</h1>

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
      <p class="bajada">
        El rol simulado se guarda en este navegador (localStorage), con la misma clave que el
        ejercicio.
      </p>

      <nav aria-label="Secciones del panel">
        <a
          routerLink="equipo"
          routerLinkActive="activo"
          [routerLinkActiveOptions]="{ exact: true }"
        >
          Equipo
        </a>
        <a routerLink="admin" routerLinkActive="activo" [routerLinkActiveOptions]="{ exact: true }">
          Admin
        </a>
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
    /* La clase 'activo' la agrega y saca routerLinkActive (Paso 6). */
    nav a.activo {
      color: var(--acento);
      background: var(--acento-suave);
    }
  `,
})
export class PanelLayoutSolucion {
  protected readonly rolActual = signal(rolSimulado());

  protected cambiarRol(rol: 'admin' | 'visitante'): void {
    fijarRol(rol);
    this.rolActual.set(rol);
  }
}
