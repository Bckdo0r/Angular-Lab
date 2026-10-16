import { Component } from '@angular/core';
import { Leccion15SolucionUser } from './user';

/**
 * SOLUCIÓN — Lección 15: Formularios (template-driven)
 *
 * Compará este archivo con ../leccion.ts para ver la estructura.
 * Los cambios están en ./user.ts: se agregó el input, se importó
 * `FormsModule` y se vinculó el input con `[(ngModel)]`.
 *
 * Abrí http://localhost:4200/tutorial/15/solucion para verla en vivo.
 */
@Component({
  selector: 'leccion-15-solucion',
  template: ` <leccion-15-solucion-user /> `,
  imports: [Leccion15SolucionUser],
})
export class Leccion15Solucion {}
