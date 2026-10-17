import { Routes } from '@angular/router';
import { rutasPractica04 } from './extras/04-auth-jwt-guards-interceptors/rutas';
import { rutasPractica09 } from './extras/09-ngrx-store/rutas';
import { rutasPractica07 } from './extras/07-ruteo-avanzado/rutas';
import { SalidaDemo, salida } from './compartido/salida-demo';

/**
 * RUTAS DE LA APLICACIÓN
 *
 * Todas las páginas de RESULTADO (lecciones del tutorial y prácticas, tanto
 * el ejercicio como la solución) se renderizan dentro del recuadro "Output"
 * (`SalidaDemo`, ver compartido/salida-demo.ts):
 *
 *   - Rutas planas → `children: [salida(loader, título)]` (helper).
 *   - Rutas que ya tienen `children` propias (12/13sol/14/14sol y los
 *     sub-layouts de las prácticas 04/07/09) → `component: SalidaDemo` en
 *     la ruta padre y el contenido original anidado bajo un `path: ''`.
 *
 * El nivel agregado siempre tiene `path: ''`, así que las URLs NO cambian
 * y los guards/redirects absolutos siguen funcionando igual.
 *
 * Excepciones SIN recuadro (a propósito):
 *   - Home `/` y los índices `/tutorial` y `/extras`: no son resultados.
 *   - Lección 13 (ejercicio): su README le pide al alumno agregar `children`
 *     a ESTA ruta exacta; envolverla cambiaría el objetivo del ejercicio.
 *   - Lección 25: solo lectura, no tiene resultado que enmarcar.
 */
