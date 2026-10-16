# Lección 5 — Control de Flujo: `@for`

> Original: [Control Flow in Components - `@for`](https://v20.angular.dev/tutorials/learn-angular/5-control-flow-for)

A menudo, al construir aplicaciones web, necesitás repetir un fragmento de código una cantidad específica de veces; por ejemplo, dado un arreglo de nombres, quizás quieras mostrar cada nombre en una etiqueta `<p>`.

En esta lección vas a aprender a usar `@for` para repetir elementos en una plantilla.

La sintaxis que permite repetir elementos en una plantilla es `@for`. Acá hay un ejemplo de cómo usarla en un componente:

```ts
@Component({
  ...
  template: `
    @for (os of operatingSystems; track os.id) {
      {{ os.name }}
    }
  `,
})
export class App {
  operatingSystems = [{id: 'win', name: 'Windows'}, {id: 'osx', name: 'macOS'}, {id: 'linux', name: 'Linux'}];
}
```

Dos cosas a tener en cuenta:

- Hay un prefijo `@` para el `for` porque es una sintaxis especial llamada [sintaxis de plantillas de Angular](https://v20.angular.dev/guide/templates)
- Para aplicaciones que todavía usan `*ngFor`, consultá la [documentación de Angular sobre directivas estructurales](https://v20.angular.dev/guide/directives/structural-directives)

## Cómo verla en el navegador

1. Levantá el servidor de desarrollo: `npm start`
2. Ejercicio: <http://localhost:4200/tutorial/05>
3. Solución para comparar en otra pestaña: <http://localhost:4200/tutorial/05/solucion>

## Archivo de trabajo

`src/app/tutorial/05-control-flow-for/leccion.ts`

Buscá los comentarios `// TODO` y completalos. Al guardar, el navegador se recarga solo.

## Pasos

### 1. Agregar la propiedad `users`

En la clase `Leccion05`, agregá una propiedad llamada `users` que contenga usuarios y sus nombres:

```ts
[
  {id: 0, name: 'Sarah'},
  {id: 1, name: 'Amy'},
  {id: 2, name: 'Rachel'},
  {id: 3, name: 'Jessica'},
  {id: 4, name: 'Poornima'},
];
```

### 2. Actualizar la plantilla

Actualizá la plantilla para mostrar el nombre de cada usuario en un elemento `p` usando la sintaxis de plantillas `@for`:

```html
@for (user of users; track user.id) {
  <p>{{ user.name }}</p>
}
```

NOTA: el uso de `track` es obligatorio; podés usar el `id` u otro identificador único.

## Para cerrar

Este tipo de funcionalidad se llama control de flujo. A continuación vas a aprender a personalizar y comunicarte con los componentes; por cierto, ¡vas muy bien hasta ahora!

¿Listo? Compará tu resultado con la solución en `/tutorial/05/solucion` y seguí con la [Lección 6](http://localhost:4200/tutorial/06).
