import { Component, Type } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import type { Route } from '@angular/router';

/**
 * LAYOUT DE SALIDA — recuadro "Output" para páginas de resultado.
 *
 * Las lecciones del tutorial y las prácticas renderizan su resultado directo
 * en el <router-outlet /> global, "suelto" en la página. Este componente lo
 * enmarca en una tarjeta con un chip "Output" arriba: deja claro qué parte
 * de la pantalla es el resultado del código que se está editando.
 *
 * No se usa como wrapper por plantilla (serían ~70 componentes tocados):
 * las rutas lo referencian como componente de nivel superior y la página
 * real se pinta en SU <router-outlet /> interno. Como el nivel agregado
 * tiene `path: ''`, las URLs no cambian y los guards/redirects absolutos
 * siguen funcionando igual.
 *
 * Estilos con los tokens del sitio: adapta a claro/oscuro solo.
 */
@Component({
  selector: 'salida-demo',
  imports: [RouterOutlet],
  template: `
    <section class="salida" aria-label="Resultado del ejercicio">
      <div class="salida-cabecera">
        <span class="salida-chip">Output</span>
      </div>
      <div class="salida-cuerpo">
        <router-outlet />
      </div>
    </section>
  `,
  styles: `
    .salida {
      margin: 1.5rem auto;
      max-width: 1200px;
      background: var(--superficie);
      border: 1px solid var(--borde);
      border-radius: 12px;
      box-shadow: var(--sombra-tarjeta);
      overflow: hidden;
    }

    /* Barra superior tipo "ventana de salida": chip a la izquierda. */
    .salida-cabecera {
      display: flex;
      align-items: center;
      padding: 0.45rem 0.9rem;
      border-bottom: 1px solid var(--borde);
      background: color-mix(in srgb, var(--acento-suave) 55%, transparent);
    }

    .salida-chip {
      font-family: ui-monospace, 'Cascadia Code', Consolas, monospace;
      font-size: 0.68rem;
      font-weight: 600;
      letter-spacing: 0.09em;
      text-transform: uppercase;
      color: var(--texto-suave);
      user-select: none;
    }

    .salida-cuerpo {
      padding: 1.25rem;
    }
  `,
})
export class SalidaDemo {}

/**
 * Helper de ruta: envuelve un `loadComponent` en el recuadro "Output".
 *
 * Devuelve la ruta hija `path: ''` que monta `SalidaDemo` y pinta la página
 * real dentro. Uso en las rutas planas:
 *
 *   {
 *     path: 'tutorial/01',
 *     children: [salida(() => import('...').then((m) => m.Leccion01), 'Título')],
 *   },
 *
 * Para rutas que YA tienen `children` (sub-layouts de la 04/07/09 o las
 * lecciones 12/14), no se usa este helper: se pone `component: SalidaDemo`
 * en la ruta padre y el contenido original se anida bajo un `path: ''`.
 */
export function salida(
  loadComponent: () => Promise<Type<unknown>>,
  title: string,
): Route {
  return {
    path: '',
    component: SalidaDemo,
    children: [{ path: '', loadComponent, title }],
  };
}
