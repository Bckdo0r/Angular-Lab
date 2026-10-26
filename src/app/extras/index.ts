import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PRACTICAS } from '../curso/actividades';
import { ReinicioBoton } from '../restauracion/boton-reinicio';
import { RestauracionService } from '../restauracion/restauracion.service';

@Component({
  selector: 'extras-index',
  imports: [RouterLink, ReinicioBoton],
  template: `
    <main class="contenedor">
      <h1>Prácticas avanzadas</h1>
      <section class="guia-reinicio" aria-labelledby="guia-reinicio-titulo">
        <h2 id="guia-reinicio-titulo">Cómo reiniciar una práctica</h2>
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
            <code>npm run restore -- extras/01</code>. El script te pedirá confirmación antes de
            restaurar los archivos.
          </li>
        </ol>
        <p>
          El botón global copia <code>npm run restore -- extras</code>; cada botón de práctica copia
          el comando específico de esa práctica.
        </p>
      </section>

      <p class="bajada">
        Módulos de práctica con temáticas de entorno laboral que el tutorial básico no cubre a
        fondo. Cada práctica vive en <code>src/app/extras/</code> con un <code>README.md</code> (la
        guía de la lección), el <strong>ejercicio</strong> con la lógica incompleta marcada con
        <code>TODO</code>s y la <strong>solución</strong> comentada para comparar.
      </p>

      <div class="acciones-globales">
        <reinicio-boton
          [claves]="restauracion.clavesDeSeccion('extras')"
          grupo="extras"
          etiqueta="Copiar reinicio global"
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
              @if (practica.disponible !== false) {
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
            @if (practica.disponible !== false) {
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
