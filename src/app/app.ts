import { Component, computed, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { ReinicioBoton } from './restauracion/boton-reinicio';
import { TemaService } from './tema.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ReinicioBoton],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  /** Servicio de tema (claro/oscuro) inyectado para la plantilla. */
  protected readonly tema = inject(TemaService);

  private readonly router = inject(Router);

  /** URL actual como señal: se actualiza en cada navegación. */
  private readonly url = toSignal(
    this.router.events.pipe(
      filter((evento): evento is NavigationEnd => evento instanceof NavigationEnd),
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );

  /**
   * Clave del ejercicio visible en pantalla (`tutorial/10`, `extras/01`, …)
   * o `null` si la página actual no es un ejercicio reiniciable.
   */
  protected readonly claveEjercicio = computed(() => {
    const url = this.url();
    if (url.includes('/solucion')) {
      return null;
    }
    const coincidencia = url.match(/^\/(tutorial|extras)\/(\d{2})/);
    if (!coincidencia) {
      return null;
    }
    const [, seccion, numero] = coincidencia;
    // La lección 25 es de solo lectura: no tiene ejercicio que reiniciar.
    if (seccion === 'tutorial' && numero === '25') {
      return null;
    }
    return `${seccion}/${numero}`;
  });
}
