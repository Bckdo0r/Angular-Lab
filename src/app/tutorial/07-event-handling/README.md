# Lección 7 — Manejo de eventos

> Original: [Event handling](https://v20.angular.dev/tutorials/learn-angular/7-event-handling)

El manejo de eventos es lo que habilita las funcionalidades interactivas en las aplicaciones web. Te da la posibilidad, como desarrollador, de responder a acciones del usuario como pulsaciones de botones, envíos de formularios y más.

En esta lección vas a aprender a agregar un manejador de eventos.

## Cómo verla en el navegador

1. Levantá el servidor de desarrollo: `npm start`
2. Ejercicio: <http://localhost:4200/tutorial/07>
3. Solución para comparar en otra pestaña: <http://localhost:4200/tutorial/07/solucion>

## Archivo de trabajo

`src/app/tutorial/07-event-handling/leccion.ts`

Buscá los comentarios `// TODO` y completalos. Al guardar, el navegador se recarga solo.

## Pasos

En Angular te suscribís a eventos con la sintaxis de paréntesis `()`. En un elemento dado, envolvé el evento al que querés suscribirte entre paréntesis y asignale un manejador de eventos. Considerá este ejemplo con un `button`:

```ts
@Component({
  ...
  template: `<button (click)="greet()">`
})
export class App {
  greet() {
    console.log('Hello, there 👋');
  }
}
```

En este ejemplo, la función `greet()` se ejecuta cada vez que se hace clic en el botón. Tené en cuenta que la sintaxis `greet()` incluye los paréntesis al final.

Bien, ahora te toca a vos:

### 1. Agregar un manejador de eventos

En la clase `Leccion07`, completá el cuerpo del método `showSecretMessage()` con el siguiente código:

```ts
this.message = 'Way to go 🚀';
```

### 2. Suscribirse al evento de la plantilla

Actualizá el código de la plantilla en `leccion.ts` para suscribirte al evento `mouseover` del elemento `section`:

```html
<section (mouseover)="showSecretMessage()">
```

Y con unos pocos pasos en el código creaste tu primer manejador de eventos en Angular. Parece que ya le vas agarrando la mano. Seguí así.

## Para cerrar

Pasá el mouse sobre la sección y mirá cómo aparece el mensaje secreto. Compará tu resultado con la solución en `/tutorial/07/solucion` y seguí con la [Lección 8](http://localhost:4200/tutorial/08).

La solución agrega además un botón «Revelar mensaje» para poder activar la misma
acción con teclado o en una pantalla táctil. Es una mejora de accesibilidad; el
evento `mouseover` sigue siendo el objetivo del ejercicio.
