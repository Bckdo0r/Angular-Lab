import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

/**
 * SOLUCIÓN — Lección 18
 *
 * Compará este archivo con ../leccion.ts para ver los cambios.
 */
@Component({
  selector: 'leccion-18-solucion',
  template: `
    <form [formGroup]="profileForm">
      <label>Nombre <input type="text" formControlName="name" name="name" /></label>
      <label>Email <input type="email" formControlName="email" name="email" /></label>
      <button type="submit" [disabled]="!profileForm.valid">Submit</button>
    </form>
  `,
  imports: [ReactiveFormsModule],
})
export class Leccion18Solucion {
  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
}
