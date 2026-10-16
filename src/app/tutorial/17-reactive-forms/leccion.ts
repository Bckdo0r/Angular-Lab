import { Component } from '@angular/core';

/**
 * LECCIÓN 17 — Formularios reactivos
 *
 * Los formularios reactivos permiten manejar los formularios por código
 * (en la clase del componente) en lugar de depender solo de la plantilla.
 *
 * Abrí http://localhost:4200/tutorial/17 para ver el resultado en vivo.
 * La versión resuelta está en http://localhost:4200/tutorial/17/solucion
 */
@Component({
  selector: 'leccion-17',
  template: `
    <!-- TODO 6: Agregá la directiva [formGroup]="profileForm" al form y el
         evento (ngSubmit)="handleSubmit()" para manejar el envío -->
    <form>
      <label>
        Name
        <input type="text" formControlName="name" />
      </label>
      <label>
        Email
        <input type="email" formControlName="email" />
      </label>
      <button type="submit">Submit</button>
    </form>

    <!-- TODO 4: Mostrá los valores del formulario:
         un <h2>Profile Form</h2> y dos <p> con profileForm.value.name y
         profileForm.value.email -->
  `,
  // TODO 1: Importá ReactiveFormsModule desde '@angular/forms' y agregalo a
  // este array `imports` del componente
  imports: [],
})
export class Leccion17 {
  // TODO 2: Creá la propiedad `profileForm` como un FormGroup con los
  // controles `name` y `email` (usá FormControl de '@angular/forms')
  //
  // TODO 5: Agregá el método handleSubmit() que muestre con alert() los
  // valores del formulario
}
