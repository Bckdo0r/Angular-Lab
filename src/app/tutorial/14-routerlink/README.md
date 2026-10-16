# Lección 14 — Navegación con routerLink

> Original: [Use RouterLink for Navigation](https://v20.angular.dev/tutorials/learn-angular/14-routerLink)

En el estado actual de la app, la página entera se recarga cada vez que hacés clic en un link interno. Con una app chica puede parecer irrelevante, pero en páginas más grandes tiene implicancias de rendimiento: el usuario tiene que volver a descargar assets y ejecutar cálculos otra vez.

En esta lección vas a aprender a usar la directiva **`RouterLink`** para sacarle el máximo provecho al Angular Router.

> **Nota:** podés leer más sobre cómo agregar rutas a tu aplicación en la [guía en profundidad](https://v20.angular.dev/guide/routing/define-routes#adding-the-router-to-your-application).

## Cómo verla en el navegador

1. Levantá el servidor de desarrollo: `npm start`
2. Ejercicio: <http://localhost:4200/tutorial/14>
   - Sub-rutas: <http://localhost:4200/tutorial/14/home> y <http://localhost:4200/tutorial/14/user>
3. Solución para comparar en otra pestaña: <http://localhost:4200/tutorial/14/solucion>

> Probá hacer clic en los links del nav: mientras uses `href`, la página entera se recarga. Después de completar el ejercicio, solo cambia el contenido del `<router-outlet />`.

## Archivo de trabajo

`src/app/tutorial/14-routerlink/leccion.ts`

Buscá los comentarios `// TODO 1` y `// TODO 2` y completalos. Al guardar, el navegador se recarga solo.

## Pasos

### 1. Importar la directiva `RouterLink`

En `leccion.ts`, agregá la directiva `RouterLink` al import existente desde `@angular/router` y sumala al array `imports` del decorator del componente:

```ts
// ...
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterLink, RouterOutlet],
  // ...
})
```

### 2. Agregar `routerLink` al template

Para usar la directiva `RouterLink`, reemplazá los atributos `href` por `routerLink`. Actualizá el template con este cambio:

```ts
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  // ...
  template: `
    ...
    <a routerLink="/">Home</a>
    <a routerLink="/user">User</a>
    ...
  `,
  imports: [RouterLink, RouterOutlet],
})
```

**Adaptación a esta app:** los links de la lección apuntan a `/tutorial/14/home` y `/tutorial/14/user` (en la solución, a `/tutorial/14/solucion/home` y `/tutorial/14/solucion/user`) para no salir del tutorial.

```ts
<a routerLink="/tutorial/14/home">Home</a>
|
<a routerLink="/tutorial/14/user">User</a>
```

Cuando hagas clic en los links de la navegación, ya no debería parpadear la pantalla: solo cambia el contenido de la página en sí (es decir, lo que muestra el `<router-outlet />`).

## Para cerrar

¡Buen trabajo aprendiendo sobre routing con Angular! 🎉 Esto es apenas la superficie de la API del `Router`; para saber más, mirá la [documentación de Angular Router](https://v20.angular.dev/guide/routing).

Compará tu resultado con la solución en `/tutorial/14/solucion` y seguí con la [Lección 15](http://localhost:4200/tutorial/15), donde arrancamos con los formularios.
