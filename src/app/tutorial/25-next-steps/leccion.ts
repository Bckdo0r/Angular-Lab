import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconoSvg } from '../../compartido/icono-svg';

/**
 * LECCIÓN 25 — Próximos pasos (solo lectura)
 *
 * ¡Completaste el tutorial Learn Angular! Esta lección no tiene ejercicio:
 * es un cierre con recursos para seguir aprendiendo.
 */
@Component({
  selector: 'leccion-25',
  imports: [RouterLink, IconoSvg],
  template: `
    <main class="contenedor">
      <h1><icono-svg nombre="cohete" [tamano]="28" /> ¿Listo para explorar más de Angular?</h1>
      <p class="burbuja">
        ¡Lo lograste! Completaste el tutorial Learn Angular y aprendiste lo esencial para construir
        aplicaciones.
      </p>

      <div class="tarjetas">
        <a class="tarjeta" href="https://v20.angular.dev/roadmap" target="_blank" rel="noopener">
          <h3>Hoja de ruta de Angular</h3>
          <p>Leé el roadmap open source de Angular: proyectos actuales, futuros y completados.</p>
        </a>
        <a class="tarjeta" href="https://v20.angular.dev/playground" target="_blank" rel="noopener">
          <h3>Zona de juegos</h3>
          <p>¡Jugá con Angular directamente en tu navegador!</p>
        </a>
        <a
          class="tarjeta"
          href="https://youtube.com/playlist?list=PL1w1q3fL4pmj9k1FrJ3Pe91EPub2_h4jF"
          target="_blank"
          rel="noopener"
        >
          <h3>Curso de Angular en YouTube</h3>
          <p>Mirá el canal oficial de Angular en YouTube: videos y cursos.</p>
        </a>
        <a
          class="tarjeta"
          href="https://www.youtube.com/watch?v=JWhRMyyF7nc&amp;t=36s"
          target="_blank"
          rel="noopener"
        >
          <h3>Angular de la A a la Z</h3>
          <p>
            Tutorial completo de Envato para principiantes: repasa Angular entero en un solo video.
          </p>
        </a>
        <a
          class="tarjeta"
          href="https://www.youtube.com/watch?v=rZCQiMdQsxE&amp;list=PLfyWdpsiUiPApyjPvz7Ms6D6IXhoimQBW"
          target="_blank"
          rel="noopener"
        >
          <h3>Serie completa de Angular</h3>
          <p>Playlist de Nihira Techiees que cubre Angular capítulo por capítulo, desde cero.</p>
        </a>
        <a
          class="tarjeta"
          href="https://hackernoon.com/how-to-build-an-employee-management-crud-app-with-angular-and-material-ui"
          target="_blank"
          rel="noopener"
        >
          <h3>CRUD con Angular y Material UI</h3>
          <p>Artículo de Hackernoon: construí una app de gestión de empleados paso a paso.</p>
        </a>
        <a class="tarjeta tarjeta-practicas tema-extras" routerLink="/extras">
          <h3><icono-svg nombre="frasco" [tamano]="16" /> Prácticas Avanzadas</h3>
          <p>
            El aprendizaje sigue acá: escenarios de trabajo real para seguir practicando lo visto.
            Cada práctica indica su alcance y sus comprobaciones. Los videos y artículos son
            recursos opcionales y pueden usar versiones distintas de Angular.
          </p>
        </a>
      </div>

      <a class="volver" routerLink="/tutorial">← Volver al índice del tutorial</a>
    </main>
  `,
  styles: `
    .contenedor {
      max-width: 860px;
      margin: 0 auto;
      padding: 2rem 1rem;
      font-family: system-ui, sans-serif;
    }
    h1 {
      margin: 0 0 1rem;
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }
    /* Ícono de la tarjeta de prácticas, alineado con el título */
    .tarjeta h3 icono-svg,
    h1 icono-svg {
      color: var(--acento);
    }
    .burbuja {
      background: var(--acento-suave);
      border: 1px solid color-mix(in srgb, var(--acento) 18%, transparent);
      border-radius: 12px;
      padding: 1rem 1.25rem;
      line-height: 1.5;
    }
    .tarjetas {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1rem;
      margin: 1.5rem 0;
    }
    .tarjeta {
      border: 1px solid var(--borde);
      border-radius: 12px;
      padding: 1rem 1.25rem;
      text-decoration: none;
      color: inherit;
      background: var(--superficie);
      box-shadow: var(--sombra-tarjeta);
      transition:
        border-color 0.2s ease,
        transform 0.18s ease;
    }
    .tarjeta-practicas {
      grid-column: 1 / -1;
    }
    .tarjeta:hover {
      border-color: var(--acento);
      transform: translateY(-2px);
    }
    .tarjeta:focus-visible {
      outline: 2px solid var(--acento);
      outline-offset: 2px;
    }
    .tarjeta h3 {
      margin: 0 0 0.5rem;
      font-size: 1.05rem;
      color: var(--acento);
    }
    .tarjeta p {
      margin: 0;
      color: var(--texto-suave);
      font-size: 0.9rem;
      line-height: 1.45;
    }
    .volver {
      color: var(--acento);
    }
  `,
})
export class Leccion25 {}
