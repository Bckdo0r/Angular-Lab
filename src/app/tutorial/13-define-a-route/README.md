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

- El `path` de la ruta (que arranca automáticamente desde la raíz, es decir, `/`)
- El `component` que querés que esa ruta muestre

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

**Adaptación a esta app:** en `src/app/app.routes.ts`, buscá la ruta con `path: 'tutorial/13'` y agregale un array `children` con los objetos de ruta de las páginas de la lección, usando las clases `Leccion13Home` y `Leccion13User`:

```ts
import { Leccion13Home } from './tutorial/13-define-a-route/home/home';
import { Leccion13User } from './tutorial/13-define-a-route/user/user';

// ... dentro del array `routes`, en la ruta path: 'tutorial/13':
{
  path: 'tutorial/13',
  children: [
    {
      path: '',
      title: 'App Home Page',
      component: Leccion13Home,
    },
    {
      path: 'user',
      title: 'App User Page',
      component: Leccion13User,
    },
  ],
},
```

Usá `'user'` como path para `Leccion13User`, tal como pide el original.

### 2. Agregar `title` a la definición de la ruta

Además de definir las rutas correctamente, el Angular Router te permite establecer el título de la página cada vez que el usuario navega, agregando la propiedad `title` a cada ruta.

Agregá la propiedad `title` a la ruta por defecto (`path: ''`) y a la ruta `user`. Ya están incluidas en el snippet del paso 1, pero así se ve en el original:

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

## Para cerrar

En esta actividad aprendiste a definir y configurar rutas en tu app Angular. ¡Buen trabajo! 🎉

El camino para tener routing completo casi termina, seguí adelante: compará con la solución en `/tutorial/13/solucion` y pasá a la [Lección 14](http://localhost:4200/tutorial/14).
