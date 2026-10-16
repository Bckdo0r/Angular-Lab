import {Component, output} from '@angular/core';

/**
 * LECCIÓN 9 — Componente hijo que notifica al padre con `output()`
 *
 * Una propiedad `output` se declara con la función `output()` y se
 * dispara con el método `emit`, que recibe el valor del evento.
 */
@Component({
  selector: 'leccion-09-child',
  styles: `
    .btn {
      padding: 5px;
    }
  `,
  template: ` <button class="btn" (click)="addItem()">Agregar ítem</button> `,
})
export class Leccion09Child {
  // TODO 1: Agregá una propiedad de salida llamada addItemEvent con tipo string: readonly addItemEvent = output<string>();

  addItem() {
    // TODO 2: Emití el evento con el valor '🐢': this.addItemEvent.emit('🐢');
  }
}
