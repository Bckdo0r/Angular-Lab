import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { fijarRol, rolSimulado } from './rol.guard';

/**
 * PANEL ADMIN — la ruta "pesada" protegida con canMatch (Paso 7).
 *
 * Este componente ya está completo: es el instrumento del experimento.
 * Simula una pantalla con mucho JavaScript (en una app real: gráficos,
 * editores, librerías pesadas) que SOLO debería bajar del servidor para
 * administradores. El guard canMatch de rutas.ts decide si la ruta existe;
 * mirá DevTools → Network al navegar acá con cada rol.
 */
@Component({
  selector: 'admin-page',
  imports: [RouterLink],
  template: `
    <section>
      <h2>Panel admin</h2>
      <p class="bajada">
        Ruta hija protegida con <code>canMatch: [soloAdminCanMatch]</code> en
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
        <h3>canMatch vs canActivate (la diferencia del Paso 7)</h3>
        <p>
          Con <strong>canActivate</strong> (práctica 04) la ruta existe, el bundle
          se baja, y recién ahí el guard decide si te deja pasar o te redirige.
        </p>
        <p>
          Con <strong>canMatch</strong> el guard corre ANTES: si devuelve
          <code>false</code>, la ruta se remueve del árbol — para vos
          <code>/extras/07/panel/admin</code> no existe, no se baja ningún chunk y la
          navegación cae al comodín <code>**</code> (el 404).
        </p>
        <p>
          <a routerLink="/extras/07/panel">← Volver al panel</a> para cambiar el rol si
          quedaste en el 404.
        </p>
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
export class AdminPage {
  protected readonly rolActual = signal(rolSimulado());

  protected cambiarRol(rol: 'admin' | 'visitante'): void {
    fijarRol(rol);
    this.rolActual.set(rol);
  }
}
