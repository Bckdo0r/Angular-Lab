import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { backendFalso } from './extras/backend-falso';
import { authTokenInterceptor } from './extras/04-auth-jwt-guards-interceptors/ejercicio/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // withComponentInputBinding (Práctica 07): los parámetros de ruta (:id) llegan
    // directamente como input() del componente, sin ActivatedRoute ni subscribe.
    provideRouter(routes, withComponentInputBinding()),
    // El interceptor de token (Práctica 04) va PRIMERO: envuelve al resto y agrega
    // Authorization: Bearer <token> a cada petición con sesión guardada. El backend
    // falso simula un servidor 100% offline para las prácticas 03 y 04.
    provideHttpClient(withInterceptors([authTokenInterceptor, backendFalso])),
  ],
};
