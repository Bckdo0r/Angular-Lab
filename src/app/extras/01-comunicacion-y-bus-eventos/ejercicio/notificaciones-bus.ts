import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Eventos que circulan por el bus de la práctica.
 *
 * Es una "unión discriminada": el campo `tipo` le permite a TypeScript
 * saber qué otras propiedades tiene el evento dentro de cada `case`.
 */
export type EventoBus =
  | { tipo: 'agregado'; id: number; nombre: string; cantidad: number }
  | { tipo: 'eliminado'; id: number; nombre: string };

/**
 * BUS DE EVENTOS
 *
 * Servicio desacoplado que permite que componentes LEJANOS se comuniquen
 * sin pasarse datos uno por uno (eso se llama "prop drilling").
 *
 * ¿Cómo funciona?
 * - Un `Subject` es como una radio emisora: quien llama `.next(valor)` emite,
 *   y todos los suscriptos con `.subscribe()` lo reciben al instante.
 * - El Subject es PRIVADO; afuera se expone como `Observable` de solo lectura
 *   (con `asObservable()`) para que nadie pueda emitir "de contrabando".
 * - Al ser `providedIn: 'root'`, TODOS los componentes comparten la misma
 *   instancia: por eso lo que emite el nieto lo escucha el abuelo.
 */
@Injectable({ providedIn: 'root' })
export class NotificacionesBus {
  /** La emisora. Privada: solo el bus puede emitir con `.next()`. */
  private readonly eventos = new Subject<EventoBus>();

  /** El flujo de solo lectura que consumen los componentes. */
  readonly eventos$ = this.eventos.asObservable();

  notificarProductoAgregado(id: number, nombre: string, cantidad: number): void {
    // TODO: [Paso 2] - Emití el evento por el Subject:
    //   this.eventos.next({ tipo: 'agregado', id, nombre, cantidad });
    // (fijate que con el shorthand de objetos { id, nombre } alcanza si el
    //  nombre de la variable coincide con la propiedad).
  }

  notificarProductoEliminado(id: number, nombre: string): void {
    // TODO: [Paso 3] - Emití el evento por el Subject:
    //   this.eventos.next({ tipo: 'eliminado', id, nombre });
  }
}
