# Lección 4 — Control de Flujo: `@if`

> Original: [Control Flow in Components - `@if`](https://v20.angular.dev/tutorials/learn-angular/4-control-flow-if)

Decidir qué mostrar en la pantalla es una tarea común en el desarrollo de aplicaciones. Muchas veces, la decisión se toma programáticamente usando condiciones.

Para expresar visualizaciones condicionales en las plantillas, Angular usa la sintaxis `@if`.

En esta lección vas a aprender a usar condicionales en las plantillas.

La sintaxis que permite mostrar elementos de forma condicional en una plantilla es `@if`. Acá hay un ejemplo de cómo usarla en un componente:

```ts
@Component({
  ...
  template: `
    @if (isLoggedIn) {
      <p>Welcome back, Friend!</p>
    }
  `,
})
export class App {
  isLoggedIn = true;
}
```

Dos cosas a tener en cuenta:

- Hay un prefijo `@` para el `if` porque es un tipo especial de sintaxis llamada [sintaxis de plantillas de Angular](https://v20.angular.dev/guide/templates)
- Para aplicaciones que todavía usan `*ngIf`, consultá la [documentación de Angular sobre directivas estructurales](https://v20.angular.dev/guide/directives/structural-directives)

## Cómo verla en el navegador

1. Levantá el servidor de desarrollo: `npm start`
2. Ejercicio: <http://localhost:4200/tutorial/04>
3. Solución para comparar en otra pestaña: <http://localhost:4200/tutorial/04/solucion>

## Archivo de trabajo

`src/app/tutorial/04-control-flow-if/leccion.ts`

Buscá los comentarios `// TODO` y completalos. Al guardar, el navegador se recarga solo.

## Pasos

### 1. Crear una propiedad llamada `isServerRunning`

En la clase `Leccion04`, agregá una propiedad `boolean` llamada `isServerRunning` con el valor inicial `true`.

### 2. Usar `@if` en la plantilla

Actualizá la plantilla para mostrar el mensaje `Yes, the server is running` si el valor de `isServerRunning` es `true`.

### 3. Usar `@else` en la plantilla

Angular ahora soporta sintaxis nativa de plantillas para definir el caso contrario con la sintaxis `@else`. Actualizá la plantilla para mostrar el mensaje `No, the server is not running` como caso `@else`.

Acá hay un ejemplo:

```html
template: `
@if (isServerRunning) {
  ...
} @else {
  ...
}
`;
```

Agregá tu código para completar el marcado que falta.

## Para cerrar

Este tipo de funcionalidad se llama control de flujo condicional. A continuación vas a aprender cómo repetir elementos en una plantilla.

¿Listo? Compará tu resultado con la solución en `/tutorial/04/solucion` y seguí con la [Lección 5](http://localhost:4200/tutorial/05).
