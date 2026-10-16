# Lección 3 — Componer Componentes

> Original: [Composing Components](https://v20.angular.dev/tutorials/learn-angular/3-composing-components)

Ya aprendiste a actualizar la plantilla, la lógica y los estilos de un componente, pero ¿cómo se usa un componente en tu aplicación?

La propiedad `selector` de la configuración del componente te da un nombre para referenciar el componente en otra plantilla. Usás el `selector` como una etiqueta HTML: por ejemplo, si el selector es `leccion-03-user`, en la plantilla se escribe `<leccion-03-user />`.

En este ejemplo hay dos componentes: `Leccion03User` y `Leccion03`.

## Cómo verla en el navegador

1. Levantá el servidor de desarrollo: `npm start`
2. Ejercicio: <http://localhost:4200/tutorial/03>
3. Solución para comparar en otra pestaña: <http://localhost:4200/tutorial/03/solucion>

## Archivo de trabajo

`src/app/tutorial/03-componer-componentes/leccion.ts`

Buscá los comentarios `// TODO` y completalos. Al guardar, el navegador se recarga solo.

## Pasos

### 1. Agregar una referencia al componente `Leccion03User`

Actualizá la plantilla de `Leccion03` para incluir una referencia al componente `Leccion03User`, que usa el selector `leccion-03-user`. Asegurate de agregar `Leccion03User` al arreglo `imports` de `Leccion03`; eso lo hace disponible para usarlo en la plantilla de `Leccion03`.

```ts
template: `<leccion-03-user />`,
imports: [Leccion03User],
```

El componente ahora muestra el mensaje `Username: youngTech`. Podés actualizar el código de la plantilla para incluir más marcado.

### 2. Agregar más marcado HTML

Como podés usar cualquier marcado HTML que quieras en una plantilla, probá actualizar la plantilla de `Leccion03` para incluir más elementos HTML. Este ejemplo agrega un elemento `<section>` como padre del elemento `<leccion-03-user>`.

```html
template: `
<section><leccion-03-user /></section>
`,
```

## Para cerrar

Podés usar todo el HTML y tantos componentes como necesites para dar vida a tu idea de app. Incluso podés tener varias copias del mismo componente en la misma página.

Eso nos lleva a la siguiente pregunta: ¿cómo mostrarías un componente de forma condicional según datos? Andá a la siguiente sección para descubrirlo.

¿Listo? Compará tu resultado con la solución en `/tutorial/03/solucion` y seguí con la [Lección 4](http://localhost:4200/tutorial/04).
