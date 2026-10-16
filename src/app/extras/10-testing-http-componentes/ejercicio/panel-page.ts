import { Component } from '@angular/core';

/** Fila de la lista de archivos spec que el alumno tiene que completar. */
interface ArchivoSpec {
  ruta: string;
  pasos: string;
}

/**
 * EJERCICIO — Página de entrada de la práctica 10 (solo lectura).
 *
 * NO llama a `ProductosApiService` en vivo: el backend falso del proyecto
 * no sirve `/api/productos` y la llamada sería un 404. Esta página explica
 * la práctica y lista los specs que hay que completar.
 */
@Component({
  selector: 'panel-page',
  imports: [],
  templateUrl: './panel-page.html',
  styleUrl: './panel-page.css',
})
export class PanelPage {
  /** Los archivos spec que el alumno completa (los `it.todo` son sus pasos). */
  protected readonly specs: ArchivoSpec[] = [
    {
      ruta: 'ejercicio/productos-api.service.spec.ts',
      pasos: 'Pasos 2, 3, 4 y 7 — HttpTestingController: expectOne, flush, error() y verify()',
    },
    {
      ruta: 'ejercicio/validadores.spec.ts',
      pasos: 'Paso 5 — casos puros del ValidatorFn stockMinimo (sin DOM, sin HTTP)',
    },
  ];

  /** Lo que YA está escrito en el ejercicio (no se toca). */
  protected readonly yaResuelto: string[] = [
    'Paso 1 — beforeEach con TestBed + provideHttpClient() + provideHttpClientTesting()',
    'Paso 7 — afterEach con controller.verify() (la red de seguridad)',
    'productos-api.service.ts y validadores.ts (el código a testear, completo)',
  ];

  /** Conceptos que se practican, con la profundidad del temario. */
  protected readonly conceptos: string[] = [
    'TestBed + provideHttpClientTesting(): armado del entorno ★★★',
    'HttpTestingController: expectOne, flush, error() ★★★',
    'Aserción de params/headers en la petición (request.params) ★★',
    'Regla de negocio, no implementación: ValidatorFn con casos puros ★★★',
    'verify() en afterEach: cazar requests colgados ★★',
  ];
}
