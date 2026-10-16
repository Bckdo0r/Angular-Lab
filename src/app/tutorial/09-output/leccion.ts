import {Component} from '@angular/core';
import {Leccion09Child} from './child';

/**
 * LECCIÓN 9 — Propiedades output de componentes
 *
 * El componente hijo emite eventos con `output()` y el padre los escucha
 * con la sintaxis de paréntesis: `(addItemEvent)="addItem($event)"`.
 *
 * Abrí http://localhost:4200/tutorial/09 para ver el resultado en vivo.
 * La versión resuelta está en http://localhost:4200/tutorial/09/solucion
 */
@Component({
  selector: 'leccion-09',
  template: `
    <!-- TODO 3: Escuchá el evento emitido por el hijo: <leccion-09-child (addItemEvent)="addItem($event)" /> -->

    <leccion-09-child />
    <p>🐢 all the way down {{ items.length }}</p>
  `,
  imports: [Leccion09Child],
})
export class Leccion09 {
  items = new Array();

  addItem(item: string) {
    this.items.push(item);
  }
}
