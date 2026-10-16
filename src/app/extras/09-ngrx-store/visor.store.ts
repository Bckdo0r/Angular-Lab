import { Action, createAction, createFeature, createSelector, props } from '@ngrx/store';

/**
 * VISOR STORE — el feature NgRx de la práctica 09.
 *
 * Un "visor de capas" estilo mapa de devOSSE: capas que se prenden y apagan,
 * un filtro por nombre y una capa seleccionada. Todo ese estado vive ACÁ, en
 * el store, no en el componente: el componente solo "emite intenciones"
 * (dispatch) y lee (select).
 *
 * Este archivo es el que VOS editás: buscá los `TODO: [Paso X]`.
 * La versión resuelta y comentada está en `solucion/visor.store.ts`.
 */

/** Una capa del visor (como una capa de un mapa: nombre + visible). */
export interface CapaVisor {
  id: number;
  nombre: string;
  visible: boolean;
}

/** Estado del feature `visor`: TODO lo que sobrevive al cambio de pantalla. */
export interface VisorState {
  capas: CapaVisor[];
  filtro: string;
  seleccionadaId: number | null;
}

/** Capas de arranque del visor (estado inicial declarativo y compartido). */
export const CAPAS_SEMILLA: CapaVisor[] = [
  { id: 1, nombre: 'Hidrografía', visible: true },
  { id: 2, nombre: 'Vialidad', visible: true },
  { id: 3, nombre: 'Suelo urbano (devOSSE)', visible: false },
  { id: 4, nombre: 'Parcelas catastrales', visible: false },
  { id: 5, nombre: 'Cámaras de monitoreo', visible: true },
];

export const estadoInicialVisor: VisorState = {
  capas: CAPAS_SEMILLA,
  filtro: '',
  seleccionadaId: null,
};

// ─────────────────────────────────────────────────────────────────────────────
// PASO 1 — ACCIONES: la única fuente de mutación del estado.
//
// Ya están resueltas: son el "vocabulario" del store. Leélas con atención:
// cada una describe UNA intención del usuario, en pasado o imperativo, con el
// prefijo `[Visor]` para encontrarlas rápido en DevTools. Las acciones NO
// cambian nada por sí solas — solo describen qué pasó. Quién decide el nuevo
// estado es el reducer (Paso 2).
// ─────────────────────────────────────────────────────────────────────────────

/** Set de acciones del visor. `createAction(type, props)` tipa el payload. */
export const VisorActions = {
  /** Prende/apaga la visibilidad de una capa. */
  alternarCapa: createAction('[Visor] Alternar Capa', props<{ id: number }>()),

  /** Cambia el texto del filtro de capas. */
  setFiltro: createAction('[Visor] Set Filtro', props<{ filtro: string }>()),

  /** Marca una capa como la seleccionada (resaltada en la UI). */
  seleccionarCapa: createAction('[Visor] Seleccionar Capa', props<{ id: number }>()),

  /** Vuelve al estado inicial (capas de fábrica, filtro vacío, nada seleccionado). */
  restablecer: createAction('[Visor] Restablecer'),
} as const;

/** Unión tipada de todas las acciones del visor (útil para el reducer). */
export type AccionVisor =
  | ReturnType<typeof VisorActions.alternarCapa>
  | ReturnType<typeof VisorActions.setFiltro>
  | ReturnType<typeof VisorActions.seleccionarCapa>
  | ReturnType<typeof VisorActions.restablecer>;

// ─────────────────────────────────────────────────────────────────────────────
// PASO 2 — REDUCER: función PURA `(estado, acción) → nuevo estado`.
//
// Reglas de oro:
//   1. Jamás muta: ni `push()`, ni `capa.visible = ...`, ni `sort()` in-place.
//      Siempre devuelve un objeto/array NUEVO (spread, map, filter, slice).
//   2. Misma entrada → misma salida, sin efectos secundarios (nada de HTTP,
//      fechas, random...). Por eso NgRx puede "rebobinar" el estado en DevTools.
//   3. Acción desconocida (default) → devuelve el estado tal cual.
// ─────────────────────────────────────────────────────────────────────────────

