import { Component, effect, input, output } from '@angular/core';
import { CdkTrapFocus } from '@angular/cdk/a11y';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Area, Empleado } from '../empleado';

type NombreControl = 'nombre' | 'email' | 'area' | 'seniority';

/**
 * SOLUCIÓN — Modal editor con precarga y validación.
 *
 * Compará con ../ejercicio/modal-editor.ts: el Paso 5 es el effect() que
 * precarga el form; el Paso 6, el guard-clause de confirmar().
 */
@Component({
  selector: 'modal-editor-solucion',
  imports: [ReactiveFormsModule, CdkTrapFocus],
  host: { '(keydown.escape)': 'cerrar.emit()' },
  templateUrl: './modal-editor.html',
  styleUrl: './modal-editor.css',
})
export class ModalEditorSolucion {
  /** Empleado a editar; `null` = alta de uno nuevo (form vacío). */
  empleado = input<Empleado | null>(null);

  cerrar = output<void>();
  guardar = output<Omit<Empleado, 'id'>>();

  protected readonly form = new FormGroup({
    nombre: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    area: new FormControl<Area>('IT', { nonNullable: true }),
    seniority: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor() {
    // [Paso 5] El effect corre dentro del constructor (contexto de inyección)
    // y se re-ejecuta cada vez que el input `empleado` cambia: al abrir el
    // modal para editar, precarga; al abrir para alta, resetea.
    effect(() => {
      const empleado = this.empleado();
      if (empleado) {
        // patchValue acepta un objeto PARCIAL: el `id` de Empleado no es
        // parte del form y patchValue lo ignora (setValue explotaría).
        this.form.patchValue(empleado);
      } else {
        this.form.reset();
      }
    });
  }

  protected mostrarErrores(nombre: NombreControl): boolean {
    const control = this.form.controls[nombre];
    return control.invalid && (control.touched || control.dirty);
  }

  protected confirmar(): void {
    // [Paso 6] Guard-clause: inválido → revelar TODOS los errores con
    // markAllAsTouched() y cortar con return (no se emite nada).
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Válido → emitir los datos; la página (Paso 7) decide alta o edición.
    // getRawValue() tipa el objeto { nombre, email, area, seniority }.
    this.guardar.emit(this.form.getRawValue());
  }
}
