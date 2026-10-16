import { Component } from '@angular/core';

/** Fila de la lista de specs de la solución. */
interface ArchivoSpec {
  ruta: string;
  contenido: string;
}

/**
 * SOLUCIÓN — Página de entrada de la práctica 10 (solo lectura).
 *
 * Igual que ../ejercicio/panel-page.ts, pero muestra la referencia: qué
 * prueban los specs resueltos y los criterios de aceptación. NO llama a
 * `ProductosApiService` en vivo (el backend falso no sirve /api/productos).
 */
@Component({
  selector: 'panel-page-solucion',
  imports: [],
  templateUrl: './panel-page.html',
  styleUrl: './panel-page.css',
})
export class PanelPageSolucion {
  /** Los specs resueltos y qué demuestra cada uno. */
  protected readonly specs: ArchivoSpec[] = [
    {
      ruta: 'solucion/productos-api.service.spec.ts',
      contenido:
        'Pasos 2, 3, 4 y 7 — expectOne + flush (éxito), error() + catchError (fallo mapeado), aserción de request.params y headers, y el verify() que caza requests colgados',
    },
    {
      ruta: 'solucion/validadores.spec.ts',
      contenido:
        'Paso 5 — casos puros del ValidatorFn stockMinimo: rechazo, borde (== min), aceptación y vacío (lo maneja required)',
    },
  ];

  /** Los criterios de aceptación de la práctica (del temario). */
  protected readonly criterios: string[] = [
    'npm test verde.',
    'Cambiar el mensaje de error del código no rompe el test del validador.',
    'Sin verify(), el suite falla con un request pendiente.',
  ];

  /** Decisiones didácticas que vale la pena nombrar. */
  protected readonly claves: string[] = [
    'El test del catchError afirma que llega un Error con mensaje NO vacío: prueba el MAPEO, no la frase exacta.',
    'El test del validador compara DATA ({ stockMinimo: { min } }), nunca textos: por eso cambiar mensajes no lo rompe.',
    'El caso de borde (valor == min) se testea explícito: la regla dice "por debajo de min", el mínimo ES válido.',
    'El test del Paso 7 hace explotar a verify() adentro del propio test para VER el error de un request pendiente.',
  ];
}
