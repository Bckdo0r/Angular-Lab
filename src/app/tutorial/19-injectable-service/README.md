# Lección 19 — Crear un servicio inyectable

> Original: [Creating an injectable service](https://v20.angular.dev/tutorials/learn-angular/19-creating-an-injectable-service)

La inyección de dependencias (DI) en Angular es una de las características más potentes del framework. Podés pensar en la inyección de dependencias como la capacidad de Angular de _proveer_ en tiempo de ejecución los recursos que tu aplicación necesita. Una dependencia puede ser un servicio u otro tipo de recurso.

> Nota: aprendé más sobre [inyección de dependencias en la guía de fundamentos](https://v20.angular.dev/essentials/dependency-injection).

En esta actividad vas a aprender a crear un servicio `inyectable`.

Una forma de usar un servicio es como intermediario para interactuar con datos y APIs. Para que un servicio sea reutilizable, la lógica debe quedarse en el servicio y compartirse por toda la aplicación cuando haga falta.

Para que una clase pueda ser inyectada por el sistema de DI, se usa un decorador. El tutorial oficial usa `@Service()` (una API muy reciente que se auto-provee en el inyector raíz), pero en esta versión de Angular el equivalente es **`@Injectable({ providedIn: 'root' })`**. Por ejemplo:

```ts {highlight:[1]}
@Injectable({ providedIn: 'root' })
class UserService {
  // métodos para obtener y devolver datos
}
```

El decorador `@Injectable` marca la clase como servicio y le notifica al sistema de DI que `UserService` puede usarse en cualquier parte de tu aplicación. Con `providedIn: 'root'`, Angular provee el servicio en toda la aplicación, así que no necesitás ninguna configuración extra.

> Nota: podés aprender más en la [guía sobre cómo crear servicios inyectables](https://v20.angular.dev/guide/di/creating-injectable-service).

Muy bien, ahora probalo vos:

## Cómo verla en el navegador

1. Levantá el servidor de desarrollo: `npm start`
2. Ejercicio: <http://localhost:4200/tutorial/19>
3. Solución para comparar en otra pestaña: <http://localhost:4200/tutorial/19/solucion>

> ⚠️ Mientras no completes el TODO, la página del ejercicio va a mostrar un error `NG0201: No provider found for Leccion19CarService` (en pantalla en blanco y en la consola). Es esperado: justamente ese es el problema que esta lección resuelve. Al agregar el decorador, la página va a funcionar.

## Archivo de trabajo

`src/app/tutorial/19-injectable-service/car.service.ts`

Buscá los comentarios `// TODO` y completalos. Al guardar, el navegador se recarga solo.

## Pasos

### 1. Agregar el decorador `@Injectable`

Actualizá el código en `car.service.ts` agregando el decorador `@Injectable({ providedIn: 'root' })` a la clase del servicio:

```ts
@Injectable({ providedIn: 'root' })
export class CarService {
  cars = ['Sunflower GT', 'Flexus Sport', 'Sprout Mach One'];

  getCars(): string[] {
    return this.cars;
  }

  getCar(id: number) {
    return this.cars[id];
  }
}
```

TIP: usá el ejemplo de arriba para encontrar la sintaxis correcta.

## Para cerrar

Bien hecho 👍 ese servicio ahora es `inyectable` y puede participar de la fiesta. Ahora que el servicio es inyectable, inyectemoslo en un componente 👉

Compará tu resultado con la solución en `/tutorial/19/solucion` y seguí con la [Lección 20](http://localhost:4200/tutorial/20).
