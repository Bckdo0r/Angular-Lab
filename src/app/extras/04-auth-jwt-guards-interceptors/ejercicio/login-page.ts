import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Credenciales, AuthService } from './auth.service';

/**
 * PÁGINA DE LOGIN — disparar el login y navegar según el resultado.
 *
 * Credenciales válidas del backend falso:
 * - admin / admin123 → rol 'admin' (puede ver el Panel admin)
 * - ana / ana123     → rol 'user' (el Panel admin le da 403)
 *
 * El guard (Paso 5) deja en la URL `?returnUrl=/extras/04/admin` cuando
 * te corta el paso: el login usa ese dato para volver EXACTAMENTE adonde
 * ibas después de loguearte (patrón returnUrl, como en apps reales).
 */
@Component({
  selector: 'login-page',
  template: `
    <section>
      <h2>Login</h2>
      <p class="bajada">
        Probá <code>admin / admin123</code> o <code>ana / ana123</code>. Con otra cosa: 401.
      </p>

      <div class="campos">
        <input #usuarioInput placeholder="usuario" autocomplete="username" />
        <input #claveInput type="password" placeholder="clave" autocomplete="current-password" />
        <button (click)="ingresar(usuarioInput.value, claveInput.value)">Ingresar</button>
      </div>

      @if (mensajeError()) {
        <div class="alerta" role="alert"><strong>Ups:</strong> {{ mensajeError() }}</div>
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
    .campos {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin: 1rem 0;
    }
    input {
      padding: 0.45rem 0.7rem;
      border: 1px solid var(--entrada-borde);
      border-radius: 8px;
      background: var(--entrada-fondo);
      color: var(--texto);
      font: inherit;
      transition:
        border-color 0.15s ease,
        box-shadow 0.15s ease;
    }
    input:focus {
      outline: none;
      border-color: var(--acento);
      box-shadow: 0 0 0 3px var(--resplandor);
    }
    button {
      padding: 0.45rem 0.9rem;
      border: 1px solid var(--acento);
      background: var(--acento);
      color: var(--acento-contraste);
      border-radius: 8px;
      font: inherit;
      font-weight: 600;
      cursor: pointer;
      transition:
        background-color 0.15s ease,
        border-color 0.15s ease;
    }
    button:hover {
      background: var(--acento-fuerte);
      border-color: var(--acento-fuerte);
    }
    button:focus-visible {
      outline: 2px solid var(--acento);
      outline-offset: 2px;
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
export class LoginPage {
  private readonly auth = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly mensajeError = signal('');

  /** A dónde volver tras loguear (el authGuard lo dejó en la query string). */
  protected readonly returnUrl =
    this.route.snapshot.queryParamMap.get('returnUrl') ?? '/extras/04/perfil';

  protected ingresar(usuario: string, clave: string): void {
    const credenciales: Credenciales = { usuario: usuario.trim(), clave };

    // TODO: [Paso 8] - this.auth.login(credenciales).subscribe({ next, error }):
    //   - next: navegar al returnUrl → this.router.navigateByUrl(this.returnUrl);
    //   - error: mostrar el mensaje → this.mensajeError.set(e.message);
    //     (el 401 del backend llega como HttpErrorResponse: su .message ya es
    //     legible; si querés afinarlo, traducí por e.status acá mismo).
    console.warn('ingresar() sin implementar (Paso 8)');
  }
}
