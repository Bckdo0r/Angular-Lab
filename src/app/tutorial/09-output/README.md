# Lección 9 — Propiedades output de componentes

Al trabajar con componentes, puede ser necesario notificar a otros componentes que algo pasó. Quizás se hizo clic en un botón, se agregó o quitó un ítem de una lista, u ocurrió alguna otra actualización importante. En este escenario, los componentes necesitan comunicarse con los componentes padres.

Angular usa la función `output()` para habilitar este tipo de comportamiento.

En esta lección vas a aprender a usar la función `output()` para comunicar componentes.

## Cómo verla en el navegador

1. Levantá el servidor de desarrollo: `npm start`
2. Ejercicio: <http://localhost:4200/tutorial/09>
3. Solución para comparar en otra pestaña: <http://localhost:4200/tutorial/09/solucion>

## Archivos de trabajo

- `src/app/tutorial/09-output/child.ts`
- `src/app/tutorial/09-output/leccion.ts`

Buscá los comentarios `// TODO` y completalos. Al guardar, el navegador se recarga solo.

## Pasos

Para crear el camino de comunicación de los componentes hijos hacia los padres, usá la función `output` para inicializar una propiedad de la clase:

```ts
// child.ts
@Component({...})
class Child {
  incrementCountEvent = output<number>();
}
```

Ahora el componente puede generar eventos que el componente padre puede escuchar. Dispará eventos llamando al método `emit`:

```ts
// child.ts
class Child {
  ...

  onClick() {
    this.count++;
    this.incrementCountEvent.emit(this.count);
  }
}
```

La función `emit` genera un evento con el mismo tipo definido en el `output`.

Bien, ahora te toca a vos. Completá el código siguiendo estas tareas:

### 1. Agregar una propiedad `output()`

Actualizá `child.ts` agregando una propiedad de salida llamada `addItemEvent`, asegurándote de que el tipo de la salida sea `string`.

### 2. Completar el método `addItem`

En `child.ts` actualizá el método `addItem`; usá el siguiente código como lógica:

```ts
// child.ts
addItem() {
  this.addItemEvent.emit('🐢');
}
```

### 3. Actualizar la plantilla de `Leccion09`

En `leccion.ts` actualizá la plantilla para escuchar el evento emitido agregando el siguiente código:

```html
<leccion-09-child (addItemEvent)="addItem($event)" />
```

Ahora, el botón "Agregar ítem" agrega un nuevo ítem a la lista cada vez que se hace clic.

## Para cerrar

¡Wow, en este punto completaste los fundamentos de componentes! Impresionante 👏

Seguí aprendiendo para desbloquear más funcionalidades geniales de Angular.

Compará tu resultado con la solución en `/tutorial/09/solucion` y seguí con la [Lección 10](http://localhost:4200/tutorial/10).
