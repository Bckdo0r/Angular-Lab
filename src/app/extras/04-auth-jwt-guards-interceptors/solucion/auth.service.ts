import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, map } from 'rxjs';

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
 * SOLUCIÓN — Servicio de auth con JWT simulado.
 *
 * Compará con ../ejercicio/auth.service.ts: la sesión se restaura en el
 * constructor (Paso 1), el token se decodifica con try/catch (Paso 2) y
 * `guardarSesion()` centraliza el guardado + decodificación + señal (Paso 3).
 */
@Injectable({ providedIn: 'root' })
export class AuthServiceSolucion {
  private readonly http = inject(HttpClient);

  readonly usuarioActual = signal<Usuario | null>(null);

  constructor() {
    // [Paso 1] Al arrancar la app, si hay token guardado, la sesión vuelve.
    // Así "recargar la página" no te desloguea: el token vive en localStorage.
    const token = localStorage.getItem(TOKEN_KEY);
    const payload = token ? this.decodificarToken(token) : null;
    if (payload) {
      this.usuarioActual.set(payload);
    }
  }

  login(credenciales: Credenciales): Observable<Usuario> {
    // [Paso 3] POST → { token } → guardarSesion() lo convierte en Usuario.
    // map() transforma la respuesta en el usuario que consume el componente.
    return this.http
      .post<{ token: string }>('/api/login', credenciales)
      .pipe(map((respuesta) => this.guardarSesion(respuesta.token)));
  }

  decodificarToken(token: string): PayloadJwt | null {
    // [Paso 2] JWT simulado = header.payload.firma, todo en base64.
    // JSON válido no garantiza un usuario válido: comprobamos la estructura
    // y la vigencia. Esto no verifica una firma ni prueba autenticidad.
    try {
      if (token.split('.').length !== 3) return null;
      const payload: unknown = JSON.parse(atob(token.split('.')[1]));
      if (
        typeof payload !== 'object' ||
        payload === null ||
        !('usuario' in payload) ||
        typeof payload.usuario !== 'string' ||
        !('nombre' in payload) ||
        typeof payload.nombre !== 'string' ||
        !('rol' in payload) ||
        (payload.rol !== 'admin' && payload.rol !== 'user') ||
        !('exp' in payload) ||
        typeof payload.exp !== 'number' ||
        !Number.isFinite(payload.exp) ||
        payload.exp <= Date.now() / 1000
      )
        return null;
      return {
        usuario: payload.usuario,
        nombre: payload.nombre,
        rol: payload.rol,
        exp: payload.exp,
      };
    } catch {
      return null;
    }
  }

  cerrarSesion(): void {
    // [Paso 4] Sin token en storage y sin usuario en memoria.
    localStorage.removeItem(TOKEN_KEY);
    this.usuarioActual.set(null);
  }

  private guardarSesion(token: string): Usuario {
    // [Paso 3, parte 2] Validamos antes de persistir para no guardar una sesión inválida.
    const payload = this.decodificarToken(token);
    if (!payload) {
      throw new Error('Token inválido');
    }
    localStorage.setItem(TOKEN_KEY, token);
    this.usuarioActual.set(payload);
    return payload;
  }
}
