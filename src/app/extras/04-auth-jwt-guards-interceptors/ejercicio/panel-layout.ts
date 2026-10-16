import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * LAYOUT DEL PANEL — nav + estado de sesión + <router-outlet />
 *
 * Este componente NO tiene TODOs: ya está completo. Es la "caja" que envuelve
 * a las páginas hijas (login, perfil, admin) definidas en ../rutas.ts:
 * lo que esté acá se ve SIEMPRE, y cada página hija se pinta en el outlet.
 *
 * Fijate cómo la señal `usuarioActual` del servicio alimenta la UI: cuando
 * el login setea la señal, este layout re-renderiza solo.
 */
@Component({
  selector: 'panel-layout',
  imports: [RouterLink, RouterOutlet],
  template: `
    <main class="contenedor">
      <h1>Panel de gestión</h1>

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
export class PanelLayout {
  protected readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected cerrarSesion(): void {
    this.auth.cerrarSesion();
    this.router.navigate(['/extras/04/login']);
  }
}
