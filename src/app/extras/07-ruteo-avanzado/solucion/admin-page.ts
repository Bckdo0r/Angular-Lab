import { Component, inject, signal } from '@angular/core';
import { fijarRol, rolSimulado } from './rol.guard';

/**
 * SOLUCIÓN — panel admin: la ruta "pesada" protegida con canMatch.
 *
 * Completá el Paso 7 en el ejercicio y compará: con rol "visitante",
 * /extras/07/solucion/panel/admin no existe (canMatch la remueve del árbol,
 * no se baja su chunk y cae al '**' → 404). Con rol "admin", la ruta existe,
 * el chunk se baja lazy y el ítem del menú se marca con routerLinkActive.
 *
 * canActivate (práctica 04) vs canMatch (esta práctica):
 * - canActivate: la ruta existe y su bundle ya se bajó; el guard decide si
 *   entrás o te redirige (con mensaje, returnUrl, etc.).
 * - canMatch: el guard corre antes del matching; si devuelve false la ruta
 *   desaparece. Ideal para ocultar features por rol/permiso/feature flag.
 */
@Component({
  selector: 'admin-page-solucion',
  imports: [],
  template: `
    <section>
      <h2>Panel admin (solución)</h2>
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
export class AdminPageSolucion {
  protected readonly rolActual = signal(rolSimulado());

  protected cambiarRol(rol: 'admin' | 'visitante'): void {
    fijarRol(rol);
    this.rolActual.set(rol);
  }
}
