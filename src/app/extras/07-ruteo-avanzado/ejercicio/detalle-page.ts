import { Component, computed, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { buscarEmpleado } from '../empleados-mock';

/**
 * DETALLE — el parámetro de ruta ':id' llega como input (Paso 2) y las
 * pestañas viven en un query param ?tab= (Paso 4c). Mecánica en el README.
 */
@Component({
  selector: 'detalle-page',
  imports: [],
  template: `
    <main class="contenedor">
      @if (empleado(); as e) {
        <p class="id-linea">
          Legajo <strong>#{{ e.id }}</strong>
        </p>
        <h1>{{ e.nombre }}</h1>
        <p class="meta">{{ e.area }} · {{ e.seniority }}</p>

        <nav class="tabs" aria-label="Secciones de la ficha">
          @for (tab of e.tabs; track tab) {
            <button
              type="button"
              [class.activa]="tab === tabActiva()"
              [attr.aria-pressed]="tab === tabActiva()"
              (click)="seleccionarTab(tab)"
            >
              {{ tab }}
            </button>
          }
        </nav>

        <section class="contenido-tab">
          <p>
            Contenido de la pestaña <strong>{{ tabActiva() }}</strong
            >.
          </p>
        </section>
      } @else {
        <div class="vacio" role="alert">
          <h1>Empleado inexistente</h1>
          <p>
            No hay nadie con ID <strong>{{ id() }}</strong
            >.
          </p>
        </div>
      }

      <button type="button" class="volver" (click)="volverAlListado()">
        ← Volver al listado (conservando filtros)
      </button>
    </main>
  `,
  styles: `
    .contenedor {
      max-width: 640px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }
    .id-linea,
    .meta {
      color: var(--texto-suave);
    }
    h1 {
      margin: 0.25rem 0;
    }
    .tabs {
      display: flex;
      gap: 0.5rem;
      margin: 1.25rem 0 0.75rem;
    }
    .tabs button {
      border: 1px solid var(--borde);
      background: var(--superficie);
      color: var(--texto-suave);
      border-radius: 8px;
      padding: 0.4rem 0.8rem;
      font: inherit;
      font-weight: 600;
      cursor: pointer;
      transition:
        background-color 0.15s ease,
        border-color 0.15s ease,
        color 0.15s ease;
    }
    .tabs button:hover {
      border-color: var(--acento);
    }
    .tabs button.activa {
      background: var(--acento-suave);
      border-color: var(--acento);
      color: var(--acento);
    }
    .tabs button:focus-visible,
    .volver:focus-visible {
      outline: 2px solid var(--acento);
      outline-offset: 2px;
    }
    .contenido-tab {
      background: var(--superficie);
      border: 1px solid var(--borde);
      border-radius: 10px;
      box-shadow: var(--sombra-tarjeta);
      padding: 1rem;
    }
    .contenido-tab p {
      margin: 0;
    }
    .vacio {
      border: 1px solid var(--error-borde);
      background: var(--error-fondo);
      color: var(--error-fuerte);
      border-radius: 10px;
      padding: 1rem 1.25rem;
    }
    .volver {
      margin-top: 1.5rem;
      border: 1px solid var(--acento);
      background: var(--superficie);
      color: var(--acento);
      border-radius: 8px;
      padding: 0.45rem 0.9rem;
      font: inherit;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.15s ease;
    }
    .volver:hover {
      background: var(--acento-suave);
    }
  `,
})
export class DetallePage {
  private readonly router = inject(Router);

  /**
   * El ':id' de la ruta llega como input (string, porque todo parámetro de
   * URL es texto) gracias a withComponentInputBinding de app.config.ts.
   */
  // TODO: [Paso 2] - Ya está declarado acá abajo: leé el comentario y andá a
  //   /extras/07/detalle/9999 para ver que la vista se muestra igual (con el
  //   mensaje de inexistente). Después probá /extras/07/detalle/3.
  readonly id = input.required<string>();

  /** Filtros que viajaron desde el listado (queryParamsHandling="preserve"). */
  protected readonly q = input<string>();
  protected readonly area = input<string>();

  protected readonly empleado = computed(() => buscarEmpleado(Number(this.id())));

  // Pestaña activa: estado local del ejercicio. En la solución vive en la
  // URL (?tab=...) para sobrevivir a una recarga.
  protected readonly tabActiva = signal('resumen');

  protected seleccionarTab(tab: string): void {
    // Sin resolver el TODO esto deja la UI andando en memoria.
    this.tabActiva.set(tab);

    // TODO: [Paso 4c] - Sincronizar la pestaña con la URL:
    //   this.router.navigate(['/extras/07/detalle', this.id()], {
    //     queryParams: { tab },
    //     queryParamsHandling: 'merge', // conserva ?q= y ?area= del listado
    //   });
    //   Declarar tab = input<string>() y reemplazar tabActiva por un computed
    //   que lea tab() y valide el valor contra empleado()?.tabs. Quitá el set()
    //   de arriba: la pestaña pasará a derivarse de la URL. No leas inputs en
    //   el constructor: el router todavía no les asignó sus valores.
    //   Con eso, recargar /extras/07/detalle/3?tab=auditoria restaura el tab
    //   (criterio de aceptación de la práctica).
  }

  protected volverAlListado(): void {
    // TODO: [Paso 3] - Volver al listado con Router.navigate PRESERVANDO los
    //   filtros que viajaron acá como query params (q y area son inputs que
    //   ya llegan bindeados):
    //   this.router.navigate(['/extras/07'], {
    //     queryParams: { q: this.q() ?? null, area: this.area() ?? null },
    //   });
    //   Al aterrizar, el listado restaura los filtros en su Paso 4b: los
    //   resultados filtrados te esperan, como si nunca te hubieras ido.
    //   Diferencia clave con routerLink: navigate() es programático (lo
    //   decidís vos desde TypeScript, ideal tras un guardar o un login).
    console.warn('volverAlListado() sin implementar (Paso 3)');
  }
}
