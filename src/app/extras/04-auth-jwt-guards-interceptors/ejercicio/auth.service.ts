import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { EMPTY, Observable, map } from 'rxjs';

export type Rol = 'admin' | 'user';

export interface Credenciales {
  usuario: string;
  clave: string;
}

export interface Usuario {
  usuario: string;
  nombre: string;
  rol: Rol;
}

/** El payload del JWT simulado: un usuario + fecha de expiración. */
export interface PayloadJwt extends Usuario {
  exp: number;
}

/** Clave bajo la que vive el token en localStorage. */
export const TOKEN_KEY = 'pp_token';

/**
 * SERVICIO DE AUTH — login con JWT simulado y sesión en localStorage.
 *
 * El backend falso responde a `POST /api/login` con `{ token }`, un JWT
 * simulado (header.payload.firma, codificado en base64). Este servicio:
 * 1. guarda el token en localStorage (para que el interceptor lo use),
 * 2. decodifica el payload (atob + JSON.parse) para saber QUIÉN entró,
 * 3. expone al usuario en la señal `usuarioActual` (para guards y plantillas).
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  /** Usuario con sesión abierta (null = nadie logueado). */
  readonly usuarioActual = signal<Usuario | null>(null);

  constructor() {
    // TODO: [Paso 1] - Restaurar sesión guardada (para sobrevivir a F5):
    //   1. const token = localStorage.getItem(TOKEN_KEY);
    //   2. const payload = token ? this.decodificarToken(token) : null;
    //   3. si hay payload, seteá la señal: this.usuarioActual.set(payload);
    //      (un PayloadJwt "es" un Usuario porque PayloadJwt extends Usuario).
  }

  /** POST /api/login → guarda la sesión y devuelve el Usuario logueado. */
  login(credenciales: Credenciales): Observable<Usuario> {
    // TODO: [Paso 3] - Llamada al backend y transformación con map():
    //   return this.http.post<{ token: string }>('/api/login', credenciales).pipe(
    //     map((respuesta) => this.guardarSesion(respuesta.token)),
    //   );
    // Credenciales inválidas → el backend responde 401 → el observable emite
    // error y el componente lo muestra (ver Paso 8 en login-page.ts).
    console.warn('login() sin implementar (Paso 3)');
    return EMPTY;
  }

  /**
   * Decodifica el segmento medio de un JWT simulado (base64 + JSON).
   * Devuelve null si el token es basura: mejor no confiar que explotar.
   */
  decodificarToken(token: string): PayloadJwt | null {
    // TODO: [Paso 2] - Envolver en try/catch y devolver null en el catch:
    //   const payload = JSON.parse(atob(token.split('.')[1])) as PayloadJwt;
    //   - token.split('.')[1] → el segmento "payload" del JWT (header.payload.firma).
    //   - atob(...) → decodifica base64 a texto.
    //   - JSON.parse(...) → texto a objeto.
    console.warn('decodificarToken() sin implementar (Paso 2)');
    return null;
  }

  /** Cierra la sesión: sin token en storage y sin usuario en memoria. */
  cerrarSesion(): void {
    // TODO: [Paso 4] - localStorage.removeItem(TOKEN_KEY);
    //                   this.usuarioActual.set(null);
  }

  /** Guarda el token, decodifica el payload y setea la señal. Devuelve el usuario. */
  private guardarSesion(token: string): Usuario {
    // TODO: [Paso 3, parte 2] - En orden:
    //   1. localStorage.setItem(TOKEN_KEY, token);
    //   2. const payload = this.decodificarToken(token);
    //   3. si hay payload: this.usuarioActual.set(payload) y return payload;
    //   4. si el token es basura: throw new Error('Token inválido');
    console.warn('guardarSesion() sin implementar (Paso 3)');
    return { usuario: '', nombre: '', rol: 'user' }; // placeholder hasta el Paso 3
  }
}
