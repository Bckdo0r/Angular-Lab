import { Component, computed, inject, signal } from '@angular/core';
import { Empleado } from '../empleado';
import { EmpleadosCrudService } from '../empleados-crud.service';
import { ModalEditorSolucion } from './modal-editor';

/**
 * SOLUCIÓN — Página CRUD completa.
 *
 * Compará con ../ejercicio/empleados-page.ts: los TODO (filtro, paginación,
 * modal y borrado) se resuelven con `computed()` y handlers cortos.
 */
@Component({
  selector: 'empleados-page-solucion',
  imports: [ModalEditorSolucion],
  templateUrl: './empleados-page.html',
  styleUrl: './empleados-page.css',
})
export class EmpleadosPageSolucion {
  private readonly servicio = inject(EmpleadosCrudService);

  protected readonly filtro = signal('');
  protected readonly pagina = signal(1);
  protected readonly porPagina = 4;

  protected readonly seleccionado = signal<Empleado | null>(null);
  protected readonly modalAbierto = signal(false);
  protected readonly eliminandoId = signal<number | null>(null);

  // [Paso 1] Filtro en vivo: nombre, email o área con `includes`. La
  // comparación en minúsculas hace que "ana" encuentre a "Ana Pérez".
  protected readonly filtrados = computed(() => {
    const texto = this.filtro().trim().toLowerCase();
    const lista = this.servicio.empleados();
    if (!texto) {
      return lista;
    }
    return lista.filter(
      (e) =>
        e.nombre.toLowerCase().includes(texto) ||
        e.email.toLowerCase().includes(texto) ||
        e.area.toLowerCase().includes(texto),
    );
  });

  // [Paso 2] Paginación: slice() no copia de más, devuelve solo la ventana.
  protected readonly paginados = computed(() =>
    this.filtrados().slice((this.pagina() - 1) * this.porPagina, this.pagina() * this.porPagina),
  );

  // [Paso 2] Math.ceil para la última página parcial. Mínimo 1 con lista vacía.
  protected readonly totalPaginas = computed(() =>
    Math.max(1, Math.ceil(this.filtrados().length / this.porPagina)),
  );

  protected cambiarPagina(delta: number): void {
    // [Paso 2] Clampeo: Math.max con 1 y Math.min con el total, todo en un update.
    this.pagina.update((p) => Math.min(Math.max(p + delta, 1), this.totalPaginas()));
  }

  protected alTipearFiltro(event: Event): void {
    // [Paso 2] Setear el filtro Y volver a la página 1: si filtrás estando
    // en la página 3 y el resultado tiene una sola página, quedarías
    // mirando una página que ya no existe.
    this.filtro.set((event.target as HTMLInputElement).value);
    this.pagina.set(1);
  }

  protected abrirNuevo(): void {
    // [Paso 3] Alta: seleccionado null le dice al modal "form vacío".
    this.seleccionado.set(null);
    this.modalAbierto.set(true);
  }

  protected abrirEdicion(empleado: Empleado): void {
    // [Paso 3] Edición: el modal (Paso 5) precarga el form con estos datos.
    this.seleccionado.set(empleado);
    this.modalAbierto.set(true);
  }

  protected cerrarModal(): void {
    this.modalAbierto.set(false);
    this.seleccionado.set(null);
  }

  protected guardarCambios(datos: Omit<Empleado, 'id'>): void {
    // [Paso 7] ¿Edición o alta? Lo decide la existencia de seleccionado().
    const seleccionado = this.seleccionado();
    if (seleccionado) {
      this.servicio.actualizar({ ...datos, id: seleccionado.id });
    } else {
      this.servicio.crear(datos);
    }
    this.cerrarModal();
  }

  protected pedirConfirmacion(id: number): void {
    this.eliminandoId.set(id);
  }

  protected cancelarEliminacion(): void {
    this.eliminandoId.set(null);
  }

  protected confirmarEliminacion(): void {
    // [Paso 4] Borrar de verdad y cerrar la confirmación inline.
    const id = this.eliminandoId();
    if (id !== null) {
      this.servicio.eliminar(id);
    }
    this.eliminandoId.set(null);
  }
}
