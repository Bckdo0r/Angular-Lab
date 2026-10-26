/**
 * MODELO DE ACTIVIDADES DEL CURSO
 *
 * Una "actividad" es cualquier unidad de trabajo del curso: una lección del
 * tutorial o una práctica avanzada. Este modelo es la única fuente de datos
 * de esas actividades: los índices de cada recorrido, el recorrido recomendado
 * y el seguimiento de progreso leen todos de acá.
 *
 * Regla de diseño: los datos de una actividad se guardan UNA sola vez y se
 * referencian por id. Por eso `prerrequisitos` guarda ids y no texto: el
 * título de cada requisito se resuelve con el catálogo y no puede quedar
 * desactualizado.
 */

/** Recorrido al que pertenece la actividad. */
export type TipoActividad = 'leccion' | 'practica';

/** Nivel de dificultad estimado de la actividad. */
export type Dificultad = 'iniciada' | 'intermedia' | 'avanzada';

interface ActividadBase {
  /** Identificador estable y único: 'tutorial/01' | 'extras/03'. */
  id: string;
  /** Número de la actividad dentro de su recorrido: '01', '02', ... */
  numero: string;
  /** Título visible en las tarjetas de los índices. */
  titulo: string;
  /** Resumen de una línea para las tarjetas. */
  foco?: string;
  /** Nivel de dificultad estimado. */
  dificultad: Dificultad;
  /**
   * Ids de las actividades que conviene completar antes.
   *
   * Es la base del recorrido recomendado y de los requisitos que muestra la
   * página, así que acá solo se referencian ids: nada de texto duplicado.
   */
  prerrequisitos: string[];
}

/** Una lección del tutorial. */
export interface Leccion extends ActividadBase {
  tipo: 'leccion';
  /** true si la lección no tiene ejercicio con TODOs (solo lectura). */
  soloLectura?: boolean;
}

/** Una práctica avanzada. */
export interface Practica extends ActividadBase {
  tipo: 'practica';
  /** false mientras la práctica todavía no está publicada. */
  disponible?: boolean;
}

export type Actividad = Leccion | Practica;
