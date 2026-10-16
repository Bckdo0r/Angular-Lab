import { Routes } from '@angular/router';
import { rutasPractica04 } from './extras/04-auth-jwt-guards-interceptors/rutas';

export const routes: Routes = [
  // ─── Página de inicio: acceso a Tutorial y Prácticas ─────────
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./home/home').then((m) => m.Home),
    title: 'Pruebas Practicas — Aprendiendo Angular haciendo',
  },

  {
    path: 'tutorial',
    loadComponent: () => import('./tutorial/index').then((m) => m.TutorialIndex),
    title: 'Tutorial de Angular',
  },

  // ─── Lección 01 — Anatomía de un Componente ──────────────────
  {
    path: 'tutorial/01',
    loadComponent: () => import('./tutorial/01-componentes/leccion').then((m) => m.Leccion01),
    title: 'Lección 01 — Anatomía de un Componente',
  },
  {
    path: 'tutorial/01/solucion',
    loadComponent: () =>
      import('./tutorial/01-componentes/solucion/solucion').then((m) => m.Leccion01Solucion),
    title: 'Solución 01 — Anatomía de un Componente',
  },

  // ─── Lección 02 — Actualizar la clase del componente ─────────
  {
    path: 'tutorial/02',
    loadComponent: () =>
      import('./tutorial/02-clase-del-componente/leccion').then((m) => m.Leccion02),
    title: 'Lección 02 — Actualizar la clase del componente',
  },
  {
    path: 'tutorial/02/solucion',
    loadComponent: () =>
      import('./tutorial/02-clase-del-componente/solucion/solucion').then(
        (m) => m.Leccion02Solucion,
      ),
    title: 'Solución 02 — Actualizar la clase del componente',
  },

  // ─── Lección 03 — Componer componentes ───────────────────────
  {
    path: 'tutorial/03',
    loadComponent: () =>
      import('./tutorial/03-componer-componentes/leccion').then((m) => m.Leccion03),
    title: 'Lección 03 — Componer componentes',
  },
  {
    path: 'tutorial/03/solucion',
    loadComponent: () =>
      import('./tutorial/03-componer-componentes/solucion/solucion').then(
        (m) => m.Leccion03Solucion,
      ),
    title: 'Solución 03 — Componer componentes',
  },

  // ─── Lección 04 — Control de flujo: @if ──────────────────────
  {
    path: 'tutorial/04',
    loadComponent: () => import('./tutorial/04-control-flow-if/leccion').then((m) => m.Leccion04),
    title: 'Lección 04 — Control de flujo: @if',
  },
  {
    path: 'tutorial/04/solucion',
    loadComponent: () =>
      import('./tutorial/04-control-flow-if/solucion/solucion').then((m) => m.Leccion04Solucion),
    title: 'Solución 04 — Control de flujo: @if',
  },

  // ─── Lección 05 — Control de flujo: @for ─────────────────────
  {
    path: 'tutorial/05',
    loadComponent: () => import('./tutorial/05-control-flow-for/leccion').then((m) => m.Leccion05),
    title: 'Lección 05 — Control de flujo: @for',
  },
  {
    path: 'tutorial/05/solucion',
    loadComponent: () =>
      import('./tutorial/05-control-flow-for/solucion/solucion').then((m) => m.Leccion05Solucion),
    title: 'Solución 05 — Control de flujo: @for',
  },

  // ─── Lección 06 — Property binding ───────────────────────────
  {
    path: 'tutorial/06',
    loadComponent: () => import('./tutorial/06-property-binding/leccion').then((m) => m.Leccion06),
    title: 'Lección 06 — Property binding',
  },
  {
    path: 'tutorial/06/solucion',
    loadComponent: () =>
      import('./tutorial/06-property-binding/solucion/solucion').then((m) => m.Leccion06Solucion),
    title: 'Solución 06 — Property binding',
  },

  // ─── Lección 07 — Manejo de eventos ──────────────────────────
  {
    path: 'tutorial/07',
    loadComponent: () => import('./tutorial/07-event-handling/leccion').then((m) => m.Leccion07),
    title: 'Lección 07 — Manejo de eventos',
  },
  {
    path: 'tutorial/07/solucion',
    loadComponent: () =>
      import('./tutorial/07-event-handling/solucion/solucion').then((m) => m.Leccion07Solucion),
    title: 'Solución 07 — Manejo de eventos',
  },

  // ─── Lección 08 — Inputs ─────────────────────────────────────
  {
    path: 'tutorial/08',
    loadComponent: () => import('./tutorial/08-input/leccion').then((m) => m.Leccion08),
    title: 'Lección 08 — Inputs',
  },
  {
    path: 'tutorial/08/solucion',
    loadComponent: () =>
      import('./tutorial/08-input/solucion/solucion').then((m) => m.Leccion08Solucion),
    title: 'Solución 08 — Inputs',
  },

  // ─── Lección 09 — Outputs ────────────────────────────────────
  {
    path: 'tutorial/09',
    loadComponent: () => import('./tutorial/09-output/leccion').then((m) => m.Leccion09),
    title: 'Lección 09 — Outputs',
  },
  {
    path: 'tutorial/09/solucion',
    loadComponent: () =>
      import('./tutorial/09-output/solucion/solucion').then((m) => m.Leccion09Solucion),
    title: 'Solución 09 — Outputs',
  },

  // ─── Lección 10 — Vistas diferibles (@defer) ─────────────────
  {
    path: 'tutorial/10',
    loadComponent: () => import('./tutorial/10-deferrable-views/leccion').then((m) => m.Leccion10),
    title: 'Lección 10 — Vistas diferibles (@defer)',
  },
  {
    path: 'tutorial/10/solucion',
    loadComponent: () =>
      import('./tutorial/10-deferrable-views/solucion/solucion').then((m) => m.Leccion10Solucion),
    title: 'Solución 10 — Vistas diferibles (@defer)',
  },

  // ─── Lección 11 — Optimización de imágenes ───────────────────
  {
    path: 'tutorial/11',
    loadComponent: () =>
      import('./tutorial/11-optimizando-imagenes/leccion').then((m) => m.Leccion11),
    title: 'Lección 11 — Optimización de imágenes',
  },
  {
    path: 'tutorial/11/solucion',
    loadComponent: () =>
      import('./tutorial/11-optimizando-imagenes/solucion/solucion').then(
        (m) => m.Leccion11Solucion,
      ),
    title: 'Solución 11 — Optimización de imágenes',
  },

  // ─── Lección 12 — Habilitar el routing ───────────────────────
  {
    path: 'tutorial/12',
    loadComponent: () => import('./tutorial/12-enable-routing/leccion').then((m) => m.Leccion12),
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
    title: 'Lección 12 — Habilitar el routing',
  },
  {
    path: 'tutorial/12/solucion',
    loadComponent: () =>
      import('./tutorial/12-enable-routing/solucion/solucion').then((m) => m.Leccion12Solucion),
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
    title: 'Solución 12 — Habilitar el routing',
  },

  // ─── Lección 13 — Definir una ruta ───────────────────────────
  // ✏️ EJERCICIO de la lección 13: definí las rutas hijas de esta lección.
  // Las páginas ya existen (Leccion13Home y Leccion13User); te falta a vos:
  // agregar el array `children` con `path: ''` (Home) y `path: 'user'` (User).
  // El snippet exacto está en src/app/tutorial/13-define-a-route/README.md
  {
    path: 'tutorial/13',
    loadComponent: () => import('./tutorial/13-define-a-route/leccion').then((m) => m.Leccion13),
    // TODO (Lección 13): agregá acá el array `children` con las rutas
    // '' → Leccion13Home y 'user' → Leccion13User (ver README de la lección).
    title: 'Lección 13 — Definir una ruta',
  },
  {
    path: 'tutorial/13/solucion',
    loadComponent: () =>
      import('./tutorial/13-define-a-route/solucion/solucion').then((m) => m.Leccion13Solucion),
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
    title: 'Solución 13 — Definir una ruta',
  },

  // ─── Lección 14 — Navegación con routerLink ──────────────────
  {
    path: 'tutorial/14',
    loadComponent: () => import('./tutorial/14-routerlink/leccion').then((m) => m.Leccion14),
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
    title: 'Lección 14 — Navegación con routerLink',
  },
  {
    path: 'tutorial/14/solucion',
    loadComponent: () =>
      import('./tutorial/14-routerlink/solucion/solucion').then((m) => m.Leccion14Solucion),
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
    title: 'Solución 14 — Navegación con routerLink',
  },

  // ─── Lección 15 — Formularios ────────────────────────────────
  {
    path: 'tutorial/15',
    loadComponent: () => import('./tutorial/15-forms/leccion').then((m) => m.Leccion15),
    title: 'Lección 15 — Formularios',
  },
  {
    path: 'tutorial/15/solucion',
    loadComponent: () =>
      import('./tutorial/15-forms/solucion/solucion').then((m) => m.Leccion15Solucion),
    title: 'Solución 15 — Formularios',
  },

  // ─── Lección 16 — Valores de controles de formulario ─────────
  {
    path: 'tutorial/16',
    loadComponent: () =>
      import('./tutorial/16-form-control-values/leccion').then((m) => m.Leccion16),
    title: 'Lección 16 — Valores de controles de formulario',
  },
  {
    path: 'tutorial/16/solucion',
    loadComponent: () =>
      import('./tutorial/16-form-control-values/solucion/solucion').then(
        (m) => m.Leccion16Solucion,
      ),
    title: 'Solución 16 — Valores de controles de formulario',
  },

  // ─── Lección 17 — Formularios reactivos ──────────────────────
  {
    path: 'tutorial/17',
    loadComponent: () => import('./tutorial/17-reactive-forms/leccion').then((m) => m.Leccion17),
    title: 'Lección 17 — Formularios reactivos',
  },
  {
    path: 'tutorial/17/solucion',
    loadComponent: () =>
      import('./tutorial/17-reactive-forms/solucion/solucion').then((m) => m.Leccion17Solucion),
    title: 'Solución 17 — Formularios reactivos',
  },

  // ─── Lección 18 — Validación de formularios ──────────────────
  {
    path: 'tutorial/18',
    loadComponent: () => import('./tutorial/18-forms-validation/leccion').then((m) => m.Leccion18),
    title: 'Lección 18 — Validación de formularios',
  },
  {
    path: 'tutorial/18/solucion',
    loadComponent: () =>
      import('./tutorial/18-forms-validation/solucion/solucion').then((m) => m.Leccion18Solucion),
    title: 'Solución 18 — Validación de formularios',
  },

  // ─── Lección 19 — Crear un servicio inyectable ───────────────
  {
    path: 'tutorial/19',
    loadComponent: () =>
      import('./tutorial/19-injectable-service/leccion').then((m) => m.Leccion19),
    title: 'Lección 19 — Crear un servicio inyectable',
  },
  {
    path: 'tutorial/19/solucion',
    loadComponent: () =>
      import('./tutorial/19-injectable-service/solucion/solucion').then((m) => m.Leccion19Solucion),
    title: 'Solución 19 — Crear un servicio inyectable',
  },

  // ─── Lección 20 — Inyección de dependencias con inject() ─────
  {
    path: 'tutorial/20',
    loadComponent: () => import('./tutorial/20-inject-based-di/leccion').then((m) => m.Leccion20),
    title: 'Lección 20 — Inyección de dependencias con inject()',
  },
  {
    path: 'tutorial/20/solucion',
    loadComponent: () =>
      import('./tutorial/20-inject-based-di/solucion/solucion').then((m) => m.Leccion20Solucion),
    title: 'Solución 20 — Inyección de dependencias con inject()',
  },

  // ─── Lección 22 — Pipes ──────────────────────────────────────
  {
    path: 'tutorial/22',
    loadComponent: () => import('./tutorial/22-pipes/leccion').then((m) => m.Leccion22),
    title: 'Lección 22 — Pipes',
  },
  {
    path: 'tutorial/22/solucion',
    loadComponent: () =>
      import('./tutorial/22-pipes/solucion/solucion').then((m) => m.Leccion22Solucion),
    title: 'Solución 22 — Pipes',
  },

  // ─── Lección 23 — Formatear datos con pipes ──────────────────
  {
    path: 'tutorial/23',
    loadComponent: () => import('./tutorial/23-pipes-format-data/leccion').then((m) => m.Leccion23),
    title: 'Lección 23 — Formatear datos con pipes',
  },
  {
    path: 'tutorial/23/solucion',
    loadComponent: () =>
      import('./tutorial/23-pipes-format-data/solucion/solucion').then((m) => m.Leccion23Solucion),
    title: 'Solución 23 — Formatear datos con pipes',
  },

  // ─── Lección 24 — Crear un pipe personalizado ────────────────
  {
    path: 'tutorial/24',
    loadComponent: () => import('./tutorial/24-create-a-pipe/leccion').then((m) => m.Leccion24),
    title: 'Lección 24 — Crear un pipe personalizado',
  },
  {
    path: 'tutorial/24/solucion',
    loadComponent: () =>
      import('./tutorial/24-create-a-pipe/solucion/solucion').then((m) => m.Leccion24Solucion),
    title: 'Solución 24 — Crear un pipe personalizado',
  },

  // ─── Lección 25 — Próximos pasos (solo lectura) ──────────────
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
    loadComponent: () =>
      import('./extras/01-comunicacion-y-bus-eventos/ejercicio/productos-page').then(
        (m) => m.ProductosPage,
      ),
    title: 'Práctica 01 — Comunicación y Bus de Eventos',
  },
  {
    path: 'extras/01/solucion',
    loadComponent: () =>
      import('./extras/01-comunicacion-y-bus-eventos/solucion/productos-page').then(
        (m) => m.ProductosPageSolucion,
      ),
    title: 'Solución 01 — Comunicación y Bus de Eventos',
  },

  // ─── Práctica 02 — Formularios reactivos avanzados ───────────
  {
    path: 'extras/02',
    loadComponent: () =>
      import('./extras/02-formularios-reactivos-avanzados/ejercicio/registro-page').then(
        (m) => m.RegistroPage,
      ),
    title: 'Práctica 02 — Formularios Reactivos Avanzados',
  },
  {
    path: 'extras/02/solucion',
    loadComponent: () =>
      import('./extras/02-formularios-reactivos-avanzados/solucion/registro-page').then(
        (m) => m.RegistroPageSolucion,
      ),
    title: 'Solución 02 — Formularios Reactivos Avanzados',
  },

  // ─── Práctica 03 — HttpClient y Manejo de Errores ────────────
  // El "backend" de la 03 y la 04 es un interceptor falso (backendFalso)
  // registrado en app.config.ts: todo responde offline.
  {
    path: 'extras/03',
    loadComponent: () =>
      import('./extras/03-http-client-y-manejo-errores/ejercicio/empleados-page').then(
        (m) => m.EmpleadosPage,
      ),
    title: 'Práctica 03 — HttpClient y Manejo de Errores',
  },
  {
    path: 'extras/03/solucion',
    loadComponent: () =>
      import('./extras/03-http-client-y-manejo-errores/solucion/empleados-page').then(
        (m) => m.EmpleadosPageSolucion,
      ),
    title: 'Solución 03 — HttpClient y Manejo de Errores',
  },

  // ─── Práctica 04 — Auth JWT: Guards e Interceptores ──────────
  // Las rutas (hijas, con guards) viven en extras/04-auth-jwt-guards-interceptors/rutas.ts.
  ...rutasPractica04,

  // ─── Práctica 05 — CRUD Interactivo con Modales ──────────────
  {
    path: 'extras/05',
    loadComponent: () =>
      import('./extras/05-crud-interactivo-con-modales/ejercicio/empleados-page').then(
        (m) => m.EmpleadosPage,
      ),
    title: 'Práctica 05 — CRUD Interactivo con Modales',
  },
  {
    path: 'extras/05/solucion',
    loadComponent: () =>
      import('./extras/05-crud-interactivo-con-modales/solucion/empleados-page').then(
        (m) => m.EmpleadosPageSolucion,
      ),
    title: 'Solución 05 — CRUD Interactivo con Modales',
  },
];
