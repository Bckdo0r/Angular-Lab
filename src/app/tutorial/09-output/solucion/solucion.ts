import {Component} from '@angular/core';
import {Leccion09SolucionChild} from './child';

/**
 * SOLUCIÓN — Lección 9
 *
 * Compará este archivo con ../leccion.ts para ver los cambios.
 */
@Component({
  selector: 'leccion-09-solucion',
  template: `
    <leccion-09-solucion-child (addItemEvent)="addItem($event)" />
    <p>🐢 all the way down {{ items.length }}</p>
  `,
  imports: [Leccion09SolucionChild],
})
export class Leccion09Solucion {
  items: string[] = [];

  addItem(item: string) {
    this.items.push(item);
  }
}
