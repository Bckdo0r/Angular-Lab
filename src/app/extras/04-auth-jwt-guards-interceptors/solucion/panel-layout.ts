import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthServiceSolucion } from './auth.service';

/**
 * SOLUCIÓN — Layout del panel (nav + sesión + outlet).
 * Igual que el del ejercicio pero contra AuthServiceSolucion y las rutas
 * de /extras/04/solucion.
 */
@Component({
  selector: 'panel-layout-solucion',
  imports: [RouterLink, RouterOutlet],
  template: `
    <main class="contenedor">
      <h1>Panel de gestión <small>(solución)</small></h1>

      <nav>
        <a routerLink="perfil">Perfil</a>
        <a routerLink="admin">Panel admin</a>
      </nav>

      @if (auth.usuarioActual(); as usuario) {
        <p class="sesion">
          👤 {{ usuario.nombre }} — rol: <strong>{{ usuario.rol }}</strong>
          <button (click)="cerrarSesion()">Cerrar sesión</button>
        </p>
      } @else {
        <p class="sesion">Sin sesión abierta. Las rutas protegidas te van a llevar al login.</p>
      }

      <router-outlet />
    </main>
  `,
  styles: `
    .contenedor {
      max-width: 640px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }
    small {
      color: var(--texto-suave);
      font-size: 0.6em;
    }
    nav {
      display: flex;
      gap: 1rem;
      margin: 1rem 0;
    }
    a {
      color: var(--acento);
      text-decoration: none;
      font-weight: 600;
    }
    a:hover {
      text-decoration: underline;
    }
    .sesion {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: var(--acento-suave);
      border: 1px solid color-mix(in srgb, var(--acento) 18%, transparent);
      border-radius: 10px;
      padding: 0.6rem 1rem;
    }
    button {
      border: 1px solid color-mix(in srgb, var(--error) 55%, transparent);
      color: var(--error);
      background: var(--superficie);
      border-radius: 8px;
      padding: 0.3rem 0.7rem;
      font: inherit;
      cursor: pointer;
      transition: background-color 0.15s ease, border-color 0.15s ease;
    }
    button:hover {
      background: var(--error-fondo);
      border-color: var(--error);
    }
  `,
})
export class PanelLayoutSolucion {
  protected readonly auth = inject(AuthServiceSolucion);
  private readonly router = inject(Router);

  protected cerrarSesion(): void {
    this.auth.cerrarSesion();
    this.router.navigate(['/extras/04/solucion/login']);
  }
}
