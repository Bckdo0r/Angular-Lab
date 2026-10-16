# Lección 6 — Property Binding

> Original: [Property Binding in Angular](https://v20.angular.dev/tutorials/learn-angular/6-property-binding)

El property binding en Angular te permite asignar valores a propiedades de elementos HTML, componentes de Angular y más.

Usá property binding para asignar dinámicamente valores a propiedades y atributos. Podés hacer cosas como activar o desactivar funciones de un botón, definir rutas de imágenes programáticamente y compartir valores entre componentes.

En esta lección vas a aprender a usar property binding en las plantillas.

Para bindear el atributo de un elemento, envolvé el nombre del atributo en corchetes. Acá hay un ejemplo:

```html
<img alt="photo" [src]="imageURL" />
```

En este ejemplo, el valor del atributo `src` queda bindeado a la propiedad de clase `imageURL`. El valor que tenga `imageURL` se asigna como atributo `src` de la etiqueta `img`.

## Cómo verla en el navegador

1. Levantá el servidor de desarrollo: `npm start`
2. Ejercicio: <http://localhost:4200/tutorial/06>
3. Solución para comparar en otra pestaña: <http://localhost:4200/tutorial/06/solucion>

## Archivo de trabajo

`src/app/tutorial/06-property-binding/leccion.ts`

Buscá los comentarios `// TODO` y completalos. Al guardar, el navegador se recarga solo.

## Pasos

### 1. Agregar una propiedad llamada `isEditable`

Actualizá el código de `leccion.ts` agregando a la clase `Leccion06` una propiedad llamada `isEditable` con el valor inicial `true`:

```ts
export class Leccion06 {
  isEditable = true;
}
```

### 2. Bindear `contentEditable`

A continuación, bindeá el atributo `contentEditable` del `div` a la propiedad `isEditable` usando la sintaxis de [corchetes]:

```ts
@Component({
  ...
  template: `<div [contentEditable]="isEditable"></div>`,
})
```

El div ahora es editable. ¡Buen trabajo! 🎉

## Para cerrar

El property binding es una de las muchas funcionalidades poderosas de Angular. Si querés aprender más, mirá [la documentación de Angular](https://v20.angular.dev/guide/templates/binding#css-class-and-style-property-bindings).

¿Listo? Compará tu resultado con la solución en `/tutorial/06/solucion` y seguí con la [Lección 7](http://localhost:4200/tutorial/07).
