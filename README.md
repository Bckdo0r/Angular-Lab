# Angular Lab

Laboratorio local para aprender Angular mediante ejercicios guiados. Incluye un tutorial para construir las bases del framework y prácticas avanzadas con escenarios inspirados en el trabajo cotidiano.

El proyecto corre con **Angular 22.2**. El recorrido inicial está basado en [Learn Angular](https://v20.angular.dev/tutorials/learn-angular), la guía oficial de Angular v20.

## Contenidos

- [Qué vas a encontrar](#qué-vas-a-encontrar)
- [Requisitos](#requisitos)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Cómo practicar](#cómo-practicar)
- [Mantener el repositorio actualizado](#mantener-el-repositorio-actualizado)
- [Reiniciar ejercicios](#reiniciar-ejercicios)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Comandos disponibles](#comandos-disponibles)
- [Mantenimiento del snapshot](#mantenimiento-del-snapshot)

## Qué vas a encontrar

### Tutorial de Angular

Lecciones para aprender componentes, plantillas, control de flujo, comunicación entre componentes, routing, formularios, servicios y pipes.

### Prácticas avanzadas

Ejercicios sobre comunicación con RxJS, formularios reactivos, `HttpClient`, autenticación con JWT, guards, CRUD, Angular Material, NgRx, rutas avanzadas y testing.

Cada ejercicio tiene una salida visible en el navegador, archivos de trabajo con comentarios `TODO` y una solución para comparar. La salida se modifica editando el código desde un editor; el servidor de desarrollo actualiza la vista al guardar.

**Stack principal:** Angular 22.2, TypeScript 6, RxJS 7.8, Angular Material, NgRx y Vitest.

## Requisitos

- **Node.js:** 22.22.3 o superior dentro de la rama 22.x, 24.15.0 o superior dentro de la rama 24.x, o 26.0.0 o superior. Son las ramas admitidas por Angular 22.
- **npm:** 11.19.0, indicado en `package.json` como gestor del proyecto.
- Un editor de código, por ejemplo VS Code o WebStorm.
- Un navegador moderno. Si el navegador bloquea el acceso al portapapeles, el comando de reinicio que muestra la app se puede copiar manualmente.

Podés revisar las versiones instaladas con:

```bash
node -v
npm -v
```

## Instalación y ejecución

Cloná el repositorio, instalá las dependencias y levantá el servidor:

```bash
git clone https://github.com/Bckdo0r/Angular-Lab.git
cd Angular-Lab
npm install
npm start
```

Abrí [http://localhost:4200](http://localhost:4200). El servidor permanece activo en la terminal y recompila la app al guardar cambios. No hace falta instalar Angular CLI globalmente: el proyecto incluye su propia versión como dependencia.

## Cómo practicar

1. **Elegí un recorrido:** si estás empezando con Angular, seguí el [tutorial](http://localhost:4200/tutorial) en orden. Si ya conocés el framework, podés empezar por las [prácticas avanzadas](http://localhost:4200/extras).
2. **Abrí un ejercicio** desde su índice y revisá la salida en el navegador. La solución está disponible para comparar.
3. **Editá el código en tu editor.** Cada ejercicio incluye un `README.md` con los archivos de trabajo y los pasos a seguir; buscá los comentarios `TODO`.
4. **Guardá los cambios** y volvé a la salida del navegador para ver el resultado.

Para evitar conflictos al actualizar el repositorio, modificá los archivos de trabajo indicados por cada `README.md`. Cambiá archivos compartidos o de configuración solo cuando una consigna lo pida expresamente.

## Mantener el repositorio actualizado

Antes de actualizar, revisá el estado de tu copia local:

```bash
git status
```

Si tenés cambios que querés conservar, guardalos con un commit o una copia de seguridad antes de ejecutar:

```bash
git pull
```

Git suele integrar sin problemas cambios en archivos distintos. Si tanto tu trabajo como la actualización modifican el mismo archivo, puede pedirte resolver un conflicto. Si el pull actualizó `package.json` o `package-lock.json`, detené el servidor, ejecutá `npm install` y volvé a iniciarlo con `npm start`.

## Reiniciar ejercicios

Los botones de reinicio **copian el comando correspondiente** al portapapeles; no modifican archivos directamente desde el navegador. Pegá el comando en una terminal abierta en la raíz del proyecto (la carpeta que contiene `package.json`) y ejecutalo. El script pide confirmación antes de sobrescribir archivos.

```bash
npm run restore -- tutorial/03  # Reiniciar un ejercicio del tutorial
npm run restore -- extras/01    # Reiniciar una práctica
npm run restore -- tutorial     # Reiniciar todo el tutorial
npm run restore -- extras       # Reiniciar todas las prácticas
npm run restore -- todo         # Reiniciar todos los ejercicios
```

Opciones útiles:

```bash
npm run restore -- --list                  # Ver las claves disponibles
npm run restore -- extras/01 --dry-run     # Revisar los archivos sin modificarlos
npm run restore -- extras/01 --force       # Omitir la confirmación interactiva
```

## Estructura del proyecto

```text
src/app/
├── compartido/       Componentes reutilizables
├── tutorial/         Lecciones numeradas y sus soluciones
├── extras/           Prácticas avanzadas, ejercicios y soluciones
└── restauracion/     Servicio, comandos y snapshot de restauración
scripts/
├── generar-snapshot.mjs
└── restaurar.mjs
```

Los archivos compartidos por el ejercicio y la solución de una práctica viven en la carpeta principal de esa práctica; el código incompleto y la solución están en `ejercicio/` y `solucion/`, respectivamente.

## Comandos disponibles

| Comando | Descripción |
| --- | --- |
| `npm start` | Inicia el servidor de desarrollo en `http://localhost:4200`. |
| `npm run build` | Genera la compilación de producción en `dist/AngularLab`. |
| `npm run watch` | Compila en modo desarrollo y observa cambios. |
| `npm test` | Ejecuta las pruebas con Vitest. Para una ejecución única: `npm test -- --watch=false`. |
| `npm run snapshot` | Regenera el snapshot de los ejercicios. |
| `npm run restore -- <clave>` | Restaura ejercicios desde la terminal. |

## Mantenimiento del snapshot

El estado original de los ejercicios se guarda en `src/app/restauracion/snapshot.ts`, un archivo generado y versionado. Regeneralo cuando agregues o modifiques ejercicios o sus archivos iniciales:

```bash
npm run snapshot
npm run build
```

Incluí el `snapshot.ts` actualizado en el mismo cambio. El generador excluye las carpetas `solucion/`.
