import { Component } from '@angular/core';
import { LowerCasePipe } from '@angular/common';

/**
 * SOLUCIÓN — Lección 22
 *
 * Compará este archivo con ../leccion.ts para ver los cambios:
 * se importó `LowerCasePipe` desde `@angular/common`, se agregó a los
 * `imports` del componente y se usó en la plantilla con el operador `|`.
 */
@Component({
  selector: 'leccion-22-solucion',
  template: `
    <h2>Pipes</h2>
    <p>Usuario: {{ username | lowercase }}</p>
  `,
  imports: [LowerCasePipe],
})
export class Leccion22Solucion {
  username = 'yOunGTECh';
}
