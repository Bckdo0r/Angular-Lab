import { Component, inject } from '@angular/core';
import { AuthService } from './auth.service';

/**
 * PÁGINA DE PERFIL — muestra la sesión activa (protegida por authGuard).
 * Sin TODOs: es la página "feliz" adonde el login te manda.
 */
@Component({
  selector: 'perfil-page',
  template: `
    <section>
      <h2>Mi perfil</h2>
      @if (auth.usuarioActual(); as usuario) {
        <dl>
          <dt>Usuario</dt>
          <dd>{{ usuario.usuario }}</dd>
          <dt>Nombre</dt>
          <dd>{{ usuario.nombre }}</dd>
          <dt>Rol</dt>
          <dd>
            <strong>{{ usuario.rol }}</strong>
          </dd>
        </dl>
        <p class="nota">
          Estos datos NO vinieron de una petición: salieron del payload del JWT, decodificados con
          <code>atob</code> por el AuthService.
        </p>
      } @else {
        <p class="alerta">No hay sesión abierta (¿cómo llegaste acá sin que el guard te corte?).</p>
      }
    </section>
  `,
  styles: `
    /* Tarjeta contenedora de la página, sobre el fondo general */
    section {
      background: var(--superficie);
      border: 1px solid var(--borde);
      border-radius: 12px;
      padding: 1.25rem 1.5rem;
      box-shadow: var(--sombra-tarjeta);
    }
    dl {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 0.35rem 1.25rem;
    }
    dt {
      color: var(--texto-suave);
      font-weight: 600;
    }
    dd {
      margin: 0;
    }
    .nota {
      color: var(--texto-suave);
      font-size: 0.85rem;
    }
    .alerta {
      border: 1px solid var(--error-borde);
      background: var(--error-fondo);
      color: var(--error);
      border-radius: 10px;
      padding: 0.75rem 1rem;
    }
  `,
})
export class PerfilPage {
  protected readonly auth = inject(AuthService);
}
