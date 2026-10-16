import {Component} from '@angular/core';

/**
 * LECCIÓN 3 — Componer Componentes
 *
 * Un componente se usa dentro de otro a través de su `selector`,
 * que se escribe en la plantilla como una etiqueta HTML.
 *
 * Abrí http://localhost:4200/tutorial/03 para ver el resultado en vivo.
 * La versión resuelta está en http://localhost:4200/tutorial/03/solucion
 */
@Component({
  selector: 'leccion-03-user',
  template: ` Username: {{ username }} `,
})

export class Leccion03User {
  username = 'youngTech';
}

@Component({
  selector: 'leccion-03',
  template: `
    <!-- TODO 1: Mostrá el componente de usuario acá con <leccion-03-user /> -->

    <p>Acá va a aparecer el componente de usuario...</p>
  `,
  imports: [
    // TODO 1: Agregá Leccion03User a los imports para poder usarlo en la plantilla
  ],
})
export class Leccion03 {}
