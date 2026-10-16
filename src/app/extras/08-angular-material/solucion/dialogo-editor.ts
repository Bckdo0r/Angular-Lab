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
 * `MatDialog.open(DialogoEditorSolucion, { data: { insumo } })`.
 */
export interface DialogoEditorData {
  insumo: Insumo | null;
}

/**
 * ValidatorFn local — reutiliza la idea de los validadores de la práctica 02:
 * una función pura que recibe el control y devuelve errores o null.
 * Acá: el precio debe ser un número mayor que 0.
 */
export function precioPositivo(control: AbstractControl): ValidationErrors | null {
  const valor = Number(control.value);
  return Number.isFinite(valor) && valor > 0 ? null : { precioPositivo: true };
}

/**
 * SOLUCIÓN — Diálogo editor Material completo.
 *
 * El "contrato" del modal en dos direcciones:
 * - ENTRAN los datos por MAT_DIALOG_DATA (inyección, no input()).
 * - SALEN por dialogRef.close(payload), que la página lee en afterClosed().
 */
@Component({
  selector: 'dialogo-editor-solucion',
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
export class DialogoEditorSolucion {
  private readonly dialogRef = inject<MatDialogRef<DialogoEditorSolucion>>(MatDialogRef);

  // [Paso 2, parte 1] Los datos de entrada se INYECTAN, no llegan por input().
  // Esto reemplaza al `empleado = input(...)` + effect() de la 05: el diálogo
  // se crea fresco en cada MatDialog.open(), su data es FIJA durante toda su
  // vida y, con el form declarado acá abajo, la precarga ocurre UNA sola vez,
  // al construir los FormControl. Un effect() acá sería un anti-patrón: no
  // hay ninguna señal que reaccionar (la data nunca cambia) y dispararía un
  // re-detect innecesario por cada ciclo.
  private readonly data = inject<DialogoEditorData>(MAT_DIALOG_DATA);

  protected readonly esEdicion = this.data.insumo !== null;

  // Precarga por data de entrada: cada FormControl nace con el valor de la
  // fila a editar (o vacío/cero en un alta). Sin patchValue ni effect().
  protected readonly form = new FormGroup({
    nombre: new FormControl(this.data.insumo?.nombre ?? '', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    categoria: new FormControl(this.data.insumo?.categoria ?? '', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    stock: new FormControl(this.data.insumo?.stock ?? 0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
    precio: new FormControl(this.data.insumo?.precio ?? 0, {
      nonNullable: true,
      validators: [Validators.required, precioPositivo],
    }),
  });

  protected confirmar(): void {
    // Guard-clause: inválido → revelar TODOS los errores (Paso 6) y cortar.
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // [Paso 2, parte 2] El payload sale por close(): lo que se le pasa acá
    // es EXACTAMENTE lo que la página recibe en afterClosed().
    // getRawValue() tipa el objeto { nombre, categoria, stock, precio }.
    this.dialogRef.close(this.form.getRawValue());
  }

  protected cancelar(): void {
    // Cerrar SIN payload: la página recibe undefined y no guarda nada.
    this.dialogRef.close();
  }
}
