# Lección 17 — Formularios reactivos

> Original: [Reactive Forms](https://v20.angular.dev/tutorials/learn-angular/17-reactive-forms)

Cuando querés manejar tus formularios de forma programática, en lugar de depender únicamente de la plantilla, los formularios reactivos son la respuesta.

> Nota: aprendé más sobre [formularios reactivos en la guía en profundidad](https://v20.angular.dev/guide/forms/reactive-forms).

En esta actividad vas a aprender a configurar formularios reactivos.

## Cómo verla en el navegador

1. Levantá el servidor de desarrollo: `npm start`
2. Ejercicio: <http://localhost:4200/tutorial/17>
3. Solución para comparar en otra pestaña: <http://localhost:4200/tutorial/17/solucion>

## Archivo de trabajo

`src/app/tutorial/17-reactive-forms/leccion.ts`

Buscá los comentarios `// TODO` y completalos. Al guardar, el navegador se recarga solo.

## Pasos

### 1. Importar `ReactiveFormsModule`

En `leccion.ts`, importá `ReactiveFormsModule` desde `@angular/forms` y agregalo al array `imports` del componente.

```ts
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
    <form>
      <label>Name
        <input type="text" />
      </label>
      <label>Email
        <input type="email" />
      </label>
      <button type="submit">Submit</button>
    </form>
  `,
  imports: [ReactiveFormsModule],
})
```

### 2. Crear el objeto `FormGroup` con FormControls

Los formularios reactivos usan la clase `FormControl` para representar los controles del formulario (por ejemplo, los inputs). Angular provee la clase `FormGroup` para agrupar form controls en un objeto que hace más cómodo manejar formularios grandes.

Agregá `FormControl` y `FormGroup` al import desde `@angular/forms` para poder crear un `FormGroup` con las propiedades `name` y `email` como FormControls:

```ts
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
...
export class App {
  profileForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
  });
}
```

### 3. Vincular el FormGroup y los FormControls al formulario

Cada `FormGroup` debe asociarse a un formulario con la directiva `[formGroup]`.

Además, cada `FormControl` se conecta con la directiva `formControlName` y la propiedad correspondiente. Actualizá la plantilla con el siguiente código del formulario:

```html
<form [formGroup]="profileForm">
  <label>
    Name
    <input type="text" formControlName="name" />
  </label>
  <label>
    Email
    <input type="email" formControlName="email" />
  </label>
  <button type="submit">Submit</button>
</form>
```

### 4. Mostrar los valores del formulario

Cuando quieras acceder a los datos de un `FormGroup`, podés hacerlo accediendo al valor (`value`) del grupo. Actualizá la `template` para mostrar los valores del formulario:

```html
...
<h2>Profile Form</h2>
<p>Name: {{ profileForm.value.name }}</p>
<p>Email: {{ profileForm.value.email }}</p>
```

### 5. Manejar los cambios del formulario

Accedé a los valores del `FormGroup` para trabajar con ellos. Agregá a la clase del componente un método llamado `handleSubmit` que vas a usar después para manejar el envío del formulario; este método mostrará los valores leídos del FormGroup:

```ts
handleSubmit() {
  alert(
    this.profileForm.value.name + ' | ' + this.profileForm.value.email
  );
}
```

### 6. Agregar `ngSubmit` al formulario

Ya tenés acceso a los valores del formulario, ahora falta manejar el evento de envío y usar el método `handleSubmit`. Angular tiene un manejador de eventos para justo esto: `ngSubmit`. Actualizá el elemento `form` para que llame al método `handleSubmit` cuando se envíe el formulario:

```html {highlight:[1]}
<form [formGroup]="profileForm" (ngSubmit)="handleSubmit()"></form>
```

## Para cerrar

Y así de simple ya sabés trabajar con formularios reactivos en Angular.

¡Excelente trabajo con esta actividad! Seguí para aprender sobre validación de formularios: compará tu resultado con la solución en `/tutorial/17/solucion` y continuá con la [Lección 18](http://localhost:4200/tutorial/18).
