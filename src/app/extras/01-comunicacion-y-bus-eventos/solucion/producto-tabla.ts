import { Component, input } from '@angular/core';
import { ProductoFilaSolucion } from './producto-fila';
import { Producto } from './producto';

/**
 * SOLUCIÓN — TABLA DE PRODUCTOS (componente HIJO puente)
 *
 * Sin cambios respecto al ejercicio: este componente es a propósito un
 * simple puente de renderizado. Su único trabajo es recibir la lista por
 * input() y dibujar filas. El bus es lo que evita el "prop drilling".
 */
@Component({
  selector: 'producto-tabla-solucion',
  imports: [ProductoFilaSolucion],
  templateUrl: './producto-tabla.html',
  styleUrl: './producto-tabla.css',
})
export class ProductoTablaSolucion {
  productos = input.required<Producto[]>();
}
