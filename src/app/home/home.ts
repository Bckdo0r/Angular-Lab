import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Página de inicio del proyecto: hero con dos accesos principales
 * (Tutorial y Prácticas avanzadas), inspirada en la portada de angular.dev.
 */
@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <main class="inicio">
      <section class="hero">
        <span class="chip">Angular v20 · práctica guiada</span>
        <h1>
          Aprendiendo <span class="degradado">Angular</span> haciendo
        </h1>
        <p class="autor">
          Creada por
          <a href="https://github.com/Bckdo0r" target="_blank" rel="noopener noopener">
            <svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor" aria-hidden="true" focusable="false">
              <path
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
            </svg>
            Bckdo0r
          </a>
        </p>
        <p class="bajada">
          Un tutorial paso a paso basado en el tutorial oficial y un set de prácticas
          avanzadas con temáticas de entorno laboral. Todo el código vive en este proyecto:
          completá los <code>TODO</code>s de cada ejercicio y compará con la solución.
        </p>
      </section>

      <section class="tarjetas" aria-label="Secciones del proyecto">
        <a class="tarjeta" routerLink="/tutorial">
          <span class="icono" aria-hidden="true">📚</span>
          <h2>Tutorial de Angular</h2>
          <p>
            Lecciones cortas que siguen el tutorial oficial: componentes, control de flujo
            (<code>&#64;if</code> / <code>&#64;for</code>), inputs y outputs, routing,
            formularios, servicios inyectables y pipes.
          </p>
          <span class="cta">Empezar el tutorial →</span>
        </a>

        <a class="tarjeta" routerLink="/extras">
          <span class="icono" aria-hidden="true">🧪</span>
          <h2>Prácticas avanzadas</h2>
          <p>
            Escenarios de trabajo real: bus de eventos con RxJS, formularios reactivos
            avanzados, HttpClient con manejo de errores, auth con JWT y guards, y un CRUD
            interactivo con modales.
          </p>
          <span class="cta">Ir a las prácticas →</span>
        </a>
      </section>

      <section class="como" aria-labelledby="titulo-como">
        <h2 id="titulo-como">¿Cómo practicar?</h2>
        <p class="como-bajada">
          Esta página es la guía, pero la práctica se hace en tu máquina.
          Seguí estos cuatro pasos:
        </p>

        <ol class="pasos">
          <li class="paso">
            <span class="numero" aria-hidden="true">1</span>
            <div class="cuerpo">
              <h3>Descargá el repositorio</h3>
              <p>Cloná el proyecto en tu máquina con Git:</p>
              <code class="cmd">git clone https://github.com/Bckdo0r/Practica-Angular.git</code>
              <p>…o descargalo como ZIP desde GitHub (botón <strong>Code → Download ZIP</strong>).</p>
            </div>
          </li>

          <li class="paso">
            <span class="numero" aria-hidden="true">2</span>
            <div class="cuerpo">
              <h3>Instalá las dependencias</h3>
              <p>
                Necesitás tener <strong>Node.js</strong> instalado (versión 20 o superior,
                que ya incluye npm). Podés verificarlo con <code>node -v</code>. Luego,
                dentro de la carpeta del proyecto, ejecutá:
              </p>
              <code class="cmd">npm install</code>
              <p>
                <strong>No hace falta instalar Angular CLI globalmente:</strong> el proyecto
                ya lo trae como dependencia y <code>npm start</code> lo usa directamente.
              </p>
            </div>
          </li>

          <li class="paso">
            <span class="numero" aria-hidden="true">3</span>
            <div class="cuerpo">
              <h3>Levantá la página</h3>
              <p>Desde la consola, en la carpeta del proyecto, iniciá el servidor de desarrollo:</p>
              <code class="cmd">npm start</code>
              <p>Cuando termine, abrí <code>http://localhost:4200</code> en tu navegador.</p>
            </div>
          </li>

          <li class="paso">
            <span class="numero" aria-hidden="true">4</span>
            <div class="cuerpo">
              <h3>Completá los ejercicios</h3>
              <p>
                Abrí el proyecto con tu editor de código favorito (VS Code, WebStorm, etc.),
                elegí una lección o práctica del menú y buscá los <code>TODO</code>:
                ahí es donde escribís tu código. Al terminar, compará tu versión con la
                <strong>solución</strong> que acompaña a cada ejercicio.
              </p>
            </div>
          </li>
        </ol>
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

    .chip {
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: var(--acento);
      background: var(--acento-suave);
      border: 1px solid color-mix(in srgb, var(--acento) 25%, transparent);
      padding: 0.3rem 0.85rem;
      border-radius: 999px;
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
    }

    .bajada {
      margin: 0;
      max-width: 60ch;
      color: var(--texto-suave);
      font-size: 1.08rem;
      line-height: 1.65;
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
      transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
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

    .cuerpo p {
      margin: 0;
      color: var(--texto-suave);
      font-size: 0.93rem;
      line-height: 1.6;
    }

    .cuerpo p code {
      font-size: 0.85rem;
    }

    /* Comandos de consola destacados en bloque */
    .cmd {
      display: block;
      padding: 0.55rem 0.85rem;
      border: 1px solid color-mix(in srgb, var(--acento) 18%, transparent);
      border-radius: 8px;
      font-size: 0.88rem;
      white-space: pre-wrap;
      word-break: break-word;
      overflow-x: auto;
    }
  `,
})
export class Home {}
