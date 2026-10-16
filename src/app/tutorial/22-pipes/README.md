# Lección 22 — Pipes

> Original: [Pipes](https://v20.angular.dev/tutorials/learn-angular/22-pipes)

Los pipes son funciones que se usan para transformar datos en las plantillas. En general, los pipes son funciones "puras" que no causan efectos secundarios. Angular tiene una serie de pipes integrados muy útiles que podés importar y usar en tus componentes. También podés crear un pipe personalizado.

> NOTA: Aprendé más sobre los [pipes en la guía en profundidad](https://v20.angular.dev/guide/templates/pipes).

En esta actividad vas a importar un pipe y a usarlo en la plantilla.

## Cómo verla en el navegador

1. Levantá el servidor de desarrollo: `npm start`
2. Ejercicio: <http://localhost:4200/tutorial/22>
3. Solución para comparar en otra pestaña: <http://localhost:4200/tutorial/22/solucion>

## Archivo de trabajo

`src/app/tutorial/22-pipes/leccion.ts`

Buscá los comentarios `// TODO` y completalos. Al guardar, el navegador se recarga solo.

## Pasos

Para usar un pipe en una plantilla, incluyalo en una expresión interpolada. Mirá este ejemplo:

```ts
import { UpperCasePipe } from '@angular/common';

@Component({
  // ...
  template: `{{ loudMessage | uppercase }}`,
  imports: [UpperCasePipe],
})
export class App {
  loudMessage = 'we think you are doing great!';
}
```

Ahora te toca probarlo a vos:

### 1. Importar el pipe `LowerCase`

Primero, actualizá `leccion.ts` agregando el import de archivo para `LowerCasePipe` desde `@angular/common`:

```ts
import { LowerCasePipe } from '@angular/common';
```

### 2. Agregar el pipe a los imports de la plantilla

Después, actualizá los `imports` del decorador `@Component()` para incluir una referencia a `LowerCasePipe`:

```ts
@Component({
  // ...
  imports: [LowerCasePipe],
})
```

### 3. Agregar el pipe a la plantilla

Por último, en `leccion.ts` actualizá la plantilla para incluir el pipe `lowercase`:

```ts
template: `{{ username | lowercase }}`,
```

## Para cerrar

Los pipes también pueden aceptar parámetros, que se usan para configurar su salida. Vas a descubrir más en la próxima actividad.

¿Listo? Compará tu resultado con la solución en `/tutorial/22/solucion` y seguí con la [Lección 23](http://localhost:4200/tutorial/23).
