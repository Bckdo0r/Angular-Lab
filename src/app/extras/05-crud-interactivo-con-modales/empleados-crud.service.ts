import { Injectable, signal } from '@angular/core';
import { Empleado, EmpleadoNuevo } from './empleado';

/** Semilla de empleados para que la tabla no arranque vacía. */
const SEMILLA: Empleado[] = [
  { id: 1, nombre: 'Ana Pérez', email: 'ana@empresa.com.ar', area: 'IT', seniority: 'Senior' },
  { id: 2, nombre: 'Bruno Díaz', email: 'bruno@empresa.com.ar', area: 'IT', seniority: 'Junior' },
  { id: 3, nombre: 'Carla Gómez', email: 'carla@empresa.com.ar', area: 'RRHH', seniority: 'Semi Senior' },
  { id: 4, nombre: 'Diego Ruiz', email: 'diego@empresa.com.ar', area: 'Ventas', seniority: 'Senior' },
  { id: 5, nombre: 'Elena Sosa', email: 'elena@empresa.com.ar', area: 'RRHH', seniority: 'Junior' },
  { id: 6, nombre: 'Fabio Luna', email: 'fabio@empresa.com.ar', area: 'IT', seniority: 'Semi Senior' },
];

/**
 * SERVICIO CRUD — el "backend en memoria" de la práctica 05.
 *
 * Este archivo ya está COMPLETO (no tiene TODOs): es el material sobre el
 * que trabaja la página. Dos cosas para notar:
 *
 * 1. `providedIn: 'root'` → es un SINGLETON: ejercicio y solución comparten
 *    los mismos datos (si creás un empleado en una, aparece en la otra).
 * 2. Es un mini-modelo de stores con signals: una señal privada `fuente`
 *    con los datos, y `asReadonly()` expone una versión de solo lectura.
 *    Los métodos mutan SIEMPRE con update() (copia del array inmutable),
 *    nunca con push(): así las referencias cambian y toda la UI reacciona.
 */
@Injectable({ providedIn: 'root' })
export class EmpleadosCrudService {
  /** Fuente de verdad: señal privada con la lista completa. */
  private readonly fuente = signal<Empleado[]>(SEMILLA);

  /** Lista de solo lectura para el resto de la app. */
  readonly empleados = this.fuente.asReadonly();

  /** Alta: calcula el id (max + 1) y agrega al final. */
  crear(datos: EmpleadoNuevo): void {
    const id = Math.max(0, ...this.fuente().map((e) => e.id)) + 1;
    this.fuente.update((lista) => [...lista, { ...datos, id }]);
  }

  /** Edición: reemplaza el empleado con el mismo id. */
  actualizar(actualizado: Empleado): void {
    this.fuente.update((lista) =>
      lista.map((e) => (e.id === actualizado.id ? actualizado : e)),
    );
  }

  /** Baja: saca al empleado con ese id. */
  eliminar(id: number): void {
    this.fuente.update((lista) => lista.filter((e) => e.id !== id));
  }
}
