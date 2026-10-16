# Lección 15 — Formularios (template-driven)

> Original: [Forms Overview](https://v20.angular.dev/tutorials/learn-angular/15-forms)

Los formularios son una parte grande de muchas apps porque le permiten a tu app aceptar input del usuario. Veamos cómo se manejan los formularios en Angular.

En Angular hay dos tipos de formularios: **template-driven** (basados en la plantilla) y **reactive** (reactivos). Vas a aprender sobre ambos en las próximas actividades.

En esta lección vas a aprender a armar un formulario usando el enfoque template-driven.

> **Nota:** podés leer más sobre formularios en la [guía en profundidad](https://v20.angular.dev/guide/forms).

## Cómo verla en el navegador

1. Levantá el servidor de desarrollo: `npm start`
2. Ejercicio: <http://localhost:4200/tutorial/15>
3. Solución para comparar en otra pestaña: <http://localhost:4200/tutorial/15/solucion>

## Archivos de trabajo

`src/app/tutorial/15-forms/user.ts`

Buscá los comentarios `// TODO 1`, `// TODO 2` y `// TODO 3` y completalos. El shell (`leccion.ts`) no necesita cambios. Al guardar, el navegador se recarga solo.

## Pasos

### 1. Crear un campo de input

En `user.ts`, actualizá la plantilla agregando un input de texto con el `id` en `framework` y el `type` en `text`, dentro del `<label>`:

```angular-html
<label for="framework">
  Favorite Framework:
  <input id="framework" type="text" />
</label>
```

### 2. Importar `FormsModule`

Para que este formulario use las características de Angular que permiten vincular datos con formularios, necesitás importar el `FormsModule`.

Importá `FormsModule` desde `@angular/forms` y agregalo al array `imports` de `Leccion15User`:

```ts {highlight:[[2],[6]]}
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  // ...
  imports: [FormsModule],
})
export class Leccion15User {}
```

### 3. Vincular el valor del input con la clase

El `FormsModule` trae una directiva llamada `ngModel` que vincula el valor del input con una propiedad de tu clase.

Actualizá el input para usar la directiva `ngModel`, con esta sintaxis: `[(ngModel)]="favoriteFramework"`, para vincular la propiedad `favoriteFramework`:

```html {highlight:[3]}
<label for="framework">
  Favorite Framework:
  <input id="framework" type="text" [(ngModel)]="favoriteFramework" />
</label>
```

Después de hacer los cambios, probá escribir un valor en el campo. Fijate cómo se actualiza en la pantalla (sí, muy bueno 😄).

> **Nota:** la sintaxis `[()]` se conoce como *"banana in a box"* (banana en una caja) y representa un two-way binding (vinculación bidireccional): property binding + event binding. Podés leer más en la [documentación de Angular sobre two-way data binding](https://v20.angular.dev/guide/templates/two-way-binding).

## Para cerrar

Diste un primer paso importante hacia la construcción de formularios con Angular. ¡Buen trabajo! 🎉 Sigamos con el impulso.

Compará tu resultado con la solución en `/tutorial/15/solucion` y seguí con la [Lección 16](http://localhost:4200/tutorial/16).
