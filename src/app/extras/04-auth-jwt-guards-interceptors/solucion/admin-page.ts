import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';

/** Lo que responde `GET /api/panel` cuando todo sale bien. */
interface PanelResponse {
  rolRecibido: string;
  secretos: string[];
}

/**
 * SOLUCIÓN — Panel admin: consumir un endpoint protegido.
 *
 * Compará con ../ejercicio/admin-page.ts: el TODO del Paso 9 se resuelve
 * en `consultar()`. El token lo agrega el interceptor registrado en
 * app.config.ts (el del EJERCICIO): implementado ese, esta página funciona.
 */
@Component({
  selector: 'admin-page-solucion',
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
export class AdminPageSolucion {
  private readonly http = inject(HttpClient);

  protected readonly datos = signal<PanelResponse | null>(null);
  protected readonly mensajeError = signal('');
  protected readonly cargando = signal(false);

  constructor() {
    this.consultar();
  }

  protected consultar(): void {
    // [Paso 9] La petición sale con Bearer gracias al interceptor (Paso 7).
    this.cargando.set(true);
    this.mensajeError.set('');
    this.datos.set(null);
    this.http.get<PanelResponse>('/api/panel').subscribe({
      next: (datos) => {
        this.datos.set(datos);
        this.cargando.set(false);
      },
      error: (err: HttpErrorResponse) => {
        // 401 = no autenticado (sin token). 403 = autenticado pero sin rol admin.
        this.mensajeError.set(
          err.status === 401
            ? 'No estás autenticado: falta el Bearer token.'
            : err.status === 403
              ? 'No tenés permisos: tu rol no es admin.'
              : `Error inesperado (${err.status})`,
        );
        this.cargando.set(false);
      },
    });
  }
}
