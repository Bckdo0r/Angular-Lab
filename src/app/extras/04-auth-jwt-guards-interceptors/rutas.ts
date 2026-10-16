import { Routes } from '@angular/router';
import { SalidaDemo } from '../../compartido/salida-demo';
import { authGuard, roleGuard } from './ejercicio/auth.guard';
import { authGuardSolucion, roleGuardSolucion } from './solucion/auth.guard';

/**
 * RUTAS DE LA PRÁCTICA 04 — rutas hijas con guards.
 *
 * Esta práctica define SUS rutas en su propio archivo (en vez de tocar
 * directamente app.routes.ts) porque son rutas HIJAS con guards: el layout
 * (PanelLayout) se carga con loadComponent y las páginas hijas se pintan
 * en su <router-outlet />.
 *
 * app.routes.ts registra todo con un spread: ...rutasPractica04
 *
 * Los guards se importan de forma ESTÁTICA (no loadComponent/loadChildren):
 * son funciones livianas que van en el bundle principal, y así el lazy
 * loading queda solo para los componentes pesados.
 *
 * Recuadro "Output" (SalidaDemo): el layout de la práctica se anida bajo
 * un `path: ''` dentro del recuadro. El nivel agregado no cambia las URLs
 * y los guards navegan con URLTrees absolutos ('/extras/04/login'), así
 * que los redirects siguen funcionando igual.
 */
export const rutasPractica04: Routes = [
  {
    path: 'extras/04',
    component: SalidaDemo,
    children: [
      {
        path: '',
        loadComponent: () => import('./ejercicio/panel-layout').then((m) => m.PanelLayout),
        children: [
          // Al entrar sin página específica: al perfil (el guard decide si ves o te manda al login).
          { path: '', pathMatch: 'full', redirectTo: 'perfil' },
          {
            path: 'login',
            loadComponent: () => import('./ejercicio/login-page').then((m) => m.LoginPage),
            title: 'Práctica 04 — Login',
          },
          {
            path: 'perfil',
            loadComponent: () => import('./ejercicio/perfil-page').then((m) => m.PerfilPage),
            canActivate: [authGuard],
            title: 'Práctica 04 — Perfil',
          },
          {
            path: 'admin',
            loadComponent: () => import('./ejercicio/admin-page').then((m) => m.AdminPage),
            // En cascada: primero ¿hay sesión?, después ¿el rol alcanza?
            canActivate: [authGuard, roleGuard('admin')],
            title: 'Práctica 04 — Panel admin',
          },
        ],
      },
    ],
  },

  // Mismo árbol con las variantes Solucion y sus guards resueltos.
  {
    path: 'extras/04/solucion',
    component: SalidaDemo,
    children: [
      {
        path: '',
        loadComponent: () => import('./solucion/panel-layout').then((m) => m.PanelLayoutSolucion),
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'perfil' },
          {
            path: 'login',
            loadComponent: () => import('./solucion/login-page').then((m) => m.LoginPageSolucion),
            title: 'Solución 04 — Login',
          },
          {
            path: 'perfil',
            loadComponent: () => import('./solucion/perfil-page').then((m) => m.PerfilPageSolucion),
            canActivate: [authGuardSolucion],
            title: 'Solución 04 — Perfil',
          },
          {
            path: 'admin',
            loadComponent: () => import('./solucion/admin-page').then((m) => m.AdminPageSolucion),
            canActivate: [authGuardSolucion, roleGuardSolucion('admin')],
            title: 'Solución 04 — Panel admin',
          },
        ],
      },
    ],
  },
];
