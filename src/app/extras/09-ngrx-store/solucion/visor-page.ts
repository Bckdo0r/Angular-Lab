import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { CapaVisor, VisorActions } from '../visor.store';
import { visorFeatureSolucion as visorFeature } from './visor.store';

/**
 * SOLUCIÓN — PÁGINA DEL VISOR (versión resuelta de `../ejercicio/visor-page.ts`).
 *
 * El componente sigue "sin estado": lee del store con selectores y solo emite
 * intenciones con `dispatch`. Todo el trabajo pesado (reducer puro, memoización,
 * trampa del `push()`) está comentado en `./visor.store.ts`.
 */
@Component({
  selector: 'visor-page-solucion',
  imports: [RouterLink],
  templateUrl: './visor-page.html',
  styleUrl: './visor-page.css',
})
export class VisorPageSolucion {
  protected readonly store = inject(Store);

  // ── El puente NgRx → signals (Paso 4 resuelto) ───────────────────────────
  //
  // `store.select()` devuelve Observables (recordá la 06); `toSignal()` los
  // convierte en signals para la plantilla. Cada señal de acá se actualiza
  // SOLA cuando el reducer produce un estado nuevo — nunca se escribe a mano.

  /** Capas que pasan el filtro. Selector derivado y MEMOIZADO: mientras no
   *  cambien `capas` ni `filtro`, `createSelector` devuelve el resultado
   *  guardado sin recalcular (el equivalente global de `computed()`). */
  protected readonly capasFiltradas = toSignal(
    this.store.select(visorFeature.selectCapasFiltradas),
    { initialValue: [] as CapaVisor[] },
  );

  /** Capas visibles: otro selector memoizado (Paso 3). Se usa para el
   *  contador del encabezado — fijate que NO es un `filter()` en el template:
   *  el estado derivado vive en el store, no en la vista. */
  protected readonly capasVisibles = toSignal(this.store.select(visorFeature.selectCapasVisibles), {
    initialValue: [] as CapaVisor[],
  });

  /** Texto del filtro tal cual lo escribió el usuario (el trim/minúsculas son
   *  del selector, no del estado — mirá el comentario en `setFiltro`). */
  protected readonly filtro = toSignal(this.store.select(visorFeature.selectFiltro), {
    initialValue: '',
  });

  /** ID de la capa seleccionada — el ID, no el objeto (mirá el comentario del
   *  reducer: resolver el objeto a la hora de LEER evita datos desactualizados). */
  protected readonly seleccionadaId = toSignal(
    this.store.select(visorFeature.selectSeleccionadaId),
    { initialValue: null as number | null },
  );

  // ── El componente solo EMITE INTENCIONES (Paso 5 resuelto) ───────────────
  //
  // Cada método arma la acción y la despacha, nada más. Ni un `if` de lógica
  // de negocio: decidir el nuevo estado es trabajo del REDUCER, y el filtro en
  // sí es trabajo del SELECTOR.

  protected alternarCapa(id: number): void {
    this.store.dispatch(VisorActions.alternarCapa({ id }));
  }

  protected alTipearFiltro(event: Event): void {
    const texto = (event.target as HTMLInputElement).value;
    this.store.dispatch(VisorActions.setFiltro({ filtro: texto }));
  }

  protected seleccionarCapa(id: number): void {
    this.store.dispatch(VisorActions.seleccionarCapa({ id }));
  }

  protected restablecer(): void {
    this.store.dispatch(VisorActions.restablecer());
  }
}
