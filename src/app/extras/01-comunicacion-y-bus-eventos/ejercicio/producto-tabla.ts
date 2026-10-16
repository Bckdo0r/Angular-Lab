import { Component, input } from '@angular/core';
import { ProductoFila } from './producto-fila';
import { Producto } from './producto';

/**
 * TABLA DE PRODUCTOS — el componente HIJO puente 🧓 → 👨
 *
 * Recibe el listado del abuelo por input() y dibuja una fila por producto
 * con el nuevo control de flujo `@for` (siempre con `track`).
 *
 * Detalle clave para la práctica: este componente NO tiene outputs ni
 * inyecta el bus. Es solo un puente de renderizado. Si tuviéramos que
 * reenviar eventos del nieto al abuelo por acá, sería "prop drilling".
 * El bus de eventos evita justamente eso.
 */
@Component({
  selector: 'producto-tabla',
  imports: [ProductoFila],
  templateUrl: './producto-tabla.html',
  styleUrl: './producto-tabla.css',
})
export class ProductoTabla {
  productos = input.required<Producto[]>();
}