export const routes: Routes = [
  // ─── Página de inicio: acceso a Tutorial y Prácticas ─────────
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./home/home').then((m) => m.Home),
    title: 'Angular Lab — Aprendiendo Angular haciendo',
  },

  {
    path: 'tutorial',
    loadComponent: () => import('./tutorial/index').then((m) => m.TutorialIndex),
    title: 'Tutorial de Angular',
  },

  // ─── Lección 01 — Anatomía de un Componente ──────────────────
  {
    path: 'tutorial/01',
    children: [
      salida(
        () => import('./tutorial/01-componentes/leccion').then((m) => m.Leccion01),
        'Lección 01 — Anatomía de un Componente',
      ),
    ],
  },
  {
    path: 'tutorial/01/solucion',
    children: [
      salida(
        () =>
          import('./tutorial/01-componentes/solucion/solucion').then((m) => m.Leccion01Solucion),
        'Solución 01 — Anatomía de un Componente',
      ),
    ],
  },

  // ─── Lección 02 — Actualizar la clase del componente ─────────
  {
    path: 'tutorial/02',
    children: [
      salida(
        () => import('./tutorial/02-clase-del-componente/leccion').then((m) => m.Leccion02),
        'Lección 02 — Actualizar la clase del componente',
      ),
    ],
  },
  {
    path: 'tutorial/02/solucion',
    children: [
      salida(
        () =>
          import('./tutorial/02-clase-del-componente/solucion/solucion').then(
            (m) => m.Leccion02Solucion,
          ),
        'Solución 02 — Actualizar la clase del componente',
      ),
    ],
  },

  // ─── Lección 03 — Componer componentes ───────────────────────
  {
    path: 'tutorial/03',
    children: [
      salida(
        () => import('./tutorial/03-componer-componentes/leccion').then((m) => m.Leccion03),
        'Lección 03 — Componer componentes',
      ),
    ],
  },
  {
    path: 'tutorial/03/solucion',
    children: [
      salida(
        () =>
          import('./tutorial/03-componer-componentes/solucion/solucion').then(
            (m) => m.Leccion03Solucion,
          ),
        'Solución 03 — Componer componentes',
      ),
    ],
  },

  // ─── Lección 04 — Control de flujo: @if ──────────────────────
  {
    path: 'tutorial/04',
    children: [
      salida(
        () => import('./tutorial/04-control-flow-if/leccion').then((m) => m.Leccion04),
        'Lección 04 — Control de flujo: @if',
      ),
    ],
  },
  {
    path: 'tutorial/04/solucion',
    children: [
      salida(
        () =>
          import('./tutorial/04-control-flow-if/solucion/solucion').then(
            (m) => m.Leccion04Solucion,
          ),
        'Solución 04 — Control de flujo: @if',
      ),
    ],
  },

  // ─── Lección 05 — Control de flujo: @for ─────────────────────
  {
    path: 'tutorial/05',
    children: [
      salida(
        () => import('./tutorial/05-control-flow-for/leccion').then((m) => m.Leccion05),
        'Lección 05 — Control de flujo: @for',
      ),
    ],
  },
  {
    path: 'tutorial/05/solucion',
    children: [
      salida(
        () =>
          import('./tutorial/05-control-flow-for/solucion/solucion').then(
            (m) => m.Leccion05Solucion,
          ),
        'Solución 05 — Control de flujo: @for',
      ),
    ],
  },

  // ─── Lección 06 — Property binding ───────────────────────────
  {
    path: 'tutorial/06',
    children: [
      salida(
        () => import('./tutorial/06-property-binding/leccion').then((m) => m.Leccion06),
        'Lección 06 — Property binding',
      ),
    ],
  },
  {
    path: 'tutorial/06/solucion',
    children: [
      salida(
        () =>
          import('./tutorial/06-property-binding/solucion/solucion').then(
            (m) => m.Leccion06Solucion,
          ),
        'Solución 06 — Property binding',
      ),
    ],
  },

  // ─── Lección 07 — Manejo de eventos ──────────────────────────
  {
    path: 'tutorial/07',
    children: [
      salida(
        () => import('./tutorial/07-event-handling/leccion').then((m) => m.Leccion07),
        'Lección 07 — Manejo de eventos',
      ),
    ],
  },
  {
    path: 'tutorial/07/solucion',
    children: [
      salida(
        () =>
          import('./tutorial/07-event-handling/solucion/solucion').then((m) => m.Leccion07Solucion),
        'Solución 07 — Manejo de eventos',
      ),
    ],
  },

  // ─── Lección 08 — Inputs ─────────────────────────────────────
  {
    path: 'tutorial/08',
    children: [
      salida(
        () => import('./tutorial/08-input/leccion').then((m) => m.Leccion08),
        'Lección 08 — Inputs',
      ),
    ],
  },
  {
    path: 'tutorial/08/solucion',
    children: [
      salida(
        () => import('./tutorial/08-input/solucion/solucion').then((m) => m.Leccion08Solucion),
        'Solución 08 — Inputs',
      ),
    ],
  },

  // ─── Lección 09 — Outputs ────────────────────────────────────
  {
    path: 'tutorial/09',
    children: [
      salida(
        () => import('./tutorial/09-output/leccion').then((m) => m.Leccion09),
        'Lección 09 — Outputs',
      ),
    ],
  },
  {
    path: 'tutorial/09/solucion',
    children: [
      salida(
        () => import('./tutorial/09-output/solucion/solucion').then((m) => m.Leccion09Solucion),
        'Solución 09 — Outputs',
      ),
    ],
  },

  // ─── Lección 10 — Vistas diferibles (@defer) ─────────────────
  {
    path: 'tutorial/10',
    children: [
      salida(
        () => import('./tutorial/10-deferrable-views/leccion').then((m) => m.Leccion10),
        'Lección 10 — Vistas diferibles (@defer)',
      ),
    ],
  },
  {
    path: 'tutorial/10/solucion',
    children: [
      salida(
        () =>
          import('./tutorial/10-deferrable-views/solucion/solucion').then(
            (m) => m.Leccion10Solucion,
          ),
        'Solución 10 — Vistas diferibles (@defer)',
      ),
    ],
  },

  // ─── Lección 11 — Optimización de imágenes ───────────────────
  {
    path: 'tutorial/11',
    children: [
      salida(
        () => import('./tutorial/11-optimizando-imagenes/leccion').then((m) => m.Leccion11),
        'Lección 11 — Optimización de imágenes',
      ),
    ],
  },
  {
    path: 'tutorial/11/solucion',
    children: [
      salida(
        () =>
          import('./tutorial/11-optimizando-imagenes/solucion/solucion').then(
            (m) => m.Leccion11Solucion,
          ),
        'Solución 11 — Optimización de imágenes',
      ),
    ],
  },

  // ─── Lección 12 — Habilitar el routing ───────────────────────
  // La lección ya trae rutas hijas propias: se anida el contenido original
  // bajo un `path: ''` dentro del recuadro (URLs sin cambios).
  {
    path: 'tutorial/12',
    component: SalidaDemo,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./tutorial/12-enable-routing/leccion').then((m) => m.Leccion12),
        title: 'Lección 12 — Habilitar el routing',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./tutorial/12-enable-routing/home/home').then((m) => m.Leccion12Home),
            title: 'App Home Page',
          },
          {
            path: 'user',
            loadComponent: () =>
              import('./tutorial/12-enable-routing/user/user').then((m) => m.Leccion12User),
            title: 'App User Page',
          },
        ],
      },
    ],
  },
  {
    path: 'tutorial/12/solucion',
    component: SalidaDemo,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./tutorial/12-enable-routing/solucion/solucion').then((m) => m.Leccion12Solucion),
        title: 'Solución 12 — Habilitar el routing',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./tutorial/12-enable-routing/solucion/home/home').then(
                (m) => m.Leccion12SolucionHome,
              ),
          },
          {
            path: 'home',
            loadComponent: () =>
              import('./tutorial/12-enable-routing/solucion/home/home').then(
                (m) => m.Leccion12SolucionHome,
              ),
          },
          {
            path: 'user',
            loadComponent: () =>
              import('./tutorial/12-enable-routing/solucion/user/user').then(
                (m) => m.Leccion12SolucionUser,
              ),
          },
        ],
      },
    ],
  },

  // ─── Lección 13 — Definir una ruta ───────────────────────────
  // ✏️ EJERCICIO de la lección 13: definí las rutas hijas de esta lección.
  // Las páginas ya existen (Leccion13Home y Leccion13User); te falta a vos:
  // agregar el array `children` con `path: ''` (Home) y `path: 'user'` (User).
  // El snippet exacto está en src/app/tutorial/13-define-a-route/README.md
  //
  // ⚠️ SIN recuadro "Output" a propósito: el ejercicio consiste en editar
  // ESTA ruta (ver README); envolverla cambiaría el objetivo de la lección.
  {
    path: 'tutorial/13',
    loadComponent: () => import('./tutorial/13-define-a-route/leccion').then((m) => m.Leccion13),
    // TODO (Lección 13): agregá acá el array `children` con las rutas
    // '' → Leccion13Home y 'user' → Leccion13User (ver README de la lección).
    title: 'Lección 13 — Definir una ruta',
  },
  {
    path: 'tutorial/13/solucion',
    component: SalidaDemo,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./tutorial/13-define-a-route/solucion/solucion').then((m) => m.Leccion13Solucion),
        title: 'Solución 13 — Definir una ruta',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./tutorial/13-define-a-route/solucion/home/home').then(
                (m) => m.Leccion13SolucionHome,
              ),
          },
          {
            path: 'home',
            loadComponent: () =>
              import('./tutorial/13-define-a-route/solucion/home/home').then(
                (m) => m.Leccion13SolucionHome,
              ),
          },
          {
            path: 'user',
            loadComponent: () =>
              import('./tutorial/13-define-a-route/solucion/user/user').then(
                (m) => m.Leccion13SolucionUser,
              ),
          },
        ],
      },
    ],
  },

  // ─── Lección 14 — Navegación con routerLink ──────────────────
  {
    path: 'tutorial/14',
    component: SalidaDemo,
    children: [
      {
        path: '',
        loadComponent: () => import('./tutorial/14-routerlink/leccion').then((m) => m.Leccion14),
        title: 'Lección 14 — Navegación con routerLink',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./tutorial/14-routerlink/home/home').then((m) => m.Leccion14Home),
            title: 'App Home Page',
          },
          {
            path: 'user',
            loadComponent: () =>
              import('./tutorial/14-routerlink/user/user').then((m) => m.Leccion14User),
            title: 'App User Page',
          },
        ],
      },
    ],
  },
  {
    path: 'tutorial/14/solucion',
    component: SalidaDemo,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./tutorial/14-routerlink/solucion/solucion').then((m) => m.Leccion14Solucion),
        title: 'Solución 14 — Navegación con routerLink',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./tutorial/14-routerlink/solucion/home/home').then(
                (m) => m.Leccion14SolucionHome,
              ),
          },
          {
            path: 'home',
            loadComponent: () =>
              import('./tutorial/14-routerlink/solucion/home/home').then(
                (m) => m.Leccion14SolucionHome,
              ),
          },
          {
            path: 'user',
            loadComponent: () =>
              import('./tutorial/14-routerlink/solucion/user/user').then(
                (m) => m.Leccion14SolucionUser,
              ),
          },
        ],
      },
    ],
  },

  // ─── Lección 15 — Formularios ────────────────────────────────
  {
    path: 'tutorial/15',
    children: [
      salida(
        () => import('./tutorial/15-forms/leccion').then((m) => m.Leccion15),
        'Lección 15 — Formularios',
      ),
    ],
  },
  {
    path: 'tutorial/15/solucion',
    children: [
      salida(
        () => import('./tutorial/15-forms/solucion/solucion').then((m) => m.Leccion15Solucion),
        'Solución 15 — Formularios',
      ),
    ],
  },

  // ─── Lección 16 — Valores de controles de formulario ─────────
  {
    path: 'tutorial/16',
    children: [
      salida(
        () => import('./tutorial/16-form-control-values/leccion').then((m) => m.Leccion16),
        'Lección 16 — Valores de controles de formulario',
      ),
    ],
  },
  {
    path: 'tutorial/16/solucion',
    children: [
      salida(
        () =>
          import('./tutorial/16-form-control-values/solucion/solucion').then(
            (m) => m.Leccion16Solucion,
          ),
        'Solución 16 — Valores de controles de formulario',
      ),
    ],
  },

  // ─── Lección 17 — Formularios reactivos ──────────────────────
  {
    path: 'tutorial/17',
    children: [
      salida(
        () => import('./tutorial/17-reactive-forms/leccion').then((m) => m.Leccion17),
        'Lección 17 — Formularios reactivos',
      ),
    ],
  },
  {
    path: 'tutorial/17/solucion',
    children: [
      salida(
        () =>
          import('./tutorial/17-reactive-forms/solucion/solucion').then((m) => m.Leccion17Solucion),
        'Solución 17 — Formularios reactivos',
      ),
    ],
  },

  // ─── Lección 18 — Validación de formularios ──────────────────
  {
    path: 'tutorial/18',
    children: [
      salida(
        () => import('./tutorial/18-forms-validation/leccion').then((m) => m.Leccion18),
        'Lección 18 — Validación de formularios',
      ),
    ],
  },
  {
    path: 'tutorial/18/solucion',
    children: [
      salida(
        () =>
          import('./tutorial/18-forms-validation/solucion/solucion').then(
            (m) => m.Leccion18Solucion,
          ),
        'Solución 18 — Validación de formularios',
      ),
    ],
  },

  // ─── Lección 19 — Crear un servicio inyectable ───────────────
  {
    path: 'tutorial/19',
    children: [
      salida(
        () => import('./tutorial/19-injectable-service/leccion').then((m) => m.Leccion19),
        'Lección 19 — Crear un servicio inyectable',
      ),
    ],
  },
  {
    path: 'tutorial/19/solucion',
    children: [
      salida(
        () =>
          import('./tutorial/19-injectable-service/solucion/solucion').then(
            (m) => m.Leccion19Solucion,
          ),
        'Solución 19 — Crear un servicio inyectable',
      ),
    ],
  },

  // ─── Lección 20 — Inyección de dependencias con inject() ─────
  {
    path: 'tutorial/20',
    children: [
      salida(
        () => import('./tutorial/20-inject-based-di/leccion').then((m) => m.Leccion20),
        'Lección 20 — Inyección de dependencias con inject()',
      ),
    ],
  },
  {
    path: 'tutorial/20/solucion',
    children: [
      salida(
        () =>
          import('./tutorial/20-inject-based-di/solucion/solucion').then(
            (m) => m.Leccion20Solucion,
          ),
        'Solución 20 — Inyección de dependencias con inject()',
      ),
    ],
  },

  // ─── Lección 22 — Pipes ──────────────────────────────────────
  {
    path: 'tutorial/22',
    children: [
      salida(
        () => import('./tutorial/22-pipes/leccion').then((m) => m.Leccion22),
        'Lección 22 — Pipes',
      ),
    ],
  },
  {
    path: 'tutorial/22/solucion',
    children: [
      salida(
        () => import('./tutorial/22-pipes/solucion/solucion').then((m) => m.Leccion22Solucion),
        'Solución 22 — Pipes',
      ),
    ],
  },

  // ─── Lección 23 — Formatear datos con pipes ──────────────────
  {
    path: 'tutorial/23',
    children: [
      salida(
        () => import('./tutorial/23-pipes-format-data/leccion').then((m) => m.Leccion23),
        'Lección 23 — Formatear datos con pipes',
      ),
    ],
  },
  {
    path: 'tutorial/23/solucion',
    children: [
      salida(
        () =>
          import('./tutorial/23-pipes-format-data/solucion/solucion').then(
            (m) => m.Leccion23Solucion,
          ),
        'Solución 23 — Formatear datos con pipes',
      ),
    ],
  },

  // ─── Lección 24 — Crear un pipe personalizado ────────────────
  {
    path: 'tutorial/24',
    children: [
      salida(
        () => import('./tutorial/24-create-a-pipe/leccion').then((m) => m.Leccion24),
        'Lección 24 — Crear un pipe personalizado',
      ),
    ],
  },
  {
    path: 'tutorial/24/solucion',
    children: [
      salida(
        () =>
          import('./tutorial/24-create-a-pipe/solucion/solucion').then((m) => m.Leccion24Solucion),
        'Solución 24 — Crear un pipe personalizado',
      ),
    ],
  },

  // ─── Lección 25 — Próximos pasos (solo lectura, sin recuadro) ─
  {
    path: 'tutorial/25',
    loadComponent: () => import('./tutorial/25-next-steps/leccion').then((m) => m.Leccion25),
    title: 'Lección 25 — Próximos pasos',
  },

  // ═══════════════════════════════════════════════════════════════
  //  PRÁCTICAS AVANZADAS (src/app/extras)
  // ═══════════════════════════════════════════════════════════════
  {
    path: 'extras',
    loadComponent: () => import('./extras/index').then((m) => m.ExtrasIndex),
    title: 'Prácticas avanzadas de Angular',
  },

  // ─── Práctica 01 — Comunicación y Bus de Eventos ─────────────
  {
    path: 'extras/01',
    children: [
      salida(
        () =>
          import('./extras/01-comunicacion-y-bus-eventos/ejercicio/productos-page').then(
            (m) => m.ProductosPage,
          ),
        'Práctica 01 — Comunicación y Bus de Eventos',
      ),
    ],
  },
  {
    path: 'extras/01/solucion',
    children: [
      salida(
        () =>
          import('./extras/01-comunicacion-y-bus-eventos/solucion/productos-page').then(
            (m) => m.ProductosPageSolucion,
          ),
        'Solución 01 — Comunicación y Bus de Eventos',
      ),
    ],
  },

  // ─── Práctica 02 — Formularios reactivos avanzados ───────────
  {
    path: 'extras/02',
    children: [
      salida(
        () =>
          import('./extras/02-formularios-reactivos-avanzados/ejercicio/registro-page').then(
            (m) => m.RegistroPage,
          ),
        'Práctica 02 — Formularios Reactivos Avanzados',
      ),
    ],
  },
  {
    path: 'extras/02/solucion',
    children: [
      salida(
        () =>
          import('./extras/02-formularios-reactivos-avanzados/solucion/registro-page').then(
            (m) => m.RegistroPageSolucion,
          ),
        'Solución 02 — Formularios Reactivos Avanzados',
      ),
    ],
  },

  // ─── Práctica 03 — HttpClient y Manejo de Errores ────────────
  // El "backend" de la 03 y la 04 es un interceptor falso (backendFalso)
  // registrado en app.config.ts: todo responde offline.
  {
    path: 'extras/03',
    children: [
      salida(
        () =>
          import('./extras/03-http-client-y-manejo-errores/ejercicio/empleados-page').then(
            (m) => m.EmpleadosPage,
          ),
        'Práctica 03 — HttpClient y Manejo de Errores',
      ),
    ],
  },
  {
    path: 'extras/03/solucion',
    children: [
      salida(
        () =>
          import('./extras/03-http-client-y-manejo-errores/solucion/empleados-page').then(
            (m) => m.EmpleadosPageSolucion,
          ),
        'Solución 03 — HttpClient y Manejo de Errores',
      ),
    ],
  },

  // ─── Práctica 04 — Auth JWT: Guards e Interceptores ──────────
  // Las rutas (hijas, con guards) viven en extras/04-auth-jwt-guards-interceptors/rutas.ts.
  ...rutasPractica04,

  // ─── Práctica 05 — CRUD Interactivo con Modales ──────────────
  {
    path: 'extras/05',
    children: [
      salida(
        () =>
          import('./extras/05-crud-interactivo-con-modales/ejercicio/empleados-page').then(
            (m) => m.EmpleadosPage,
          ),
        'Práctica 05 — CRUD Interactivo con Modales',
      ),
    ],
  },
  {
    path: 'extras/05/solucion',
    children: [
      salida(
        () =>
          import('./extras/05-crud-interactivo-con-modales/solucion/empleados-page').then(
            (m) => m.EmpleadosPageSolucion,
          ),
        'Solución 05 — CRUD Interactivo con Modales',
      ),
    ],
  },

  // ─── Práctica 06 — RxJS y asincronía ─────────────────────────
  {
    path: 'extras/06',
    children: [
      salida(
        () =>
          import('./extras/06-rxjs-y-asincronia/ejercicio/buscador-page').then(
            (m) => m.BuscadorPage,
          ),
        'Práctica 06 — RxJS y asincronía',
      ),
    ],
  },
  {
    path: 'extras/06/solucion',
    children: [
      salida(
        () =>
          import('./extras/06-rxjs-y-asincronia/solucion/buscador-page').then(
            (m) => m.BuscadorPageSolucion,
          ),
        'Solución 06 — RxJS y asincronía',
      ),
    ],
  },

  // ─── Práctica 08 — Angular Material: diálogo, tabla y feedback ─
  {
    path: 'extras/08',
    children: [
      salida(
        () => import('./extras/08-angular-material/ejercicio/abm-page').then((m) => m.AbmPage),
        'Práctica 08 — Angular Material',
      ),
    ],
  },
  {
    path: 'extras/08/solucion',
    children: [
      salida(
        () =>
          import('./extras/08-angular-material/solucion/abm-page').then((m) => m.AbmPageSolucion),
        'Solución 08 — Angular Material',
      ),
    ],
  },

  // ─── Práctica 09 — Estado global con NgRx ─────────────────────
  // El store se provee a nivel de ruta (ver extras/09-ngrx-store/rutas.ts).
  ...rutasPractica09,

  // ─── Práctica 10 — Testing de HTTP y componentes ─────────────
  {
    path: 'extras/10',
    children: [
      salida(
        () =>
          import('./extras/10-testing-http-componentes/ejercicio/panel-page').then(
            (m) => m.PanelPage,
          ),
        'Práctica 10 — Testing de HTTP y componentes',
      ),
    ],
  },
  {
    path: 'extras/10/solucion',
    children: [
      salida(
        () =>
          import('./extras/10-testing-http-componentes/solucion/panel-page').then(
            (m) => m.PanelPageSolucion,
          ),
        'Solución 10 — Testing de HTTP y componentes',
      ),
    ],
  },

  // ─── Práctica 07 — Ruteo avanzado SPA ────────────────────────
  // ÚLTIMO spread a propósito: la 07 define la ruta comodín '**' (404) y el
  // orden de las rutas importa — la comodín debe ir después de todo lo demás.
  ...rutasPractica07,
];
