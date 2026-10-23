import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReinicioBoton } from '../restauracion/boton-reinicio';
import { RestauracionService } from '../restauracion/restauracion.service';

interface Leccion {
  numero: string;
  titulo: string;
  /** true si la lección no tiene código (solo lectura) */
  soloLectura?: boolean;
}

const LECCIONES: Leccion[] = [
  { numero: '01', titulo: 'Anatomía de un Componente' },
  { numero: '02', titulo: 'Actualizar la clase del componente' },
  { numero: '03', titulo: 'Componer componentes' },
  { numero: '04', titulo: 'Control de flujo: @if' },
  { numero: '05', titulo: 'Control de flujo: @for' },
  { numero: '06', titulo: 'Property binding (enlace de propiedades)' },
  { numero: '07', titulo: 'Manejo de eventos' },
  { numero: '08', titulo: 'Inputs: comunicación padre → hijo' },
  { numero: '09', titulo: 'Outputs: comunicación hijo → padre' },
  { numero: '10', titulo: 'Vistas diferibles (@defer)' },
  { numero: '11', titulo: 'Optimización de imágenes (NgOptimizedImage)' },
  { numero: '12', titulo: 'Habilitar el routing' },
  { numero: '13', titulo: 'Definir una ruta' },
  { numero: '14', titulo: 'Navegación con routerLink' },
  { numero: '15', titulo: 'Formularios' },
  { numero: '16', titulo: 'Valores de controles de formulario' },
  { numero: '17', titulo: 'Formularios reactivos' },
  { numero: '18', titulo: 'Validación de formularios' },
  { numero: '19', titulo: 'Crear un servicio inyectable' },
  { numero: '20', titulo: 'Inyección de dependencias con inject()' },
  { numero: '22', titulo: 'Pipes' },
  { numero: '23', titulo: 'Formatear datos con pipes' },
  { numero: '24', titulo: 'Crear un pipe personalizado' },
  { numero: '25', titulo: 'Próximos pasos', soloLectura: true },
];

