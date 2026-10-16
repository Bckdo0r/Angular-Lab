import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EMPLEADOS } from '../empleados-mock';

/**
 * SOLUCIÓN — equipo: ruta hija "libre" del panel (Paso 8), sin guard.
 * Se pinta en el <router-outlet /> del PanelLayoutSolucion; los links al
 * detalle son absolutos y preservan query params (igual que el ejercicio).
 */
@Component({
  selector: 'equipo-page-solucion',
  imports: [RouterLink],
  template: `
    <section>
      <h2>Equipo (solución)</h2>
      <p class="bajada">
        Ruta hija de <code>extras/07/solucion/panel</code>, sin guard: existe para
        cualquier rol.
      </p>

      <table>
        <caption class="visually-hidden">Listado de empleados del panel de equipo</caption>
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Área</th>
            <th scope="col">Seniority</th>
            <th scope="col"><span class="visually-hidden">Acciones</span></th>
          </tr>
        </thead>
        <tbody>
          @for (empleado of empleados; track empleado.id) {
            <tr>
              <td>{{ empleado.nombre }}</td>
              <td>{{ empleado.area }}</td>
              <td>{{ empleado.seniority }}</td>
              <td>
                <a [routerLink]="['/extras/07/solucion/detalle', empleado.id]">Ficha →</a>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </section>
  `,
  styles: `
    .bajada {
      color: var(--texto-suave);
    }
    table {
      width: 100%;
      border-collapse: collapse;
      background: var(--superficie);
      border: 1px solid var(--borde);
      border-radius: 10px;
      box-shadow: var(--sombra-tarjeta);
      overflow: hidden;
    }
    th {
      color: var(--texto-suave);
      text-transform: uppercase;
      font-size: 0.75rem;
      letter-spacing: 0.04em;
      text-align: left;
      padding: 0.6rem 0.9rem;
      border-bottom: 1px solid var(--borde);
    }
    td {
      padding: 0.6rem 0.9rem;
      border-bottom: 1px solid var(--borde);
    }
    tbody tr:last-child td {
      border-bottom: none;
    }
    tbody tr:hover {
      background: var(--acento-suave);
    }
    td a {
      color: var(--acento);
      font-weight: 600;
      text-decoration: none;
    }
    td a:hover {
      text-decoration: underline;
    }
    td a:focus-visible {
      outline: 2px solid var(--acento);
      outline-offset: 2px;
    }
    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0 0 0 0);
      white-space: nowrap;
    }
  `,
})
export class EquipoPageSolucion {
  protected readonly empleados = EMPLEADOS;
}
