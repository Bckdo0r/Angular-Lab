import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

/** Modelo mínimo de producto que devuelve la API (ficticia) de la práctica. */
export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  stock: number;
}

/**
 * SERVICIO DE PRODUCTOS — el "código a testear" de la práctica 10.
 *
 * Este servicio YA ESTÁ COMPLETO: en esta práctica el alumno NO lo implementa,
 * sino que escribe los TESTS que prueban su comportamiento usando
 * `HttpTestingController` (sin red real, sin backend, sin tocar `app.config.ts`).
 *
 * Contrato que los tests tienen que verificar:
 * - `listar()`            → GET `/api/productos` con header `X-Canal: practica-10`.
 * - `listar({ categoria })` → además agrega `?categoria=...` vía `HttpParams`.
 * - `obtener(id)`         → GET `/api/productos/:id` con el mismo header.
 * - Cualquier fallo HTTP  → `catchError` lo convierte en `Error` con mensaje amigable.
 */
@Injectable({ providedIn: 'root' })
export class ProductosApiService {
  private readonly http = inject(HttpClient);
  private readonly urlBase = '/api/productos';

  /** Lista de productos, opcionalmente filtrada por categoría (?categoria=...). */
  listar(filtros?: { categoria?: string }): Observable<Producto[]> {
    // HttpParams es INMUTABLE: cada set() devuelve una instancia nueva,
    // por eso se reasigna sobre la misma variable.
    let params = new HttpParams();
    if (filtros?.categoria) {
      params = params.set('categoria', filtros.categoria);
    }

    const headers = new HttpHeaders({ 'X-Canal': 'practica-10' });

    return this.http
      .get<Producto[]>(this.urlBase, { params, headers })
      .pipe(catchError((error: HttpErrorResponse) => this.manejarError(error)));
  }

  /** Busca UN producto por id. */
  obtener(id: number): Observable<Producto> {
    const headers = new HttpHeaders({ 'X-Canal': 'practica-10' });

    return this.http
      .get<Producto>(`${this.urlBase}/${id}`, { headers })
      .pipe(catchError((error: HttpErrorResponse) => this.manejarError(error)));
  }

  /**
   * Traduce un HttpErrorResponse a un mensaje amigable y lo relanza como
   * Error normal, así el componente solo recibe `err.message`.
   *
   * ⚠️ IMPORTANTE para la práctica: el TEXTO de estos mensajes es libre.
   * Los tests de la solución prueban la REGLA (que el fallo llega como un
   * Error con mensaje), no la frase exacta: cambiar estos textos NO debe
   * romper el suite.
   */
  private manejarError(error: HttpErrorResponse): Observable<never> {
    console.error('Error HTTP:', error.status, error.message);

    const mensaje =
      error.status === 0
        ? 'No hay conexión con el servidor. Verificá tu red.'
        : error.status === 404
          ? 'El producto que buscás no existe.'
          : 'El servidor no pudo procesar la petición. Probá de nuevo.';

    return throwError(() => new Error(mensaje));
  }
}
