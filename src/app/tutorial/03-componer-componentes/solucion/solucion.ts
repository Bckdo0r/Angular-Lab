import {Component} from '@angular/core';

/**
 * SOLUCIÓN — Lección 3
 *
 * Compará este archivo con ../leccion.ts para ver los cambios.
 */
@Component({
  selector: 'leccion-03-solucion-user',
  template: ` Username: {{ username }} `,
})
export class Leccion03SolucionUser {
  username = 'youngTech';
}

@Component({
  selector: 'leccion-03-solucion',
  template: `
    <section>
      <leccion-03-solucion-user />
    </section>
  `,
  imports: [Leccion03SolucionUser],
})
export class Leccion03Solucion {}
