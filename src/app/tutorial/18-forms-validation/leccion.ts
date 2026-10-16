import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

/**
 * LECCIÓN 18 — Validación de formularios
 *
 * Otro escenario común al trabajar con formularios es validar los inputs
 * para asegurar que se envíen los datos correctos. Con formularios reactivos
 * esto se hace con la clase `Validators`.
 *
 * Abrí http://localhost:4200/tutorial/18 para ver el resultado en vivo.
 * La versión resuelta está en http://localhost:4200/tutorial/18/solucion
 */
@Component({
  selector: 'leccion-18',
  template: `
    <form [formGroup]="profileForm">
      <input type="text" formControlName="name" name="name" />
      <input type="email" formControlName="email" name="email" />
      <!-- TODO 3: Deshabilitá el botón mientras el formulario no sea válido
           con el binding [disabled]="!profileForm.valid" -->
      <button type="submit">Submit</button>
    </form>
  `,
  imports: [ReactiveFormsModule],
})
export class Leccion18 {
  profileForm = new FormGroup({
    // TODO 1: Importá `Validators` desde '@angular/forms'
    //
    // TODO 2: Agregá validaciones a los controles:
    // - `name`: Validators.required
    // - `email`: Validators.required y Validators.email combinados en un array
    name: new FormControl(''),
    email: new FormControl(''),
  });
}
