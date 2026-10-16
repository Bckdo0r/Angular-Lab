# Lección 24 — Crear un pipe personalizado

> Original: [Create a custom pipe](https://v20.angular.dev/tutorials/learn-angular/24-create-a-pipe)

Podés crear pipes personalizados en Angular para adaptarlos a tus necesidades de transformación de datos.

> NOTA: Aprendé más sobre [crear pipes personalizados en la guía en profundidad](https://v20.angular.dev/guide/templates/pipes#creating-custom-pipes).

En esta actividad vas a crear un pipe personalizado y a usarlo en tu plantilla.

## Cómo verla en el navegador

1. Levantá el servidor de desarrollo: `npm start`
2. Ejercicio: <http://localhost:4200/tutorial/24>
3. Solución para comparar en otra pestaña: <http://localhost:4200/tutorial/24/solucion>

## Archivos de trabajo

- `src/app/tutorial/24-create-a-pipe/reverse.pipe.ts`
- `src/app/tutorial/24-create-a-pipe/leccion.ts`

Buscá los comentarios `// TODO` y completalos. Al guardar, el navegador se recarga solo.

## Pasos

Un pipe es una clase TypeScript con un decorador `@Pipe`. Acá hay un ejemplo:

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'star',
})
export class StarPipe implements PipeTransform {
  transform(value: string): string {
    return `⭐️ ${value} ⭐️`;
  }
}
```

La `StarPipe` acepta un valor de tipo string y devuelve ese string con estrellas alrededor. Tené en cuenta que:

- el `name` en la configuración del decorador `@Pipe` es lo que se va a usar en la plantilla
- la función `transform` es donde ponés tu lógica

Bien, te toca probar a vos — vas a crear el `ReversePipe`:

### 1. Crear el `ReversePipe`

En `reverse.pipe.ts`, agregá el decorador `@Pipe` a la clase `Leccion24ReversePipe` con la siguiente configuración:

```ts
@Pipe({
  name: 'tutorialReverse',
})
```

> En este proyecto el pipe se llama `tutorialReverse` (y `tutorialReverseSolucion` en la solución) para que su nombre no choque con el de otras lecciones.

### 2. Implementar la función `transform`

Ahora la clase `Leccion24ReversePipe` es un pipe. Actualizá la función `transform` para agregar la lógica de inversión:

```ts
export class Leccion24ReversePipe implements PipeTransform {
  transform(value: string): string {
    let reverse = '';

    for (let i = value.length - 1; i >= 0; i--) {
      reverse += value[i];
    }

    return reverse;
  }
}
```

### 3. Usar el `ReversePipe` en la plantilla

Con la lógica del pipe implementada, el último paso es usarlo en la plantilla. En `leccion.ts` incluí el pipe en la plantilla y agregalo a los imports del componente:

```ts
@Component({
  // ...
  template: `Reverse Machine: {{ word | tutorialReverse }}`,
  imports: [Leccion24ReversePipe],
})
```

## Para cerrar

Y con eso lo lograste. Felicitaciones por completar esta actividad. Ahora sabés cómo usar pipes e incluso cómo implementar tus propios pipes personalizados.

¿Listo? Compará tu resultado con la solución en `/tutorial/24/solucion` y seguí con la [Lección 25](http://localhost:4200/tutorial/25).
