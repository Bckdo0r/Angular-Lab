import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
// Registro local del locale es-AR: la práctica no quiere tocar la app entera
// (app.config.ts), así que registra SOLO los datos que necesita el pipe
// moneda para formatear "$ 32.500,00" al estilo argentino.
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
import { DialogoConfirmar } from './dialogo-confirmar';
import { DialogoEditor } from './dialogo-editor';

/**
 * PÁGINA ABM CON ANGULAR MATERIAL — la versión "forma oficina" del CRUD de la 05.
 *
 * Cambios grandes respecto de la 05:
 * - El modal casero (overlay + input()/output()) lo reemplaza `MatDialog`:
 *   la página ABRE el diálogo y recibe el resultado por `afterClosed()`
 *   (Pasos 1 y 2), en vez de tener el modal siempre vivo en la plantilla.
 * - La tabla `@for` casera de la 05 es ahora una `MatTable` con
 *   `matColumnDef` (Paso 3) y el paginador propio es un `MatPaginator` (Paso 4).
 * - La confirmación inline de la fila la reemplazan un diálogo de
 *   confirmación Material (Paso 7) y un `MatSnackBar` con "Deshacer"
 *   (Paso 5). Nada de `confirm()` de JavaScript.
 *
 * El servicio (`../insumos-crud.service.ts`) ya está completo: tu trabajo es
 * la UI (Pasos 1, 3, 4, 5 y 7 acá; Pasos 2 y 6 en `dialogo-editor.ts`).
 */
@Component({
  selector: 'abm-page',
  imports: [CurrencyPipe, MatButtonModule, MatIconModule, MatPaginatorModule, MatTableModule],
  templateUrl: './abm-page.html',
  styleUrl: './abm-page.css',
})
export class AbmPage {
  private readonly servicio = inject(InsumosCrudService);

  // MatDialog y MatSnackBar son servicios providedIn: 'root' en Material v22:
  // no hace falta importar MatDialogModule/MatSnackBarModule acá para usarlos.
  private readonly dialogos = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  /** Lista completa de solo lectura (la muta el service con update()). */
  protected readonly lista = this.servicio.insumos;

  /** Columnas que renderiza la MatTable (en el orden que las querés). */
  protected readonly columnas = ['nombre', 'categoria', 'stock', 'precio', 'acciones'];

  /**
   * Estado del paginador: `pagina` es 0-based (así labura MatPaginator) y
   * `porPagina` es señal porque el usuario puede cambiarla desde el paginator.
   */
  protected readonly pagina = signal(0);
  protected readonly porPagina = signal(5);
  protected readonly opcionesPorPagina = [5, 10, 20];

  /** Total de filas: se lo pasamos al paginator para que pinte "1 – 5 de N". */
  protected readonly totalInsumos = computed(() => this.lista().length);

  // Ya está hecho: la ventana visible es un slice() de la lista, igual que la
  // paginación de la 05 pero con índice 0-based.
  protected readonly paginados = computed(() => {
    const inicio = this.pagina() * this.porPagina();
    return this.lista().slice(inicio, inicio + this.porPagina());
  });

  /**
   * Ya está hecho: aplica el payload que devuelve el diálogo.
   * ¿Alta o edición? Lo decide si la página conoce el id de la fila.
   */
  protected guardarDesdeDialogo(datos: InsumoNuevo, id: number | null): void {
    if (id === null) {
      this.servicio.alta(datos);
    } else {
      this.servicio.actualizar({ ...datos, id });
    }
  }

  // TODO: [Paso 1] - Abrir el diálogo de ALTA (y otro gemelo para edición en
  //   abrirEdicion). La forma Material, en contraste con el modal casero de la
  //   05 (que vivía siempre en la plantilla y hablaba con output()):
  //     this.dialogos
  //       .open(DialogoEditor, { data: { insumo: null }, width: '520px' })
  //       .afterClosed()
  //       .subscribe((datos: InsumoNuevo | undefined) => {
  //         if (datos) this.guardarDesdeDialogo(datos, null); // null = alta
  //       });
  //   El `if (datos)` importa: cerrar con Cancelar devuelve `undefined`.
  protected abrirNuevo(): void {}

  // TODO: [Paso 1] - Misma apertura pero para EDITAR: pasá la fila completa
  //   por data (`data: { insumo }`) y, cuando el diálogo devuelva el payload,
  //   llamá a guardarDesdeDialogo(datos, insumo.id).
  protected abrirEdicion(insumo: Insumo): void {}

  // TODO: [Paso 4] - Conectar el paginator con las signals. El evento `page`
  //   de la plantilla emite un PageEvent con `pageIndex` y `pageSize`:
  //     this.pagina.set(evento.pageIndex);
  //     this.porPagina.set(evento.pageSize);
  //   Con eso, el computed `paginados` se recalcula solo y la tabla cambia de
  //   página SIN recargar nada.
  protected alCambiarPagina(evento: PageEvent): void {}

  // TODO: [Paso 5] - Eliminar con feedback y "Deshacer" (nada de alert()):
  //     const eliminado = this.servicio.eliminar(insumo.id);
  //     const snackBarRef = this.snackBar.open(
  //       `«${insumo.nombre}» eliminado`,
  //       'Deshacer',
  //       { duration: 5000 }, // milisegundos: el criterio pide 5 segundos
  //     );
  //     snackBarRef.onAction().subscribe(() => {
  //       if (eliminado) this.servicio.reingresar(eliminado);
  //     });
  //   `onAction()` solo emite si el usuario toca "Deshacer" antes de que
  //   pasen los 5000 ms; vencido el plazo la baja queda firme.
  protected eliminar(insumo: Insumo): void {}

  // TODO: [Paso 7] - Confirmación con diálogo Material (sin confirm() de JS):
  //     this.dialogos
  //       .open(DialogoConfirmar, {
  //         data: {
  //           titulo: 'Eliminar insumo',
  //           mensaje: `¿Eliminar «${insumo.nombre}»? Podés deshacerlo durante 5 segundos.`,
  //         },
  //         width: '380px',
  //       })
  //       .afterClosed()
  //       .subscribe((confirmado: boolean | undefined) => {
  //         if (confirmado) this.eliminar(insumo);
  //       });
  //   DialogoConfirmar (./dialogo-confirmar.ts) ya está hecho: devuelve true,
  //   false o undefined (si lo cerraron con ESC) y acá seguimos solo con true.
  protected pedirEliminar(insumo: Insumo): void {}
}
