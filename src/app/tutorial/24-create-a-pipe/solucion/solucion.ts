import { Component } from '@angular/core';
import { Leccion24SolucionReversePipe } from './reverse.pipe';

/**
 * SOLUCIÓN — Lección 24
 *
 * Compará este archivo con ../leccion.ts para ver los cambios:
 * el pipe personalizado se usó en la plantilla con `| tutorialReverseSolucion`
 * y se agregó a los `imports` del componente.
 */
@Component({
  selector: 'leccion-24-solucion',
  template: `
    <h2>Crear un pipe personalizado</h2>
    <p> Reverse Machine: {{ word | tutorialReverseSolucion }} </p>
  `,
  imports: [Leccion24SolucionReversePipe],
})
export class Leccion24Solucion {
  word = 'You are a champion';
}
