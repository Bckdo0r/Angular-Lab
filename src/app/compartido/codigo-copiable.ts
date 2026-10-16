import { ChangeDetectionStrategy, Component, OnDestroy, input, signal } from '@angular/core';
import { IconoSvg } from './icono-svg';

/**
 * COMANDO COPIABLE — bloque de código de consola con botón para copiarlo.
 *
 * Reemplaza al `<code class="cmd">` de la portada: muestra el comando tal cual
 * y agrega un botón que lo copia al portapapeles, con confirmación visual de
 * dos segundos. Incluye un fallback con `execCommand` para contextos sin la
 * Clipboard API (navegadores viejos o HTTP sin TLS).
 *
 * Uso: `<codigo-copiable comando="npm install" />`
 */
@Component({
  selector: 'codigo-copiable',
  imports: [IconoSvg],
  template: `
    <div class="bloque">
      <code>{{ comando() }}</code>
      <button
        type="button"
        class="copiar"
        (click)="copiar()"
        [class.copiado]="copiado()"
        [attr.aria-label]="
          copiado() ? 'Comando copiado al portapapeles' : 'Copiar comando al portapapeles'
        "
      >
        @if (copiado()) {
          <icono-svg nombre="verificado" [tamano]="14" />
          <span>¡Copiado!</span>
        } @else {
          <icono-svg nombre="copiar" [tamano]="14" />
          <span>Copiar</span>
        }
      </button>
    </div>
    <span class="anuncio" role="status">
      {{ copiado() ? 'Comando copiado al portapapeles' : '' }}
    </span>
  `,
  styles: `
    /* Bloque contenedor: comando a la izquierda, botón a la derecha */
    .bloque {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      padding: 0.55rem 0.85rem;
      border: 1px solid color-mix(in srgb, var(--acento) 18%, transparent);
      border-radius: 8px;
      background: var(--superficie);
    }

    code {
      flex: 1;
      min-width: 0;
      font-size: 0.88rem;
      white-space: pre-wrap;
      word-break: break-word;
      overflow-x: auto;
    }

    /* Botón de copiado con estados hover, activo y accesible por teclado */
    .copiar {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      flex-shrink: 0;
      padding: 0.3rem 0.6rem;
      border: 1px solid var(--borde);
      border-radius: 8px;
      background: transparent;
      color: var(--texto-suave);
      font-size: 0.78rem;
      font-weight: 600;
      cursor: pointer;
      transition:
        color 0.15s ease,
        border-color 0.15s ease,
        background-color 0.15s ease;
    }

    .copiar:hover {
      color: var(--acento);
      border-color: var(--acento);
      background: var(--acento-suave);
    }

    .copiar:focus-visible {
      outline: 2px solid var(--acento);
      outline-offset: 2px;
    }

    /* Estado de confirmación: confirma en verde del tema */
    .copiar.copiado {
      color: var(--exito-borde);
      border-color: var(--exito-borde);
      background: var(--exito-fondo);
    }

    /* Región aria-live invisible: anuncia el resultado a lectores de pantalla */
    .anuncio {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodigoCopiable implements OnDestroy {
  /** Comando de consola que se muestra y se copia. */
  readonly comando = input.required<string>();

  /** `true` durante dos segundos después de copiar, para confirmar en pantalla. */
  protected readonly copiado = signal(false);

  /** Temporizador que apaga la confirmación; se limpia al destruir el componente. */
  private temporizador: ReturnType<typeof setTimeout> | null = null;

  ngOnDestroy(): void {
    if (this.temporizador !== null) {
      clearTimeout(this.temporizador);
    }
  }

  /** Copia el comando al portapapeles, con fallback para contextos sin Clipboard API. */
  protected async copiar(): Promise<void> {
    const exito = await this.escribirPortapapeles(this.comando());
    if (exito) {
      this.confirmar();
    }
  }

  /** Enciende la confirmación por dos segundos, reiniciando el temporizador previo. */
  private confirmar(): void {
    this.copiado.set(true);
    if (this.temporizador !== null) {
      clearTimeout(this.temporizador);
    }
    this.temporizador = setTimeout(() => this.copiado.set(false), 2000);
  }

  /**
   * Intenta copiar con la Clipboard API y, si no está disponible o falla,
   * recurre al método clásico con un textarea oculto.
   */
  private async escribirPortapapeles(texto: string): Promise<boolean> {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(texto);
        return true;
      } catch {
        // Sin permiso o contexto inseguro: se intenta el fallback.
      }
    }
    return this.copiarConFallback(texto);
  }

  /** Copia de respaldo con `execCommand` (deprecado pero efectivo como último recurso). */
  private copiarConFallback(texto: string): boolean {
    const area = document.createElement('textarea');
    area.value = texto;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    try {
      return document.execCommand('copy');
    } catch {
      return false;
    } finally {
      document.body.removeChild(area);
    }
  }
}
