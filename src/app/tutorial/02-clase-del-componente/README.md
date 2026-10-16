# Lección 2 — Actualizar la Clase del Componente

> Original: [Updating the Component Class](https://v20.angular.dev/tutorials/learn-angular/2-updating-the-component-class)

En Angular, la lógica y el comportamiento de un componente se definen en su clase TypeScript.

En esta lección vas a aprender a actualizar la clase del componente y a usar la [interpolación](https://v20.angular.dev/guide/templates/binding#render-dynamic-text-with-text-interpolation), que te permite mostrar texto dinámico en la plantilla.

## Cómo verla en el navegador

1. Levantá el servidor de desarrollo: `npm start`
2. Ejercicio: <http://localhost:4200/tutorial/02>
3. Solución para comparar en otra pestaña: <http://localhost:4200/tutorial/02/solucion>

## Archivo de trabajo

`src/app/tutorial/02-clase-del-componente/leccion.ts`

Buscá los comentarios `// TODO` y completalos. Al guardar, el navegador se recarga solo.

## Pasos

### 1. Agregar una propiedad llamada `city`

Actualizá la clase del componente agregando una propiedad llamada `city` a la clase `Leccion02`:

```ts
export class Leccion02 {
  city = 'San Francisco';
}
```

La propiedad `city` es de tipo `string`, pero podés omitir el tipo gracias a la [inferencia de tipos de TypeScript](https://www.typescriptlang.org/docs/handbook/type-inference.html). La propiedad `city` puede usarse dentro de la clase y también referenciarse en la plantilla del componente.

Para usar una propiedad de la clase en la plantilla, tenés que usar la sintaxis `{{ }}`.

### 2. Actualizar la plantilla del componente

Actualizá la propiedad `template` para que coincida con el siguiente HTML:

```ts
template: `Hello {{ city }}`,
```

Este es un ejemplo de interpolación y forma parte de la sintaxis de plantillas de Angular. Te permite hacer mucho más que poner texto dinámico en una plantilla: también podés usar esta sintaxis para llamar funciones, escribir expresiones y más.

### 3. Más práctica con la interpolación

Probá esto: agregá otro par de `{{ }}` con el contenido `1 + 1`:

```ts
template: `Hello {{ city }}, {{ 1 + 1 }}`,
```

Angular evalúa el contenido de los `{{ }}` y muestra el resultado en la plantilla.

## Para cerrar

Esto es solo el comienzo de lo que se puede hacer con las plantillas de Angular: seguí aprendiendo para descubrir más.

¿Listo? Compará tu resultado con la solución en `/tutorial/02/solucion` y seguí con la [Lección 3](http://localhost:4200/tutorial/03).
