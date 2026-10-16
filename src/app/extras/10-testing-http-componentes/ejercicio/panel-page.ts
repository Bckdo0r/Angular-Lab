import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, JsonPipe, ReactiveFormsModule } from '@angular/forms';
import { ProductosApiService, Producto } from '../productos-api.service';
import { stockMinimo } from '../validadores';

/**
 * PÁGINA DE LA PRÁCTICA 10 — demo en vivo del código de producción.
 *
 * Acá NO hay consigna (esa vive en el README): la página muestra funcionando
 * las dos piezas que la práctica testea:
 *
 * 1. El validador `stockMinimo(5)` (`../validadores.ts`), montado en un
 *    `FormControl` real: escribí un valor y mirá la DATA que devuelve
 *    (`{ stockMinimo: { min: 5 } }` al rechazar, `null` al aceptar).
 * 2. El servicio `ProductosApiService` (`../productos-api.service.ts`):
 *    el botón llama a `listar()` y la página pinta sus tres estados
 *    (cargando / resultado / error). El backend falso del proyecto no sirve
 *    `/api/productos`, así que el `catchError` del servicio mapea el fallo
 *    al mensaje amigable: es el comportamiento programado, en vivo.
 */
@Component({
  selector: 'panel-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './panel-page.html',
  styleUrl: './panel-page.css',
})
export class PanelPage {
  private readonly api = inject(ProductosApiService);
  private readonly destroyRef = inject(DestroyRef);

  // ─── Demo 1: el validador stockMinimo(5) ───────────────────────────────
  /** Control con la regla de la práctica: el mínimo ES válido (5 pasa). */
  protected readonly stock = new FormControl<number | null>(3, {
    validators: [stockMinimo(5)],
  });

  /** Los valueChanges como signal: así el estado del control es reactivo
   *  y el template se repinta sin flags manuales (OnPush friendly). */
  private readonly cambios = toSignal(this.stock.valueChanges, {
    initialValue: this.stock.value,
  });

  /** La DATA que devuelve el validador: `{ stockMinimo: { min } }` o `null`. */
  protected readonly errores = computed(() => {
    this.cambios(); // dependencia reactiva: recalcula en cada tipeo
    return this.stock.errors;
  });

  // ─── Demo 2: el servicio en vivo ───────────────────────────────────────
  protected readonly probando = signal(false);
  protected readonly productos = signal<Producto[] | null>(null);
  protected readonly error = signal<string | null>(null);

  /** Llama a `listar()` UNA vez: el guard de `probando()` bloquea el doble click. */
  protected probarListar(): void {
    if (this.probando()) {
      return;
    }

    this.probando.set(true);
    this.productos.set(null);
    this.error.set(null);

    this.api
      .listar()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (lista) => {
          this.productos.set(lista);
          this.probando.set(false);
        },
        error: (err: Error) => {
          // El catchError del servicio entrega un Error con mensaje amigable:
          // esto que se pinta acá es el comportamiento programado.
          this.error.set(err.message);
          this.probando.set(false);
        },
      });
  }
}
