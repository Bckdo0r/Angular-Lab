import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * SOLUCIÓN — Lección 12: Activar el routing
 *
 * Compará este archivo con ../leccion.ts para ver los cambios:
 * se agregó <router-outlet /> al template para que el router sepa
 * dónde mostrar el contenido de cada página.
 *
 * Abrí http://localhost:4200/tutorial/12/solucion para verla en vivo.
 */
@Component({
  selector: 'leccion-12-solucion',
  template: `
    <nav>
      <a href="/tutorial/12/solucion/home">Home</a>
      |
      <a href="/tutorial/12/solucion/user">User</a>
    </nav>
    <router-outlet />
  `,
  imports: [RouterOutlet],
})
export class Leccion12Solucion {}
