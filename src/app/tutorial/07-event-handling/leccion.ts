import {Component} from '@angular/core';

/**
 * LECCIÓN 7 — Manejo de eventos
 *
 * En Angular te suscribís a eventos con la sintaxis de paréntesis `()`.
 * Por ejemplo: `<button (click)="greet()">` ejecuta `greet()` en cada clic.
 *
 * Abrí http://localhost:4200/tutorial/07 para ver el resultado en vivo.
 * La versión resuelta está en http://localhost:4200/tutorial/07/solucion
 */
@Component({
  selector: 'leccion-07',
  template: `
    <!-- TODO 2: Suscribite al evento "mouseover" de este section: <section (mouseover)="showSecretMessage()"> -->

    <section>
      Hay un mensaje secreto para vos, pasá el mouse para revelarlo 👀
      {{ message }}
    </section>
  `,
})
export class Leccion07 {
  message = '';

  showSecretMessage() {
    // TODO 1: Completá el cuerpo del método con: this.message = 'Way to go 🚀';
  }
}
