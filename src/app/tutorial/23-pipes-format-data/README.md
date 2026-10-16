# Lección 23 — Formatear datos con pipes

> Original: [Formatting data with pipes](https://v20.angular.dev/tutorials/learn-angular/23-pipes-format-data)

Podés llevar tu uso de pipes aún más lejos configurándolos. Los pipes se pueden configurar pasándoles opciones.

> NOTA: Aprendé más sobre [formatear datos con pipes en la guía en profundidad](https://v20.angular.dev/guide/templates/pipes).

En esta actividad vas a trabajar con algunos pipes y parámetros de pipes.

## Cómo verla en el navegador

1. Levantá el servidor de desarrollo: `npm start`
2. Ejercicio: <http://localhost:4200/tutorial/23>
3. Solución para comparar en otra pestaña: <http://localhost:4200/tutorial/23/solucion>

## Archivo de trabajo

`src/app/tutorial/23-pipes-format-data/leccion.ts`

Buscá los comentarios `// TODO` y completalos. Al guardar, el navegador se recarga solo.

## Pasos

Para pasar parámetros a un pipe, usá la sintaxis `:` seguida del valor del parámetro. Acá hay un ejemplo:

```ts
template: `{{ date | date: 'medium' }}`;
```

La salida es `Jun 15, 2015, 9:43:11 PM`.

Es hora de personalizar la salida de algunos pipes:

### 1. Formatear un número con `DecimalPipe`

En `leccion.ts`, actualizá la plantilla para incluir un parámetro en el pipe `number`:

```html
template: ` ...
<li>Number with "decimal" {{ num | number: '3.2-2' }}</li>
`
```

> NOTA: ¿Qué es ese formato? El parámetro del `DecimalPipe` se llama `digitsInfo`, y usa el formato `{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}`.

### 2. Formatear una fecha con `DatePipe`

Ahora, actualizá la plantilla para usar el pipe `date`:

```html
template: ` ...
<li>Date with "date" {{ birthday | date: 'medium' }}</li>
`
```

Como extra, probá diferentes parámetros para `date`. Encontrá más información en la [documentación de Angular](https://v20.angular.dev/guide/templates/pipes).

### 3. Formatear una moneda con `CurrencyPipe`

Como última tarea, actualizá la plantilla para usar el pipe `currency`:

```html
template: ` ...
<li>Currency with "currency" {{ cost | currency }}</li>
`
```

También podés probar diferentes parámetros para `currency`. Encontrá más información en la [documentación de Angular](https://v20.angular.dev/guide/templates/pipes).

## Para cerrar

Buen trabajo con los pipes. Viniste avanzando muy bien.

Hay aún más pipes integrados que podés usar en tus aplicaciones. Encontrás la lista en la [documentación de Angular](https://v20.angular.dev/guide/templates/pipes).

En el caso de que los pipes integrados no cubran tus necesidades, también podés crear un pipe personalizado. Mirá la próxima lección para saber más.

¿Listo? Compará tu resultado con la solución en `/tutorial/23/solucion` y seguí con la [Lección 24](http://localhost:4200/tutorial/24).
