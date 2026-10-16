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
        <a href="https://v20.angular.dev/tutorials/learn-angular" target="_blank" rel="noopener">Learn Angular</a>.
        Cada lección tiene su carpeta en <code>src/app/tutorial/</code> con un <code>README.md</code>, el código del
        ejercicio (con <code>TODO</code>s para completar) y la solución.
      </p>

      <div class="que-es">
        <h2>¿Qué es Angular?</h2>
        <p>
          Angular es el framework de desarrollo web para construir apps modernas: componentes,
          routing, formularios, servicios inyectables y pipes, todo incluido.
        </p>
        <p>
          Antes de arrancar con la ejercitación conviene tener las bases de
          <strong>HTML, CSS y JavaScript</strong> (o TypeScript) y <strong>Node.js 20 o
          superior</strong> instalado en tu máquina.
        </p>
      </div>

      <div class="acciones-globales">
        <reinicio-boton
          [claves]="restauracion.clavesDeSeccion('tutorial')"
          descripcion="Vas a borrar los cambios que hiciste en TODAS las lecciones del tutorial y volver al estado original."
        />
      </div>

      <ol class="lista">
        @for (leccion of lecciones; track leccion.numero) {
          <li>
            @if (leccion.soloLectura) {
              <span class="titulo">{{ leccion.numero }} — {{ leccion.titulo }}</span>
              <a routerLink="/tutorial/{{ leccion.numero }}">Ver</a>
            } @else {
              <a class="titulo" routerLink="/tutorial/{{ leccion.numero }}">
                {{ leccion.numero }} — {{ leccion.titulo }}
              </a>
              <span class="links">
                <a [routerLink]="['/tutorial', leccion.numero]">ejercicio</a>
                <a [routerLink]="['/tutorial', leccion.numero, 'solucion']">solución</a>
                <reinicio-boton compacto [claves]="['tutorial/' + leccion.numero]" />
              </span>
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
      justify-content: space-between;
      align-items: baseline;
      gap: 1rem;
      padding: 0.6rem 0.85rem;
      border: 1px solid var(--borde);
      border-radius: 10px;
      background: var(--superficie);
      transition: border-color 0.15s ease, background-color 0.15s ease;
    }
    .lista li:hover {
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
    .links a {
      margin-left: 0.75rem;
      font-size: 0.85rem;
      color: var(--acento);
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