@Component({
  selector: 'tutorial-index',
  imports: [RouterLink, ReinicioBoton],
  template: `
    <main class="contenedor">
      <h1>Tutorial de Angular</h1>
      <p class="bajada">
        Basado en el tutorial oficial
        <a href="https://v20.angular.dev/tutorials/learn-angular" target="_blank" rel="noopener"
          >Learn Angular</a
        >. Cada lección tiene su carpeta en <code>src/app/tutorial/</code> con un
        <code>README.md</code>, el código del ejercicio (con <code>TODO</code>s para completar) y la
        solución.
      </p>

      <div class="que-es">
        <h2>¿Qué es Angular?</h2>
        <p>
          Angular es el framework de desarrollo web para construir apps modernas: componentes,
          routing, formularios, servicios inyectables y pipes, todo incluido.
        </p>
        <p>
          Antes de arrancar con la ejercitación conviene tener las bases de
          <strong>HTML, CSS y JavaScript</strong> (o TypeScript) y una versión de
          <strong>Node.js compatible con Angular 22</strong>: 22.22.3 o posterior de la rama 22.x,
          24.15.0 o posterior de la rama 24.x, o 26.x.
        </p>
      </div>

      <section class="guia-reinicio" aria-labelledby="guia-reinicio-titulo">
        <h2 id="guia-reinicio-titulo">Cómo reiniciar una lección</h2>
        <ol>
          <li>
            Abrí una terminal en la raíz del proyecto, es decir, en la carpeta que contiene
            <code>package.json</code> (es la ubicación donde también se inició el servidor con
            <code>npm start</code>). Por ejemplo: <code>cd "C:\\Users\\...\\Angular-Lab"</code>.
          </li>
          <li>
            Presioná el botón de reinicio del ejercicio o el botón global. Se copiará el comando
            correspondiente al portapapeles.
          </li>
          <li>
            Pegá el comando en la terminal y ejecutalo. Por ejemplo:
            <code>npm run restore -- tutorial/01</code>. El script te pedirá confirmación antes de
            restaurar los archivos.
          </li>
        </ol>
        <p>
          El botón global copia <code>npm run restore -- tutorial</code>; cada botón de lección
          copia el comando específico de esa lección.
        </p>
      </section>

      <div class="acciones-globales">
        <reinicio-boton
          [claves]="restauracion.clavesDeSeccion('tutorial')"
          grupo="tutorial"
          etiqueta="Copiar reinicio global"
        />
      </div>

      <ol class="lista">
        @for (leccion of lecciones; track leccion.numero) {
          <li>
            @if (leccion.soloLectura) {
              <div class="tarjeta">
                <span class="titulo">{{ leccion.numero }} — {{ leccion.titulo }}</span>
                <a class="accion" routerLink="/tutorial/{{ leccion.numero }}">Ver</a>
              </div>
            } @else {
              <div class="tarjeta">
                <a class="titulo" routerLink="/tutorial/{{ leccion.numero }}">
                  {{ leccion.numero }} — {{ leccion.titulo }}
                </a>
                <span class="links">
                  <a class="accion" [routerLink]="['/tutorial', leccion.numero]">ejercicio</a>
                  <a class="accion" [routerLink]="['/tutorial', leccion.numero, 'solucion']"
                    >solución</a
                  >
                </span>
              </div>
              <!-- El reset compacto queda FUERA del recuadro del ejercicio -->
              <reinicio-boton compacto [claves]="['tutorial/' + leccion.numero]" />
            }
          </li>
        }
      </ol>
    </main>
  `,
  styles: `
    .contenedor {
      max-width: 720px;
      margin: 0 auto;
      padding: 2rem 1rem;
      font-family: system-ui, sans-serif;
    }
    h1 {
      margin: 0 0 0.5rem;
      letter-spacing: -0.02em;
    }
    .bajada {
      color: var(--texto-suave);
      line-height: 1.5;
    }

    .guia-reinicio {
      margin: 1rem 0 1.25rem;
      padding: 1rem 1.25rem;
      border: 1px solid var(--borde);
      border-inline-start: 4px solid var(--acento);
      border-radius: 10px;
      background: var(--acento-suave);
    }

    .guia-reinicio h2 {
      margin: 0 0 0.5rem;
      color: var(--acento);
      font-size: 1.05rem;
    }

    .guia-reinicio ol {
      margin: 0;
      padding-inline-start: 1.25rem;
    }

    .guia-reinicio li,
    .guia-reinicio p {
      line-height: 1.55;
    }

    .guia-reinicio li + li {
      margin-top: 0.35rem;
    }

    .guia-reinicio p {
      margin: 0.65rem 0 0;
    }

    .guia-reinicio code {
      overflow-wrap: anywhere;
    }

    /* El link externo usa el acento del tema en vez del azul default del navegador */
    .bajada a {
      color: var(--acento);
      font-weight: 600;
      text-decoration: none;
    }

    .bajada a:hover {
      text-decoration: underline;
    }

    .bajada a:focus-visible {
      outline: 2px solid var(--acento);
      outline-offset: 2px;
      border-radius: 3px;
    }
    /* Mensaje de introducción: qué es Angular y qué se necesita */
    .que-es {
      margin: 0 0 1.25rem;
      padding: 1rem 1.25rem;
      border: 1px solid color-mix(in srgb, var(--acento) 18%, transparent);
      border-radius: 12px;
      background: var(--acento-suave);
    }
    .que-es h2 {
      margin: 0 0 0.5rem;
      font-size: 1.1rem;
      letter-spacing: -0.01em;
      color: var(--acento);
    }
    .que-es p {
      margin: 0 0 0.5rem;
      line-height: 1.55;
      font-size: 0.95rem;
    }
    .que-es p:last-child {
      margin-bottom: 0;
    }
    .lista {
      list-style: none;
      padding: 0;
      display: grid;
      gap: 0.5rem;
    }
    .lista li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    /* Recuadro del ejercicio: el reset compacto vive fuera de él */
    .tarjeta {
      flex: 1;
      min-width: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      padding: 0.6rem 0.85rem;
      border: 1px solid var(--borde);
      border-radius: 10px;
      background: var(--superficie);
      transition:
        border-color 0.15s ease,
        background-color 0.15s ease;
    }
    .tarjeta:hover {
      border-color: var(--acento);
    }
    .titulo {
      text-decoration: none;
      color: var(--texto);
      font-weight: 500;
    }
    a.titulo:hover {
      color: var(--acento);
    }
    .links {
      display: inline-flex;
      gap: 0.4rem;
    }
    /* Acciones ejercicio/solución/Ver como botones píldora, no texto subrayado */
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
    /* Botón de reinicio general de la sección */
    .acciones-globales {
      display: flex;
      justify-content: flex-end;
      margin: 0 0 1.25rem;
    }
  `,
})
export class TutorialIndex {
  protected readonly lecciones = LECCIONES;
  protected readonly restauracion = inject(RestauracionService);
}
