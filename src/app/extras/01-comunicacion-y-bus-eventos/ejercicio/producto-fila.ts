import { CurrencyPipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { NotificacionesBus } from './notificaciones-bus';
import { Producto } from './producto';
import { SelectorCantidad } from './selector-cantidad';

/**
 * FILA DE PRODUCTO — el componente NIETO 🧓 → 👨 → 👶
 *
 * Vive dentro de `producto-tabla` (hijo), que vive dentro de
 * `productos-page` (abuelo).
 *
 * Fijate en el detalle importante: acá NO hay outputs. La comunicación con
 * el abuelo NO viaja de hijo en hijo, sino que va directa por el
 * `NotificacionesBus` (inyectado con la función `inject()`).
 */
@Component({
  selector: 'producto-fila',
  imports: [SelectorCantidad, CurrencyPipe],
  templateUrl: './producto-fila.html',
  styleUrl: './producto-fila.css',
})
export class ProductoFila {
  /** Con inject() no necesitamos constructor: una línea por dependencia. */
  protected readonly bus = inject(NotificacionesBus);

  /** El producto que el abuelo manda a dibujar. `required` = obligatorio. */
  producto = input.required<Producto>();

  /** Cantidad local elegida para este producto (enlazada al selector). */
  protected readonly cantidad = signal(1);

  agregar(): void {
    // TODO: [Paso 4a] - Avisale al bus que el usuario quiere agregar este
    // producto con la cantidad elegida:
    //   this.bus.notificarProductoAgregado(
    //     this.producto().id,
    //     this.producto().nombre,
    //     this.cantidad(),
    //   );
  }

  eliminar(): void {
    // TODO: [Paso 4b] - Avisale al bus que hay que eliminar este producto:
    //   this.bus.notificarProductoEliminado(this.producto().id, this.producto().nombre);
    // No hacés la eliminación acá: el ABUELO es el dueño de la lista y
    // decide qué hacer con el evento. ¡Separación de responsabilidades!
  }
}
