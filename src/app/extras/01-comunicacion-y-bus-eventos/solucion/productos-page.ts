import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { formatoPrecio } from './formato-precio';
import { NotificacionesBus } from './notificaciones-bus';
import { Producto } from './producto';
import { ProductoTablaSolucion } from './producto-tabla';
import { SelectorCantidadSolucion } from './selector-cantidad';

/**
 * SOLUCIÓN — PÁGINA DE PRODUCTOS (componente ABUELO)
 *
 * El abuelo es el dueño del estado (signals) y el ÚNICO que escucha el bus.
 * Las mutaciones de la lista viven acá, en un solo lugar: los nietos solo
 * notifican intenciones.
 */
@Component({
  selector: 'productos-page-solucion',
  imports: [ProductoTablaSolucion, SelectorCantidadSolucion],
  templateUrl: './productos-page.html',
  styleUrl: './productos-page.css',
})
export class ProductosPageSolucion {
  private readonly bus = inject(NotificacionesBus);

  protected readonly productos = signal<Producto[]>([
    { id: 1, nombre: 'Teclado mecánico', precio: 45000 },
    { id: 2, nombre: 'Monitor 27"', precio: 210000 },
    { id: 3, nombre: 'Mouse inalámbrico', precio: 12000 },
    { id: 4, nombre: 'Auriculares con micro', precio: 38000 },
  ]);

  protected readonly cantidadCarrito = signal(1);

  protected readonly carrito = signal(0);

  protected readonly total = computed(() =>
    this.productos().reduce((suma, p) => suma + p.precio, 0),
  );

  /** Total con formato argentino: "ARS 305.000" (símbolo separado). */
  protected readonly totalFormateado = computed(() => formatoPrecio(this.total()));

  protected readonly notificaciones = signal<string[]>([]);

  constructor() {
    // [Paso 5] Suscripción al bus con limpieza automática:
    // takeUntilDestroyed() se desuscribe cuando este componente se destruye
    // (evita memory leaks). Debe llamarse dentro de un contexto de inyección,
    // como este constructor.
    this.bus.eventos$.pipe(takeUntilDestroyed()).subscribe((evento) => {
      // Gracias a la unión discriminada, dentro de cada `case` TypeScript
      // sabe exactamente qué propiedades tiene `evento`.
      switch (evento.tipo) {
        case 'agregado': {
          this.carrito.update((unidades) => unidades + evento.cantidad);
          this.notificaciones.update((lista) =>
            [`✅ Agregaste ${evento.cantidad} × ${evento.nombre}`, ...lista].slice(0, 5),
          );
          break;
        }
        case 'eliminado': {
          this.productos.update((lista) => lista.filter((p) => p.id !== evento.id));
          this.notificaciones.update((lista) =>
            [`🗑 Eliminaste "${evento.nombre}"`, ...lista].slice(0, 5),
          );
          break;
        }
      }
    });
  }
}
