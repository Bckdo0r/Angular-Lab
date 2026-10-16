import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Area, Empleado } from './empleado';

/**
 * SOLUCIÓN — Servicio de empleados con HttpClient + manejo de errores.
 *
 * Compará con ../ejercicio/empleados.service.ts: los TODO se resuelven
 * armando `params`/`headers` en cada llamada y centralizando la traducción
 * de errores en `manejarError()`.
 */
@Injectable({ providedIn: 'root' })
export class EmpleadosServiceSolucion {
  private readonly http = inject(HttpClient);
  private readonly urlBase = '/api/empleados';

  getEmpleados(area?: Area): Observable<Empleado[]> {
    // [Paso 2] HttpParams es inmutable: set() devuelve una instancia nueva,
    // por eso la variable se reasigna. Si `area` no viene, params queda vacío
    // y Angular simplemente no agrega el query param a la URL.
    let params = new HttpParams();
    if (area) {
      params = params.set('area', area);
    }

    // [Paso 3] Cabecera obligatoria: el backend falso responde 400 sin ella.
    const headers = new HttpHeaders({ 'X-Canal': 'practica-03' });

    // [Paso 5] Opciones del get(): params + headers juntos, y el error pasa
    // por manejarError() gracias a catchError.
    return this.http
      .get<Empleado[]>(this.urlBase, { params, headers })
      .pipe(catchError((error) => this.manejarError(error)));
  }

  getEmpleado(id: number): Observable<Empleado> {
    // [Paso 6] Mismo patrón, con la URL construida por template literal.
    const headers = new HttpHeaders({ 'X-Canal': 'practica-03' });
    return this.http
      .get<Empleado>(`${this.urlBase}/${id}`, { headers })
      .pipe(catchError((error) => this.manejarError(error)));
  }

  getReporte(): Observable<{ total: number }> {
    // [Paso 6] El endpoint /api/reporte responde 500 SIEMPRE: existe para
    // practicar el camino del error, nunca se llega al `next` del subscribe.
    const headers = new HttpHeaders({ 'X-Canal': 'practica-03' });
    return this.http
      .get<{ total: number }>('/api/reporte', { headers })
      .pipe(catchError((error) => this.manejarError(error)));
  }

  /**
   * [Paso 4] Traduce un HttpErrorResponse a un mensaje amigable y lo relanza.
   *
   * Dos detalles importantes:
   * 1. Devuelve `throwError(() => new Error(mensaje))`, NO `EMPTY` ni el error
   *    crudo: así el componente recibe un `err.message` legible por humanos.
   * 2. El factory `() => new Error(...)` es lazy: el error solo se crea si
   *    alguien se suscribe a esa rama.
   */
  private manejarError(error: HttpErrorResponse): Observable<never> {
    let mensaje: string;
    switch (error.status) {
      case 0:
        mensaje = 'No hay conexión con el servidor. Verificá tu red.';
        break;
      case 400:
        mensaje = 'La petición es inválida: falta la cabecera X-Canal.';
        break;
      case 404:
        mensaje = 'El recurso que buscás no existe.';
        break;
      case 500:
        mensaje = 'El servidor está caído. Probá de nuevo más tarde.';
        break;
      default:
        mensaje = `Error inesperado (${error.status})`;
    }
    console.error(`Error HTTP ${error.status} en ${error.url}:`, error.message);
    return throwError(() => new Error(mensaje));
  }
}
