import { Component } from '@angular/core';

/**
 * SOLUCIÓN — Lección 6
 *
 * Compará este archivo con ../leccion.ts para ver los cambios.
 */
@Component({
  selector: 'leccion-06-solucion',
  styleUrl: './leccion.css',
  template: `
    <div [contentEditable]="isEditable" role="textbox" aria-label="Texto editable"></div>
  `,
})
export class Leccion06Solucion {
  isEditable = true;
}
