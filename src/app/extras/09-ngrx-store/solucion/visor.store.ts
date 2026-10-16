import { Action, createFeature, createSelector } from '@ngrx/store';

import {
  CapaVisor,
  VisorActions,
  VisorState,
  estadoInicialVisor,
} from '../visor.store';

/**
 * SOLUCIÓN — VISOR STORE (versión resuelta de `../visor.store.ts`).
 *
 * Reusa del archivo del ejercicio el ESTADO (`VisorState`), las ACCIONES
 * (`VisorActions`) y el estado inicial: eso ya estaba resuelto (Paso 1).
 * Acá está el reducer completo (Paso 2) y el feature con TODOS los selectores
 * (Paso 3). Estado y acciones viven en un solo lugar a propósito: si mañana
 * cambia el modelo de `CapaVisor`, se cambia una vez.
 */

// ─────────────────────────────────────────────────────────────────────────────
// PASO 2 (SOLUCIÓN) — REDUCER puro e inmutable.
//
// Fijate el patrón en TODOS los casos: nunca se escribe sobre `state`, siempre
// se construye un objeto nuevo con spread (`...state`) y, si toca a la lista,
// se crea un array nuevo con `map` / `filter`. El reducer es una función pura:
// misma entrada → misma salida, cero efectos secundarios.
// ─────────────────────────────────────────────────────────────────────────────

export function visorReducerSolucion(
  state: VisorState = estadoInicialVisor,
  action: Action,
): VisorState {
  switch (action.type) {
    case VisorActions.alternarCapa.type: {
      // Inmutabilidad: `map` crea un array NUEVO y `{ ...capa, visible: ... }`
      // crea el objeto de esa capa NUEVO. Ni el array ni ningún objeto previo
      // se tocan → la referencia del estado cambia → los selectores memoizados
      // detectan el cambio y la UI se actualiza.
      const { id } = action as ReturnType<typeof VisorActions.alternarCapa>;
      return {
        ...state,
        capas: state.capas.map((capa) =>
          capa.id === id ? { ...capa, visible: !capa.visible } : capa,
        ),
      };
    }

    case VisorActions.setFiltro.type: {
      // El estado guarda el texto tal cual lo tipeó el usuario; la
      // normalización (minúsculas, trim) es un cálculo DERIVADO y vive en el
      // selector `selectCapasFiltradas`. Así el input del template muestra
      // siempre lo que escribió, sin sorpresas.
      const { filtro } = action as ReturnType<typeof VisorActions.setFiltro>;
      return { ...state, filtro };
    }

    case VisorActions.seleccionarCapa.type: {
      // Guardamos el ID, no el objeto: si la capa cambia, el "seleccionado"
      // sigue siendo correcto porque se resuelve a la hora de leer (selector
      // por ID). Guardar el objeto entero es la trampa clásica de diseño.
      const { id } = action as ReturnType<typeof VisorActions.seleccionarCapa>;
      return { ...state, seleccionadaId: id };
    }

    case VisorActions.restablecer.type:
      // Estado inicial = objeto nuevo. No hace falta spread: no hay nada que
      // preservar. (Y como `estadoInicialVisor` no se muta nunca — reducer
      // puro —, es seguro devolverlo.)
      return estadoInicialVisor;

    default:
      // Acción que el visor no conoce (las hay: la app completa despacha de
      // todo). El reducer no toca nada y devuelve el mismo estado.
      return state;
  }
}

/**
 * ⚠️⚠️⚠️  REDUCER CON push() A PROPÓSITO — ASÍ **NO** SE HACE  ⚠️⚠️⚠️
 *
 * (Es un COMENTARIO a propósito: el alumno lo corrige. Si lo activás tal cual,
 * la UI deja de reaccionar y DevTools muestra un estado que no cambia "de
 * verdad". ES EL CRITERIO 3 DE LA PRÁCTICA: encontrar y corregir esto.)
 *
 *   case VisorActions.alternarCapa.type: {
 *     const { id } = action as ReturnType<typeof VisorActions.alternarCapa>;
 *     const capa = state.capas.find((c) => c.id === id)!;
 *
 *     capa.visible = !capa.visible;              // ❌ MUTA el objeto del estado
 *     state.capas.push({ ...capa });             // ❌ MUTA el array del estado
 *
 *     return state;                              // ❌ misma referencia de siempre
 *   }
 *
 * ¿Por qué "no pasa nada" visualmente? La cadena del problema:
 *
 *   1. El reducer devuelve EL MISMO objeto `state` (con sus campos mutados por
 *      dentro). Para NgRx, misma referencia = nada cambió.
 *   2. Los selectores están MEMOIZADOS: solo recalculan si cambió la referencia
 *      de sus entradas. Como es la misma, devuelven el último resultado y el
 *      Observable no emite → `toSignal()` no actualiza la signal → la UI no
 *      se redibuja.
 *   3. En DevTools el time-travel se vuelve mentira: el estado mostrado se
 *      ve mutado retroactivamente, porque todo el historial apunta al mismo
 *      objeto que acabás de pisar.
 *
 * La corrección es la del reducer de arriba: spread + `map` para construir
 * referencias nuevas. La trampa del `push()` ya la viviste en la práctica 05
 * con `update()` vs `push()` en signals — acá la regla es idéntica, pero en
 * el estado global.
 */

// ─────────────────────────────────────────────────────────────────────────────
// PASO 3 (SOLUCIÓN) — FEATURE + SELECTORS memoizados.
//
// `createFeature` genera `selectVisorState`, `selectCapas`, `selectFiltro` y
// `selectSeleccionadaId` automáticamente. Los DERIVADOS se declaran acá con
// `createSelector`: NgRx guarda el último resultado y solo recalcula si cambió
// alguna entrada. Es el `computed()` de la práctica 01, pero global y
// observable (se puede suscribir cualquier parte de la app).
// ─────────────────────────────────────────────────────────────────────────────

export const visorFeatureSolucion = createFeature({
  name: 'visor',
  reducer: visorReducerSolucion,
  extraSelectors: ({ selectCapas, selectFiltro }) => ({
    /** Capas que pasan el filtro (comparación en minúsculas + trim). */
    selectCapasFiltradas: createSelector(
      selectCapas,
      selectFiltro,
      (capas, filtro): CapaVisor[] => {
        const texto = filtro.trim().toLowerCase();
        if (!texto) {
          return capas;
        }
        return capas.filter((capa) => capa.nombre.toLowerCase().includes(texto));
      },
    ),

    /** Capas actualmente visibles en el "mapa". Memoizado sobre `capas`. */
    selectCapasVisibles: createSelector(selectCapas, (capas) =>
      capas.filter((capa) => capa.visible),
    ),

    /**
     * SOLO LECTURA — fábrica de selectores por ID (normalización).
     * `selectCapaPorId(3)` crea un selector que devuelve esa capa (o `null`).
     * Ojo: cada llamada crea un selector nuevo con su propia memoización —
     * llamá una vez por uso (en el componente), nunca dentro de un `@for`.
     */
    selectCapaPorId: (id: number) =>
      createSelector(
        selectCapas,
        (capas) => capas.find((capa) => capa.id === id) ?? null,
      ),
  }),
});
