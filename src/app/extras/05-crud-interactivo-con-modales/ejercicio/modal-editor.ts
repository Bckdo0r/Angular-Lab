import { Component, effect, input, output } from '@angular/core';
import { CdkTrapFocus } from '@angular/cdk/a11y';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Area, Empleado } from '../empleado';

type NombreControl = 'nombre' | 'email' | 'area' | 'seniority';

/**
 * MODAL EDITOR — formulario de alta/edición con precarga (patchValue).
 *
 * Es un componente "de diálogo": recibe al empleado por `input()` (null =
 * alta), emite eventos por `output()` y la página decide qué hacer con ellos.
 * La página lo monta con:
 *   <modal-editor [empleado]="seleccionado()" (cerrar)="..." (guardar)="..." />
 *
 * Tu trabajo: el Pasos 5 (precarga con effect) y 6 (confirmar()) de acá abajo.
 */
@Component({
  selector: 'modal-editor',
  imports: [ReactiveFormsModule, CdkTrapFocus],
  host: { '(keydown.escape)': 'cerrar.emit()' },
  templateUrl: './modal-editor.html',
  styleUrl: './modal-editor.css',
})
export class ModalEditor {
  /** Empleado a editar; `null` = alta de uno nuevo (form vacío). */
  empleado = input<Empleado | null>(null);

  /** Pedirle a la página que cierre el modal (Cancelar, overlay, Esc...). */
  cerrar = output<void>();

  /** Entregarle a la página los datos ya validados del formulario. */
  guardar = output<Omit<Empleado, 'id'>>();

  /**
   * FormGroup del modal. Los validadores son los mismos patrones de la
   * práctica 02: `required` + reglas por campo.
   * Ojo con `area`: es un <select>, y su FormControl es NO nullable con
   * valor inicial 'IT' (el select siempre tiene un valor válido).
   */
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
    // TODO: [Paso 5] - Precargar el formulario cuando cambia `empleado`.
    //   Un effect() dentro del constructor (contexto de inyección) corre
    //   cada vez que la señal leída adentro cambia:
    //
    //     effect(() => {
    //       const empleado = this.empleado();
    //       if (empleado) {
    //         this.form.patchValue(empleado); // EDITAR: precarga los 4 campos
    //       } else {
    //         this.form.reset(); // ALTA: form vacío (con nonNullable vuelve a '')
    //       }
    //     });
    //
    //   ¿Por qué patchValue y no setValue? patchValue acepta un objeto PARCIAL
    //   (Empleado trae `id`, que no es parte del form, y patchValue lo ignora).
  }

  /** Helper de la plantilla: cuándo mostrar el error de un control. */
  protected mostrarErrores(nombre: NombreControl): boolean {
    const control = this.form.controls[nombre];
    return control.invalid && (control.touched || control.dirty);
  }

  /** Botón "Guardar" del modal (ngSubmit del form). */
  protected confirmar(): void {
    // TODO: [Paso 6] - Validar antes de emitir:
    //   1. si el form es inválido: this.form.markAllAsTouched() y return
    //      (así la plantilla muestra todos los mensajes de golpe).
    //   2. si es válido: this.guardar.emit(this.form.getRawValue());
    //      getRawValue() devuelve { nombre, email, area, seniority } tipado,
    //      exactamente el Omit<Empleado, 'id'> que espera la página.
  }
}
