# Lección 12 — Activar el routing

> Original: [Routing Overview](https://v20.angular.dev/tutorials/learn-angular/12-enable-routing)

A toda app llega el momento en que necesita más de una sola página. Cuando eso pasa, el routing se vuelve una parte fundamental de la historia de rendimiento para tus usuarios.

En esta lección vas a aprender a configurar tu app para usar el **Angular Router**.

> **Nota:** podés leer más sobre routing en la [guía en profundidad](https://v20.angular.dev/guide/routing).

> **⚠️ App anfitriona:** en esta app el routing ya está configurado de fábrica, así que los pasos 1 y 2 de esta lección **ya están hechos**. Se muestran igual para que entiendas qué hace cada pieza y dónde vivirían en un proyecto propio. Tu ejercicio real es el **paso 3**.

## Cómo verla en el navegador

1. Levantá el servidor de desarrollo: `npm start`
2. Ejercicio: <http://localhost:4200/tutorial/12>
   - Sub-rutas: <http://localhost:4200/tutorial/12/home> y <http://localhost:4200/tutorial/12/user>
3. Solución para comparar en otra pestaña: <http://localhost:4200/tutorial/12/solucion>

## Archivo de trabajo

`src/app/tutorial/12-enable-routing/leccion.ts`

Buscá el comentario `TODO: [Paso 3]` y completalo. Al guardar, el navegador se recarga solo.

## Pasos

### 1. Crear un archivo `app.routes.ts` *(ya hecho en esta app)*

Dentro de `app.routes.ts`, hacé los siguientes cambios:

1. Importá `Routes` desde el paquete `@angular/router`.
2. Exportá una constante llamada `routes` de tipo `Routes`, y asignale `[]` como valor.

```ts
import { Routes } from '@angular/router';

export const routes: Routes = [];
```

En esta app ese archivo es `src/app/app.routes.ts` y ya existe: ahí se registran las rutas de todas las lecciones.

### 2. Agregar el routing a los providers *(ya hecho en esta app)*

En `app.config.ts`, configurá la app para usar el Angular Router con estos pasos:

1. Importá la función `provideRouter` desde `@angular/router`.
2. Importá `routes` desde `./app.routes`.
3. Llamá a la función `provideRouter` con `routes` como argumento, dentro del array `providers`.

```ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
```

En esta app ese archivo es `src/app/app.config.ts`, que ya llama a `provideRouter(routes)`, y el bootstrap ocurre en `src/main.ts` con `bootstrapApplication`.

### 3. Importar `RouterOutlet` en el componente *(este es tu ejercicio)*

Para que la app esté lista para usar el Angular Router, tenés que decirle **dónde** esperás que el router muestre el contenido. Eso se logra con la directiva `RouterOutlet` de `@angular/router`.

Importá `RouterOutlet` desde `@angular/router`, agregalo a `imports` y actualizá el template de `Leccion12` (en `leccion.ts`) agregando `<router-outlet />` debajo del `<nav>`:

```ts
@Component({
  // ...
  template: `
    <nav>
      <a href="/tutorial/12/home">Home</a>
      |
      <a href="/tutorial/12/user">User</a>
    </nav>
    <router-outlet />
  `,
  imports: [RouterOutlet],
})
export class Leccion12 {}
```

> **Nota:** en el tutorial original los links son `href="/"` y `href="/user"`. Acá apuntan a `/tutorial/12/home` y `/tutorial/12/user` para no salir del tutorial. En la lección 14 los vas a reemplazar por `routerLink`.

En esta app las rutas hijas ya están registradas: al agregar el outlet vas a ver
«Home Page» en `/tutorial/12` y `/tutorial/12/home`, y el usuario en `/tutorial/12/user`.
Antes del paso 3 solo se ve el menú. En la próxima lección vas a definir las rutas vos.

## Para cerrar

Tu app ya está configurada para usar Angular Router. ¡Buen trabajo! 🎉

Sigamos con el próximo paso: definir las rutas de la app. Compará tu resultado con la solución en `/tutorial/12/solucion` y seguí con la [Lección 13](http://localhost:4200/tutorial/13).
