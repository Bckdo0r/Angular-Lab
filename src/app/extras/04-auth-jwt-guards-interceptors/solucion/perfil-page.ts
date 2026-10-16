import { Component, inject } from '@angular/core';
import { AuthServiceSolucion } from './auth.service';

/** SOLUCIÓN — Página de perfil (idéntica a la del ejercicio, otro servicio). */
@Component({
  selector: 'perfil-page-solucion',
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
          <dd><strong>{{ usuario.rol }}</strong></dd>
        </dl>
        <p class="nota">
          Estos datos NO vinieron de una petición: salieron del payload del JWT,
          decodificados con <code>atob</code> por el AuthService.
        </p>
      } @else {
        <p class="alerta">No hay sesión abierta (¿cómo llegaste acá sin que el guard te corte?).</p>
      }
    </section>
  `,
  styles: `
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
export class PerfilPageSolucion {
  protected readonly auth = inject(AuthServiceSolucion);
}
