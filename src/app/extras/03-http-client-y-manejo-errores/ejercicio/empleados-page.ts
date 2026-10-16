import { Component, inject, signal } from '@angular/core';
import { Area, Empleado } from './empleado';
import { EmpleadosService } from './empleados.service';

/**
 * PÁGINA DEL EQUIPO — consumir un servicio HTTP y mostrar estados
 *
 * La página tiene tres señales de estado:
 * - `empleados`: la lista que llega del backend (empieza vacía).
 * - `cargando`: true mientras vuela la petición (muestra "⏳ Cargando...").
 * - `mensajeError`: el mensaje amigable si algo falla (muestra la alerta).
 *
 * Tu trabajo (Pasos 7 a 9) es implementar los tres métodos que disparan
 * peticiones y setean estas señales según el resultado.
 */
@Component({
  selector: 'empleados-page',
  imports: [],
  templateUrl: './empleados-page.html',
  styleUrl: './empleados-page.css',
})
export class EmpleadosPage {
  private readonly servicio = inject(EmpleadosService);

  protected readonly empleados = signal<Empleado[]>([]);
  protected readonly cargando = signal(false);
  protected readonly mensajeError = signal('');

  /**
   * Carga la lista, opcionalmente filtrada por área.
   * Es el método que usan los botones "Cargar equipo", "Solo IT" y "Solo RRHH".
   */
  protected cargar(area?: Area): void {
    // TODO: [Paso 7] - Receta para TODA petición HTTP en un componente:
    //   1. this.cargando.set(true);
    //   2. limpiá el error previo: this.mensajeError.set('');
    //   3. this.servicio.getEmpleados(area).subscribe({ next, error }):
    //      - next: seteá `empleados` con lo recibido y cargando.set(false).
    //      - error: seteá `mensajeError` con err.message y cargando.set(false).
    //   El error llega como un Error normal (gracias a manejarError del
    //   servicio): err.message ya es el texto amigable.
  }

  /** Pide el legajo 999: el backend responde 404. */
  protected verEmpleadoInexistente(): void {
    // TODO: [Paso 8] - Igual que cargar(), pero con this.servicio.getEmpleado(999).
    //   Si por alguna razón llega un empleado, mostralo solo en la tabla
    //   (this.empleados.set([empleado])).
  }

  /** Pide el reporte al endpoint caído: el backend responde 500 siempre. */
  protected generarReporte(): void {
    // TODO: [Paso 9] - Igual que cargar(), pero con this.servicio.getReporte().
  }
}
