import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * ICONO SVG — ícono vectorial en línea, al estilo de angular.dev
 * (trazo redondeado, monocromo, hereda el color del texto con `currentColor`).
 *
 * Reemplaza a los emojis del "chrome" de la interfaz (navegación, tarjetas,
 * botones de estado) para que la página se vea más profesional y consistente
 * en todos los sistemas operativos.
 *
 * Uso: `<icono-svg nombre="libro" [tamano]="18" />`
 *
 * Cada ícono es una lista de trazos `d` expresados como paths (los círculos se
 * dibujan con arcos), lo que evita recurrir a `innerHTML` y al bypass del
 * sanitizador de Angular.
 */
export type IconoNombre =
  | 'libro'
  | 'frasco'
  | 'sol'
  | 'luna'
  | 'bombilla'
  | 'cohete'
  | 'refrescar'
  | 'prohibido'
  | 'exito'
  | 'error'
  | 'copiar'
  | 'verificado';

const RUTAS: Record<IconoNombre, string[]> = {
  // Libro abierto (sección Tutorial)
  libro: [
    'M4 19.5A2.5 2.5 0 0 1 6.5 17H20',
    'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z',
  ],
  // Frasco de laboratorio (sección Prácticas)
  frasco: [
    'M10 2v7.5a2 2 0 0 1-.2.9L4.7 20.5a1 1 0 0 0 .9 1.5h12.8a1 1 0 0 0 .9-1.5L14.2 10.4a2 2 0 0 1-.2-.9V2',
    'M8.5 2h7',
    'M7 16h10',
  ],
  // Sol (modo claro disponible)
  sol: [
    'M12 8a4 4 0 1 0 0 8 4 4 0 1 0 0-8',
    'M12 2v2',
    'M12 20v2',
    'M4.9 4.9l1.4 1.4',
    'M17.7 17.7l1.4 1.4',
    'M2 12h2',
    'M20 12h2',
    'M6.3 17.7l-1.4 1.4',
    'M19.1 4.9l-1.4 1.4',
  ],
  // Luna (modo oscuro disponible)
  luna: ['M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z'],
  // Bombilla (ideas / sugerencias)
  bombilla: [
    'M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5',
    'M9 18h6',
    'M10 22h4',
  ],
  // Cohete (próximos pasos / explorar)
  cohete: [
    'M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 0 0-2.9-.1z',
    'M12 15l-3-3a22 22 0 0 1 2-4A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22 22 0 0 1-4 2z',
    'M9 12H4s.6-3 2-4c1.6-1.1 5 0 5 0',
    'M12 15v5s3-.6 4-2c1.1-1.6 0-5 0-5',
  ],
  // Flecha circular (reiniciar)
  refrescar: [
    'M3 12a9 9 0 0 1 15.7-6L21 8',
    'M21 3v5h-5',
    'M21 12a9 9 0 0 1-15.7 6L3 16',
    'M3 21v-5h5',
  ],
  // Círculo tachado (no disponible)
  prohibido: ['M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20', 'M4.9 4.9l14.2 14.2'],
  // Círculo con tilde (operación exitosa)
  exito: ['M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20', 'M9 12l2 2 4-4'],
  // Círculo con cruz (error)
  error: ['M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20', 'M15 9l-6 6', 'M9 9l6 6'],
  // Dos rectángulos superpuestos (copiar)
  copiar: [
    'M8 8h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2z',
    'M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2',
  ],
  // Círculo con tilde corto (copiado con éxito)
  verificado: ['M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20', 'M20 6 9 17l-5-5'],
};

@Component({
  selector: 'icono-svg',
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.width]="tamano()"
      [attr.height]="tamano()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      @for (trazo of trazos(); track $index) {
        <path [attr.d]="trazo" />
      }
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
      line-height: 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconoSvg {
  /** Nombre del ícono a mostrar. */
  readonly nombre = input.required<IconoNombre>();

  /** Lado del cuadrado contenedor, en píxeles. */
  readonly tamano = input<number>(18);

  /** Trazos del ícono elegido, resueltos de forma reactiva. */
  protected readonly trazos = computed(() => RUTAS[this.nombre()]);
}
