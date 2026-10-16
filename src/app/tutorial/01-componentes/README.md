# Lección 1 — Anatomía de un Componente

> Original: [Components in Angular](https://v20.angular.dev/tutorials/learn-angular/1-components-in-angular)

Los componentes son los bloques fundamentales de cualquier aplicación Angular. Cada componente tiene tres partes:

- Clase TypeScript
- Plantilla HTML
- Estilos CSS

En esta lección vas a aprender a actualizar la plantilla y los estilos de un componente.

## Cómo verla en el navegador

1. Levantá el servidor de desarrollo: `npm start`
2. Ejercicio: <http://localhost:4200/tutorial/01>
3. Solución para comparar en otra pestaña: <http://localhost:4200/tutorial/01/solucion>

## Archivo de trabajo

`src/app/tutorial/01-componentes/leccion.ts`

Buscá los comentarios `// TODO` y completalos. Al guardar, el navegador se recarga solo.

## Pasos

### 1. Actualizar la plantilla del componente

Cambiá la propiedad `template` para que diga `Hello Universe`:

```ts
template: `
  Hello Universe
`,
```

Al cambiar la plantilla HTML, la vista se actualiza con tu mensaje. Vamos un paso más allá: cambiá el color del texto.

### 2. Actualizar los estilos del componente

Cambiá el valor de `styles` y modificá la propiedad `color` de `cornflowerblue` a la variable de acento del tema, `var(--acento)`:

```ts
styles: `
  :host {
    color: var(--acento);
  }
`,
```

Al mirar la vista, vas a ver que el color del texto cambió.

## Para cerrar

En Angular podés usar todo el HTML y CSS soportado por el navegador. Si querés, podés guardar tu plantilla y estilos en archivos separados (con `templateUrl` y `styleUrl`), como se hace en el componente raíz `src/app/app.ts`.

¿Listo? Compará tu resultado con la solución en `/tutorial/01/solucion` y seguí con la [Lección 2](http://localhost:4200/tutorial/02).
