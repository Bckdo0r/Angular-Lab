import { booleanAttribute, Component, computed, inject, input, signal } from '@angular/core';
import { ResultadoRestauracion, RestauracionService } from './restauracion.service';
import { IconoSvg } from '../compartido/icono-svg';

/**
 * BOTÓN DE REINICIO — restaura el código original de un ejercicio (o de una
 * sección completa) sobrescribiendo los archivos del snapshot.
 *
 * Reutilizable en los índices del tutorial y de las prácticas:
 *  - Botón normal: reinicio general de la sección.
 *  - Botón compacto (solo el ícono de reinicio): reinicio de un solo ejercicio en cada fila.
 *
 * Antes de restaurar muestra un modal de confirmación propio (estilizado con
 * los tokens del tema) para que el usuario no borre su trabajo sin querer.
 */
@Component({
  selector: 'reinicio-boton',
  imports: [IconoSvg],
  template: `
    @if (cantidadArchivos() > 0) {
      @if (restauracion.soportado) {
        <button
          type="button"
          class="disparador"
          [class.compacto]="compacto()"
          [disabled]="restaurando()"
          (click)="abrir()"
        >
          <icono-svg nombre="refrescar" [tamano]="14" />
          @if (!compacto()) {
            <span>{{ etiqueta() }}</span>
          }
        </button>
      } @else if (compacto()) {
        <span
          class="sin-soporte compacto"
          title="Reinicio no disponible en este navegador: usá Chrome, Edge u Opera"
        >
          <icono-svg nombre="prohibido" [tamano]="15" />
        </span>
      } @else {
        <span class="sin-soporte">
          <icono-svg nombre="prohibido" [tamano]="15" /> Reinicio no disponible en este navegador
          (usá Chrome, Edge u Opera)
        </span>
      }

      @if (abierto()) {
        <div class="overlay" (click)="cerrar()">
          <div
            class="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="reinicio-titulo"
            (click)="$event.stopPropagation()"
          >
            <h2 id="reinicio-titulo">¿Restaurar el código original?</h2>

            <p>{{ textoDescripcion() }}</p>
            <p class="detalle">
              Se van a sobrescribir <strong>{{ cantidadArchivos() }} archivos</strong> con su
              versión inicial (los <code>TODO</code>s vuelven a estar sin resolver). El servidor de
              desarrollo recompila solo al guardar.
            </p>

            @switch (resultado()?.estado) {
              @case ('exito') {
                <p class="aviso exito" role="status">
                  <icono-svg nombre="exito" [tamano]="15" /> Listo: se restauraron
                  {{ archivosRestaurados() }} archivos.
                </p>
              }
              @case ('cancelado') {
                <p class="aviso" role="status">Operación cancelada, no se cambió nada.</p>
              }
              @case ('no-soportado') {
                <p class="aviso error" role="alert">
                  Tu navegador no soporta escribir archivos. Usá Chrome, Edge u Opera.
                </p>
              }
              @case ('error') {
                <p class="aviso error" role="alert">
                  <icono-svg nombre="error" [tamano]="15" /> {{ mensajeError() }}
                </p>
              }
            }

            <div class="acciones">
              <button type="button" class="secundario" (click)="cerrar()" autofocus>
                @if (resultado()?.estado === 'exito') {
                  Cerrar
                } @else {
                  Cancelar
                }
              </button>
              @if (!resultado()) {
                <button
                  type="button"
                  class="primario"
                  [disabled]="restaurando()"
                  (click)="confirmar()"
                >
                  @if (restaurando()) {
                    Restaurando…
                  } @else {
                    Sí, restaurar
                  }
                </button>
              }
            </div>
          </div>
        </div>
      }
    }
  `,
  styles: `
    /* Botón compacto: se integra a los links de cada fila de los índices */
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

    /* Aviso visible cuando el navegador no soporta escribir archivos */
    .sin-soporte {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.35rem 0.7rem;
      border: 1px dashed var(--borde);
      border-radius: 8px;
      color: var(--texto-suave);
      font-size: 0.85rem;
      white-space: nowrap;
    }

    .sin-soporte.compacto {
      padding: 0.15rem 0.45rem;
      border: none;
      cursor: help;
    }

    /* ─── Modal de confirmación ───────────────────────────────── */
    .overlay {
      position: fixed;
      inset: 0;
      background: rgb(0 0 0 / 0.55);
      display: grid;
      place-items: center;
      z-index: 20;
      padding: 1rem;
    }

    .modal {
      background: var(--superficie);
      color: var(--texto);
      border: 1px solid var(--borde);
      border-radius: 14px;
      box-shadow: var(--sombra-tarjeta);
      padding: 1.5rem;
      width: min(440px, 100%);
    }

    .modal h2 {
      margin: 0 0 0.75rem;
      font-size: 1.2rem;
    }

    .modal p {
      margin: 0 0 0.6rem;
      color: var(--texto-suave);
      line-height: 1.5;
      font-size: 0.92rem;
    }

    .modal code {
      font-size: 0.85em;
    }

    .aviso {
      border-radius: 8px;
      padding: 0.55rem 0.75rem;
      border: 1px solid var(--borde);
      background: var(--acento-suave);
      color: var(--texto);
    }

    .aviso.exito {
      border-color: var(--exito-borde);
      background: var(--exito-fondo);
    }

    .aviso.error {
      border-color: var(--error-borde);
      background: var(--error-fondo);
      color: var(--error);
    }

    .acciones {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
      margin-top: 1rem;
    }

    .acciones button {
      padding: 0.45rem 0.9rem;
      border-radius: 8px;
      font: inherit;
      font-weight: 600;
      cursor: pointer;
      transition:
        background-color 0.15s ease,
        border-color 0.15s ease;
    }

    .acciones button:focus-visible {
      outline: 2px solid var(--acento);
      outline-offset: 2px;
    }

    .secundario {
      border: 1px solid var(--entrada-borde);
      background: var(--superficie);
      color: var(--texto);
    }

    .secundario:hover {
      border-color: var(--acento);
      color: var(--acento);
    }

    .primario {
      border: 1px solid var(--acento);
      background: var(--acento);
      color: var(--acento-contraste);
    }

    .primario:hover:not(:disabled) {
      background: var(--acento-fuerte);
      border-color: var(--acento-fuerte);
    }

    .primario:disabled {
      opacity: 0.55;
      cursor: wait;
    }
  `,
  host: {
    '(document:keydown.escape)': 'alPresionarEscape()',
  },
})
export class ReinicioBoton {
  /** Servicio de restauración (expone `soportado` para la plantilla). */
  protected readonly restauracion = inject(RestauracionService);

