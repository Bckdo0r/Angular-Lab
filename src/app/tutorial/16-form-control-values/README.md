# Lección 16 — Obtener el valor de un control de formulario

> Original: [Getting form control value](https://v20.angular.dev/tutorials/learn-angular/16-form-control-values)

Ahora que tus formularios ya están armados con Angular, el próximo paso es **acceder a los valores** de los controles del formulario.

En esta lección vas a aprender a obtener el valor de un input de tu formulario.

> **Nota:** podés leer más sobre cómo agregar un control de formulario básico en la [guía en profundidad](https://v20.angular.dev/guide/forms/reactive-forms#adding-a-basic-form-control).

## Cómo verla en el navegador

1. Levantá el servidor de desarrollo: `npm start`
2. Ejercicio: <http://localhost:4200/tutorial/16>
3. Solución para comparar en otra pestaña: <http://localhost:4200/tutorial/16/solucion>

## Archivos de trabajo

`src/app/tutorial/16-form-control-values/user.ts`

Buscá los comentarios `// TODO 1` y `// TODO 2` y completalos. El shell (`leccion.ts`) no necesita cambios. Al guardar, el navegador se recarga solo.

## Pasos

### 1. Mostrar el valor del input en el template

Para mostrar el valor del input en una plantilla, podés usar la sintaxis de interpolación `{{}}`, igual que con cualquier otra propiedad de la clase del componente:

```angular-ts {highlight:[5]}
@Component({
  selector: 'app-user',
  template: `
    ...
    <p>Framework: {{ favoriteFramework }}</p>
    <label for="framework">
      Favorite Framework:
      <input id="framework" type="text" [(ngModel)]="favoriteFramework" />
    </label>
  `,
})
export class User {
  favoriteFramework = '';
}
```

En la lección, actualizá el `<p>Framework:</p>` de `user.ts` para que muestre `{{ favoriteFramework }}`. Al escribir en el input, vas a ver el texto reflejado en vivo.

### 2. Obtener el valor del input desde la clase

Cuando necesitás referenciar el valor del campo de input dentro de la clase del componente, lo hacés accediendo a la propiedad de la clase con la sintaxis `this`:

```angular-ts {highlight:[15]}
// ...
@Component({
  selector: 'app-user',
  template: `
    ...
    <button (click)="showFramework()">Show Framework</button>
  `,
  // ...
})
export class User {
  favoriteFramework = '';
  // ...

  showFramework() {
    alert(this.favoriteFramework);
  }
}
```

En la lección, completá el método `showFramework()` de `user.ts` para que muestre un `alert` con `this.favoriteFramework`. Al hacer clic en el botón **Show Framework**, vas a ver el valor actual del input en un alerta.

## Para cerrar

¡Buen trabajo aprendiendo a mostrar los valores del input en tu template y a acceder a ellos programáticamente! 🎉

Es momento de avanzar hacia la próxima forma de manejar formularios con Angular: los **formularios reactivos**. Si querés saber más sobre los formularios template-driven, revisá la [documentación de formularios de Angular](https://v20.angular.dev/guide/forms/template-driven-forms).

Compará tu resultado con la solución en `/tutorial/16/solucion` y seguí con la [Lección 17](http://localhost:4200/tutorial/17).
