# Lección 13 — Definir una ruta

> Original: [Define a Route](https://v20.angular.dev/tutorials/learn-angular/13-define-a-route)

Ahora que la app ya está configurada para usar el Angular Router, es momento de **definir las rutas**.

En esta lección vas a aprender a agregar y configurar rutas en tu app.

> **Nota:** podés leer más sobre cómo definir rutas básicas en la [guía en profundidad](https://v20.angular.dev/guide/routing/define-routes).

> **⚠️ App anfitriona:** en el tutorial original las rutas se definen en el array raíz de `app.routes.ts` (`path: ''` y `path: 'user'`). En esta app las lecciones viven bajo `/tutorial/13`, así que el ejercicio consiste en agregar esas mismas rutas como **rutas hijas** (`children`) de la ruta `tutorial/13`. Tu archivo de trabajo es `src/app/app.routes.ts` (el de la app, no el de la lección).

## Cómo verla en el navegador

1. Levantá el servidor de desarrollo: `npm start`
2. Ejercicio: <http://localhost:4200/tutorial/13>
   - Sub-rutas: <http://localhost:4200/tutorial/13/home> y <http://localhost:4200/tutorial/13/user> — **no van a funcionar hasta que completes el ejercicio**
3. Solución para comparar en otra pestaña: <http://localhost:4200/tutorial/13/solucion>

## Archivo de trabajo

`src/app/app.routes.ts` (en la raíz de `src/app/`, no dentro de la carpeta de la lección)

El shell de la lección (`src/app/tutorial/13-define-a-route/leccion.ts`) ya está completo y no tiene TODOs: la única pieza que falta son las rutas.

## Pasos

### 1. Definir una ruta en `app.routes.ts`

En tu app hay dos páginas para mostrar: (1) la **Home Page** y (2) la **User Page**.

Para definir una ruta, agregá un objeto de ruta al array de rutas que contenga:

- El `path`, relativo a su padre y sin una barra inicial: `home` bajo `tutorial/13` forma `/tutorial/13/home`.
- El `loadComponent` que carga el componente de esa página de forma diferida.

Así se ve en el tutorial original, donde `Home` se agrega como ruta por defecto:

```ts
import { Routes } from '@angular/router';
import { Home } from './home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
];
```

**Adaptación a esta app:** en `src/app/app.routes.ts`, buscá la ruta con `path: 'tutorial/13'`. **Conservá su `loadComponent`**, que monta el shell y su `<router-outlet />`. Agregale este `children`; no reemplaces el array global ni importes las páginas de forma estática:

```ts
// ... dentro del array `routes`, en la ruta path: 'tutorial/13':
{
  path: 'tutorial/13',
  loadComponent: () => import('./tutorial/13-define-a-route/leccion').then(m => m.Leccion13),
  children: [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    {
      path: 'home',
      title: 'App Home Page',
      loadComponent: () => import('./tutorial/13-define-a-route/home/home').then(m => m.Leccion13Home),
    },
    {
      path: 'user',
      title: 'App User Page',
      loadComponent: () => import('./tutorial/13-define-a-route/user/user').then(m => m.Leccion13User),
    },
  ],
},
```

Los enlaces existentes apuntan a `home` y `user`, por eso registramos ambos.
La ruta vacía redirige a `home`; `pathMatch: 'full'` evita redirigir también sus rutas hermanas.

### 2. Agregar `title` a la definición de la ruta

Además de definir las rutas correctamente, el Angular Router te permite establecer el título de la página cada vez que el usuario navega, agregando la propiedad `title` a cada ruta.

Agregá la propiedad `title` a las rutas `home` y `user`. Ya están incluidas en el ejemplo adaptado del paso 1. El siguiente fragmento del original es solo lectura:

```ts
import { Routes } from '@angular/router';
import { Home } from './home/home';

export const routes: Routes = [
  {
    path: '',
    title: 'App Home Page',
    component: Home,
  },
];
```

Al navegar, vas a ver que el título de la pestaña del navegador cambia según la página.

Verificá `/tutorial/13`, `/tutorial/13/home` y `/tutorial/13/user`. Antes de completar
el ejercicio, solo la primera muestra el shell; las dos rutas hijas caen en el 404.
El reinicio de esta lección también restaura **todo `src/app/app.routes.ts`**:
guardá antes cualquier otro cambio personal que hayas hecho en ese archivo.

## Para cerrar

En esta actividad aprendiste a definir y configurar rutas en tu app Angular. ¡Buen trabajo! 🎉

El camino para tener routing completo casi termina, seguí adelante: compará con la solución en `/tutorial/13/solucion` y pasá a la [Lección 14](http://localhost:4200/tutorial/14).
