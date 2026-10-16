import { Component, inject, signal } from '@angular/core';
import { Area, Empleado } from './empleado';
import { EmpleadosServiceSolucion } from './empleados.service';

/**
 * SOLUCIÓN — Página del equipo con HttpClient y manejo de errores.
 *
 * Compará con ../ejercicio/empleados-page.ts: los tres métodos siguen la
 * misma receta (cargando → limpiar error → subscribe con next/error).
 */
@Component({
  selector: 'empleados-page-solucion',
  imports: [],
  templateUrl: './empleados-page.html',
  styleUrl: './empleados-page.css',
})
export class EmpleadosPageSolucion {
  private readonly servicio = inject(EmpleadosServiceSolucion);

  protected readonly empleados = signal<Empleado[]>([]);
  protected readonly cargando = signal(false);
  protected readonly mensajeError = signal('');

  /** [Paso 7] Carga la lista, opcionalmente filtrada por área. */
  protected cargar(area?: Area): void {
    this.cargando.set(true);
    this.mensajeError.set('');
    this.servicio.getEmpleados(area).subscribe({
      next: (empleados) => {
        this.empleados.set(empleados);
        this.cargando.set(false);
      },
      error: (err: Error) => {
        // err.message ya es el texto amigable que armó manejarError().
        this.mensajeError.set(err.message);
        this.cargando.set(false);
      },
    });
  }

  /** [Paso 8] Pide el legajo 999: el backend responde 404 y se ve la alerta. */
  protected verEmpleadoInexistente(): void {
    this.cargando.set(true);
    this.mensajeError.set('');
    this.servicio.getEmpleado(999).subscribe({
      next: (empleado) => {
        this.empleados.set([empleado]);
        this.cargando.set(false);
      },
      error: (err: Error) => {
        this.mensajeError.set(err.message);
        this.cargando.set(false);
      },
    });
  }

  /** [Paso 9] Pide el reporte: el backend responde 500 SIEMPRE. */
  protected generarReporte(): void {
    this.cargando.set(true);
    this.mensajeError.set('');
    this.servicio.getReporte().subscribe({
      next: (reporte) => {
        // Nunca se ejecuta: /api/reporte está "caído" a propósito.
        console.log('Reporte recibido:', reporte);
        this.cargando.set(false);
      },
      error: (err: Error) => {
        this.mensajeError.set(err.message);
        this.cargando.set(false);
      },
    });
  }
}
