import { Pipe, PipeTransform } from '@angular/core';

/**
 * LECCIÓN 24 — Pipe personalizado "Reverse"
 *
 * Un pipe es una clase TypeScript con el decorador `@Pipe`:
 *   - El `name` en la configuración de `@Pipe` es lo que se usa en la plantilla.
 *   - La función `transform` es donde va tu lógica.
 *
 * TODO 1: Agregá el decorador `@Pipe` a la clase con la configuración:
 *           @Pipe({ name: 'tutorialReverse' })
 * TODO 2: Implementá la lógica para invertir el string dentro de `transform`
 *         (recorré el valor desde el final hacia el principio y armá el resultado).
 */
export class Leccion24ReversePipe implements PipeTransform {
  transform(value: string): string {
    // TODO 2: Reemplazá este return vacío por la lógica que invierte el texto
    return '';
  }
}
