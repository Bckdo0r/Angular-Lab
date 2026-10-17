import { Injectable } from '@angular/core';
import { CONTENIDOS, EJERCICIOS, GRUPOS } from './snapshot';

/** Subconjunto de la File System Access API que usa el servicio. */
interface CarpetaHandle {
  getDirectoryHandle(nombre: string, opciones?: { create?: boolean }): Promise<CarpetaHandle>;
  getFileHandle(nombre: string, opciones?: { create?: boolean }): Promise<ArchivoHandle>;
}

interface ArchivoHandle {
  createWritable(): Promise<EscrituraHandle>;
}

interface EscrituraHandle {
  write(datos: string): Promise<void>;
  close(): Promise<void>;
}

/** Navegadores con soporte de `showDirectoryPicker` (Chrome, Edge, Opera). */
interface VentanaConPicker {
  showDirectoryPicker(opciones?: {
    id?: string;
    mode?: 'read' | 'readwrite';
  }): Promise<CarpetaHandle>;
}

/** Resultado posible de una restauración. */
export type ResultadoRestauracion =
  | { estado: 'exito'; archivos: number }
  | { estado: 'cancelado' }
  | { estado: 'no-soportado' }
  | { estado: 'error'; mensaje: string };

/**
 * Servicio que restaura los archivos de un ejercicio a su estado ORIGINAL
 * (el capturado en `snapshot.ts` por `npm run snapshot`).
 *
 * Escribe sobre el disco usando la File System Access API: el usuario elige
 * la carpeta del proyecto una vez por sesión y, al sobrescribir los archivos,
 * el servidor de desarrollo (`ng serve`) recompila y la vista vuelve al
 * estado inicial con los TODOs sin resolver.
 */
@Injectable({ providedIn: 'root' })
export class RestauracionService {
  /** `true` si el navegador actual soporta la API necesaria. */
  readonly soportado =
    typeof window !== 'undefined' &&
    'showDirectoryPicker' in window &&
    typeof (window as unknown as VentanaConPicker).showDirectoryPicker === 'function';

  /** Handle de la carpeta raíz del proyecto, pedido una sola vez por sesión. */
  private raiz: Promise<CarpetaHandle> | null = null;

  /** Rutas de archivos que componen el estado original de un ejercicio. */
  archivosDe(clave: string): string[] {
    return EJERCICIOS[clave] ?? [];
  }

  /** Claves de todos los ejercicios de una sección (reinicio general). */
  clavesDeSeccion(seccion: 'tutorial' | 'extras'): string[] {
    return GRUPOS[seccion];
  }

  /** Rutas únicas a restaurar para un conjunto de claves de ejercicio. */
  rutasARestaurar(claves: string[]): string[] {
    return [...new Set(claves.flatMap((clave) => this.archivosDe(clave)))];
  }

  /**
   * Restaura los archivos de las claves dadas a su contenido original.
   * Pide permiso sobre la carpeta del proyecto la primera vez (el navegador
   * muestra el selector de carpetas: se debe elegir la raíz del proyecto).
   */
  async restaurar(claves: string[]): Promise<ResultadoRestauracion> {
    if (!this.soportado) {
      return { estado: 'no-soportado' };
    }

    const rutas = this.rutasARestaurar(claves);
    if (rutas.length === 0) {
      return { estado: 'error', mensaje: 'No hay archivos registrados para restaurar.' };
    }

    try {
      const raiz = await this.carpetaRaiz();
      for (const ruta of rutas) {
        const contenido = CONTENIDOS[ruta];
        if (contenido === undefined) {
          return { estado: 'error', mensaje: `El snapshot no incluye: ${ruta}` };
        }
        await this.escribir(raiz, ruta, contenido);
      }
      return { estado: 'exito', archivos: rutas.length };
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        // El usuario cerró el selector de carpetas: no es un error real.
        return { estado: 'cancelado' };
      }
      return {
        estado: 'error',
        mensaje: error instanceof Error ? error.message : String(error),
      };
    }
  }

  /** Pide (una vez por sesión) la carpeta raíz del proyecto al usuario. */
  private carpetaRaiz(): Promise<CarpetaHandle> {
    this.raiz ??= (window as unknown as VentanaConPicker).showDirectoryPicker({
      id: 'angular-lab',
      mode: 'readwrite',
    });
    return this.raiz;
  }

  /** Crea (si hace falta) las carpetas intermedias y sobrescribe el archivo. */
  private async escribir(raiz: CarpetaHandle, ruta: string, contenido: string): Promise<void> {
    const partes = ruta.split('/');
    const nombre = partes.pop();
    if (!nombre) {
      throw new Error(`Ruta inválida: ${ruta}`);
    }

    let carpeta = raiz;
    for (const parte of partes) {
      carpeta = await carpeta.getDirectoryHandle(parte, { create: true });
    }

    const archivo = await carpeta.getFileHandle(nombre, { create: true });
    const escritura = await archivo.createWritable();
    await escritura.write(contenido);
    await escritura.close();
  }
}
