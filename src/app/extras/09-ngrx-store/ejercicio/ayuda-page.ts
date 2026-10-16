import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { CapaVisor, visorFeature } from '../visor.store';

/**
 * PÁGINA DE AYUDA de la práctica 09 — panel de estado del store.
 *
 * Muestra EN VIVO el estado actual del feature `visor` (capas con su
 * visibilidad, filtro activo y capa seleccionada), leído con los selectors
 * generados por `createFeature` (`selectCapas`, `selectFiltro`,
 * `selectSeleccionadaId`) puenteados a signals con `toSignal()`.
 *
 * Existe por un motivo didáctico: es una RUTA INTERNA de /extras/09 para
 * verificar que el store sobrevive a las navegaciones dentro de la práctica
 * (el store vive en el provider de la ruta padre, no del componente). Navegá
 * acá, volvé al visor, y el filtro sigue ahí.
 */
@Component({
  selector: 'ayuda-page',
  imports: [RouterLink],
  template: `
    <main class="contenedor">
      <h1>Estado del store</h1>

      <p class="bajada">
        Vista en vivo del estado NgRx del visor, leída con los selectors del feature
        (<code>selectCapas</code>, <code>selectFiltro</code>, <code>selectSeleccionadaId</code>).
      </p>

      <section class="tarjeta">
        <h2>Filtro activo</h2>
        @if (filtro()) {
          <code class="valor">{{ filtro() }}</code>
        } @else {
          <span class="vacio">Sin filtro aplicado.</span>
        }
      </section>

      <section class="tarjeta">
        <h2>Capa seleccionada</h2>
        @if (seleccionada(); as capa) {
          <p class="linea">
            <span class="nombre">{{ capa.nombre }}</span>
            <code class="valor">id {{ capa.id }}</code>
          </p>
        } @else {
          <span class="vacio">Ninguna capa seleccionada.</span>
        }
      </section>

      <section class="tarjeta">
        <h2>Capas ({{ capas().length }})</h2>
        <ul class="capas">
          @for (capa of capas(); track capa.id) {
            <li [class.activa]="capa.id === seleccionadaId()" [class.oculta]="!capa.visible">
              <span class="nombre">{{ capa.nombre }}</span>
              <span class="estado">{{ capa.visible ? 'visible' : 'oculta' }}</span>
              @if (capa.id === seleccionadaId()) {
                <span class="marca">✓ seleccionada</span>
              }
            </li>
          } @empty {
            <li class="vacio">El store no tiene capas.</li>
          }
        </ul>
      </section>

      <p><a routerLink="/extras/09">← Volver al visor</a></p>
    </main>
  `,
  styles: `
    .contenedor {
      max-width: 680px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }

    h1 {
      margin: 0 0 0.5rem;
    }

    .bajada {
      color: var(--texto-suave);
      line-height: 1.6;
    }

    .tarjeta {
      background: var(--superficie);
      border: 1px solid var(--borde);
      border-radius: 12px;
      box-shadow: var(--sombra-tarjeta);
      padding: 1rem 1.25rem;
      margin: 1rem 0;
      line-height: 1.6;
    }

    .tarjeta h2 {
      margin: 0 0 0.5rem;
      font-size: 1rem;
    }

    .capas {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .capas li {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.4rem 0.5rem;
      border-radius: 8px;
    }

    .capas li.activa {
      background: var(--acento-suave);
    }

    /* Capa oculta: nombre atenuado para leer el estado de un vistazo. */
    .capas li.oculta .nombre {
      color: var(--texto-suave);
      font-weight: 500;
    }

    .linea {
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .nombre {
      font-weight: 600;
      flex: 1;
    }

    .estado {
      color: var(--texto-suave);
      font-size: 0.85rem;
      text-transform: uppercase;
    }

    .marca {
      color: var(--acento);
      font-weight: 600;
      font-size: 0.85rem;
    }

    .vacio {
      color: var(--texto-suave);
      font-style: italic;
    }

    code.valor {
      background: var(--acento-suave);
      color: var(--acento);
      border-radius: 4px;
      padding: 0.1rem 0.35rem;
      font-size: 0.85em;
    }

    a {
      color: var(--acento);
      font-weight: 600;
    }

    a:focus-visible {
      outline: 2px solid var(--acento);
      outline-offset: 2px;
    }
  `,
})
export class AyudaPage {
  protected readonly store = inject(Store);

  /** Estado actual del store, leído por los selectors del feature. */
  protected readonly capas = toSignal(this.store.select(visorFeature.selectCapas), {
    initialValue: [] as CapaVisor[],
  });

  protected readonly filtro = toSignal(this.store.select(visorFeature.selectFiltro), {
    initialValue: '',
  });

  protected readonly seleccionadaId = toSignal(
    this.store.select(visorFeature.selectSeleccionadaId),
    { initialValue: null as number | null },
  );

  /** Derivado de lectura: el reducer guarda el ID, el objeto se resuelve acá. */
  protected readonly seleccionada = computed(
    () => this.capas().find((capa) => capa.id === this.seleccionadaId()) ?? null,
  );
}
