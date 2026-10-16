import { Injectable, computed, signal } from '@angular/core';

/** Temas disponibles para la aplicación. */
export type Tema = 'claro' | 'oscuro';

/** Clave usada para persistir la preferencia de tema en localStorage. */
const CLAVE_TEMA = 'pruebas-practica.tema';

/** Clase CSS que se aplica sobre <html> cuando el tema es oscuro. */
const CLASE_OSCURO = 'oscuro';

/**
 * Servicio singleton que gestiona el tema visual (claro/oscuro).
 * Persiste la preferencia en localStorage y, si no hay ninguna guardada,
 * respeta la preferencia del sistema operativo del usuario.
 */
@Injectable({ providedIn: 'root' })
export class TemaService {
  /** Tema actual de la aplicación. */
  private readonly temaActual = signal<Tema>(leerTemaInicial());

  /** Tema expuesto como señal de solo lectura para las plantillas. */
  readonly tema = this.temaActual.asReadonly();

  /** `true` cuando el tema activo es el oscuro. */
  readonly oscuro = computed(() => this.temaActual() === 'oscuro');

  constructor() {
    // Sincroniza la clase CSS del <html> con el tema leído al arrancar.
    this.aplicar(this.temaActual());
  }

  /** Alterna entre claro y oscuro, persistiendo la preferencia del usuario. */
  alternar(): void {
    const nuevo: Tema = this.oscuro() ? 'claro' : 'oscuro';
    this.temaActual.set(nuevo);

    try {
      localStorage.setItem(CLAVE_TEMA, nuevo);
    } catch {
      // localStorage puede no estar disponible (modo privado); el tema sigue
      // funcionando en memoria durante la sesión.
    }

    this.aplicar(nuevo);
  }

  /** Sincroniza la clase CSS del <html> y el color-scheme del documento.
   *  OJO: `color-scheme` solo acepta `light`/`dark` (no `claro`/`oscuro`);
   *  un valor inválido se descarta en silencio y los tokens de Material,
   *  que usan `light-dark(...)`, quedarían pegados al tema del arranque. */
  private aplicar(tema: Tema): void {
    const raiz = document.documentElement;
    raiz.classList.toggle(CLASE_OSCURO, tema === 'oscuro');
    raiz.style.colorScheme = tema === 'oscuro' ? 'dark' : 'light';
  }
}

/** Lee el tema guardado o, en su defecto, la preferencia del sistema. */
function leerTemaInicial(): Tema {
  try {
    const guardado = localStorage.getItem(CLAVE_TEMA);
    if (guardado === 'claro' || guardado === 'oscuro') {
      return guardado;
    }
  } catch {
    // Ignorado: se usa la preferencia del sistema.
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'oscuro' : 'claro';
}
