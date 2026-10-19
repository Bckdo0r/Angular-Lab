import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconoSvg } from '../compartido/icono-svg';

/**
 * Página de inicio del proyecto: hero con dos accesos principales
 * (Tutorial y Prácticas avanzadas), inspirada en la portada de angular.dev.
 */
@Component({
  selector: 'app-home',
  imports: [RouterLink, IconoSvg, NgOptimizedImage],
  template: `
    <main class="inicio">
      <section class="hero">
        <span class="chip">
          <span class="chip-text">Angular v22 · práctica guiada</span>
        </span>
        <h1>
          Tu laboratorio de
          <a class="degradado" href="https://angular.dev/" target="_blank" rel="noopener">
            Angular
          </a>
          local
        </h1>
        <p class="autor">
          Creada por
          <a href="https://github.com/Bckdo0r" target="_blank" rel="noopener noopener">
            <svg
              viewBox="0 0 16 16"
              width="18"
              height="18"
              fill="currentColor"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
              />
            </svg>
            Bckdo0r
          </a>
        </p>
        <p class="bajada">
          Un tutorial paso a paso basado en el tutorial oficial y un set de prácticas avanzadas con
          temáticas de entorno laboral. Todo el código vive en este proyecto: completá los
          <code>TODO</code>s de cada ejercicio y compará con la solución.
        </p>
        <p class="nota-version">
          Practicamos con <strong>Angular v22</strong>, pero el contenido sirve desde
          <strong>v20</strong>: la documentación de referencia es la de esa versión.
        </p>
      </section>

      <section class="tarjetas" aria-label="Secciones del proyecto">
        <a class="tarjeta" routerLink="/tutorial">
          <span class="icono" aria-hidden="true"><icono-svg nombre="libro" [tamano]="30" /></span>
          <h2>Tutorial de Angular</h2>
          <p>
            Lecciones cortas que siguen el tutorial oficial: componentes, control de flujo (<code
              >&#64;if</code
            >
            / <code>&#64;for</code>), inputs y outputs, routing, formularios, servicios inyectables
            y pipes.
          </p>
          <span class="cta">Empezar el tutorial →</span>
        </a>

        <a class="tarjeta tarjeta-extras tema-extras" routerLink="/extras">
          <span class="icono" aria-hidden="true"><icono-svg nombre="frasco" [tamano]="30" /></span>
          <h2>Prácticas Avanzadas</h2>
          <p>
            Escenarios de trabajo real: bus de eventos con RxJS, formularios reactivos avanzados,
            HttpClient con manejo de errores, auth con JWT y guards, y un CRUD interactivo con
            modales.
          </p>
          <span class="cta">Ir a las prácticas →</span>
        </a>
      </section>

      <section class="tecnologias" aria-labelledby="titulo-tecnologias">
        <div class="tecnologias-cabecera">
          <div>
            <h2 id="titulo-tecnologias">Tecnologías que vas a trabajar</h2>
            <p>Herramientas y conceptos presentes en las lecciones y prácticas del proyecto.</p>
          </div>
        </div>

        <div
          class="marquee"
          role="region"
          aria-label="Lista animada de tecnologías del proyecto"
          tabindex="0"
        >
          <div class="marquee-pista">
            <ul class="marquee-grupo" aria-label="Logos de tecnologías estudiadas">
              @for (tecnologia of tecnologias; track tecnologia.id) {
                <li class="tecnologia">
                  <img
                    class="logo-tecnologia"
                    [ngSrc]="'/tecnologias/' + tecnologia.id + '.svg'"
                    [alt]="tecnologia.nombre"
                    width="40"
                    height="40"
                  />
                </li>
              }
            </ul>
            <ul class="marquee-grupo" aria-hidden="true">
              @for (tecnologia of tecnologias; track tecnologia.id) {
                <li class="tecnologia">
                  <img
                    class="logo-tecnologia"
                    [ngSrc]="'/tecnologias/' + tecnologia.id + '.svg'"
                    alt=""
                    width="40"
                    height="40"
                  />
                </li>
              }
            </ul>
          </div>
        </div>
      </section>

      <section class="como" aria-labelledby="titulo-como">
        <h2 id="titulo-como">¿Cómo practicar?</h2>
        <p class="como-bajada">
          Si ya clonaste el proyecto, seguí estos pasos para mantenerlo actualizado y empezar a
          practicar.
        </p>

        <ol class="pasos">
          <li class="paso">
            <span class="numero" aria-hidden="true">0</span>
            <div class="cuerpo">
              <h3>Revisá actualizaciones y cuidá tu progreso</h3>
              <p>
                Desde una terminal en la raíz del proyecto —la carpeta que contiene
                <code>package.json</code>— ejecutá <code>git status</code>. Si tenés cambios locales
                que querés conservar, guardalos con un commit o una copia de seguridad antes de
                actualizar.
              </p>
              <p>
                Para reducir conflictos en futuras actualizaciones, modificá solo los archivos de
                trabajo que indica el README de cada ejercicio, incluidos los archivos compartidos
                que la consigna pida cambiar. Si tu trabajo y la actualización cambian el mismo
                archivo, Git puede pedirte resolver un conflicto. Luego ejecutá
                <code>git pull</code>; si no hay novedades, Git te avisará que el repositorio ya está
                actualizado. Si la actualización modifica <code>package.json</code> o
                <code>package-lock.json</code>, detené el servidor, ejecutá <code>npm install</code> y
                volvé a iniciarlo con <code>npm start</code>.
              </p>
            </div>
          </li>

          <li class="paso">
            <span class="numero" aria-hidden="true">1</span>
            <div class="cuerpo">
              <h3>Elegí por dónde empezar</h3>
              <p>
                <strong>Si estás empezando con Angular:</strong> te recomendamos seguir el tutorial
                en orden. Vas a aprender las bases paso a paso: componentes, plantillas, eventos,
                formularios, servicios y navegación.
                <a class="enlace-recorrido" routerLink="/tutorial">Empezá por el tutorial →</a>
              </p>
              <p>
                <strong>Si ya tenés conocimientos de Angular:</strong> podés ir directo a las
                prácticas avanzadas, con ejercicios sobre temas aplicados como RxJS, HttpClient,
                autenticación, Angular Material y NgRx.
                <a class="enlace-recorrido" routerLink="/extras">Ir a las prácticas →</a>
              </p>
            </div>
          </li>

          <li class="paso">
            <span class="numero" aria-hidden="true">2</span>
            <div class="cuerpo">
              <h3>Elegí un ejercicio y revisá su salida</h3>
              <p>
                En las páginas de Tutorial y Prácticas tenés la lista de ejercicios y sus enlaces a
                la salida (el ejercicio) y a la solución. Abrí un ejercicio para ver en el navegador
                el resultado que vas a modificar; la solución te sirve para comparar.
              </p>
            </div>
          </li>

          <li class="paso">
            <span class="numero" aria-hidden="true">3</span>
            <div class="cuerpo">
              <h3>Editá el código desde tu editor</h3>
              <p>
                La salida no se modifica desde la página: abrí la carpeta del proyecto con tu editor
                de código favorito (por ejemplo, VS Code o WebStorm) y editá ahí los archivos del
                ejercicio. Cada página incluye una guía y señala los comentarios <code>TODO</code>
                que tenés que completar. Guardá los cambios para que el servidor actualice la salida
                en el navegador.
              </p>
            </div>
          </li>
        </ol>
      </section>

      <!-- Invitación a colaborar con sugerencias o nuevos ejercicios -->
      <section class="sugerencias" aria-label="Sugerencias">
        <p>
          <icono-svg nombre="bombilla" [tamano]="18" /> ¿Se te ocurren sugerencias de mejora o
          ejercicios nuevos para la página? Escribime por email a
          <a href="mailto:zalazaragustin51@gmail.com">zalazaragustin51@gmail.com</a>.
        </p>
      </section>
    </main>
  `,
  styles: `
    .inicio {
      position: relative;
      max-width: 1080px;
      margin: 0 auto;
      padding: 4.5rem 1.5rem 5rem;
      overflow: hidden;
    }

    /* Resplandor decorativo detrás del hero, como en angular.dev */
    .inicio::before {
      content: '';
      position: absolute;
      inset: -40% 20% auto;
      height: 480px;
      background: radial-gradient(closest-side, var(--resplandor), transparent);
      pointer-events: none;
    }

    .hero {
      position: relative;
      text-align: center;
      display: grid;
      justify-items: center;
      gap: 1.1rem;
      margin-bottom: 4rem;
    }

    h1 {
      margin: 0;
      max-width: 22ch;
      font-size: clamp(2.1rem, 5vw, 3.4rem);
      line-height: 1.1;
      letter-spacing: -0.03em;
      font-weight: 800;
    }

    /* Texto con degradado violeta, al estilo de la portada de Angular */
    .degradado {
      background: linear-gradient(90deg, var(--acento), var(--acento-fuerte));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      text-decoration: none;
    }

    .degradado:focus-visible {
      border-radius: 3px;
      outline: 2px solid var(--acento);
      outline-offset: 3px;
    }

    .bajada {
      margin: 0;
      max-width: 60ch;
      color: var(--texto-suave);
      font-size: 1.08rem;
      line-height: 1.65;
    }

    /* Aclaración de versiones: aparte de la bajada, en texto más discreto */
    .nota-version {
      margin: -0.3rem 0 0;
      max-width: 60ch;
      color: var(--texto-suave);
      font-size: 0.9rem;
      line-height: 1.6;
    }

    .nota-version strong {
      color: var(--texto);
      font-weight: 600;
    }

    /* Autoría de la página, justo debajo del título */
    .autor {
      margin: -0.4rem 0 0;
      color: var(--texto-suave);
      font-size: 0.95rem;
    }

    .autor a {
      color: var(--acento);
      font-weight: 600;
      text-decoration: none;
    }

    /* Alinea el logo con la línea base del texto, sin desalinear el enlace */
    .autor a svg {
      display: inline-block;
      vertical-align: -0.14em;
      margin-right: 0.18rem;
    }

    .autor a:hover {
      text-decoration: underline;
    }

    .autor a:focus-visible {
      outline: 2px solid var(--acento);
      outline-offset: 2px;
      border-radius: 3px;
    }

    /* Las dos tarjetas grandes de acceso */
    .tarjetas {
      position: relative;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .tarjeta {
      display: grid;
      grid-template-rows: auto auto 1fr auto;
      gap: 0.75rem;
      padding: 1.75rem 1.6rem;
      border: 1px solid var(--borde);
      border-radius: 16px;
      background: var(--superficie);
      box-shadow: var(--sombra-tarjeta);
      text-decoration: none;
      color: var(--texto);
      transition:
        transform 0.18s ease,
        border-color 0.18s ease,
        box-shadow 0.18s ease;
    }

    .tarjeta:hover {
      transform: translateY(-4px);
      border-color: var(--acento);
    }

    .tarjeta:focus-visible {
      outline: 2px solid var(--acento);
      outline-offset: 3px;
    }

    .icono {
      color: var(--acento);
      font-size: 1.9rem;
      line-height: 1;
    }

    .tarjeta h2 {
      margin: 0;
      font-size: 1.35rem;
      letter-spacing: -0.01em;
    }

    .tarjeta p {
      margin: 0;
      color: var(--texto-suave);
      font-size: 0.95rem;
      line-height: 1.6;
    }

    .cta {
      justify-self: start;
      margin-top: 0.5rem;
      color: var(--acento);
      font-weight: 700;
      font-size: 0.95rem;
    }

    .tarjeta:hover .cta {
      color: var(--acento-fuerte);
    }

    /* ─── Sección "¿Cómo practicar?" ─────────────────────────── */
    .como {
      position: relative;
      margin-top: 4.5rem;
    }

    .como h2 {
      margin: 0 0 0.5rem;
      text-align: center;
      font-size: 1.65rem;
      letter-spacing: -0.02em;
    }

    .como-bajada {
      margin: 0 auto 2rem;
      max-width: 52ch;
      text-align: center;
      color: var(--texto-suave);
      line-height: 1.6;
    }

    .pasos {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      gap: 1rem;
    }

    .paso {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 1.1rem;
      align-items: start;
      padding: 1.25rem 1.4rem;
      border: 1px solid var(--borde);
      border-radius: 14px;
      background: var(--superficie);
      box-shadow: var(--sombra-tarjeta);
    }

    .numero {
      display: grid;
      place-items: center;
      width: 2rem;
      height: 2rem;
      margin-top: 0.1rem;
      border-radius: 999px;
      background: var(--acento-suave);
      color: var(--acento);
      font-weight: 800;
      font-size: 0.95rem;
    }

    .cuerpo {
      display: grid;
      gap: 0.45rem;
    }

    .cuerpo h3 {
      margin: 0;
      font-size: 1.05rem;
      letter-spacing: -0.01em;
    }

    .enlace-recorrido {
      color: var(--acento);
      font-weight: 600;
    }

    .cuerpo p {
      margin: 0;
      color: var(--texto-suave);
      font-size: 0.93rem;
      line-height: 1.6;
    }

    .cuerpo p code {
      font-size: 0.85rem;
    }

    /* Comandos de consola: los estilos del bloque y del botón de copiado
       viven en el componente CodigoCopiable. */

    /* Aclaración de cierre: invitación a enviar sugerencias por email */
    .sugerencias {
      margin-top: 3rem;
      text-align: center;
    }

    .sugerencias p {
      display: inline-block;
      margin: 0 auto;
      max-width: 60ch;
      padding: 1rem 1.4rem;
      border: 1px solid color-mix(in srgb, var(--acento) 18%, transparent);
      border-radius: 12px;
      background: var(--acento-suave);
      color: var(--texto);
      line-height: 1.6;
    }

    .sugerencias a {
      color: var(--acento);
      font-weight: 600;
      text-decoration: none;
    }

    .sugerencias a:hover {
      text-decoration: underline;
    }

    .sugerencias a:focus-visible {
      outline: 2px solid var(--acento);
      outline-offset: 2px;
      border-radius: 3px;
    }
  `,
})
export class Home {
  protected readonly tecnologias = [
    { id: 'angular', nombre: 'Angular' },
    { id: 'typescript', nombre: 'TypeScript' },
    { id: 'rxjs', nombre: 'RxJS' },
    { id: 'materialdesign', nombre: 'Material Design (Angular Material)' },
    { id: 'ngrx', nombre: 'NgRx' },
    { id: 'vitest', nombre: 'Vitest' },
  ];

}
