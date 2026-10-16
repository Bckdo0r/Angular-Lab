# Lección 20 — Inyección de dependencias con inject()

> Original: [Inject-based dependency injection](https://v20.angular.dev/tutorials/learn-angular/20-inject-based-di)

Crear un servicio inyectable es la primera parte del sistema de inyección de dependencias (DI) de Angular. ¿Cómo inyectás un servicio en un componente? Angular tiene una función conveniente llamada `inject()` que puede usarse en el contexto adecuado.

> Nota: los contextos de inyección quedan fuera del alcance de este tutorial, pero podés aprender más en la [guía de fundamentos de DI](https://v20.angular.dev/essentials/dependency-injection) y en la [guía de contextos de DI](https://v20.angular.dev/guide/di/dependency-injection-context).

En esta actividad vas a aprender a inyectar un servicio y usarlo en un componente.

Es muy útil inicializar propiedades de una clase con valores que provee el sistema de DI. Por ejemplo:

```ts {highlight:[3]}
@Component({...})
class PetCareDashboard {
  petRosterService = inject(PetRosterService);
}
```

## Cómo verla en el navegador

1. Levantá el servidor de desarrollo: `npm start`
2. Ejercicio: <http://localhost:4200/tutorial/20>
3. Solución para comparar en otra pestaña: <http://localhost:4200/tutorial/20/solucion>

## Archivo de trabajo

`src/app/tutorial/20-inject-based-di/leccion.ts`

Buscá los comentarios `// TODO` y completalos. Al guardar, el navegador se recarga solo.

## Pasos

### 1. Inyectar el servicio de autos

En `leccion.ts`, usando la función `inject()`, inyectá el servicio de autos y asignalo a una propiedad llamada `carService`:

```ts
carService = inject(CarService);
```

> Nota: fijate la diferencia entre la propiedad `carService` (en minúsculas) y la clase `CarService`.

### 2. Usar la instancia `carService`

Llamar a `inject(CarService)` te dio una instancia del servicio que podés usar en tu aplicación, guardada en la propiedad `carService`.

Inicializá la propiedad `display` con la siguiente implementación:

```ts
display = this.carService.getCars().join(' ⭐️ ');
```

### 3. Actualizar la plantilla

Actualizá la plantilla del componente con el siguiente código:

```ts
template: `<p>Car Listing: {{ display }}</p>`,
```

## Para cerrar

Acabás de inyectar tu primer servicio en un componente: ¡gran esfuerzo!

Compará tu resultado con la solución en `/tutorial/20/solucion` y seguí con la [Lección 22](http://localhost:4200/tutorial/22).
