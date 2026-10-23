# Lección 10 — Vistas diferibles (Deferrable Views)

A veces, al desarrollar una aplicación, terminás con muchos componentes que necesitás referenciar en tu app, pero algunos no necesitan cargarse de inmediato por varias razones.

Quizás están por debajo del pliegue visible o son componentes pesados con los que no se interactúa hasta más adelante. En ese caso, podemos cargar algunos de esos recursos más tarde con las vistas diferibles (deferrable views).

En esta actividad vas a aprender a usar vistas diferibles para cargar de forma diferida una sección de la plantilla de tu componente.

> **Nota sobre la configuración:** la lección original configura `main.ts` y `app.config.ts` con `bootstrapApplication` y `provideRouter`. En esta app anfitriona eso ya está hecho: podés verlo en `src/main.ts` y en `src/app/app.config.ts`, así que acá solo trabajamos con los componentes.

## Cómo verla en el navegador

1. Levantá el servidor de desarrollo: `npm start`
2. Ejercicio: <http://localhost:4200/tutorial/10>
3. Solución para comparar en otra pestaña: <http://localhost:4200/tutorial/10/solucion>

## Archivo de trabajo

`src/app/tutorial/10-deferrable-views/leccion.ts`

Buscá los comentarios `<!-- TODO -->` y completalos. Al guardar, el navegador se recarga solo.

## Pasos

### 1. Agregar un bloque `@defer` alrededor del componente de comentarios

En tu app, la página del posteo del blog tiene un componente de comentarios después de los detalles del posteo.

Envolvé el componente de comentarios con un bloque `@defer` para cargarlo de forma diferida:

```html
@defer {
  <leccion-10-comments />
}
```

El código de arriba es un ejemplo de cómo usar un bloque `@defer` básico. Por defecto, `@defer` carga el componente `comments` cuando el navegador está inactivo.

### 2. Agregar un placeholder

Agregá un bloque `@placeholder` al bloque `@defer`. El bloque `@placeholder` es donde ponés el HTML que se va a mostrar antes de que empiece la carga diferida. El contenido de los bloques `@placeholder` se carga de forma eager (inmediata):

```html
@defer {
  <leccion-10-comments />
} @placeholder {
  <p>Future comments</p>
}
```

### 3. Agregar un bloque de carga (loading)

Agregá un bloque `@loading` al bloque `@defer`. El bloque `@loading` es donde ponés el HTML que se muestra _mientras_ el contenido diferido se está cargando activamente, pero todavía no terminó. El contenido de los bloques `@loading` también se carga de forma eager:

```html
@defer {
  <leccion-10-comments />
} @placeholder {
  <p>Future comments</p>
} @loading {
  <p>Loading comments...</p>
}
```

### 4. Agregar una duración mínima

Tanto las secciones `@placeholder` como `@loading` tienen parámetros opcionales para evitar el parpadeo cuando la carga ocurre muy rápido. `@placeholder` tiene `minimum` y `@loading` tiene `minimum` y `after`. Agregá una duración `minimum` al bloque `@loading` para que se renderice por al menos 2 segundos:

```html
@defer {
  <leccion-10-comments />
} @placeholder {
  <p>Future comments</p>
} @loading (minimum 2s) {
  <p>Loading comments...</p>
}
```

### 5. Agregar un disparador de viewport (viewport trigger)

Las vistas diferibles tienen varias opciones de disparadores. Agregá un disparador de viewport para que el contenido se cargue de forma diferida cuando entre en el viewport:

```html
@defer (on viewport) {
  <leccion-10-comments />
} @placeholder {
  <p>Future comments</p>
} @loading (minimum 2s) {
  <p>Loading comments...</p>
}
```

### 6. Agregar contenido

Un disparador de viewport es más útil cuando el contenido diferido está lo suficientemente abajo en la página como para tener que hacer scroll para verlo. Así que agreguemos algo de contenido a nuestro posteo del blog. Podés escribir el tuyo o copiar el contenido de abajo y ponerlo dentro del elemento `<article>`:

```html
<article>
  <p>
    Angular is my favorite framework, and this is why. Angular has the coolest deferrable view
    feature that makes defer loading content the easiest and most ergonomic it could possibly be.
    The Angular community is also filled with amazing contributors and experts that create excellent
    content. The community is welcoming and friendly, and it really is the best community out there.
  </p>
  <p>
    I can't express enough how much I enjoy working with Angular. It offers the best developer
    experience I've ever had. I love that the Angular team puts their developers first and takes
    care to make us very happy. They genuinely want Angular to be the best framework it can be, and
    they're doing such an amazing job at it, too. This statement comes from my heart and is not at
    all copied and pasted. In fact, I think I'll say these exact same things again a few times.
  </p>
  <p>
    Angular is my favorite framework, and this is why. Angular has the coolest deferrable view
    feature that makes defer loading content the easiest and most ergonomic it could possibly be.
    The Angular community is also filled with amazing contributors and experts that create excellent
    content. The community is welcoming and friendly, and it really is the best community out there.
  </p>
  <p>
    I can't express enough how much I enjoy working with Angular. It offers the best developer
    experience I've ever had. I love that the Angular team puts their developers first and takes
    care to make us very happy. They genuinely want Angular to be the best framework it can be, and
    they're doing such an amazing job at it, too. This statement comes from my heart and is not at
    all copied and pasted. In fact, I think I'll say these exact same things again a few times.
  </p>
  <p>
    Angular is my favorite framework, and this is why. Angular has the coolest deferrable view
    feature that makes defer loading content the easiest and most ergonomic it could possibly be.
    The Angular community is also filled with amazing contributors and experts that create excellent
    content. The community is welcoming and friendly, and it really is the best community out there.
  </p>
  <p>
    I can't express enough how much I enjoy working with Angular. It offers the best developer
    experience I've ever had. I love that the Angular team puts their developers first and takes
    care to make us very happy. They genuinely want Angular to be the best framework it can be, and
    they're doing such an amazing job at it, too. This statement comes from my heart and is not at
    all copied and pasted.
  </p>
</article>
```

Una vez que agregaste este código, hacé scroll hacia abajo para ver cómo el contenido diferido se carga al entrar en el viewport.

## Para cerrar

En esta actividad aprendiste a usar vistas diferibles en tus aplicaciones. ¡Gran trabajo! 🙌

Se puede hacer mucho más con ellas: otros disparadores, prefetching y bloques `@error`. Si querés saber más, mirá la [documentación de Deferrable views](https://v20.angular.dev/guide/templates/defer).

Compará tu resultado con la solución en `/tutorial/10/solucion` y seguí con la [Lección 11](http://localhost:4200/tutorial/11).
