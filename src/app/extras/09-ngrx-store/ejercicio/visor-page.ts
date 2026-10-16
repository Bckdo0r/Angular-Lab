import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { CapaVisor, VisorActions, visorFeature } from '../visor.store';

/**
 * PÁGINA DEL VISOR — el componente "sin estado".
 *
 * El componente NO guarda el estado de la pantalla: lo LEE del store
 * (`store.select(...)` → `toSignal()`) y lo CAMBIA pidiéndolo
 * (`store.dispatch(...)`). Es la misma regla de la práctica 01 — el componente
 * no muta, pide — pero ahora el "quién" es NgRx, no un servicio con signals.
 *
 * La plantilla y los estilos ya están maquetados; tu trabajo está acá
 * (Pasos 4 y 5) y en `../visor.store.ts` (Pasos 2 y 3).
 */
@Component({
  selector: 'visor-page',
  imports: [RouterLink],
  templateUrl: './visor-page.html',
  styleUrl: './visor-page.css',
})
export class VisorPage {
  /** El store es el único "estado" de esta pantalla: se inyecta y listo. */
  protected readonly store = inject(Store);

  // ── PASO 4: el puente NgRx → signals ─────────────────────────────────────
  //
  // `store.select(selector)` devuelve un OBSERVABLE (eso hereda de la
  // práctica 06), pero la plantilla moderna come SIGNALS. El puente obligatorio
  // es `toSignal()`: convierte el Observable del store en una signal que la
  // plantilla lee como cualquier otra.
  //
  // EJEMPLO resuelto — capas ya filtradas por el selector memoizado:
  protected readonly capasFiltradas = toSignal(
    this.store.select(visorFeature.selectCapasFiltradas),
    { initialValue: [] as CapaVisor[] },
  );

  // TODO: [Paso 4] - Mismo puente para el filtro: reemplazá el placeholder de
  //   abajo por una signal alimentada por el store:
  //   toSignal(this.store.select(visorFeature.selectFiltro), { initialValue: '' })
  //   ¿Por qué y no una signal local? Porque el filtro debe SOBREVIVIR a la
  //   navegación (criterio de la práctica): si vive en el componente, al ir a
  //   /extras/09/ayuda y volver se pierde; si vive en el store de la ruta, no.
  protected readonly filtro = signal('');

  // TODO: [Paso 4] - Mismo puente para la selección:
  //   toSignal(this.store.select(visorFeature.selectSeleccionadaId), { initialValue: null })
  //   (con `null as number | null` en el initialValue).
  //   Y borrá el placeholder de abajo: ese valor local "no sabe" lo que pasó
  //   en el store.
  protected readonly seleccionadaId = signal<number | null>(null);

  // ── PASO 5: el componente solo EMITE INTENCIONES ─────────────────────────
  //
  // Ningún método de acá calcula ni muta nada: arman la acción y la despachan.
  // El "quién cambia el estado" es siempre el reducer (Paso 2).

  // EJEMPLO resuelto — seleccionar una capa:
  protected seleccionarCapa(id: number): void {
    this.store.dispatch(VisorActions.seleccionarCapa({ id }));
  }

  protected alternarCapa(id: number): void {
    // TODO: [Paso 5] - Emití la intención de prender/apagar la capa:
    //   this.store.dispatch(VisorActions.alternarCapa({ id }));
    //   Fijate que el checkbox de la plantilla YA está atado a `capa.visible`
    //   del store: no hace falta (ni corresponde) tocar la UI a mano.
  }

  protected alTipearFiltro(event: Event): void {
    // TODO: [Paso 5] - Emití la intención con el texto tipeado:
    //   const texto = (event.target as HTMLInputElement).value;
    //   this.store.dispatch(VisorActions.setFiltro({ filtro: texto }));
    //   El filtrado EN SÍ no ocurre acá: ocurre en el selector
    //   `selectCapasFiltradas` (Paso 3). El componente solo anuncia el cambio.
  }

  protected restablecer(): void {
    // TODO: [Paso 5] - Emití la intención de volver al estado inicial:
    //   this.store.dispatch(VisorActions.restablecer());
  }
}
