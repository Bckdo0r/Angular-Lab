import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * SOLUCIÓN — PÁGINA DE AYUDA (versión resuelta de `../ejercicio/ayuda-page.ts`).
 *
 * Igual que la del ejercicio: texto estático, sin estado. Sirve para verificar
 * que el store de la solución (proveído en `../rutas.ts` a nivel de ruta con
 * `provideState(visorFeatureSolucion)`) sobrevive a la navegación interna de
 * `/extras/09/solucion`.
 */
@Component({
  selector: 'ayuda-page-solucion',
  imports: [RouterLink],
  template: `
    <main class="contenedor">
      <h1>¿Cómo funciona este store?</h1>

      <p class="bajada">
        Esta pantalla no tiene estado propio: es solo texto. Sirve para probar
        que el store de la solución sobrevive a la navegación interna.
      </p>

      <section class="tarjeta">
        <h2>El circuito completo</h2>
        <ol>
          <li>
            <strong>El usuario hace algo</strong> (tilda una capa, tipea un
            filtro) y el componente <em>emite una intención</em>:
            <code>store.dispatch(VisorActions.alternarCapa(&#123; id &#125;))</code>.
          </li>
          <li>
            <strong>El reducer</strong> (una función pura) recibe el estado y la
            acción y devuelve un estado NUEVO, sin mutar el anterior. Mirá la
            trampa del <code>push()</code> comentada en
            <code>solucion/visor.store.ts</code>: por qué mutar rompe la
            memoización y el time-travel.
          </li>
          <li>
            <strong>Los selectores memoizados</strong> recalculan solo lo que
            depende de lo que cambió (<code>selectCapasFiltradas</code>,
            <code>selectCapasVisibles</code>).
          </li>
          <li>
            <strong>El componente lee</strong> con
            <code>store.select(selector)</code> → <code>toSignal()</code> y la
            plantilla se actualiza sola.
          </li>
        </ol>
      </section>

      <section class="tarjeta">
        <h2>¿Por qué acá el filtro no se pierde?</h2>
        <p>
          El store se provee a nivel de <strong>ruta</strong>
          (<code>provideStore</code> + <code>provideState</code> en
          <code>rutas.ts</code>): mientras navegues entre rutas hijas de
          <code>/extras/09/solucion</code>, el inyector de la ruta padre sigue
          vivo y el estado también. Salí de la práctica y el estado vuelve a
          cero: el alcance de la ruta es el alcance del estado.
        </p>
      </section>

      <section class="tarjeta">
        <h2>¿Y los effects? (solo teoría)</h2>
        <p>
          Los <strong>effects</strong> de <code>&#64;ngrx/effects</code> manejan
          los efectos secundarios (HTTP, timers): escuchan acciones y disparan
          otras. <strong>No están instalados a propósito</strong>: devOSSE no
          los usa (no figuran en su <code>package.json</code>). En esta práctica
          son lectura: si hubieran que cargar las capas de un servidor, un
          effect escucharía <code>[Visor] Cargar Capas</code>, llamaría al
          servicio y despacharía <code>[Visor] Capas Cargadas</code> — el
          reducer seguiría siendo el único que toca el estado.
        </p>
      </section>

      <p><a routerLink="/extras/09/solucion">← Volver al visor (mirá el filtro: sigue ahí)</a></p>
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

    code {
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
export class AyudaPageSolucion {}
