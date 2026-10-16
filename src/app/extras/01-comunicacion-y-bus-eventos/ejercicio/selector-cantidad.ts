import { Component, input, output } from '@angular/core';

/**
 * SELECTOR DE CANTIDAD
 *
 * Componente reutilizable con enlace bidireccional PERSONALIZADO: el padre
 * lo usa como `<selector-cantidad [(cantidad)]="unaSignal" />`.
 *
 * Esta versión usa el par clásico `input()` + `output()`. Para que el
 * "banana in a box" `[(cantidad)]` funcione, el output DEBE llamarse
 * exactamente como el input + el sufijo `Change` (`cantidadChange`).
 */
@Component({
  selector: 'selector-cantidad',
  templateUrl: './selector-cantidad.html',
  styleUrl: './selector-cantidad.css',
})
export class SelectorCantidad {
  // TODO: [Paso 1] - Reemplazá el par input() + output() por UNA SOLA línea:
  //   `cantidad = model(1);`
  // (importá `model` desde '@angular/core'). Con `model()` el componente puede
  // escribir el valor con `.set()` / `.update()` y el padre se entera solo,
  // sin emitir manualmente un output. Después simplificá incrementar() y
  // decrementar() usando `this.cantidad.update(...)`.
  cantidad = input(1);
  cantidadChange = output<number>();

  incrementar(): void {
    this.cantidadChange.emit(this.cantidad() + 1);
  }

  decrementar(): void {
    this.cantidadChange.emit(Math.max(1, this.cantidad() - 1));
  }
}
