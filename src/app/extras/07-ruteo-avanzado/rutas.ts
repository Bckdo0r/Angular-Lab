import { Routes } from '@angular/router';
import { soloAdminCanMatch } from './ejercicio/rol.guard';
import { soloAdminCanMatchSolucion } from './solucion/rol.guard';

/**
 * RUTAS DE LA PRÁCTICA 07 — ruteo avanzado (rutas propias de la práctica).
 *
 * ⚠️ ORDEN: app.routes.ts registra este archivo AL FINAL con un spread
 * (`...rutasPractica07`), así que la ruta comodín '**' (404) DEBE ser la
 * última entrada de este array. Angular evalúa las rutas de arriba hacia
 * abajo y usa la PRIMERA que coincide: si '**' estuviera primera, "comería"
 * todas las URLs de la aplicación (hasta /extras/01 caería en el 404).
 *
 * Árbol de rutas:
 *   /extras/07                        → ListadoPage (lazy)
 *   /extras/07/detalle/:id            → DetallePage (lazy, ID por input())
 *   /extras/07/panel                  → PanelLayout (lazy, sub-layout)
 *     /extras/07/panel/               → redirect a 'equipo'
 *     /extras/07/panel/equipo         → EquipoPage (lazy, ruta hija)
 *     /extras/07/panel/admin          → AdminPage (lazy, hija con canMatch)
 *   /extras/07/solucion               → ListadoPageSolucion (lazy)
 *   /extras/07/solucion/detalle/:id   → DetallePageSolucion (lazy)
 *   /extras/07/solucion/panel         → PanelLayoutSolucion (lazy, sub-layout)
 *     /extras/07/solucion/panel/      → redirect a 'equipo'
 *     /extras/07/solucion/panel/equipo → EquipoPageSolucion (lazy, hija)
 *     /extras/07/solucion/panel/admin → AdminPageSolucion (lazy, hija con canMatch)
 *   /** (última)                      → NoEncontradoPage (404, lazy)
 *
 * `withComponentInputBinding()` está activado GLOBALMENTE en app.config.ts
 * (provideRouter(routes, withComponentInputBinding())): por eso ':id' y los
 * query params llegan como inputs a los componentes, sin ActivatedRoute.
 *
 * Nota: hay un solo '**' posible por aplicación, así que es compartido por
 * el ejercicio y la solución (la página 404 de la solución existe como
 * espejo didáctico, pero la ruta comodín apunta a la del ejercicio).
 */
export const rutasPractica07: Routes = [
  // Paso 1 — ruta '' del listado. loadComponent: Angular baja este chunk
  // recién cuando se navega acá (miralo en DevTools → Network).
  {
    path: 'extras/07',
    loadComponent: () => import('./ejercicio/listado-page').then((m) => m.ListadoPage),
    title: 'Práctica 07 — Listado de empleados',
  },

  // Paso 1 — detalle por parámetro de ruta ':id'. El valor llega al
  // componente como input() gracias a withComponentInputBinding (Paso 2).
  {
    path: 'extras/07/detalle/:id',
    loadComponent: () => import('./ejercicio/detalle-page').then((m) => m.DetallePage),
    title: 'Práctica 07 — Detalle de empleado',
  },

  // Pasos 7 y 8 — sub-layout con rutas hijas escritas acá: el layout se
  // carga lazy y cada hija se pinta en SU <router-outlet />.
  {
    path: 'extras/07/panel',
    loadComponent: () => import('./ejercicio/panel-layout').then((m) => m.PanelLayout),
    children: [
      // Al entrar a /extras/07/panel sin más: llevar al equipo.
      { path: '', pathMatch: 'full', redirectTo: 'equipo' },
      {
        path: 'equipo',
        loadComponent: () => import('./ejercicio/equipo-page').then((m) => m.EquipoPage),
        title: 'Práctica 07 — Equipo',
      },
      {
        path: 'admin',
        loadComponent: () => import('./ejercicio/admin-page').then((m) => m.AdminPage),
        // canMatch se evalúa ANTES de cargar el bundle: si el rol no da,
        // la ruta se remueve del árbol (ni siquiera existe) y el navegador
        // cae al '**' → 404. Comparalo con el canActivate de la práctica 04.
        canMatch: [soloAdminCanMatch],
        title: 'Práctica 07 — Panel admin',
      },
    ],
  },

  // Mismo árbol con las variantes Solucion (clases/selectores con sufijo
  // ...Solucion) y su propio guard canMatch resuelto.
  {
    path: 'extras/07/solucion',
    loadComponent: () => import('./solucion/listado-page').then((m) => m.ListadoPageSolucion),
    title: 'Solución 07 — Listado de empleados',
  },
  {
    path: 'extras/07/solucion/detalle/:id',
    loadComponent: () => import('./solucion/detalle-page').then((m) => m.DetallePageSolucion),
    title: 'Solución 07 — Detalle de empleado',
  },
  {
    path: 'extras/07/solucion/panel',
    loadComponent: () => import('./solucion/panel-layout').then((m) => m.PanelLayoutSolucion),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'equipo' },
      {
        path: 'equipo',
        loadComponent: () => import('./solucion/equipo-page').then((m) => m.EquipoPageSolucion),
        title: 'Solución 07 — Equipo',
      },
      {
        path: 'admin',
        loadComponent: () => import('./solucion/admin-page').then((m) => m.AdminPageSolucion),
        canMatch: [soloAdminCanMatchSolucion],
        title: 'Solución 07 — Panel admin',
      },
    ],
  },

  // ⚠️ Siempre ÚLTIMA: la ruta comodín '**' atrapa cualquier path que no
  // coincidió antes. Como app.routes.ts hace el spread al final, esta entrada
  // no tapa las rutas de otras prácticas (registradas antes en el array).
  // Experimento (Paso 5): movela arriba en tu cabeza... ¿qué pasaría con
  // TODAS las URLs de la app? Probalo en una copia si querés verlo romper.
  {
    path: '**',
    loadComponent: () => import('./ejercicio/no-encontrado-page').then((m) => m.NoEncontradoPage),
    title: 'Práctica 07 — Página no encontrada',
  },
];
