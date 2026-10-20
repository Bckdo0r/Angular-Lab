import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'navegacion-ejercicios',
  imports: [RouterLink],
  template: `
    @if (navegacion(); as destinos) {
      <nav aria-label="Navegación de ejercicios">
        @if (destinos.anterior; as anterior) {
          <a [routerLink]="anterior">Anterior</a>
        } @else {
          <button type="button" disabled>Anterior</button>
        }

        @if (destinos.solucionActiva) {
          <a class="alternar" [routerLink]="destinos.ejercicio">Volver al ejercicio</a>
        } @else if (destinos.solucion; as solucion) {
          <a class="alternar" [routerLink]="solucion">Ver solución</a>
        }

        @if (destinos.siguiente; as siguiente) {
          <a [routerLink]="siguiente">Siguiente</a>
        } @else {
          <button type="button" disabled>Siguiente</button>
        }
      </nav>
    }
  `,
  styles: `
    :host {
      display: block;
    }

    nav {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.75rem;
      max-width: 1200px;
      margin: 1.5rem auto;
      padding-inline: 1rem;
    }

    a,
    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 44px;
      box-sizing: border-box;
      padding: 0.6rem 1rem;
      border: 1px solid var(--borde);
      border-radius: 8px;
      background: var(--superficie);
      color: var(--texto);
      font: inherit;
      font-weight: 600;
      text-decoration: none;
      transition:
        background-color 0.15s ease,
        border-color 0.15s ease;
    }

    a:hover {
      background: var(--acento-suave);
      border-color: var(--acento);
    }

    a:focus-visible,
    button:focus-visible {
      outline: 2px solid var(--acento);
      outline-offset: 2px;
    }

    .alternar {
      color: var(--acento);
      border-color: var(--acento);
    }

    button:disabled {
      color: var(--texto-suave);
      cursor: not-allowed;
    }
  `,
})
export class NavegacionEjercicios {
  private readonly router = inject(Router);
  private readonly ultimaNavegacion = toSignal(
    this.router.events.pipe(filter((evento) => evento instanceof NavigationEnd)),
    { initialValue: null },
  );

  protected readonly navegacion = computed(() => {
    // Leer la señal vuelve a calcular los destinos cuando termina una navegación.
    this.ultimaNavegacion();
    const rutaActiva = this.router.routerState.snapshot.root.firstChild;
    const coincidencia = rutaActiva?.routeConfig?.path?.match(
      /^((tutorial|extras)\/\d{2})(?:\/|$)/,
    );
    if (!coincidencia) {
      return null;
    }

    // Las páginas no encontradas no son ejercicios, aunque su URL tenga ese prefijo.
    for (let ruta = rutaActiva; ruta; ruta = ruta.firstChild) {
      if (ruta.routeConfig?.path === '**') {
        return null;
      }
    }

    const [, ejercicio, seccion] = coincidencia;
    // Usar las rutas existentes evita inventar números o duplicar el catálogo.
    const ejercicios = this.router.config
      .map((ruta) => ruta.path ?? '')
      .filter((path) => new RegExp(`^${seccion}/\\d{2}$`).test(path))
      .sort();
    const indice = ejercicios.indexOf(ejercicio);
    if (indice === -1) {
      return null;
    }

    const solucion = `${ejercicio}/solucion`;
    const segmentos = this.router.parseUrl(this.router.url).root.children['primary']?.segments;
    return {
      ejercicio: `/${ejercicio}`,
      anterior: indice > 0 ? `/${ejercicios[indice - 1]}` : null,
      siguiente: indice < ejercicios.length - 1 ? `/${ejercicios[indice + 1]}` : null,
      solucion: this.router.config.some((ruta) => ruta.path === solucion) ? `/${solucion}` : null,
      solucionActiva: segmentos?.[2]?.path === 'solucion',
    };
  });
}
