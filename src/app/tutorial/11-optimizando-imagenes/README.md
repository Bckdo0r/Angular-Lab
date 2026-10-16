# Lección 11 — Optimizando imágenes

Las imágenes son una gran parte de muchas aplicaciones y pueden ser una de las principales causas de problemas de rendimiento, incluyendo puntajes bajos de [Core Web Vitals](https://web.dev/explore/learn-core-web-vitals).

La optimización de imágenes puede ser un tema complejo, pero Angular resuelve la mayor parte por vos con la directiva `NgOptimizedImage`.

En esta actividad vas a aprender a usar `NgOptimizedImage` para asegurarte de que tus imágenes se carguen de manera eficiente.

## Cómo verla en el navegador

1. Levantá el servidor de desarrollo: `npm start`
2. Ejercicio: <http://localhost:4200/tutorial/11>
3. Solución para comparar en otra pestaña: <http://localhost:4200/tutorial/11/solucion>

## Archivos de trabajo

- `src/app/tutorial/11-optimizando-imagenes/user.ts`
- `src/app/tutorial/11-optimizando-imagenes/leccion.ts`

Buscá los comentarios `// TODO` y completalos. Al guardar, el navegador se recarga solo.

> El logo que usa esta lección está en `public/tut-logo.svg` y se sirve en la ruta `/tut-logo.svg`.

## Pasos

### 1. Importar la directiva NgOptimizedImage

Para poder usar la directiva `NgOptimizedImage`, primero importala desde la librería `@angular/common` y agregala al array `imports` del componente:

```ts
import { NgOptimizedImage } from '@angular/common';

@Component({
  imports: [NgOptimizedImage],
  ...
})
```

### 2. Cambiar el atributo src por ngSrc

Para habilitar la directiva `NgOptimizedImage`, cambiá el atributo `src` por `ngSrc`. Esto aplica tanto para fuentes de imagen estáticas (es decir, `src`) como dinámicas (es decir, `[src]`):

```ts
import { NgOptimizedImage } from '@angular/common';

@Component({
template: `     ...
    <li>
      Static Image:
      <img ngSrc="/logo.svg" alt="Angular logo" width="32" height="32" />
    </li>
    <li>
      Dynamic Image:
      <img [ngSrc]="logoUrl" [alt]="logoAlt" width="32" height="32" />
    </li>
    ...
  `,
imports: [NgOptimizedImage],
})
```

### 3. Agregar los atributos width y height

Fijate que en el ejemplo de arriba cada imagen tiene los atributos `width` y `height`. Para evitar el [desplazamiento del layout (CLS)](https://web.dev/articles/cls), la directiva `NgOptimizedImage` requiere ambos atributos de tamaño en cada imagen.

En situaciones donde no podés o no querés especificar un `height` y `width` estáticos para las imágenes, podés usar [el atributo `fill`](https://v20.angular.dev/guide/image-optimization#using-fill-mode) para que la imagen se comporte como una "imagen de fondo", llenando su elemento contenedor:

```html
<!-- El contenedor div tiene 'position: "relative"' -->
<div class="image-container">
  <img ngSrc="www.example.com/image.png" fill />
</div>
```

**Nota:** para que una imagen con `fill` se renderice correctamente, su elemento padre debe estar estilizado con `position: "relative"`, `position: "fixed"` o `position: "absolute"`.

### 4. Priorizar imágenes importantes

Una de las optimizaciones más importantes para el rendimiento de carga es priorizar cualquier imagen que pueda ser el ["elemento LCP"](https://web.dev/articles/optimize-lcp), es decir, el elemento gráfico más grande en pantalla cuando la página carga. Para optimizar tus tiempos de carga, asegurate de agregar el atributo `priority` a tu "imagen hero" o a cualquier otra imagen que creas que podría ser un elemento LCP:

```html
<img ngSrc="www.example.com/image.png" height="600" width="800" priority />
```

### 5. Opcional: usar un image loader

`NgOptimizedImage` te permite especificar un [image loader](https://v20.angular.dev/guide/image-optimization#configuring-an-image-loader-for-ngoptimizedimage), que le dice a la directiva cómo formatear las URLs de tus imágenes. Usar un loader te permite definir tus imágenes con URLs cortas y relativas:

```ts
providers: [provideImgixLoader('https://my.base.url/')],
```

La URL final será 'https://my.base.url/image.png'

```html
<img ngSrc="image.png" height="600" width="800" />
```

Los image loaders no son solo una comodidad: te permiten usar todas las capacidades de `NgOptimizedImage`. Conocé más sobre estas optimizaciones y los loaders integrados para CDNs populares [acá](https://v20.angular.dev/guide/image-optimization#configuring-an-image-loader-for-ngoptimizedimage).

## Para cerrar

Al agregar esta directiva a tu flujo de trabajo, tus imágenes ahora se cargan usando las mejores prácticas con la ayuda de Angular 🎉

Si querés aprender más, mirá la [documentación de `NgOptimizedImage`](https://v20.angular.dev/guide/image-optimization). ¡Seguí con el gran trabajo y aprendamos sobre routing en la próxima lección!

Compará tu resultado con la solución en `/tutorial/11/solucion` y seguí con la [Lección 12](http://localhost:4200/tutorial/12).
