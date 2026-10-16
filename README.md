# Pruebas Practicas — Aprendiendo Angular haciendo

Proyecto de práctica de Angular basado en el [tutorial oficial Learn Angular](https://v20.angular.dev/tutorials/learn-angular) y un set de prácticas avanzadas con temáticas de entorno laboral. Todo el código vive en este proyecto: cada ejercicio tiene sus `TODO`s para completar y una carpeta `solucion/` para comparar.

## Requisitos

- **Node.js 20 o superior** (ya incluye npm). Verificalo con `node -v`.
- **Chrome, Edge u Opera** para usar los botones de reinicio de ejercicios (necesitan la File System Access API).

## Empezar

```bash
npm install
npm start
```

Cuando termine, abrí `http://localhost:4200` en tu navegador. **No hace falta instalar Angular CLI globalmente:** el proyecto ya lo trae como dependencia.

## Cómo practicar

1. Elegí una lección del [tutorial](http://localhost:4200/tutorial) o una práctica de [las avanzadas](http://localhost:4200/extras).
2. Abrí la carpeta correspondiente en tu editor:
   - Tutorial: `src/app/tutorial/NN-tema/`
   - Prácticas: `src/app/extras/NN-tema/ejercicio/`
3. Buscá los comentarios `TODO` y completá el código. Al guardar, el navegador se recarga solo.
4. Compará tu versión con la carpeta `solucion/` (también accesible desde cada índice).

## Reiniciar un ejercicio

Cada índice tiene botones 🔄 para restaurar el **código original** de un ejercicio (o de toda una sección) con un modal de confirmación:

1. Tocá el botón 🔄 del ejercicio (o el botón general de la sección).
2. Confirmá en el modal.
3. El navegador te va a pedir **elegir la carpeta del proyecto**: seleccioná la raíz (`PruebasPractica`). Solo se pide una vez por sesión.
4. Los archivos vuelven a su estado original y el servidor de desarrollo recompila solo.

> Si tu navegador no soporta escribir archivos (Firefox, Safari), los botones aparecen deshabilitados.

## Para quien mantiene el proyecto

El estado original de los ejercicios vive en `src/app/restauracion/snapshot.ts`, un archivo **generado y versionado**: quien clone el repo ya lo recibe incluido y no necesita regenerarlo.

Regenerá el snapshot **solo si agregás o modificás ejercicios** (o cambiás sus archivos de partida), para que el punto de restauración refleje el nuevo estado original:

```bash
npm run snapshot
```

Después de regenerarlo, verificá que la app compile (`npm run build`) y commiteá el `snapshot.ts` actualizado junto con los cambios.

## Comandos útiles

| Comando | Qué hace |
|---|---|
| `npm start` | Servidor de desarrollo en `http://localhost:4200` |
| `npm run build` | Build de producción en `dist/` |
| `npm test` | Tests unitarios con Vitest |
| `npm run snapshot` | Regenera el snapshot de restauración de ejercicios |
