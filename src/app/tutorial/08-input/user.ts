import {Component, input} from '@angular/core';

/**
 * LECCIÓN 8 — Componente hijo que recibe datos con `input()`
 *
 * La función `input()` devuelve un `InputSignal`: leé el valor
 * invocándola como una señal, por ejemplo `{{ name() }}`.
 */
@Component({
  selector: 'leccion-08-user',
  template: `
    <!-- TODO 1: Definí una propiedad input llamada name (tipo string) en la clase e
    interpolá su valor al final de la oración: <p>El nombre del usuario es {{ name() }}</p> -->

    <p>El nombre del usuario es</p>

  `,
})
export class Leccion08User {}
