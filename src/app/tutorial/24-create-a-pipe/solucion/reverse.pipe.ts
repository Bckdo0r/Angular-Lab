import { Pipe, PipeTransform } from '@angular/core';

/**
 * SOLUCIÓN — Lección 24 (pipe)
 *
 * Compará este archivo con ../reverse.pipe.ts para ver los cambios:
 * el decorador `@Pipe` y la lógica de inversión en `transform`.
 */
@Pipe({
  name: 'tutorialReverseSolucion',
})
export class Leccion24SolucionReversePipe implements PipeTransform {
  transform(value: string): string {
    let reverse = '';

    for (let i = value.length - 1; i >= 0; i--) {
      reverse += value[i];
    }

    return reverse;
  }
}
