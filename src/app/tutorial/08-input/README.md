# Lección 8 — Propiedades input de componentes

A veces, al desarrollar una aplicación, necesitás enviar datos hacia un componente. Estos datos se pueden usar para personalizar un componente o para enviar información de un componente padre a uno hijo.

Angular usa un concepto llamado `input` (entrada). Es similar a `props` en otros frameworks. Para crear una propiedad `input`, usá la función `input()`.

En esta lección vas a aprender a usar la función `input()` para enviar información a los componentes.

## Cómo verla en el navegador

1. Levantá el servidor de desarrollo: `npm start`
2. Ejercicio: <http://localhost:4200/tutorial/08>
3. Solución para comparar en otra pestaña: <http://localhost:4200/tutorial/08/solucion>

## Archivos de trabajo

- `src/app/tutorial/08-input/user.ts`
- `src/app/tutorial/08-input/leccion.ts`

Buscá los comentarios `// TODO` y completalos. Al guardar, el navegador se recarga solo.

## Pasos

Para crear una propiedad `input`, agregá la función `input()` para inicializar una propiedad de la clase de un componente:

```ts
// user.ts
class User {
  occupation = input<string>();
}
```

Cuando quieras pasar un valor a través de un `input`, los valores se pueden establecer en las plantillas usando la sintaxis de atributo. Acá hay un ejemplo:

```ts
// app.ts
@Component({
  ...
  template: `<app-user occupation="Angular Developer"></app-user>`
})
export class App {}
```

La función `input` devuelve un `InputSignal`. Podés leer el valor invocando la señal:

```ts
// user.ts
@Component({
  ...
  template: `<p>The user's occupation is {{occupation()}}</p>`
})
```

### 1. Definir una propiedad `input()`

Actualizá el código de `user.ts` para definir una propiedad `input` en `Leccion08User` llamada `name` con tipo `string`. Por ahora, no establezcas un valor inicial e invocá `input()` sin argumentos. Asegurate de actualizar la plantilla para invocar e interpolar la propiedad `name` al final de la oración.

### 2. Pasar un valor a la propiedad `input`

Actualizá el código de `leccion.ts` para enviar la propiedad `name` con el valor `"Simran"`.

Cuando el código se haya actualizado correctamente, la app va a mostrar `El nombre del usuario es Simran`.

## Para cerrar

Esto es genial, pero es solo una dirección de la comunicación entre componentes. ¿Qué pasa si querés enviar información y datos a un componente padre desde uno hijo? Descubrilo en la próxima lección.

P.D.: lo estás haciendo muy bien — seguí así 🎉

Compará tu resultado con la solución en `/tutorial/08/solucion` y seguí con la [Lección 9](http://localhost:4200/tutorial/09).
