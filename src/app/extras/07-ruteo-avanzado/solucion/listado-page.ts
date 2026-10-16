import { Component, computed, inject, input, linkedSignal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AREAS, EMPLEADOS } from '../empleados-mock';

/**
 * SOLUCIÓN — listado con filtros que viven en la URL.
 *
 * Dos ideas clave:
 * 1. ESCRIBIR (Paso 4a): aplicarFiltros() navega con Router.navigate y
 *    queryParams → la URL queda /extras/07/solucion?q=ana&area=QA. Esa URL
 *    es compartible: abrila en otra pestaña y los filtros reaparecen.
 * 2. LEER (Paso 4b): no hay "leer al iniciar y copiar a signals sueltas" —
 *    los query params llegan bindeados como inputs (withComponentInputBinding,
 *    configuración global en app.config.ts) y los inputs del formulario se
 *    sincronizan con linkedSignal: se computan desde la URL pero se pueden
 *    setear localmente mientras el usuario tipea.
 *
 * El listado mostrado se deriva SIEMPRE de q()/area() (la URL), nunca del
 * texto a medio tipear: así lo que ves es exactamente lo que el link
 * compartido va a mostrar.
 */
@Component({
  selector: 'listado-page-solucion',
  imports: [RouterLink],
  templateUrl: './listado-page.html',
  styleUrl: './listado-page.css',
})
export class ListadoPageSolucion {
  private readonly router = inject(Router);

  protected readonly areas = AREAS;
  protected readonly empleados = EMPLEADOS;

  /** Query params bindeados por withComponentInputBinding (app.config.ts). */
  protected readonly q = input<string>();
  protected readonly area = input<string>();

  /**
   * linkedSignal: estado local que se reinicia cuando su fuente (el query
   * param) cambia. Si el usuario llega con ?q=ana, el input del formulario
   * nace con "ana"; mientras tipea, set() manda; si la URL cambia, vuelve a
   * computarse. Es el pegamento exacto para "input controlado por la URL".
   */
  protected readonly texto = linkedSignal(() => this.q() ?? '');
  protected readonly areaFiltro = linkedSignal(() => this.area() ?? '');

  // Derivado de la URL, no del texto en edición: ver = compartir.
  protected readonly filtrados = computed(() => {
    const texto = (this.q() ?? '').trim().toLowerCase();
    const area = this.area() ?? '';
    return this.empleados.filter(
      (empleado) =>
        (!texto || empleado.nombre.toLowerCase().includes(texto)) &&
        (!area || empleado.area === area),
    );
  });

  protected cambiarTexto(valor: string): void {
    this.texto.set(valor);
  }

  protected cambiarArea(valor: string): void {
    this.areaFiltro.set(valor);
  }

  /**
   * Paso 4a (solución): escribir los filtros en la URL. Con `null` el
   * query param se elimina en vez de quedar vacío (?q= ensucia el link).
   */
  protected aplicarFiltros(): void {
    this.router.navigate(['/extras/07/solucion'], {
      queryParams: {
        q: this.texto().trim() || null,
        area: this.areaFiltro() || null,
      },
    });
  }

  protected limpiarFiltros(): void {
    this.texto.set('');
    this.areaFiltro.set('');
    this.router.navigate(['/extras/07/solucion'], {
      queryParams: { q: null, area: null },
    });
  }
}