  /** Claves de ejercicio a restaurar, p. ej. ['tutorial/01'] o ['extras/02']. */
  readonly claves = input.required<string[]>();

  /** `true` para la versión mini (solo el ícono de reinicio) usada en las filas de los índices. */
  readonly compacto = input(false, { transform: booleanAttribute });

  /** Texto principal del modal; por defecto describe un solo ejercicio. */
  readonly descripcion = input<string | null>(null);

  /** Texto del botón: "Reiniciar" por defecto; los índices usan "Reiniciar todo". */
  readonly etiqueta = input('Reiniciar');

  /** Modal abierto, restauración en curso y resultado para la plantilla. */
  protected readonly abierto = signal(false);
  protected readonly restaurando = signal(false);
  protected readonly resultado = signal<ResultadoRestauracion | null>(null);

  /** Cantidad de archivos únicos que se van a sobrescribir. */
  protected readonly cantidadArchivos = computed(
    () => this.restauracion.rutasARestaurar(this.claves()).length,
  );

  /** Texto del modal: el general describe la sección, el simple el ejercicio. */
  protected readonly textoDescripcion = computed(
    () =>
      this.descripcion() ??
      'Vas a borrar los cambios que hiciste en este ejercicio y volver al estado original.',
  );

  /** Cantidad de archivos restaurados (solo cuando el resultado es éxito). */
  protected readonly archivosRestaurados = computed(() => {
    const resultado = this.resultado();
    return resultado?.estado === 'exito' ? resultado.archivos : null;
  });

  /** Mensaje de error de la última restauración, si lo hubo. */
  protected readonly mensajeError = computed(() => {
    const resultado = this.resultado();
    return resultado?.estado === 'error' ? resultado.mensaje : null;
  });

  /** Abre el modal de confirmación (solo si hay algo que restaurar). */
  protected abrir(): void {
    if (this.cantidadArchivos() === 0) {
      return;
    }
    this.resultado.set(null);
    this.abierto.set(true);
  }

  /** Cierra el modal (no se cierra solo mientras está restaurando). */
  protected cerrar(): void {
    if (this.restaurando()) {
      return;
    }
    this.abierto.set(false);
  }

  /** Escape cierra el modal, salvo que haya una restauración en curso. */
  protected alPresionarEscape(): void {
    if (this.abierto()) {
      this.cerrar();
    }
  }

  /** Confirma y ejecuta la restauración sobre el disco. */
  protected async confirmar(): Promise<void> {
    this.restaurando.set(true);
    try {
      this.resultado.set(await this.restauracion.restaurar(this.claves()));
    } finally {
      this.restaurando.set(false);
    }
  }
}
