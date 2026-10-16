import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

/** Contrato del diálogo de confirmación: la página le manda título y mensaje. */
export interface DialogoConfirmarData {
  titulo: string;
  mensaje: string;
}

/**
 * DIÁLOGO DE CONFIRMACIÓN — reemplaza al `confirm()` de JavaScript.
 *
 * Este archivo ya está COMPLETO (no tiene TODOs): es chico a propósito.
 * Recibe los datos por MAT_DIALOG_DATA y devuelve `true` (Aceptar) o
 * `false`/`undefined` (Cancelar o ESC) con `dialogRef.close(...)`. La página
 * (TODO Paso 7) decide qué hacer con esa respuesta.
 *
 * ¿Por qué no `confirm()`? Bloquea el hilo, no respeta el tema ni el
 * teclado/foco de la app y no se puede estilizar. Un diálogo Material es
 * focus-trappeado, accesible y consistente con el resto de la UI.
 */
@Component({
  selector: 'dialogo-confirmar',
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ datos.titulo }}</h2>
    <mat-dialog-content>{{ datos.mensaje }}</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button matButton (click)="cancelar()">Cancelar</button>
      <button matButton class="peligro" (click)="aceptar()">Eliminar</button>
    </mat-dialog-actions>
  `,
  styles: `
    /* Sin color="warn" ni colores fijos: rojo del sistema vía tokens. */
    .peligro {
      color: var(--error);
      border: 1px solid var(--error);
    }
  `,
})
export class DialogoConfirmar {
  private readonly dialogRef = inject<MatDialogRef<DialogoConfirmar, boolean>>(MatDialogRef);

  /** Con `optional: true` el diálogo no explota si alguien lo abre sin data. */
  protected readonly datos: DialogoConfirmarData = inject<DialogoConfirmarData | null>(
    MAT_DIALOG_DATA,
    { optional: true },
  ) ?? {
    titulo: 'Confirmación',
    mensaje: '¿Confirmás esta acción?',
  };

  protected aceptar(): void {
    this.dialogRef.close(true);
  }

  protected cancelar(): void {
    this.dialogRef.close(false);
  }
}
