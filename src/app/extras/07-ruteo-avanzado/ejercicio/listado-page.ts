import { Component, computed, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AREAS, EMPLEADOS } from '../empleados-mock';

/**
 * LISTADO — filtros que viven en la URL (query params).
 *
 * La mecánica completa (Paso 4):
 * - Escribir: cada vez que se "aplican" los filtros, Router.navigate los
 *   manda a la URL como query params (?q=ana&area=QA). Así el listado
 *   filtrado se puede COMPARTIR POR LINK.
 * - Leer: al iniciar el componente, los filtros se restauran desde los
 *   query params (que llegan bindeados como inputs por la configuración
 *   global withComponentInputBinding de app.config.ts).
 *
 * Mientras el Paso 4 esté sin resolver, el filtrado funciona igual (las
 * signals locales filtran en vivo), pero la URL no se entera: recargar o
 * compartir el link pierde los filtros. Ese es exactamente el problema
 * laboral que resuelve el paso.
 */
@Component({
  selector: 'listado-page',
  imports: [RouterLink],
  templateUrl: './listado-page.html',
  styleUrl: './listado-page.css',
})
export class ListadoPage {
  private readonly router = inject(Router);

  protected readonly areas = AREAS;
  protected readonly empleados = EMPLEADOS;

  /**
   * Query params bindeados por withComponentInputBinding (config global de
   * app.config.ts): si la URL es /extras/07?q=ana&area=QA, acá llegan.
   */
  protected readonly q = input<string>();
  protected readonly area = input<string>();

  // Estado local de los controles del formulario.
  protected readonly texto = signal('');
  protected readonly areaFiltro = signal('');

  // Listado mostrado: SIEMPRE derivado (computed), nunca un array mutado.
  protected readonly filtrados = computed(() => {
    const texto = this.texto().trim().toLowerCase();
    const area = this.areaFiltro();
    return this.empleados.filter(
      (empleado) =>
        (!texto || empleado.nombre.toLowerCase().includes(texto)) &&
        (!area || empleado.area === area),
    );
  });

  constructor() {
    // TODO: [Paso 4b] - Restaurar los filtros al iniciar el componente:
    //   1. this.texto.set(this.q() ?? '');
    //   2. this.areaFiltro.set(this.area() ?? '');
    //   Con eso, si abrís un link compartido tipo
    //   /extras/07?q=ana&area=Desarrollo, los controles del formulario
    //   reaparecen con esos valores (criterio de aceptación de la práctica).
    //   Ojo: q y area son inputs bindeados desde los query params por
    //   withComponentInputBinding — no hace falta ActivatedRoute ni subscribe.
  }

  protected cambiarTexto(valor: string): void {
    this.texto.set(valor);
  }

  protected cambiarArea(valor: string): void {
    this.areaFiltro.set(valor);
  }

  protected aplicarFiltros(): void {
    // TODO: [Paso 4a] - Escribir los filtros en la URL con query params:
    //   this.router.navigate(['/extras/07'], {
    //     queryParams: {
    //       q: this.texto().trim() || null,   // null = saca el param si está vacío
    //       area: this.areaFiltro() || null,
    //     },
    //   });
    //   Navegar con queryParams es lo que hace al listado "compartible":
    //   la URL queda /extras/07?q=ana&area=QA y sirve como link directo.
    //   No uses push() en signals ni filtres "a mano": la URL es la verdad.
    console.warn('aplicarFiltros() sin implementar (Paso 4a)');
  }

  protected limpiarFiltros(): void {
    // TODO: [Paso 4a] - Limpiar también la URL (misma navegación que
    //   aplicarFiltros pero con queryParams: { q: null, area: null }),
    //   además de resetear las signals locales:
    //   this.texto.set(''); this.areaFiltro.set('');
    console.warn('limpiarFiltros() sin implementar (Paso 4a)');
  }
}
