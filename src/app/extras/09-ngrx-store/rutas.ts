import { Routes } from '@angular/router';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { SalidaDemo } from '../../compartido/salida-demo';

import { visorFeature } from './visor.store';
import { visorFeatureSolucion } from './solucion/visor.store';

/**
 * RUTAS DE LA PRÁCTICA 09 — store NgRx a nivel de RUTA.
 *
 * ¿Por qué los providers del store viven acá y no en `app.config.ts`?
 *
 *  1. `provideStore()` + `provideState(visorFeature)` en la configuración de
 *     estas rutas crean el store SOLO para este subárbol: la práctica es
 *     autocontenida y no ensucia el estado global de la app (y el registro en
 *     `app.routes.ts` queda siendo un simple spread, como en la 04).
 *  2. El store "sobrevive" a las navegaciones INTERNAS de la práctica: mientras
 *     navegues entre rutas hijas de `/extras/09` (por ejemplo a `/extras/09/ayuda`),
 *     Angular destruye solo el componente, no el inyector de la ruta padre →
 *     el Store, con sus filtros y capas, sigue exactamente igual. Ese es el
 *     criterio «cambiar de pantalla y volver → los filtros persisten».
 *     (Salí de la práctica — a otra de `/extras` — y el inyector sí se destruye:
 *     el estado vuelve a cero. El scope de la ruta ES el scope del estado.)
 *  3. Ejercicio y solución llevan features DISTINTOS (`visorFeature` /
 *     `visorFeatureSolucion`) en injectores distintos: cada subárbol tiene su
 *     propio store y no se pisan.
 *
 * `provideStoreDevtools({ maxAge: 25 })` conecta el store con Redux DevTools
 * (extensión del navegador) conservando hasta 25 acciones en el historial.
 *
 * Recuadro "Output" (SalidaDemo): la ruta padre monta el recuadro y las
 * páginas hijas se pintan en su <router-outlet />. Los `providers` del store
 * quedan en la ruta padre: el scope del estado no cambia.
 */
export const rutasPractica09: Routes = [
  {
    path: 'extras/09',
    component: SalidaDemo,
    providers: [provideStore(), provideState(visorFeature), provideStoreDevtools({ maxAge: 25 })],
    children: [
      {
        path: '',
        loadComponent: () => import('./ejercicio/visor-page').then((m) => m.VisorPage),
        title: 'Práctica 09 — Visor de capas (NgRx)',
      },
      {
        path: 'ayuda',
        loadComponent: () => import('./ejercicio/ayuda-page').then((m) => m.AyudaPage),
        title: 'Práctica 09 — Ayuda',
      },
    ],
  },

  // Mismo árbol con la solución: reducer completo, selectors completos y
  // componentes `...Solucion`. Su store vive en `./solucion/visor.store.ts`.
  {
    path: 'extras/09/solucion',
    component: SalidaDemo,
    providers: [
      provideStore(),
      provideState(visorFeatureSolucion),
      provideStoreDevtools({ maxAge: 25 }),
    ],
    children: [
      {
        path: '',
        loadComponent: () => import('./solucion/visor-page').then((m) => m.VisorPageSolucion),
        title: 'Solución 09 — Visor de capas (NgRx)',
      },
      {
        path: 'ayuda',
        loadComponent: () => import('./solucion/ayuda-page').then((m) => m.AyudaPageSolucion),
        title: 'Solución 09 — Ayuda',
      },
    ],
  },
];
