import { Component, computed, inject, signal } from '@angular/core';
import { Empleado } from '../empleado';
import { EmpleadosCrudService } from '../empleados-crud.service';
import { ModalEditor } from './modal-editor';

/**
 * PÁGINA CRUD — tabla con filtro, paginación, modal y confirmación inline.
 *
 * El "backend" es el servicio compartido (`../empleados-crud.service.ts`,
 * un singleton con signals). Tu trabajo es la lógica de UI en la página
 * (Pasos 1 a 4 y 7) y el formulario del modal (`./modal-editor.ts`,
 * Pasos 5 y 6).
 */
@Component({
  selector: 'empleados-page',
  imports: [ModalEditor],
  templateUrl: './empleados-page.html',
  styleUrl: './empleados-page.css',
})
export class EmpleadosPage {
  private readonly servicio = inject(EmpleadosCrudService);

  /** Texto del filtro (nombre, email o área). */
  protected readonly filtro = signal('');
  protected readonly pagina = signal(1);
  protected readonly porPagina = 4;

  /** Empleado en edición (null = alta de uno nuevo). */
  protected readonly seleccionado = signal<Empleado | null>(null);
  protected readonly modalAbierto = signal(false);

  /** Id de la fila con la confirmación de borrado abierta (null = ninguna). */
  protected readonly eliminandoId = signal<number | null>(null);

  // TODO: [Paso 1] - Convertí este computed en un filtro REAL: sobre la lista
  //   del servicio, quedate con los empleados cuyo nombre, email O área
  //   incluyan el texto de `filtro()` (usá `includes` y, si querés ser pro,
  //   compará en minúsculas para que "ANA" encuentre a "Ana Pérez").
  //   Ojo: `filtro()` vacío → devolver todo.
  protected readonly filtrados = computed(() => this.servicio.empleados());

  // TODO: [Paso 2] - Paginación real: usá `.slice(...)` sobre `filtrados()`
  //   con `this.porPagina` y la página actual.
  protected readonly paginados = computed(() => this.filtrados());

  // TODO: [Paso 2] - Total de páginas: Math.ceil(cantidad filtrada / porPagina).
  //   Mínimo 1, para que "Página 1 de 1" no rompa con la lista vacía.
  protected readonly totalPaginas = computed(() => 1);

  /**
   * Mueve la página en `delta` (+1 o -1), CLAMPEADA entre 1 y totalPaginas:
   * no importa cuántas veces toquen "‹" o "›", la página nunca se va de rango.
   */
  protected cambiarPagina(delta: number): void {
    // TODO: [Paso 2] - this.pagina.update((p) => Math.min(Math.max(p + delta, 1), this.totalPaginas()));
  }

  /** Handler del input de filtro (viene un Event genérico del (input)). */
  protected alTipearFiltro(event: Event): void {
    // TODO: [Paso 2] - Dos cosas:
    //   1. this.filtro.set((event.target as HTMLInputElement).value);
    //   2. volver a la página 1: si estás filtrando desde la página 3 y el
    //      resultado tiene 1 página, quedarías "colgado" en una página vacía.
    //      this.pagina.set(1);
  }

  // TODO: [Paso 3] - Abrir el modal para un empleado NUEVO:
  //   seleccionado.set(null), modalAbierto.set(true).
  protected abrirNuevo(): void {}

  // TODO: [Paso 3] - Abrir el modal para EDITAR: seleccionado.set(empleado),
  //   modalAbierto.set(true). El modal (Paso 5) precarga el form con esos datos.
  protected abrirEdicion(empleado: Empleado): void {}

  protected cerrarModal(): void {
    this.modalAbierto.set(false);
    this.seleccionado.set(null);
  }

  /** Guardar el modal: alta o edición según haya empleado seleccionado. */
  protected guardarCambios(datos: Omit<Empleado, 'id'>): void {
    // TODO: [Paso 7] - Si this.seleccionado() existe → EDICIÓN:
    //   this.servicio.actualizar({ ...datos, id: this.seleccionado()!.id });
    //   Si no → ALTA: this.servicio.crear(datos);
    //   Y en ambos casos cerrá el modal (hay un método justo arriba para eso).
  }

  /** Ya está hecho: abre la confirmación inline en la fila. */
  protected pedirConfirmacion(id: number): void {
    this.eliminandoId.set(id);
  }

  /** Ya está hecho: cierra la confirmación sin borrar. */
  protected cancelarEliminacion(): void {
    this.eliminandoId.set(null);
  }

  protected confirmarEliminacion(): void {
    // TODO: [Paso 4] - Borrar de verdad y resetear el estado:
    //   1. this.servicio.eliminar(this.eliminandoId()!);
    //   2. this.eliminandoId.set(null);
  }
}
