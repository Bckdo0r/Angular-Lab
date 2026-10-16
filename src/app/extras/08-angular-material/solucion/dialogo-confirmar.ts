import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

/** Contrato del diálogo de confirmación: la página le manda título y mensaje. */
export interface DialogoConfirmarData {
  titulo: string;
  mensaje: string;
}

/**
 * SOLUCIÓN — Diálogo de confirmación Material (reemplazo del confirm() de JS).
 *
 * Igual que el del ejercicio (ya estaba completo): entra data por
 * MAT_DIALOG_DATA y sale un boolean por close(). La página lo abre en el
 * Paso 7 y solo sigue si recibe `true`.
 */
@Component({
  selector: 'dialogo-confirmar-solucion',
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
export class DialogoConfirmarSolucion {
  private readonly dialogRef =
    inject<MatDialogRef<DialogoConfirmarSolucion, boolean>>(MatDialogRef);

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
