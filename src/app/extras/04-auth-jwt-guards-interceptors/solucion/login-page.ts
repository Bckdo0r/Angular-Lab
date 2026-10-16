import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Credenciales, AuthServiceSolucion } from './auth.service';

/**
 * SOLUCIÓN — Página de login con manejo de returnUrl y de errores.
 *
 * Compará con ../ejercicio/login-page.ts: el TODO del Paso 8 se resuelve
 * en `ingresar()`.
 */
@Component({
  selector: 'login-page-solucion',
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
      transition: background-color 0.15s ease, border-color 0.15s ease;
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
export class LoginPageSolucion {
  private readonly auth = inject(AuthServiceSolucion);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly mensajeError = signal('');

  protected readonly returnUrl =
    this.route.snapshot.queryParamMap.get('returnUrl') ?? '/extras/04/solucion/perfil';

  protected ingresar(usuario: string, clave: string): void {
    const credenciales: Credenciales = { usuario: usuario.trim(), clave };

    // [Paso 8] Login correcto → navegar al returnUrl (o al perfil).
    // Login incorrecto (401) → mostrar el error en pantalla, sin navegar.
    this.auth.login(credenciales).subscribe({
      next: () => this.router.navigateByUrl(this.returnUrl),
      error: (e: Error) => this.mensajeError.set(e.message),
    });
  }
}
