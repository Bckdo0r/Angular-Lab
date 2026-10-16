import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
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
  imports: [RouterLink],
  template: `
    <section>
      <h2>Panel admin (solución)</h2>
      <p class="bajada">
        Ruta hija protegida con <code>canMatch: [soloAdminCanMatchSolucion]</code> en
        <code>../rutas.ts</code>. Rol actual: <strong>{{ rolActual() }}</strong>.
      </p>

      <div class="rol-caja">
        <p>Cambiá el rol y probá de nuevo la navegación a "Admin":</p>
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

      <div class="explicacion">
        <h3>Qué acabas de ver</h3>
        <p>
          Con rol "visitante": al tocar "Admin" la navegación cae al 404 y en
          DevTools → Network <strong>no baja ningún chunk</strong> de esta página —
          canMatch ni siquiera pidió el bundle.
        </p>
        <p>
          Con rol "admin": la ruta existe, el chunk baja bajo demanda (lazy) y este
          panel se muestra. El guard corrió antes del matching: podés verlo con un
          breakpoint en <code>solucion/rol.guard.ts</code>.
        </p>
        <p><a routerLink="/extras/07/solucion/panel">← Volver al panel</a></p>
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
    .explicacion {
      border-left: 3px solid var(--acento);
      background: var(--acento-suave);
      border-radius: 0 10px 10px 0;
      padding: 0.9rem 1rem;
    }
    .explicacion h3 {
      margin-top: 0;
    }
    .explicacion a {
      color: var(--acento);
      font-weight: 600;
    }
    .explicacion a:focus-visible {
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
