import { Component } from '@angular/core';
import { Leccion16SolucionUser } from './user';

/**
 * SOLUCIÓN — Lección 16: Obtener el valor de un control de formulario
 *
 * Compará este archivo con ../leccion.ts para ver la estructura.
 * Los cambios están en ./user.ts: el valor se muestra con interpolación
 * y se accede desde la clase con `this.favoriteFramework`.
 *
 * Abrí http://localhost:4200/tutorial/16/solucion para verla en vivo.
 */
@Component({
  selector: 'leccion-16-solucion',
  template: ` <leccion-16-solucion-user /> `,
  imports: [Leccion16SolucionUser],
})
export class Leccion16Solucion {}
