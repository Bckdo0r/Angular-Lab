import { Component, model } from '@angular/core';

/**
 * SOLUCIÓN — SELECTOR DE CANTIDAD con `model()`
 *
 * Compará con ../ejercicio/selector-cantidad.ts: el par
 * `input() + output('cantidadChange')` se convierte en UNA sola línea.
 *
 * `model()` es azúcar para: un input de lectura/escritura + un output
 * `cantidadChange` automáticos. Sigue soportando el "banana in a box":
 *   <selector-cantidad [(cantidad)]="unaSignal" />
 *
 * La gran ventaja: el componente puede ESCRIBIR su propio valor con
 * `.set()` / `.update()` sin emitir nada manualmente.
 */
@Component({
  selector: 'selector-cantidad-solucion',
  templateUrl: './selector-cantidad.html',
  styleUrl: './selector-cantidad.css',
})
export class SelectorCantidadSolucion {
  cantidad = model(1);

  incrementar(): void {
    // `.update()` lee el valor actual, aplica la función y notifica al padre.
    this.cantidad.update((valor) => valor + 1);
  }

  decrementar(): void {
    // Math.max(1, ...) evita bajar de 1 sin necesidad de un `if`.
    this.cantidad.update((valor) => Math.max(1, valor - 1));
  }
}
