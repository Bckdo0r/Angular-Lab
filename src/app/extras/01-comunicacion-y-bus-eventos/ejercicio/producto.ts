/**
 * Modelo compartido de la Práctica 01.
 *
 * Un `interface` (no una clase) es lo recomendable para modelar datos
 * que viajan por la app: no genera código en runtime, solo tipos.
 */
export interface Producto {
  id: number;
  nombre: string;
  precio: number;
}
