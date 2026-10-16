import { Component, computed, inject, input, signal } from '@angular/core';
import { formatoPrecio } from './formato-precio';
import { NotificacionesBus } from './notificaciones-bus';
import { Producto } from './producto';
import { SelectorCantidadSolucion } from './selector-cantidad';

/**
 * SOLUCIÓN — FILA DE PRODUCTO (componente NIETO)
 *
 * El nieto NO emite outputs ni conoce al abuelo: solo notifica eventos al
 * bus y ya está. Eso mantiene el componente reutilizable en cualquier
 * otra pantalla sin tocar una línea.
 */
@Component({
  selector: 'producto-fila-solucion',
  imports: [SelectorCantidadSolucion],
  templateUrl: './producto-fila.html',
  styleUrl: './producto-fila.css',
})
export class ProductoFilaSolucion {
  protected readonly bus = inject(NotificacionesBus);

  producto = input.required<Producto>();

  protected readonly cantidad = signal(1);

  /** Precio con formato argentino: "ARS 45.000" (símbolo separado). */
  protected readonly precioFormateado = computed(() => formatoPrecio(this.producto().precio));

  agregar(): void {
    // [Paso 4a] El nieto solo AVISA: no toca la lista (no es suya).
    this.bus.notificarProductoAgregado(this.producto().id, this.producto().nombre, this.cantidad());
  }

  eliminar(): void {
    // [Paso 4b] Igual acá: el abuelo dueño de la lista decide qué hacer.
    this.bus.notificarProductoEliminado(this.producto().id, this.producto().nombre);
  }
}