export function visorReducer(state: VisorState = estadoInicialVisor, action: Action): VisorState {
  switch (action.type) {
    // EJEMPLO resuelto — el caso más simple: copiar el estado y pisar un campo.
    // Fijate el `...state`: spread primero, lo que cambia después.
    case VisorActions.seleccionarCapa.type: {
      const { id } = action as ReturnType<typeof VisorActions.seleccionarCapa>;
      return { ...state, seleccionadaId: id };
    }

    case VisorActions.alternarCapa.type: {
      // TODO: [Paso 2] - Alternar la visibilidad de la capa con ese id.
      //   const { id } = action as ReturnType<typeof VisorActions.alternarCapa>;
      //   return {
      //     ...state,
      //     capas: state.capas.map((capa) =>
      //       capa.id === id ? { ...capa, visible: !capa.visible } : capa,
      //     ),
      //   };
      //   ⚠️ usa spread + map, JAMÁS push(): mutar el array o el objeto `capa`
      //   deja la MISMA referencia en el estado → el selector memoizado cree
      //   que nada cambió y la UI no se actualiza (mirá la trampa comentada en
      //   `solucion/visor.store.ts`).
      //
      //   Mientras no lo implementes, devolvé el estado tal cual (es lo que
      //   hace esta línea de abajo — reemplazala por el return de arriba):
      return state;
    }

    case VisorActions.setFiltro.type: {
      // TODO: [Paso 2] - Guardar el texto del filtro. Ayuda:
      //   const { filtro } = action as ReturnType<typeof VisorActions.setFiltro>;
      //   return { ...state, filtro };
      //   (¿Se te ocurre por qué el filtro se normaliza/recorta en el SELECTOR
      //   y no acá? Pista: el estado guarda lo que el usuario escribió; la
      //   comparación "sin mayúsculas ni espacios de más" es un cálculo derivado.)
      return state; // placeholder: reemplazalo por tu implementación
    }

    case VisorActions.restablecer.type: {
      // TODO: [Paso 2] - Volver al estado inicial. Es una sola línea:
      //   return estadoInicialVisor;
      //   Y no hace falta spread: no hay nada que preservar. ¿Por qué es
      //   seguro devolver el MISMO objeto que usa el reducer como default?
      //   Porque el reducer es puro: nadie muta ese objeto nunca, solo se
      //   reemplaza por referencias nuevas (por eso funciona el patrón).
      return state; // placeholder: reemplazalo por tu implementación
    }

    default:
      return state;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PASO 3 — FEATURE + SELECTORS.
//
// `createFeature({ name, reducer })` genera de una sola pieza:
//   · `selectVisorState`   → el estado entero del feature.
//   · `selectCapas`, `selectFiltro`, `selectSeleccionadaId` → un selector por
//     cada propiedad del estado, memoizados.
//
// Los selectores son el equivalente GLOBAL de un `computed()`: se recalculan
// solo si cambió alguna de sus entradas (memoización). El estado derivado
// (capas filtradas, visibles...) se escribe ACÁ, no en el componente.
//
// Este bloque está parcialmente resuelto: `selectCapasFiltradas` es tu ejemplo;
// te falta `selectCapasVisibles`. `selectCapaPorId` es SOLO LECTURA (temario:
// normalización / selector por ID) — leé el comentario, no lo toques.
// ─────────────────────────────────────────────────────────────────────────────

export const visorFeature = createFeature({
  name: 'visor',
  reducer: visorReducer,
  extraSelectors: ({ selectCapas, selectFiltro }) => ({
    // EJEMPLO resuelto — selector DERIVADO y memoizado: combina dos selectores
    // base y solo recalcula si cambió `capas` o `filtro`.
    selectCapasFiltradas: createSelector(selectCapas, selectFiltro, (capas, filtro) => {
      const texto = filtro.trim().toLowerCase();
      if (!texto) {
        return capas;
      }
      return capas.filter((capa) => capa.nombre.toLowerCase().includes(texto));
    }),

    // TODO: [Paso 3] - Selector derivado `selectCapasVisibles`: solo las capas
    //   con `visible === true`. Mismo patrón que el de arriba, con una entrada:
    //   createSelector(selectCapas, (capas) => capas.filter((capa) => capa.visible));

    // ── SOLO LECTURA: selector parametrizado por ID ─────────────────────────
    // Es una FÁBRICA: `selectCapaPorId(3)` devuelve un selector nuevo que busca
    // esa capa. Es el patrón de la normalización (estado por ID, como una base
    // de datos) y reemplaza al clásico trampa de guardar el objeto entero
    // seleccionado en el estado (quedaría desactualizado al editar la capa).
    // ⚠️ Trampa clásica: cada llamada a la fábrica crea un selector NUEVO (con
    // su propia memoización). Llamá una vez por uso (p. ej. en el componente)
    // y nunca adentro de un `@for` del template.
    selectCapaPorId: (id: number) =>
      createSelector(selectCapas, (capas) => capas.find((capa) => capa.id === id) ?? null),
  }),
});
