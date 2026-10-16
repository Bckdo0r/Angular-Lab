import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * SOLUCIÓN — Eventos que circulan por el bus de la práctica.
 *
 * Unión discriminada: el campo `tipo` le permite a TypeScript reducir el
 * tipo dentro de cada `case` del switch (narrows automáticos).
 */
export type EventoBus =
  | { tipo: 'agregado'; id: number; nombre: string; cantidad: number }
  | { tipo: 'eliminado'; id: number; nombre: string };

/**
 * SOLUCIÓN — BUS DE EVENTOS
 *
 * Compará con ../ejercicio/notificaciones-bus.ts: la estructura es idéntica,
 * lo único que faltaba era emitir con `.next()` en cada método.
 *
 * Mejores prácticas aplicadas:
 * 1. El `Subject` es privado: desde afuera solo se puede ESCUCHAR (eventos$),
 *    nunca emitir. Así el flujo de datos es predecible.
 * 2. Los métodos son la "API" del bus: le dan nombres de negocio
 *    (notificarProductoEliminado) en lugar de un `next()` suelto y anónimo.
 * 3. `providedIn: 'root'` garantiza UNA sola instancia compartida.
 */
@Injectable({ providedIn: 'root' })
export class NotificacionesBus {
  private readonly eventos = new Subject<EventoBus>();

  /** Flujo de solo lectura: los consumidores pueden escuchar pero no emitir. */
  readonly eventos$ = this.eventos.asObservable();

  notificarProductoAgregado(id: number, nombre: string, cantidad: number): void {
    // `.next()` publica el valor a TODOS los suscriptores activos, de forma sincrónica.
    this.eventos.next({ tipo: 'agregado', id, nombre, cantidad });
  }

  notificarProductoEliminado(id: number, nombre: string): void {
    this.eventos.next({ tipo: 'eliminado', id, nombre });
  }
}
