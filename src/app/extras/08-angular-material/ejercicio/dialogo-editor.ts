import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Insumo } from '../insumo';

/**
 * Contrato del diálogo: lo que la página manda al abrirlo con
 * `MatDialog.open(DialogoEditor, { data: { insumo } })`.
 * `insumo: null` = alta de uno nuevo (form vacío).
 */
export interface DialogoEditorData {
  insumo: Insumo | null;
}

/**
 * ValidatorFn local — reutiliza la idea de los validadores de la práctica 02:
 * una función pura que recibe el control y devuelve errores o null.
 * Acá: el precio debe ser un número mayor que 0 (no alcanza con required:
 * 0 pasa required y un insumo gratis rompe el negocio).
 */
export function precioPositivo(control: AbstractControl): ValidationErrors | null {
  const valor = Number(control.value);
  return Number.isFinite(valor) && valor > 0 ? null : { precioPositivo: true };
}

/**
 * DIÁLOGO EDITOR — el modal de alta/edición versión Material.
 *
 * Es el reemplazo del `ModalEditor` de la 05, con DOS diferencias de diseño:
 *
 * 1. No vive en la plantilla de la página: se crea y se destruye cada vez
 *    que la página llama a `MatDialog.open(...)`. Por eso su "input" no es
 *    `input()` sino la inyección de `MAT_DIALOG_DATA` (TODO Paso 2).
 * 2. No emite `output()`: devuelve el payload con `dialogRef.close(dato)`
 *    y la página lo recibe por `afterClosed()` (TODO Paso 2, parte 2).
 */
@Component({
  selector: 'dialogo-editor',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './dialogo-editor.html',
  styleUrl: './dialogo-editor.css',
})
export class DialogoEditor {
  // Ya está hecho: cerrar SIN devolver nada (el botón Cancelar lo usa).
  private readonly dialogRef = inject<MatDialogRef<DialogoEditor>>(MatDialogRef);

  // TODO: [Paso 2] (parte 1) - Recibir los datos de entrada e inyectarlos:
  //     protected readonly data = inject<DialogoEditorData>(MAT_DIALOG_DATA);
  //   y usá esa data para PRECARGAR el form: en cada FormControl, el valor
  //   inicial es `this.data.insumo?.nombre ?? ''` (y el equivalente para
  //   categoria, stock y precio). OJO: la precarga es por DATA DE ENTRADA,
  //   una sola vez al construir el form — NUNCA con effect() como en la 05.
  //   Allí el modal vivía siempre y un effect() reaccionaba al input `empleado`
  //   que cambiaba; acá el diálogo se crea fresco en cada apertura y la data
  //   es fija: inyectarla en el constructor es todo lo que hace falta.
  protected readonly form = new FormGroup({
    nombre: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    categoria: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    stock: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
    precio: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, precioPositivo],
    }),
  });

  // Ya está hecho: inválido → revelar los errores (los que armes en el
  // Paso 6) con markAllAsTouched() y cortar; no se cierra el diálogo.
  protected confirmar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // TODO: [Paso 2] (parte 2) - Devolver el payload y cerrar:
    //     this.dialogRef.close(this.form.getRawValue());
    //   Eso es TODO el "output" de un diálogo Material: lo que le pases a
    //   close() es lo que la página recibe en afterClosed(). getRawValue()
    //   tipa el objeto { nombre, categoria, stock, precio } = InsumoNuevo.
  }

  protected cancelar(): void {
    this.dialogRef.close();
  }
}
