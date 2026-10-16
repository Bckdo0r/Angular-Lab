import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
// Registro local del locale es-AR (mismo razonamiento que ../ejercicio).
import localeEsAr from '@angular/common/locales/es-AR';

registerLocaleData(localeEsAr);
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { Insumo, InsumoNuevo } from '../insumo';
import { InsumosCrudService } from '../insumos-crud.service';
import { DialogoConfirmarSolucion } from './dialogo-confirmar';
import { DialogoEditorSolucion } from './dialogo-editor';

/**
 * SOLUCIÓN — Página ABM completa con Angular Material.
 *
 * Compará con ../ejercicio/abm-page.ts: los TODO (apertura de diálogos,
 * paginador, snackbar con "Deshacer" y confirmación de borrado) se resuelven
 * con aperturas imperativas + `afterClosed()` y dos signals de paginación.
 */
@Component({
  selector: 'abm-page-solucion',
  imports: [CurrencyPipe, MatButtonModule, MatIconModule, MatPaginatorModule, MatTableModule],
  templateUrl: './abm-page.html',
  styleUrl: './abm-page.css',
})
export class AbmPageSolucion {
  private readonly servicio = inject(InsumosCrudService);
  private readonly dialogos = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly lista = this.servicio.insumos;

  // [Paso 3] La columna "subtotal" entra en el array y en un matColumnDef:
  // el par (entrada del array ↔ ng-container) es el contrato de la MatTable.
  protected readonly columnas = ['nombre', 'categoria', 'stock', 'precio', 'subtotal', 'acciones'];

  protected readonly pagina = signal(0);
  protected readonly porPagina = signal(5);
  protected readonly opcionesPorPagina = [5, 10, 20];

  protected readonly totalInsumos = computed(() => this.lista().length);

  protected readonly paginados = computed(() => {
    const inicio = this.pagina() * this.porPagina();
    return this.lista().slice(inicio, inicio + this.porPagina());
  });

  // [Paso 1] Alta: insumo null le dice al editor "form vacío". El diálogo se
  // ABRE acá y su resultado llega por afterClosed(): flujo imperativo, en
  // contraste con el modal siempre-vivo + output() de la 05.
  protected abrirNuevo(): void {
    this.dialogos
      .open(DialogoEditorSolucion, { data: { insumo: null }, width: '520px' })
      .afterClosed()
      .subscribe((datos: InsumoNuevo | undefined) => {
        // Cancelar/ESC → undefined: no hay nada que guardar.
        if (datos) {
          this.guardarDesdeDialogo(datos, null);
        }
      });
  }

  // [Paso 1] Edición: la fila viaja completa por data, y el id vuelve con el
  // payload para que guardarDesdeDialogo sepa que es actualización.
  protected abrirEdicion(insumo: Insumo): void {
    this.dialogos
      .open(DialogoEditorSolucion, { data: { insumo }, width: '520px' })
      .afterClosed()
      .subscribe((datos: InsumoNuevo | undefined) => {
        if (datos) {
          this.guardarDesdeDialogo(datos, insumo.id);
        }
      });
  }

  // Ya está hecho: ¿alta o edición? Lo decide el id.
  protected guardarDesdeDialogo(datos: InsumoNuevo, id: number | null): void {
    if (id === null) {
      this.servicio.alta(datos);
    } else {
      this.servicio.actualizar({ ...datos, id });
    }
  }

  // [Paso 4] El paginator avisa con un PageEvent; el estado vive en signals
  // y el computed `paginados` recalcula la ventana visible solo.
  protected alCambiarPagina(evento: PageEvent): void {
    this.pagina.set(evento.pageIndex);
    this.porPagina.set(evento.pageSize);
  }

  // [Paso 5] Baja con "Deshacer": se elimina YA y se ofrece revertir durante
  // 5 segundos. La copia `eliminado` es lo que reingresar() vuelve a insertar.
  protected eliminar(insumo: Insumo): void {
    const eliminado = this.servicio.eliminar(insumo.id);
    const snackBarRef = this.snackBar.open(`«${insumo.nombre}» eliminado`, 'Deshacer', {
      duration: 5000,
    });
    // onAction() emite SOLO si el usuario tocó "Deshacer" antes de los 5 s.
    snackBarRef.onAction().subscribe(() => {
      if (eliminado) {
        this.servicio.reingresar(eliminado);
      }
    });
  }

  // [Paso 7] Confirmación con diálogo Material — jamás confirm() de JS.
  protected pedirEliminar(insumo: Insumo): void {
    this.dialogos
      .open(DialogoConfirmarSolucion, {
        data: {
          titulo: 'Eliminar insumo',
          mensaje: `¿Eliminar «${insumo.nombre}»? Podés deshacerlo durante 5 segundos.`,
        },
        width: '380px',
      })
      .afterClosed()
      .subscribe((confirmado: boolean | undefined) => {
        if (confirmado) {
          this.eliminar(insumo);
        }
      });
  }
}
