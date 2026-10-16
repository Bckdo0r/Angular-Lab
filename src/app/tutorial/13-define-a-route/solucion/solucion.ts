import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * SOLUCIÓN — Lección 13: Definir una ruta
 *
 * Compará este archivo con ../leccion.ts: el shell es idéntico. La diferencia
 * está en `src/app/app.routes.ts`, donde se definieron las rutas hijas de
 * /tutorial/13/solucion para las clases Leccion13SolucionHome y
 * Leccion13SolucionUser.
 *
 * Abrí http://localhost:4200/tutorial/13/solucion para verla en vivo.
 */
@Component({
  selector: 'leccion-13-solucion',
  template: `
    <nav>
      <a href="/tutorial/13/solucion/home">Home</a>
      |
      <a href="/tutorial/13/solucion/user">User</a>
    </nav>
    <router-outlet />
  `,
  imports: [RouterOutlet],
})
export class Leccion13Solucion {}
