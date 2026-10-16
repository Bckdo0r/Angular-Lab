import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CurrencyPipe } from '@angular/common';
import { NotificacionesBus } from './notificaciones-bus';
import { Producto } from './producto';
import { ProductoTabla } from './producto-tabla';
import { SelectorCantidad } from './selector-cantidad';

/**
 * PÁGINA DE PRODUCTOS — el componente ABUELO 🧓
 *
 * Es el dueño de la lista de productos y del carrito. Los nietos le avisan
 * qué hacer a través del `NotificacionesBus`; acá es donde escuchamos.
 *
 * `takeUntilDestroyed()` cancela la suscripción automáticamente cuando el
 * componente se destruye: nunca te olvides de desuscribirte de un Observable.
 */
@Component({
  selector: 'productos-page',
  imports: [ProductoTabla, SelectorCantidad, CurrencyPipe],
  templateUrl: './productos-page.html',
  styleUrl: './productos-page.css',
})
export class ProductosPage {
  private readonly bus = inject(NotificacionesBus);

  /** La única fuente de verdad de la lista: un signal. */
  protected readonly productos = signal<Producto[]>([
    { id: 1, nombre: 'Teclado mecánico', precio: 45000 },
    { id: 2, nombre: 'Monitor 27"', precio: 210000 },
    { id: 3, nombre: 'Mouse inalámbrico', precio: 12000 },
    { id: 4, nombre: 'Auriculares con micro', precio: 38000 },
  ]);

  /** Cantidad de la demo de two-way binding [(cantidad)]. */
  protected readonly cantidadCarrito = signal(1);

  /** Unidades acumuladas que llegan por el bus de eventos. */
  protected readonly carrito = signal(0);

  /** Valor del catálogo: se recalcula solo cuando cambia `productos`. */
  protected readonly total = computed(() =>
    this.productos().reduce((suma, p) => suma + p.precio, 0),
  );

  /** Últimos eventos recibidos (los más nuevos primero). */
  protected readonly notificaciones = signal<string[]>([]);

  constructor() {
    this.bus.eventos$
      .pipe(takeUntilDestroyed())
      .subscribe((evento) => {
        // TODO: [Paso 5] - Manejá los dos tipos de evento con un switch:
        //
        //  - case 'agregado': sumá `evento.cantidad` al signal `carrito`
        //    (con .update()) y agregá una notificación tipo:
        //    `✅ Agregaste ${evento.cantidad} × ${evento.nombre}`.
        //
        //  - case 'eliminado': sacá el producto del signal `productos`
        //    (filter por id, con .update()) y agregá una notificación tipo:
        //    `🗑 Eliminaste "${evento.nombre}"`.
        //
        //  Tip para las notificaciones: poné el mensaje nuevo PRIMERO en el
        //  array y quedate solo con las últimas 5:
        //    this.notificaciones.update((lista) => [mensaje, ...lista].slice(0, 5));
      });
  }
}
