import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReinicioBoton } from '../restauracion/boton-reinicio';
import { RestauracionService } from '../restauracion/restauracion.service';

interface Practica {
  numero: string;
  titulo: string;
  foco: string;
  disponible: boolean;
}

const PRACTICAS: Practica[] = [
  {
    numero: '01',
    titulo: 'Comunicación y Bus de Eventos',
    foco: 'Enlace bidireccional personalizado con model() y un bus de eventos desacoplado con RxJS (Subject + Observable) para que un nieto hable con su abuelo.',
    disponible: true,
  },
  {
    numero: '02',
    titulo: 'Formularios Reactivos Avanzados',
    foco: 'FormGroup/FormControl, estados (dirty, touched, invalid) en la UI y un validador personalizado parametrizable (ValidatorFn) que bloquea dominios de email.',
    disponible: true,
  },
  {
    numero: '03',
    titulo: 'HttpClient y Manejo de Errores',
    foco: 'HttpClient con HttpHeaders y HttpParams, y captura elegante de errores 404/500 con catchError para mostrar alertas amigables.',
    disponible: true,
  },
  {
    numero: '04',
    titulo: 'Auth JWT: Guards e Interceptores',
    foco: 'Login con JWT simulado en localStorage, HttpInterceptorFn que inyecta el Bearer token y authGuard/roleGuard con createUrlTree.',
    disponible: true,
  },
  {
    numero: '05',
    titulo: 'CRUD Interactivo con Modales',
    foco: 'Tabla con paginación y filtrado local, confirmación de borrado y edición con un modal que precarga el formulario con setValue()/patchValue().',
    disponible: true,
  },
  {
    numero: '06',
    titulo: 'RxJS y Asincronía Reactiva',
    foco: 'Buscador con Subject + debounceTime/distinctUntilChanged + switchMap para cancelar respuestas viejas, takeUntilDestroyed() contra fugas y estados (cargando/vacio/error) como signals.',
    disponible: true,
  },
  {
    numero: '07',
    titulo: 'Ruteo Avanzado SPA',
    foco: 'Parámetros :id con input() y withComponentInputBinding, query params para compartir filtros por link, 404 con ruta comodín, routerLinkActive, canMatch y rutas hijas.',
    disponible: true,
  },
  {
    numero: '08',
    titulo: 'Angular Material: Diálogo, Tabla y Feedback',
    foco: 'Refactor de CRUD a la forma oficina: MatTable + MatPaginator, alta/edición en MatDialog con MAT_DIALOG_DATA y feedback con MatSnackBar con acción deshacer.',
    disponible: true,
  },
  {
    numero: '09',
    titulo: 'Estado Global con NgRx',
    foco: 'Acciones como única fuente de mutación, reducer puro e inmutable, createFeature con selectors memoizados y el puente store.select() → toSignal() para la plantilla.',
    disponible: true,
  },
  {
    numero: '10',
    titulo: 'Testing de HTTP y Componentes',
    foco: 'TestBed + provideHttpClientTesting, HttpTestingController (expectOne/flush/error/verify), stub de servicios y tests puros de un ValidatorFn: probar la regla, no el texto.',
    disponible: true,
  },
];

@Component({
  selector: 'extras-index',
  imports: [RouterLink, ReinicioBoton],
  template: `
    <main class="contenedor">
      <h1>Prácticas avanzadas</h1>
      <p class="bajada">
        Módulos de práctica con temáticas de entorno laboral que el tutorial básico no cubre a
        fondo. Cada práctica vive en <code>src/app/extras/</code> con un <code>README.md</code> (la
        guía de la lección), el <strong>ejercicio</strong> con la lógica incompleta marcada con
        <code>TODO</code>s y la <strong>solución</strong> comentada para comparar.
      </p>

      <div class="acciones-globales">
        <reinicio-boton
          [claves]="restauracion.clavesDeSeccion('extras')"
          etiqueta="Reiniciar todo"
          descripcion="Vas a borrar los cambios que hiciste en TODAS las prácticas y volver al estado original."
        />
      </div>

      <ol class="lista">
        @for (practica of practicas; track practica.numero) {
          <li>
            <div class="tarjeta">
              <div class="info">
                <span class="titulo">{{ practica.numero }} — {{ practica.titulo }}</span>
                <span class="foco">{{ practica.foco }}</span>
              </div>
              @if (practica.disponible) {
                <span class="links">
                  <a class="accion" [routerLink]="['/extras', practica.numero]">ejercicio</a>
                  <a class="accion" [routerLink]="['/extras', practica.numero, 'solucion']"
                    >solución</a
                  >
                </span>
              } @else {
                <span class="badge">próximamente</span>
              }
            </div>
            @if (practica.disponible) {
              <!-- El reset compacto queda FUERA del recuadro de la práctica -->
              <reinicio-boton compacto [claves]="['extras/' + practica.numero]" />
            }
          </li>
        }
      </ol>
    </main>
  `,
  styles: `
    .contenedor {
      max-width: 780px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }
    h1 {
      margin: 0 0 0.5rem;
      letter-spacing: -0.02em;
    }
    .bajada {
      color: var(--texto-suave);
      line-height: 1.5;
    }
    .lista {
      list-style: none;
      padding: 0;
      display: grid;
      gap: 0.6rem;
    }
    .lista li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    /* Recuadro de la práctica: el reset compacto vive fuera de él */
    .tarjeta {
      flex: 1;
      min-width: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem 0.95rem;
      border: 1px solid var(--borde);
      border-radius: 10px;
      background: var(--superficie);
      transition: border-color 0.15s ease;
    }
    .tarjeta:hover {
      border-color: var(--acento);
    }
    .info {
      display: grid;
      gap: 0.2rem;
    }
    .titulo {
      color: var(--texto);
      font-weight: 600;
      text-decoration: none;
    }
    .foco {
      color: var(--texto-suave);
      font-size: 0.85rem;
      line-height: 1.4;
    }
    .links {
      display: inline-flex;
      gap: 0.4rem;
    }
    /* Acciones ejercicio/solución como botones píldora, no texto subrayado */
    .accion {
      padding: 0.28rem 0.75rem;
      border: 1px solid color-mix(in srgb, var(--acento) 30%, transparent);
      border-radius: 999px;
      background: var(--acento-suave);
      color: var(--acento);
      font-size: 0.8rem;
      font-weight: 600;
      text-decoration: none;
      white-space: nowrap;
      transition:
        background-color 0.15s ease,
        color 0.15s ease,
        border-color 0.15s ease;
    }
    .accion:hover {
      background: var(--acento);
      border-color: var(--acento);
      color: var(--acento-contraste);
    }
    .accion:focus-visible {
      outline: 2px solid var(--acento);
      outline-offset: 2px;
    }
    .badge {
      font-size: 0.75rem;
      color: var(--texto-suave);
      border: 1px dashed var(--borde);
      border-radius: 999px;
      padding: 0.15rem 0.6rem;
      white-space: nowrap;
    }
    /* Botón de reinicio general de la sección */
    .acciones-globales {
      display: flex;
      justify-content: flex-end;
      margin: 0 0 1.25rem;
    }
  `,
})
export class ExtrasIndex {
  protected readonly practicas = PRACTICAS;
  protected readonly restauracion = inject(RestauracionService);
}
