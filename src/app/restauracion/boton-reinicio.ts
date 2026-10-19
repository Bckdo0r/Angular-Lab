import { booleanAttribute, Component, computed, DestroyRef, inject, input, signal } from '@angular/core';
import { IconoSvg } from '../compartido/icono-svg';

/**
 * Botón que copia el comando de restauración adecuado para ejecutarlo desde
 * la raíz del proyecto, sin depender de APIs exclusivas de un navegador.
 */
@Component({
  selector: 'reinicio-boton',
  imports: [IconoSvg],
  template: `
    <button
      type="button"
      class="disparador"
      [class.compacto]="compacto()"
      [disabled]="copiando()"
      [attr.aria-label]="etiquetaAccesible()"
      [title]="etiquetaAccesible()"
      (click)="copiarComando()"
    >
      <icono-svg nombre="refrescar" [tamano]="14" />
      @if (!compacto()) {
        <span>{{ etiqueta() }}</span>
      }
    </button>

    @if (mensaje(); as textoMensaje) {
      <div
        class="aviso-copiado"
        [class.error]="!copiaExitosa()"
        [attr.role]="copiaExitosa() ? 'status' : 'alert'"
        aria-atomic="true"
      >
        @if (copiaExitosa()) {
          <icono-svg nombre="exito" [tamano]="15" />
          {{ textoMensaje }}
        } @else {
          <icono-svg nombre="error" [tamano]="15" />
          {{ textoMensaje }} <code>{{ comandoRestore() }}</code>
        }
      </div>
    }
  `,
  styles: `
    :host {
      display: inline-flex;
    }

    .disparador {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.35rem 0.7rem;
      border: 1px solid var(--borde);
      border-radius: 8px;
      background: var(--superficie);
      color: var(--texto);
      font: inherit;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      transition:
        border-color 0.15s ease,
        color 0.15s ease,
        background-color 0.15s ease;
    }

    .disparador.compacto {
      padding: 0.15rem 0.45rem;
      border: none;
      background: transparent;
      font-size: 0.85rem;
    }

    .disparador:hover:not(:disabled) {
      border-color: var(--acento);
      color: var(--acento);
      background: var(--acento-suave);
    }

    .disparador:focus-visible {
      outline: 2px solid var(--acento);
      outline-offset: 2px;
    }

    .disparador:disabled {
      opacity: 0.55;
      cursor: wait;
    }

    .aviso-copiado {
      position: fixed;
      inset-inline-end: 1rem;
      inset-block-end: 1rem;
      z-index: 1001;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
      max-width: min(32rem, calc(100vw - 2rem));
      margin: 0;
      padding: 0.75rem 1rem;
      border: 1px solid var(--exito-borde);
      border-radius: 10px;
      background: var(--exito-fondo);
      color: var(--texto);
      box-shadow: var(--sombra-tarjeta);
      line-height: 1.45;
    }

    .aviso-copiado.error {
      border-color: var(--error-borde);
      background: var(--error-fondo);
      color: var(--error);
    }

    .aviso-copiado code {
      overflow-wrap: anywhere;
    }
  `,
})
export class ReinicioBoton {
  /** Claves del ejercicio o ejercicios que se van a restaurar. */
  readonly claves = input.required<string[]>();

  /** Grupo completo para generar el comando corto de restauración. */
  readonly grupo = input<'tutorial' | 'extras' | null>(null);

  /** `true` para el botón de ícono que aparece junto a cada ejercicio. */
  readonly compacto = input(false, { transform: booleanAttribute });

  /** Texto visible del botón. */
  readonly etiqueta = input('Copiar comando de reinicio');

  protected readonly copiando = signal(false);
  protected readonly copiaExitosa = signal(false);
  protected readonly mensaje = signal<string | null>(null);

  protected readonly comandoRestore = computed(() => {
    const destino = this.grupo() ?? this.claves().join(' ');
    return `npm run restore -- ${destino}`;
  });

  protected readonly etiquetaAccesible = computed(() => {
    const grupo = this.grupo();
    if (grupo === 'tutorial') {
      return 'Copiar comando para reiniciar todo el tutorial';
    }
    if (grupo === 'extras') {
      return 'Copiar comando para reiniciar todas las prácticas';
    }
    return `Copiar comando para reiniciar ${this.claves().join(', ')}`;
  });

  private readonly destroyRef = inject(DestroyRef);
  private temporizadorMensaje: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this.destroyRef.onDestroy(() => this.limpiarTemporizador());
  }

  /** Copia el comando correspondiente y anuncia el resultado de forma accesible. */
  protected async copiarComando(): Promise<void> {
    if (this.copiando()) {
      return;
    }

    this.limpiarTemporizador();
    this.mensaje.set(null);
    this.copiando.set(true);

    try {
      const copiado = await this.copiarTexto(this.comandoRestore());
      this.copiaExitosa.set(copiado);
      this.mensaje.set(
        copiado
          ? 'Se copio comando de reinicio en el portapapeles'
          : 'No se pudo copiar automáticamente. Copiá este comando manualmente:',
      );
      this.temporizadorMensaje = setTimeout(
        () => this.mensaje.set(null),
        copiado ? 4000 : 10000,
      );
    } finally {
      this.copiando.set(false);
    }
  }

  /** Usa la API moderna y recurre a una copia compatible si no está disponible. */
  private async copiarTexto(texto: string): Promise<boolean> {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(texto);
        return true;
      } catch {
        // Algunos navegadores deniegan la API moderna; se intenta el método compatible.
      }
    }

    return this.copiarConSeleccion(texto);
  }

  /** Fallback para navegadores que no exponen Clipboard API o deniegan el permiso. */
  private copiarConSeleccion(texto: string): boolean {
    if (typeof document === 'undefined' || typeof document.execCommand !== 'function') {
      return false;
    }

    const campo = document.createElement('textarea');
    campo.value = texto;
    campo.setAttribute('readonly', '');
    campo.style.position = 'fixed';
    campo.style.insetInlineStart = '-9999px';
    campo.style.opacity = '0';
    document.body.appendChild(campo);

    try {
      campo.focus();
      campo.select();
      campo.setSelectionRange(0, texto.length);
      return document.execCommand('copy');
    } catch {
      return false;
    } finally {
      campo.remove();
    }
  }

  private limpiarTemporizador(): void {
    if (this.temporizadorMensaje !== null) {
      clearTimeout(this.temporizadorMensaje);
      this.temporizadorMensaje = null;
    }
  }
}
