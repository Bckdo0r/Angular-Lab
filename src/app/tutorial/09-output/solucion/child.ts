import {Component, output} from '@angular/core';

/**
 * SOLUCIÓN — Lección 9
 *
 * Compará este archivo con ../child.ts para ver los cambios.
 */
@Component({
  selector: 'leccion-09-solucion-child',
  styles: `
    .btn {
      padding: 5px;
    }
  `,
  template: ` <button class="btn" (click)="addItem()">Agregar ítem</button> `,
})
export class Leccion09SolucionChild {
  readonly addItemEvent = output<string>();

  addItem() {
    this.addItemEvent.emit('🐢');
  }
}
