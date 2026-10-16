# Lección 18 — Validación de formularios

> Original: [Validating forms](https://v20.angular.dev/tutorials/learn-angular/18-forms-validation)

Otro escenario común al trabajar con formularios es la necesidad de validar los inputs para asegurar que se envíen los datos correctos.

> Nota: aprendé más sobre [validar inputs de formularios en la guía en profundidad](https://v20.angular.dev/guide/forms/reactive-forms#validating-form-input).

En esta actividad vas a aprender a validar formularios con formularios reactivos.

## Cómo verla en el navegador

1. Levantá el servidor de desarrollo: `npm start`
2. Ejercicio: <http://localhost:4200/tutorial/18>
3. Solución para comparar en otra pestaña: <http://localhost:4200/tutorial/18/solucion>

## Archivo de trabajo

`src/app/tutorial/18-forms-validation/leccion.ts`

Buscá los comentarios `// TODO` y completalos. Al guardar, el navegador se recarga solo.

## Pasos

### 1. Importar `Validators`

Angular provee un conjunto de herramientas de validación. Para usarlas, primero actualizá el componente para importar `Validators` desde `@angular/forms`:

```ts {highlight:[1]}
import { ReactiveFormsModule, Validators } from '@angular/forms';

@Component({...})
export class App {}
```

### 2. Agregar validación al formulario

A cada `FormControl` se le pueden pasar los `Validators` que quieras usar para validar sus valores. Por ejemplo, si querés que el campo `name` de `profileForm` sea obligatorio, usá `Validators.required`.

Para el campo `email` queremos asegurarnos de que no quede vacío y que siga la estructura de una dirección de email válida. Esto se logra combinando los validadores `Validators.required` y `Validators.email` en un array.

Actualizá los `FormControl` de `name` y `email`:

```ts
profileForm = new FormGroup({
  name: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, Validators.email]),
});
```

### 3. Chequear la validez del formulario en la plantilla

Para determinar si un formulario es válido, la clase `FormGroup` tiene la propiedad `valid`. Podés usar esta propiedad para enlazar atributos dinámicamente. Actualizá el botón de envío para que esté habilitado según la validez del formulario:

```html
<button type="submit" [disabled]="!profileForm.valid">Submit</button>
```

## Para cerrar

Ya conocés los básicos de cómo funciona la validación con formularios reactivos.

¡Gran trabajo aprendiendo estos conceptos centrales de los formularios en Angular! Si querés aprender más, consultá la [documentación de formularios de Angular](https://v20.angular.dev/guide/forms/form-validation). Compará tu resultado con la solución en `/tutorial/18/solucion` y seguí con la [Lección 19](http://localhost:4200/tutorial/19).
