import { Component, inject, signal } from '@angular/core';
import { fijarRol, rolSimulado } from './rol.guard';

/**
 * PANEL ADMIN — pantalla "pesada" que solo debería existir para admin
 * (la protege el canMatch de rutas.ts, Paso 7). Instrumento del experimento:
 * mirá DevTools → Network al navegar acá con cada rol.
 */
@Component({
  selector: 'admin-page',
  imports: [],
  template: `
    <section>
      <h2>Panel admin</h2>
      <p class="bajada">
        Sección administrativa del panel interno. Rol actual: <strong>{{ rolActual() }}</strong
        >.
      </p>

      <div class="rol-caja">
        <p>Rol simulado:</p>
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
      </div>
    </section>
  `,
  styles: `
    .bajada {
      color: var(--texto-suave);
    }
    .rol-caja {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.6rem;
      background: var(--superficie);
      border: 1px solid var(--borde);
      border-radius: 10px;
      box-shadow: var(--sombra-tarjeta);
      padding: 0.9rem 1rem;
      margin: 1rem 0;
    }
    .rol-caja p {
      margin: 0;
      flex-basis: 100%;
      color: var(--texto-suave);
    }
    button {
      border: 1px solid var(--acento);
      background: var(--superficie);
      color: var(--acento);
      border-radius: 8px;
      padding: 0.35rem 0.7rem;
      font: inherit;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.15s ease;
    }
    button:hover:not(:disabled) {
      background: var(--acento);
      color: var(--acento-contraste);
    }
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    button:focus-visible {
      outline: 2px solid var(--acento);
      outline-offset: 2px;
    }
  `,
})
export class AdminPage {
  protected readonly rolActual = signal(rolSimulado());

  protected cambiarRol(rol: 'admin' | 'visitante'): void {
    fijarRol(rol);
    this.rolActual.set(rol);
  }
}
