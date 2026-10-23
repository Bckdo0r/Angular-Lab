import { Component, Type, computed, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import type { Route } from '@angular/router';
import { filter, map } from 'rxjs';

/** Conceptos principales de cada ejercicio, identificados por su ruta base. */
const DESCRIPCIONES_EJERCICIOS: Record<string, string> = {
  'tutorial/01':
    'Reconocé las partes de un componente Angular —clase, plantilla y estilos— y cómo trabajan juntas para mostrar contenido.',
  'tutorial/02':
    'Actualizá la clase TypeScript de un componente y usá interpolación para mostrar sus propiedades en la plantilla.',
  'tutorial/03':
    'Componé componentes reutilizables y aprendé a incluir un componente hijo en la plantilla de otro mediante su selector.',
  'tutorial/04':
    'Usá el bloque de control de flujo @if para mostrar contenido de forma condicional según el estado de la aplicación.',
  'tutorial/05':
    'Recorré colecciones con @for y usá track para que Angular identifique cada elemento de forma eficiente.',
  'tutorial/06': 'Enlazá propiedades del DOM con datos del componente mediante property binding.',
  'tutorial/07':
    'Respondé a las interacciones del usuario con event binding y métodos del componente.',
  'tutorial/08': 'Pasá datos desde un componente padre a uno hijo usando inputs.',
  'tutorial/09':
    'Comunicá un componente hijo con su padre mediante outputs y eventos personalizados.',
  'tutorial/10':
    'Diferí la carga de contenido con @defer y prepará estados alternativos con bloques como @placeholder.',
  'tutorial/11':
    'Optimizá la carga de imágenes estáticas con NgOptimizedImage y el atributo ngSrc.',
  'tutorial/12':
    'Conocé las piezas del Angular Router y cómo las rutas conectan URLs con páginas y componentes.',
  'tutorial/13':
    'Definí rutas hijas para navegar entre las páginas Home y User usando el Angular Router.',
  'tutorial/14':
    'Navegá entre páginas de una SPA con RouterLink y RouterOutlet, evitando recargas completas del navegador.',
  'tutorial/15':
    'Construí un formulario basado en plantilla y vinculá sus controles con el modelo de datos.',
  'tutorial/16':
    'Leé el valor de un control de formulario y usalo para actualizar lo que muestra la aplicación.',
  'tutorial/17':
    'Configurá formularios reactivos con controles y grupos definidos desde TypeScript.',
  'tutorial/18':
    'Validá controles de formularios reactivos y comunicá sus estados y errores en la interfaz.',
  'tutorial/19':
    'Convertí una clase en un servicio inyectable para centralizar y reutilizar lógica de la aplicación.',
  'tutorial/20':
    'Inyectá dependencias en un componente con inject() y usá un servicio desde su clase.',
  'tutorial/22':
    'Importá y aplicá pipes integrados para transformar valores directamente en una plantilla.',
  'tutorial/23':
    'Formateá números, fechas y monedas con parámetros de DecimalPipe, DatePipe y CurrencyPipe.',
  'tutorial/24':
    'Creá un pipe personalizado implementando transform() y aplicalo a un valor en la plantilla.',
  'extras/01':
    'Practicá la comunicación entre componentes con model() y un bus de eventos desacoplado usando RxJS.',
  'extras/02':
    'Construí formularios reactivos avanzados con FormGroup, estados de controles y validadores personalizados.',
  'extras/03':
    'Consultá datos con HttpClient y manejá parámetros, encabezados y errores HTTP de forma clara.',
  'extras/04':
    'Implementá autenticación con JWT, guards de acceso e interceptores para adjuntar el token a las peticiones.',
  'extras/05':
    'Armá un CRUD con filtrado, paginación, edición y confirmación de borrado mediante diálogos.',
  'extras/06':
    'Combiná operadores RxJS para buscar de forma asíncrona, cancelar solicitudes anteriores y representar estados de carga.',
  'extras/07':
    'Practicá rutas con parámetros, filtros en la URL, rutas hijas, páginas 404 y guards con canMatch.',
  'extras/08':
    'Usá Angular Material para construir una tabla paginada, editar en un diálogo y mostrar feedback con SnackBar.',
  'extras/09':
    'Gestioná estado global con NgRx: acciones, reducer inmutable, selectors y conexión con signals.',
  'extras/10':
    'Probá un servicio HTTP con TestBed y HttpTestingController, y un validador con pruebas de su regla de negocio.',
};

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
    @if (descripcion(); as texto) {
      <section class="descripcion-ejercicio" aria-labelledby="titulo-descripcion-ejercicio">
        <h2 id="titulo-descripcion-ejercicio">¿Qué practicás acá?</h2>
        <p>{{ texto }}</p>
      </section>
    }

    <section
      class="salida"
      [class.con-descripcion]="descripcion()"
      aria-label="Resultado del ejercicio"
    >
      <div class="salida-cabecera">
        <span class="salida-chip">Output</span>
      </div>
      <div class="salida-cuerpo">
        <router-outlet />
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }

    .descripcion-ejercicio {
      box-sizing: border-box;
      max-width: 1200px;
      margin: 1.5rem auto 0;
      padding: 0.9rem 1.1rem;
      border: 1px solid color-mix(in srgb, var(--deco-rosa) 28%, var(--borde));
      border-inline-start: 3px solid color-mix(in srgb, var(--deco-rosa) 55%, var(--acento));
      border-radius: 10px;
      background: color-mix(in srgb, var(--deco-rosa) 12%, var(--acento-suave));
    }

    .descripcion-ejercicio h2 {
      margin: 0 0 0.35rem;
      color: var(--acento);
      font-size: 0.98rem;
    }

    .descripcion-ejercicio p {
      margin: 0;
      color: var(--texto-suave);
      font-size: 0.9rem;
      line-height: 1.5;
    }

    .salida {
      margin: 1.5rem auto;
      max-width: 1200px;
      background: var(--superficie);
      border: 1px solid var(--borde);
      border-radius: 12px;
      box-shadow: var(--sombra-tarjeta);
      overflow: hidden;
    }

    .salida.con-descripcion {
      margin-top: 0.75rem;
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
export class SalidaDemo {
  private readonly router = inject(Router);

  /** URL activa como señal para actualizar el texto al navegar dentro de una práctica. */
  private readonly url = toSignal(
    this.router.events.pipe(
      filter((evento): evento is NavigationEnd => evento instanceof NavigationEnd),
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );

  /** Las soluciones y las páginas 404 no muestran la descripción del ejercicio. */
  protected readonly descripcion = computed(() => {
    const url = this.url().split(/[?#]/, 1)[0];
    if (url.split('/').includes('solucion') || this.esRutaNoEncontrada()) {
      return null;
    }

    const coincidencia = url.match(/^\/(tutorial|extras)\/(\d{2})(?:\/|$)/);
    if (!coincidencia) {
      return null;
    }

    return DESCRIPCIONES_EJERCICIOS[`${coincidencia[1]}/${coincidencia[2]}`] ?? null;
  });

  /** Detecta la ruta comodín de la práctica 07 para no describir un 404 como ejercicio. */
  private esRutaNoEncontrada(): boolean {
    const buscarComodin = (ruta: typeof this.router.routerState.snapshot.root | null): boolean =>
      ruta !== null && (ruta.routeConfig?.path === '**' || buscarComodin(ruta.firstChild));

    return buscarComodin(this.router.routerState.snapshot.root);
  }
}

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
export function salida(loadComponent: () => Promise<Type<unknown>>, title: string): Route {
  return {
    path: '',
    component: SalidaDemo,
    children: [{ path: '', loadComponent, title }],
  };
}
