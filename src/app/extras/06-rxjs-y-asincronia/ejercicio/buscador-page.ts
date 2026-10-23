import { Component, computed, inject, signal } from '@angular/core';
import { BusquedaService, EmpleadoBuscado } from '../buscador.service';

/**
 * PÁGINA BUSCADOR — Práctica 06 (RxJS y asincronía reactiva).
 *
 * El service (`../buscador.service.ts`) ya está hecho: devuelve la lista
 * filtrada por nombre como Observable. Tu trabajo es la TUBERÍA REACTIVA
 * (Pasos 1 a 4) y los estados (Paso 5):
 *
 *   tipeo → Subject → debounceTime → distinctUntilChanged → switchMap(listar)
 *         → suscripción con takeUntilDestroyed → signals → template
 *
 * Los signals del template YA están conectados: `resultado`, `cargando`,
 * `vacio` y `error`. Mientras no resuelvas los TODOs, la página renderiza
 * pero la búsqueda no hace nada.
 */
@Component({
  selector: 'buscador-page',
  templateUrl: './buscador-page.html',
  styleUrl: './buscador-page.css',
})
export class BuscadorPage {
  protected readonly servicio = inject(BusquedaService);

  // TODO: [Paso 1] - Declará la fuente de eventos: `busqueda$ = new Subject<string>()`.
  //   Un Subject es a la vez Observable y "emisor": el input le empuja cada
  //   tipeo (con .next()) y la tubería de abajo lo consume. Importá `Subject`
  //   desde 'rxjs'.

  // TODO: [Paso 1] - Implementá `buscar(texto)`: debe hacer
  //   `this.busqueda$.next(texto)`. Ya está conectado al (input) vía
  //   `alTipear()` (hecho más abajo).
  protected buscar(texto: string): void {}

  /**
   * Handler del input (viene un Event genérico del (input)).
   * Ya está hecho: extrae el valor y delega en `buscar()`.
   */
  protected alTipear(event: Event): void {
    this.buscar((event.target as HTMLInputElement).value);
  }

  /** Última lista recibida (null = todavía no hubo búsqueda). */
  protected readonly resultado = signal<EmpleadoBuscado[] | null>(null);

  /** true mientras hay una petición en vuelo (lo mapeás en el Paso 4). */
  protected readonly cargando = signal(false);

  /** true solo si la lista ya llegó y quedó vacía (0 resultados). */
  protected readonly vacio = computed(
    () => this.resultado() !== null && this.resultado()!.length === 0,
  );

  /** Mensaje de error de la última búsqueda (null = sin errores). */
  protected readonly error = signal<string | null>(null);

  constructor() {
    // TODO: [Paso 2] - Creá `this.busqueda$` ya encadenado con los operadores
    //   de control de tipeo:
    //     this.busqueda$
    //       .pipe(
    //         debounceTime(300),       // esperá a que el usuario "termine" de tipear
    //         distinctUntilChanged(),  // ignorá repeticiones del mismo texto
    //       )
    //   Podés asignarlo a una nueva propiedad (ej. `resultados$`) o mutar el
    //   flujo en la misma declaración. Importá ambos desde 'rxjs'.
    // TODO: [Paso 3] - Continuá el pipe con `switchMap((texto) => this.servicio.listar(texto))`.
    //   switchMap CANCELA la petición anterior cuando llega un texto nuevo:
    //   es la garantía de que nunca se pinta una respuesta vieja.
    //   ⚠ Trampa clásica: con mergeMap las respuestas se acumulan en desorden.
    // TODO: [Paso 4] - Capturá los errores DENTRO del Observable de switchMap:
    //   catchError debe limpiar resultado, guardar el mensaje, apagar cargando
    //   y devolver EMPTY. Así termina solo esa consulta y podés seguir buscando.
    //   Suscribite acá (el constructor es contexto de inyección) con next:
    //     - next: resultado.set(empleados) y cargando.set(false)
    //   Un callback error de subscribe no recupera una suscripción terminada.
    //   y activá `cargando` ANTES de la petición (un tap() antes del
    //   switchMap es un buen lugar). Terminá el pipe con
    //   `takeUntilDestroyed()` (viene de '@angular/core/rxjs-interop'):
    //   sin eso, navegar fuera de la pantalla deja la suscripción viva = leak.
  }
}
