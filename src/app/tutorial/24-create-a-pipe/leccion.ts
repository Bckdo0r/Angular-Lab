import { Component } from '@angular/core';
import { Leccion24ReversePipe } from './reverse.pipe';

/**
 * LECCIÓN 24 — Crear un pipe personalizado
 *
 * Podés crear pipes personalizados en Angular para adaptarlos a tus
 * necesidades de transformación de datos.
 *
 * Abrí http://localhost:4200/tutorial/24 para ver el resultado en vivo.
 * La versión resuelta está en http://localhost:4200/tutorial/24/solucion
 */
@Component({
  selector: 'leccion-24',
  template: `
    <h2>Crear un pipe personalizado</h2>
    <p> Reverse Machine: {{ word }} </p>
  `,
  imports: [],
})
export class Leccion24 {
  word = 'You are a champion';
}
