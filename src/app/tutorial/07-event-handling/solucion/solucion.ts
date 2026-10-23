import { Component } from '@angular/core';

/**
 * SOLUCIÓN — Lección 7
 *
 * Compará este archivo con ../leccion.ts para ver los cambios.
 */
@Component({
  selector: 'leccion-07-solucion',
  template: `
    <section (mouseover)="showSecretMessage()">
      Hay un mensaje secreto para vos, pasá el mouse para revelarlo:
      {{ message }}
      <button type="button" (click)="showSecretMessage()">Revelar mensaje</button>
    </section>
  `,
  styles: `
    button {
      border: 1px solid var(--acento);
      border-radius: 8px;
      background: var(--superficie);
      color: var(--acento);
      font: inherit;
      font-weight: 600;
      padding: 0.5rem;
      transition: background-color 0.15s;
    }
    button:hover {
      background: var(--acento-suave);
    }
    button:focus-visible {
      outline: 2px solid var(--acento);
      outline-offset: 2px;
    }
  `,
})
export class Leccion07Solucion {
  message = '';

  showSecretMessage() {
    this.message = 'Way to go 🚀';
  }
}
