import { HttpErrorResponse, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

/**
 * Empleado que maneja el buscador de la práctica 06.
 * Es el mismo dominio que el backend falso de la práctica 03, re-declarado
 * acá a propósito: cada carpeta es autónoma y no importa código de otras.
 */
export interface EmpleadoBuscado {
  id: number;
  nombre: string;
  area: 'IT' | 'RRHH' | 'Ventas';
  seniority: string;
}

/**
 * SERVICIO DEL BUSCADOR — Práctica 06.
 *
 * Le pide la lista completa al backend falso de la práctica 03 (que vive en
 * `src/app/extras/backend-falso.ts` y ya está registrado como interceptor
 * global) y filtra por nombre del lado del cliente.
 *
 * Detalle clave: el backend falso IGNORA el query param `nombre` (solo
 * filtra por `area`), así que el filtro por nombre es responsabilidad de
 * este servicio. En un backend real sería al revés: mandar `nombre` y que
 * el servidor filtre.
 */
@Injectable({ providedIn: 'root' })
export class BusquedaService {
  private readonly http = inject(HttpClient);
  private readonly urlBase = '/api/empleados';

  /**
   * Lista de empleados cuyo nombre contiene `texto` (sin distinguir
   * mayúsculas ni acentos de mayúsculas: comparamos en minúsculas).
   *
   * - Cabecera `X-Canal: practica-03`: sin ella el backend responde 400.
   * - HttpParams `nombre=<texto>`: forma parte de la petición simulada.
   *   El interceptor responde sin red: no aparece una solicitud en Network.
   * - Devuelve Observable (no Promise): es justo lo que permite encadenar
   *   `debounceTime`/`switchMap` en el componente.
   */
  listar(texto: string): Observable<EmpleadoBuscado[]> {
    const params = new HttpParams().set('nombre', texto);
    const headers = new HttpHeaders({ 'X-Canal': 'practica-03' });

    return this.http.get<EmpleadoBuscado[]>(this.urlBase, { params, headers }).pipe(
      catchError((error: HttpErrorResponse) => this.manejarError(error)),
      // El backend falso ignora `nombre`: el filtro real va acá, del lado
      // del cliente, comparando en minúsculas. Devuelve SIEMPRE un array
      // (posiblemente vacío), nunca null. Con texto vacío, lista completa.
      map((empleados) => {
        const consulta = texto.trim().toLowerCase();
        if (!consulta) {
          return empleados;
        }
        return empleados.filter((empleado) => empleado.nombre.toLowerCase().includes(consulta));
      }),
    );
  }

  /**
   * Traduce el HttpErrorResponse a un Error con mensaje legible (receta de
   * la práctica 03). El componente solo lee `err.message` en su rama de error.
   */
  private manejarError(error: HttpErrorResponse): Observable<never> {
    let mensaje: string;
    switch (error.status) {
      case 0:
        mensaje = 'No hay conexión con el servidor.';
        break;
      case 400:
        mensaje = 'La petición es inválida: falta la cabecera X-Canal.';
        break;
      default:
        mensaje = `Error inesperado (${error.status})`;
    }
    console.error(`Error HTTP ${error.status} en ${error.url}:`, error.message);
    return throwError(() => new Error(mensaje));
  }
}
