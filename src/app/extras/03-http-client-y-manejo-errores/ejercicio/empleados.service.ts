import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EMPTY, Observable, catchError, throwError } from 'rxjs';
import { Area, Empleado } from './empleado';

/**
 * SERVICIO DE EMPLEADOS — HttpClient, HttpParams, HttpHeaders y catchError
 *
 * Este servicio habla con el "backend falso" (un HttpInterceptorFn registrado
 * en app.config.ts, 100% offline). Ojo: ese backend es exigente:
 * - Responde **400** si falta la cabecera `X-Canal: practica-03`.
 * - Responde **404** si pedís un empleado que no existe (probá el legajo 999).
 * - El endpoint `/api/reporte` responde **500** SIEMPRE (está "caído").
 *
 * Tu trabajo es que cada llamada arme sus opciones y que TODOS los errores
 * pasen por `manejarError()` para convertirlos en mensajes amigables.
 */
@Injectable({ providedIn: 'root' })
export class EmpleadosService {
  private readonly http = inject(HttpClient);
  private readonly urlBase = '/api/empleados';

  /**
   * Lista de empleados, opcionalmente filtrada por área (?area=IT|RRHH|Ventas).
   */
  getEmpleados(area?: Area): Observable<Empleado[]> {
    // TODO: [Paso 2] - Armá el filtro con HttpParams: si `area` viene definida,
    //   agregala al params con `params = params.set('area', area)`.
    //   Recordá que HttpParams es INMUTABLE: cada set() devuelve una instancia
    //   nueva, por eso se reasigna sobre la misma variable.
    let params = new HttpParams();

    // TODO: [Paso 3] - Creá los HttpHeaders con la cabecera obligatoria:
    //   new HttpHeaders({ 'X-Canal': 'practica-03' })
    //   Sin esa cabecera el backend falso responde 400.
    const headers = new HttpHeaders();

    // TODO: [Paso 5] - Pasá las opciones al get(): el tercer argumento es un
    //   objeto `{ params, headers }`. Con catchError envolvé el error para que
    //   pase por manejarError() (ya está cableado abajo, no lo toques).
    return this.http
      .get<Empleado[]>(this.urlBase)
      .pipe(catchError((error) => this.manejarError(error)));
  }

  /** Busca UN empleado por legajo. Con id 999 el backend responde 404. */
  getEmpleado(id: number): Observable<Empleado> {
    // TODO: [Paso 6] - Mismo patrón que getEmpleados():
    //   - GET a `${this.urlBase}/${id}` (template literal).
    //   - Con la cabecera 'X-Canal: practica-03'.
    //   - Con catchError → manejarError().
    console.warn('getEmpleado() sin implementar (Paso 6)');
    return EMPTY;
  }

  /** Pide un reporte al endpoint "caído" (siempre responde 500). */
  getReporte(): Observable<{ total: number }> {
    // TODO: [Paso 6] - Igual que arriba, pero GET a '/api/reporte'
    //   (tipalo como Observable<{ total: number }>).
    console.warn('getReporte() sin implementar (Paso 6)');
    return EMPTY;
  }

  /**
   * Traduce un HttpErrorResponse a un mensaje amigable y lo relanza como
   * Error normal, así el componente solo recibe `err.message`.
   */
  private manejarError(error: HttpErrorResponse): Observable<never> {
    // TODO: [Paso 4] - Implementá el switch sobre `error.status`:
    //   - 0     → 'No hay conexión con el servidor. Verificá tu red.'
    //   - 400   → 'La petición es inválida: falta la cabecera X-Canal.'
    //   - 404   → 'El recurso que buscás no existe.'
    //   - 500   → 'El servidor está caído. Probá de nuevo más tarde.'
    //   - default → `Error inesperado (${error.status})`
    //   Y devolvé `throwError(() => new Error(mensaje))`.
    //   (El stub actual devuelve EMPTY: el observable "termina en silencio"
    //   y el componente nunca se entera del error. Por eso hay que cambiarlo.)
    console.error('Error HTTP:', error.status, error.message);
    return EMPTY;
  }
}
