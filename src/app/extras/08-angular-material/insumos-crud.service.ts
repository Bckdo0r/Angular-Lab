import { Injectable, signal } from '@angular/core';
import { Insumo, InsumoNuevo } from './insumo';

/** Semilla de insumos para que la tabla y el paginador no arranquen vacíos. */
const SEMILLA: Insumo[] = [
  {
    id: 1,
    nombre: 'Tornillo autoperforante 8x1"',
    categoria: 'Ferretería',
    stock: 420,
    precio: 12.5,
  },
  {
    id: 2,
    nombre: 'Cable unipolar 2,5 mm (por metro)',
    categoria: 'Electricidad',
    stock: 850,
    precio: 790,
  },
  { id: 3, nombre: 'Pintura látex interior 4 L', categoria: 'Pintura', stock: 12, precio: 32500 },
  { id: 4, nombre: 'Lija al agua #220', categoria: 'Pintura', stock: 140, precio: 450 },
  { id: 5, nombre: 'Taladro percutor 650 W', categoria: 'Herramientas', stock: 4, precio: 89900 },
  { id: 6, nombre: 'Cinta de mascar 24 mm', categoria: 'Pintura', stock: 60, precio: 1850 },
];

/**
 * SERVICIO CRUD — el "backend en memoria" de la práctica 08.
 *
 * Este archivo ya está COMPLETO (no tiene TODOs): acá el foco de la práctica
 * es la UI con Material, no la lógica del CRUD (esa ya la hiciste en la 05).
 * Es el mismo mini-modelo de stores con signals:
 *
 * 1. `providedIn: 'root'` → SINGLETON: ejercicio y solución comparten los
 *    mismos datos (si creás un insumo en una, aparece en la otra).
 * 2. Una señal privada `fuente` con los datos y `asReadonly()` para exponerla.
 *    Los métodos mutan SIEMPRE con `update()` (copia inmutable del array),
 *    nunca con `push()`: así cambia la referencia y la MatTable reacciona.
 */
@Injectable({ providedIn: 'root' })
export class InsumosCrudService {
  /** Fuente de verdad: señal privada con la lista completa. */
  private readonly fuente = signal<Insumo[]>(SEMILLA);

  /** Lista de solo lectura para el resto de la app. */
  readonly insumos = this.fuente.asReadonly();

  /** Alta: calcula el id (max + 1) y agrega al final. */
  alta(datos: InsumoNuevo): void {
    const id = Math.max(0, ...this.fuente().map((i) => i.id)) + 1;
    this.fuente.update((lista) => [...lista, { ...datos, id }]);
  }

  /** Edición: reemplaza el insumo con el mismo id. */
  actualizar(actualizado: Insumo): void {
    this.fuente.update((lista) => lista.map((i) => (i.id === actualizado.id ? actualizado : i)));
  }

  /**
   * Baja: saca al insumo con ese id y lo DEVUELVE.
   *
   * Devolver el insumo eliminado es lo que permite el "Deshacer" del
   * MatSnackBar (Paso 5): la página guarda la copia y, si el usuario toca la
   * acción antes de los 5 segundos, lo vuelve a incorporar con `reingresar`.
   */
  eliminar(id: number): Insumo | undefined {
    const eliminado = this.fuente().find((i) => i.id === id);
    this.fuente.update((lista) => lista.filter((i) => i.id !== id));
    return eliminado;
  }

  /** Deshacer: reincorpora el insumo con SU MISMO id y la lista reordenada. */
  reingresar(insumo: Insumo): void {
    this.fuente.update((lista) => [...lista, insumo].sort((a, b) => a.id - b.id));
  }
}
