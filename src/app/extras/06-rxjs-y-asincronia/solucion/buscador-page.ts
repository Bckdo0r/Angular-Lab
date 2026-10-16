import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { BusquedaService, EmpleadoBuscado } from '../buscador.service';

/**
 * SOLUCIÓN — Buscador reactivo (Práctica 06).
 *
 * La tubería completa, de tipeo a pantalla:
 *
 *   (input) → buscar(texto) → busqueda$.next(texto)
 *           → debounceTime(300)     (agrupá los tipeos: 1 petición por "ráfaga")
 *           → distinctUntilChanged() (mismo texto de nuevo = no pedir de nuevo)
 *           → switchMap(listar)      (texto nuevo = cancelo la petición anterior)
 *           → subscribe              (mapo los estados a signals)
 *           → takeUntilDestroyed()   (al destruir el componente, me desuscribo)
 *
 * Compará con ../ejercicio/buscador-page.ts: los TODO de los Pasos 1 a 5
 * se resuelven exactamente acá.
 */
@Component({
  selector: 'buscador-page-solucion',
  templateUrl: './buscador-page.html',
  styleUrl: './buscador-page.css',
})
export class BuscadorPageSolucion {
  protected readonly servicio = inject(BusquedaService);

  // [Paso 1] El Subject es el "puente" entre el mundo del DOM y el mundo RxJS:
  // es HOT (las suscripciones no disparan ejecuciones, solo escuchan lo que
  // se le empuja con .next()), por eso sirve de fuente de eventos de un input.
  protected readonly busqueda$ = new Subject<string>();

  /** [Paso 1] El input no llama al service directamente: solo empuja al Subject. */
  protected buscar(texto: string): void {
    this.busqueda$.next(texto);
  }

  /**
   * [Paso 1] Handler del input. Ya delega en buscar().
   */
  protected alTipear(event: Event): void {
    this.buscar((event.target as HTMLInputElement).value);
  }

  /** [Paso 5] Estados derivados de la llamada, como signals (receta de la 03). */
  protected readonly resultado = signal<EmpleadoBuscado[] | null>(null);
  protected readonly cargando = signal(false);
  protected readonly vacio = computed(
    () => this.resultado() !== null && this.resultado()!.length === 0,
  );
  protected readonly error = signal<string | null>(null);

  constructor() {
    this.busqueda$
      .pipe(
        // [Paso 2] debounceTime(300): espera 300ms de silencio antes de emitir.
        // Si el usuario tipea "san" en menos de 300ms, solo el último "n"
        // llega al final: 3 tipeos, 1 petición (criterio de aceptación Nº 1).
        debounceTime(300),
        // distinctUntilChanged(): si el texto nuevo es IGUAL al anterior
        // (ej. pegás de nuevo lo mismo), ni siquiera se dispara la petición.
        distinctUntilChanged(),
        // [Paso 4 - parte A] Encendemos "cargando" ANTES de ir al service y
        // limpiamos un error anterior. tap() es perfecto: hace un efecto
        // secundario SIN transformar el flujo.
        tap(() => {
          this.cargando.set(true);
          this.error.set(null);
        }),
        // [Paso 3] switchMap: el corazón de la práctica.
        //
        // ¿Por qué switchMap y NO mergeMap? (trampa clásica)
        //   - mergeMap deja TODAS las peticiones en vuelo y emite cada
        //     respuesta en cuanto llega, en cualquier orden. Escribís "san",
        //     corregís a "s": si "san" tarda más, su respuesta llega DESPUÉS
        //     y pisa al resultado correcto. Respuesta vieja pintada tarde =
        //     criterio de aceptación Nº 2 roto.
        //   - switchMap, en cambio, CANCELA la suscripción interna anterior
        //     (aborta la petición HttpClient en vuelo) apenas llega un texto
        //     nuevo. Solo la última búsqueda puede pintar. Justo lo que un
        //     buscador necesita.
        // Regla mental: "muchos a la vez" → mergeMap; "solo el último" → switchMap.
        switchMap((texto) => this.servicio.listar(texto)),
        // [Paso 4 - parte B] takeUntilDestroyed() debe llamarse en contexto
        // de inyección (el constructor lo es). Sin esto, navegar fuera deja
        // la suscripción viva para siempre: leak + peticiones fantasma
        // (criterio de aceptación Nº 3 roto).
        takeUntilDestroyed(),
      )
      .subscribe({
        // [Paso 5] next: la lista llegó → apagamos "cargando" y guardamos.
        // `resultado.set()` con [] hace que `vacio` (computed) se encargue
        // solo de la pantalla "sin resultados".
        next: (empleados) => {
          this.resultado.set(empleados);
          this.cargando.set(false);
        },
        // [Paso 5] error: el service ya tradjo el HttpErrorResponse a un
        // Error con mensaje legible; acá solo lo mostramos.
        error: (err: Error) => {
          this.error.set(err.message);
          this.cargando.set(false);
        },
      });
  }

  // ─── [Paso 6 — Desafío] Variante declarativa con toSignal ────────────
  //
  // Se puede evitar el subscribe() a mano dejando el pipeline "puro" y
  // convirtiendo el Observable final en una signal. Angular se desuscribe
  // solo al destruir el componente (no hace falta takeUntilDestroyed):
  //
  //   private readonly resultados$ = this.busqueda$.pipe(
  //     debounceTime(300),
  //     distinctUntilChanged(),
  //     switchMap((texto) => this.servicio.listar(texto)),
  //     catchError((err: Error, _) => {
  //       this.error.set(err.message);
  //       return EMPTY; // el flujo sigue vivo para la próxima búsqueda
  //     }),
  //   );
  //   protected readonly resultado = toSignal(this.resultados$, { initialValue: null });
  //
  // Trade-off honesto: `cargando` queda fuera (toSignal no emite "estoy
  // pidiendo"); lo resolverías con otro observable/patrón. A cambio, el
  // componente no gestiona suscripciones: menos código imperativo.
  //
  // Y el "inverso" del desafío (signal → Observable) es toObservable():
  // juntos cierran el puente bidireccional signals ↔ Observables que pide
  // el temario (clave al migrar código viejo a signals, como devOSSE).
}

/*
 * NOTA — Cold vs hot (por qué importa acá):
 *
 * - Los Observables de HttpClient (los que devuelve listar()) son COLD:
 *   fríos hasta que alguien se suscribe, y CADA suscripción dispara una
 *   petición nueva. Si dos cosas se suscribieran a `resultados$`, habría
 *   DOS peticiones por búsqueda.
 * - El Subject es HOT: emitir .next() no "ejecuta" nada; los suscriptores
 *   comparten el mismo flujo. Por eso usamos uno como fuente de eventos.
 *
 * ¿Y si varias partes del componente quisieran el RESULTADO sin re-pedir?
 * Ahí entra shareReplay(1) sobre la fuente fría: cachea la última emisión
 * y las suscripciones nuevas la reciben sin nueva petición. En esta página
 * no hace falta (una sola suscripción, los signals ya reparten el estado),
 * pero en un servicio compartido entre pantallas es EL patrón. Experimentá:
 * sacá el debounceTime y mirá cuántas peticiones salen por "san" — ese es
 * el costo de no controlar la fuente.
 */
