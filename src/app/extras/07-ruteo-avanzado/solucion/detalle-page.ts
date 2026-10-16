import { Component, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { buscarEmpleado } from '../empleados-mock';

/**
 * SOLUCIÓN — detalle con ID por input() (Paso 2) y pestañas en la URL.
 *
 * Tres query params conviven acá y TODOS llegan como inputs gracias a la
 * configuración global withComponentInputBinding de app.config.ts:
 * - ':id' (parámetro de ruta) → `id = input.required<string>()`
 * - '?q' y '?area' (filtros heredados del listado) → inputs opcionales
 * - '?tab' (pestaña activa) → input opcional
 *
 * El estado de la pestaña NO es una signal suelta: es la URL. Por eso
 * recargar /extras/07/solucion/detalle/7?tab=auditoria restaura el tab, y
 * cambiar de pestaña es, literalmente, navegar.
 */
@Component({
  selector: 'detalle-page-solucion',
  imports: [],
  template: `
    <main class="contenedor">
      @if (empleado(); as e) {
        <p class="id-linea">
          El ID llegó por <code>input()</code>, no por subscribe: <strong>#{{ e.id }}</strong>
        </p>
        <h1>{{ e.nombre }}</h1>
        <p class="meta">{{ e.area }} · {{ e.seniority }}</p>

        <nav class="tabs" aria-label="Secciones de la ficha">
          @for (tab of e.tabs; track tab) {
            <button
              type="button"
              [class.activa]="tab === tabActual()"
              [attr.aria-pressed]="tab === tabActual()"
              (click)="seleccionarTab(tab)"
            >
              {{ tab }}
            </button>
          }
        </nav>

        <section class="contenido-tab">
          <h3>Sección «{{ tabActual() }}»</h3>
          <ul>
            @for (linea of contenido(); track linea) {
              <li>{{ linea }}</li>
            }
          </ul>
          <p class="pista">
            Recargá la página: la pestaña se mantiene porque vive en la URL
            (<code>?tab={{ tabActual() }}</code>).
          </p>
        </section>
      } @else {
        <div class="vacio" role="alert">
          <h1>Empleado inexistente</h1>
          <p>
            No hay nadie con ID <strong>{{ id() }}</strong>. Probá con un ID del 1 al 6.
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
    .meta,
    .pista {
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
      transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
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
    .contenido-tab h3 {
      margin-top: 0;
      text-transform: capitalize;
    }
    .pista {
      font-size: 0.85rem;
      margin-bottom: 0;
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
export class DetallePageSolucion {
  private readonly router = inject(Router);

  /**
   * Paso 2 (solución): el ':id' de la ruta llega como input requerido, sin
   * ActivatedRoute ni subscribe. Si la URL cambia a otro ID, el input se
   * actualiza y todos los computed se recalculan solos.
   */
  readonly id = input.required<string>();

  /** Query params bindeados por withComponentInputBinding (app.config.ts). */
  protected readonly q = input<string>();
  protected readonly area = input<string>();
  protected readonly tab = input<string>();

  protected readonly empleado = computed(() => buscarEmpleado(Number(this.id())));

  /**
   * Pestaña efectiva: la pedida por ?tab=, validada contra las pestañas del
   * empleado (si la URL trae ?tab=inexistente, cae a la primera sin romper).
   */
  protected readonly tabActual = computed(() => {
    const tabs = this.empleado()?.tabs ?? [];
    const pedida = this.tab() ?? 'resumen';
    return tabs.includes(pedida) ? pedida : (tabs[0] ?? '');
  });

  // Contenido de la pestaña activa (datos falsos: esto es ruteo, no HTTP).
  protected readonly contenido = computed<readonly string[]>(() => {
    const empleado = this.empleado();
    if (!empleado) {
      return [];
    }
    switch (this.tabActual()) {
      case 'proyectos':
        return ['Rediseño del portal interno', 'Migración del legado (fase 2)', 'Hackathon trimestral'];
      case 'auditoria':
        return [
          '2026-02-03 09:12 — Inicio de sesión desde oficina',
          '2026-02-10 14:40 — Acceso al panel de su área',
          '2026-02-18 11:05 — Exportación de reporte mensual',
        ];
      default:
        return [
          `Ficha resumen de ${empleado.nombre}.`,
          `Área: ${empleado.area} · Seniority: ${empleado.seniority}.`,
          'Usá las pestañas de arriba: cada una es un query param ?tab=.',
        ];
    }
  });

  /**
   * Paso 4c (solución): cambiar de pestaña = navegar a la misma ruta con
   * otro ?tab=. merge conserva ?q= y ?area= que viajaron del listado.
   */
  protected seleccionarTab(tab: string): void {
    this.router.navigate(['/extras/07/solucion/detalle', this.id()], {
      queryParams: { tab },
      queryParamsHandling: 'merge',
    });
  }

  /**
   * Paso 3 (solución): volver al listado con Router.navigate reenviando los
   * filtros que llegaron como query params. El listado los restaura solo
   * (sus inputs se rebindean) y ves los resultados filtrados otra vez.
   */
  protected volverAlListado(): void {
    this.router.navigate(['/extras/07/solucion'], {
      queryParams: { q: this.q() ?? null, area: this.area() ?? null },
    });
  }
}
