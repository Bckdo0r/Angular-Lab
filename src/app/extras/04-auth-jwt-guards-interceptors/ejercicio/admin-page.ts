import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';

/** Lo que responde `GET /api/panel` cuando todo sale bien. */
interface PanelResponse {
  rolRecibido: string;
  secretos: string[];
}

/**
 * PÁGINA DE ADMIN — consumir un endpoint protegido (Bearer + rol admin).
 *
 * Este endpoint falla de dos formas distintas (y eso es lo didáctico):
 * - **401**: nadie sabe quién sos → falta el token (Paso 7 del interceptor).
 * - **403**: sabés quién sos pero no sos admin → probá con ana/ana123.
 *
 * 401 = no autenticado. 403 = autenticado pero sin permisos. No son lo mismo.
 */
@Component({
  selector: 'admin-page',
  template: `
    <section>
      <h2>Panel admin</h2>
      <p class="bajada">
        <code>GET /api/panel</code> exige cabecera <code>Authorization: Bearer &lt;jwt&gt;</code>
        y rol admin.
      </p>

      <button (click)="consultar()">Volver a consultar</button>

      @if (cargando()) {
        <p>⏳ Cargando...</p>
      }

      @if (mensajeError()) {
        <div class="alerta" role="alert"><strong>Ups:</strong> {{ mensajeError() }}</div>
      }

      @if (datos(); as datos) {
        <p>
          rolRecibido: <strong>{{ datos.rolRecibido }}</strong>
        </p>
        <h3>Secretos corporativos</h3>
        <ul>
          @for (secreto of datos.secretos; track secreto) {
            <li>{{ secreto }}</li>
          }
        </ul>
      }
    </section>
  `,
  styles: `
    .bajada {
      color: var(--texto-suave);
    }
    button {
      padding: 0.45rem 0.9rem;
      border: 1px solid var(--acento);
      background: var(--superficie);
      color: var(--acento);
      border-radius: 8px;
      font: inherit;
      font-weight: 600;
      cursor: pointer;
      margin-bottom: 1rem;
      transition: background-color 0.15s ease, border-color 0.15s ease;
    }
    button:hover {
      background: var(--acento-suave);
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
export class AdminPage {
  private readonly http = inject(HttpClient);

  protected readonly datos = signal<PanelResponse | null>(null);
  protected readonly mensajeError = signal('');
  protected readonly cargando = signal(false);

  constructor() {
    this.consultar();
  }

  protected consultar(): void {
    // TODO: [Paso 9] - Consultar el endpoint protegido:
    //   1. this.cargando.set(true); this.mensajeError.set(''); this.datos.set(null);
    //   2. this.http.get<PanelResponse>('/api/panel').subscribe({ next, error }):
    //      - next: this.datos.set(datos) y cargando.set(false).
    //      - error (HttpErrorResponse): mensaje amigable según err.status:
    //        401 → 'No estás autenticado: falta el Bearer token (¿Paso 7?).'
    //        403 → 'No tenés permisos: tu rol no es admin.'
    //        otro → `Error inesperado (${err.status})`
    //   Mientras el interceptor (Paso 7) no mande el token, acá se ve el 401.
    console.warn('consultar() sin implementar (Paso 9)');
  }
}
