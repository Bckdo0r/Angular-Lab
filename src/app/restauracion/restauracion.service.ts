import { Injectable } from '@angular/core';
import { GRUPOS } from './snapshot';

/** Proporciona las claves disponibles para los botones de restauración. */
@Injectable({ providedIn: 'root' })
export class RestauracionService {
  /** Claves de todos los ejercicios de una sección. */
  clavesDeSeccion(seccion: 'tutorial' | 'extras'): string[] {
    return GRUPOS[seccion];
  }
}
