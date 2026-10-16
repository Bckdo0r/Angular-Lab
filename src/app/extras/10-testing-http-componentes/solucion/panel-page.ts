import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProductosApiService, Producto } from '../productos-api.service';
import { stockMinimo } from '../validadores';

/**
 * SOLUCIÓN — Página de la práctica 10: demo en vivo del código de producción.
 *
 * Espejo de ../ejercicio/panel-page.ts (misma demo funcional del validador
 * `stockMinimo(5)` y del servicio `ProductosApiService`), más la aclaración
 * de que en esta práctica los specs de `solucion/` son la referencia para
 * comparar con los `it.todo` del ejercicio.
 */
@Component({
  selector: 'panel-page-solucion',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './panel-page.html',
  styleUrl: './panel-page.css',
})
export class PanelPageSolucion {
  private readonly api = inject(ProductosApiService);
  private readonly destroyRef = inject(DestroyRef);

  // ─── Demo 1: el validador stockMinimo(5) ───────────────────────────────
  /** Control con la regla de la práctica: el mínimo ES válido (5 pasa). */
  protected readonly stock = new FormControl<number | null>(3, {
    validators: [stockMinimo(5)],
  });

  /** Los valueChanges como signal: estado reactivo sin flags manuales. */
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
          // El catchError del servicio entrega un Error con mensaje amigable.
          this.error.set(err.message);
          this.probando.set(false);
        },
      });
  }
}
