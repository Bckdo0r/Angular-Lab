# Revisión de la etapa 1

Sesión: 2026-10-23. Alcance: revisar y reforzar el material existente antes de
incorporar funcionalidades del plan de ampliación.

Se revisaron **24 lecciones y 10 prácticas**: 33 ejercicios con solución y una
actividad de lectura. La numeración del tutorial salta de 20 a 22; no falta una
actividad local 21. El inventario se contrastó con las carpetas, guías, índices,
rutas y estados iniciales de restauración.

Las resoluciones personales de las lecciones 01 a 09 se preservaron. La revisión
del punto de partida de esas actividades usó el snapshot anterior, no las respuestas
que estaban en los archivos de trabajo.

## Inventario del tutorial

Las rutas de ejercicio son `http://localhost:4200/tutorial/NN`; las soluciones
agregan `/solucion`, excepto la 25. Cada enlace de la tabla abre la guía con las URLs
concretas. Los archivos de trabajo son relativos a la carpeta de esa guía.

| Lección y guía | Archivo de trabajo | Alcance |
|---|---|---|
| [01 — Componentes](src/app/tutorial/01-componentes/README.md) | `leccion.ts` | Plantilla y estilos |
| [02 — Clase del componente](src/app/tutorial/02-clase-del-componente/README.md) | `leccion.ts` | Propiedades e interpolación |
| [03 — Composición](src/app/tutorial/03-componer-componentes/README.md) | `leccion.ts` | Componente hijo e imports |
| [04 — Condicionales](src/app/tutorial/04-control-flow-if/README.md) | `leccion.ts` | `@if` y `@else` |
| [05 — Listas](src/app/tutorial/05-control-flow-for/README.md) | `leccion.ts` | `@for` y `track` |
| [06 — Propiedades](src/app/tutorial/06-property-binding/README.md) | `leccion.ts` | Propiedades del DOM |
| [07 — Eventos](src/app/tutorial/07-event-handling/README.md) | `leccion.ts` | Eventos y método del componente |
| [08 — Inputs](src/app/tutorial/08-input/README.md) | `user.ts`, `leccion.ts` | Datos del padre al hijo |
| [09 — Outputs](src/app/tutorial/09-output/README.md) | `child.ts`, `leccion.ts` | Eventos del hijo al padre |
| [10 — Vistas diferidas](src/app/tutorial/10-deferrable-views/README.md) | `leccion.ts` | `@defer`, viewport y estados alternativos |
| [11 — Imágenes](src/app/tutorial/11-optimizando-imagenes/README.md) | `user.ts` | `NgOptimizedImage`; el paso 5 es opcional |
| [12 — Router](src/app/tutorial/12-enable-routing/README.md) | `leccion.ts` | Solo el paso 3 se implementa; 1 y 2 son lectura |
| [13 — Rutas](src/app/tutorial/13-define-a-route/README.md) | `src/app/app.routes.ts` | Agregar hijas sin reemplazar el shell |
| [14 — Navegación](src/app/tutorial/14-routerlink/README.md) | `leccion.ts` | Cambiar `href` por `routerLink` |
| [15 — Formularios de plantilla](src/app/tutorial/15-forms/README.md) | `user.ts` | Reconocer `ngModel` y comparar enfoques |
| [16 — Valores](src/app/tutorial/16-form-control-values/README.md) | `user.ts` | Leer el valor del control |
| [17 — Formularios reactivos](src/app/tutorial/17-reactive-forms/README.md) | `leccion.ts` | Grupo, controles y envío |
| [18 — Validación](src/app/tutorial/18-forms-validation/README.md) | `leccion.ts` | Validadores y estado del botón |
| [19 — Servicio](src/app/tutorial/19-injectable-service/README.md) | `car.service.ts` | Registrar el provider raíz |
| [20 — Inyección](src/app/tutorial/20-inject-based-di/README.md) | `leccion.ts` | `inject(Leccion20CarService)` |
| [22 — Pipes](src/app/tutorial/22-pipes/README.md) | `leccion.ts` | Importar y aplicar un pipe |
| [23 — Parámetros de pipes](src/app/tutorial/23-pipes-format-data/README.md) | `leccion.ts` | Número, fecha y moneda |
| [24 — Pipe propio](src/app/tutorial/24-create-a-pipe/README.md) | `reverse.pipe.ts`, `leccion.ts` | Decorador y transformación |
| [25 — Próximos pasos](src/app/tutorial/25-next-steps/README.md) | `leccion.ts`, de consulta | Solo lectura; sin solución |

## Inventario de prácticas

Las rutas son `http://localhost:4200/extras/NN` y `/extras/NN/solucion`. Los archivos
de trabajo de la tabla son relativos a cada carpeta de práctica.

| Práctica y guía | Archivos de trabajo | Lectura y extensiones |
|---|---|---|
| [01 — Comunicación](src/app/extras/01-comunicacion-y-bus-eventos/README.md) | `ejercicio/selector-cantidad.ts`, `notificaciones-bus.ts`, `producto-fila.ts`, `productos-page.ts` dentro de `ejercicio/` | Tabla y modelos ya preparados; pregunta final opcional |
| [02 — Formularios](src/app/extras/02-formularios-reactivos-avanzados/README.md) | `ejercicio/registro-page.ts`, `ejercicio/validadores/dominios-prohibidos.ts` | Plantilla y estilos preparados; reflexión final opcional |
| [03 — HTTP](src/app/extras/03-http-client-y-manejo-errores/README.md) | `ejercicio/empleados.service.ts`, `ejercicio/empleados-page.ts` | Modelos y backend de lectura; paso 1 es reconocimiento |
| [04 — Autenticación](src/app/extras/04-auth-jwt-guards-interceptors/README.md) | `ejercicio/auth.service.ts`, `auth.guard.ts`, `auth.interceptor.ts`, `login-page.ts`, `admin-page.ts` dentro de `ejercicio/` | Rutas y simulador de lectura |
| [05 — CRUD](src/app/extras/05-crud-interactivo-con-modales/README.md) | `ejercicio/empleados-page.ts`, `ejercicio/modal-editor.ts` | Servicio compartido completo; infraestructura de foco ya preparada |
| [06 — RxJS](src/app/extras/06-rxjs-y-asincronia/README.md) | `ejercicio/buscador-page.ts` | Servicio completo; variante con `toSignal` opcional |
| [07 — Rutas avanzadas](src/app/extras/07-ruteo-avanzado/README.md) | `ejercicio/listado-page.ts`, `detalle-page.ts`, `panel-layout.ts`, `rol.guard.ts` dentro de `ejercicio/` | Pasos 1 y 8 de lectura; experimento del comodín en una copia |
| [08 — Material](src/app/extras/08-angular-material/README.md) | `ejercicio/abm-page.ts`, `abm-page.html`, `dialogo-editor.ts`, `dialogo-editor.html` dentro de `ejercicio/` | Servicio y confirmación completos; secciones ★ de lectura |
| [09 — NgRx](src/app/extras/09-ngrx-store/README.md) | `visor.store.ts`, `ejercicio/visor-page.ts` | Acciones, ayuda y teoría de effects de lectura; DevTools y mutación experimental opcionales |
| [10 — Testing](src/app/extras/10-testing-http-componentes/README.md) | `ejercicio/productos-api.service.spec.ts`, `ejercicio/validadores.spec.ts` | Producción y demo completas; paso 6 de lectura |

Los pasos numerados de implementación constituyen la consigna de cada actividad.
Los apartados que se identifican como opcionales, desafíos o lectura no añaden TODO
obligatorios. Esta revisión no impone todavía la plantilla común de la etapa 2.

## Hallazgos y ajustes

| Hallazgo | Ajuste realizado |
|---|---|
| Faltaban las guías de extras 03 y tutorial 25 | Se agregaron con archivos, enlaces y alcance concreto |
| Los ejemplos de tutorial 10 y 11 usaban un selector o una imagen ajenos a estos archivos | Se alinearon con `leccion-10-comments` y `/tut-logo.svg` |
| Node 20 aparecía como requisito en el índice | Se alineó con Angular 22 y el README raíz |
| Los enlaces `home` de los ejercicios 12 y 14 terminaban en 404 | Se registraron las rutas hijas que faltaban |
| La guía 13 perdía el shell, no registraba `home` y usaba imports estáticos | Se conservó `loadComponent`, se explicaron las rutas relativas y se alineó la consigna con el menú |
| Tutorial 19 fallaba antes de completar la tarea | La inyección opcional muestra una indicación sin resolver el registro del servicio |
| Tutorial 20 tenía una plantilla inicial vacía y una guía con otro nombre de servicio | Se agregó una indicación y se usó el identificador real |
| Los imports preparados en tutorial 12 y 23 producían advertencias | Importarlos pasó a formar parte explícita de los pasos pendientes |
| La solución 04 dependía del interceptor incompleto del ejercicio | Se registró un cliente HTTP propio en la ruta de solución, incluido su servicio |
| El payload de login usaba `sub`, pero el perfil leía `usuario`; la expiración no se comprobaba | Se alineó el contrato simulado, se validaron campos y vigencia, y se diferenciaron los fallos 401/403 |
| La explicación de JWT confundía decodificar con validar | Se documentó que el simulador no tiene firma verificable ni autorización real del servidor |
| El buscador 06 dejaba de escuchar después de un error | Se capturó el error dentro de `switchMap` y se corrigió también la variante con `toSignal` |
| La guía 06 pedía ver solicitudes simuladas en Network | Se explicó cómo instrumentar consultas sin tráfico real y cuándo ocurre la cancelación tras el debounce |
| Las pistas 07 leían inputs en el constructor y usaban el ID inexistente 7 | Se orientó a `linkedSignal`/`computed` y a una ficha existente, ID 3 |
| Las guías confundían `canMatch`, `canActivate`, carga de componentes y comodines | Se corrigieron las explicaciones en guías y comentarios |
| Se afirmaba que salir de NgRx destruía siempre el inyector | Se documentó la conservación actual y la opción explícita de limpieza de Angular 22.2 |
| Borrar la última fila podía dejar una página inválida en 05 y 08 | Se ajusta la página derivando sus límites con `linkedSignal` |
| Borrar, crear y deshacer en 08 podía repetir IDs | Los nuevos IDs no reutilizan los borrados |
| El modal propio no gestionaba foco ni Escape | Se agregó `CdkTrapFocus`, nombre del diálogo y cierre por teclado en ambas versiones |
| La demo HTTP 10 no tenía endpoint simulado de productos | Se agregó la consulta local con filtro y búsqueda por ID |
| La guía 10 confundía errores de servidor/red y el alcance de `verify()` | Se corrigieron guía y comentarios; la referencia usa `flush` con status 500 |
| La práctica 10 anunciaba tests de componentes que no proponía | El título y la descripción indican HTTP y validadores; los componentes quedan para la ampliación prevista |
| El reinicio interactivo usaba la API de callbacks con `await` | Se cambió a `node:readline/promises` y se probó confirmar y cancelar |
| No estaban activadas las comprobaciones estrictas | Se habilitaron `strict` y `strictTemplates` |

También se aclaró la diferencia entre propiedades DOM y atributos, el uso comparativo
de los formularios de plantilla y el carácter opcional de los recursos de cierre.
La solución del evento `mouseover` ofrece un botón para teclado, y los campos de la
lección 18 tienen etiquetas visibles. No se cambiaron las respuestas personales.

## Errores intencionales y simplificaciones

- Los TODO continúan sin resolver en los estados iniciales. Botones sin lógica,
  guards que devuelven `true` y `it.todo` son parte de la consigna, no soluciones.
- El reporte de extras 03 devuelve 500 deliberadamente; pedir el legajo 999 produce
  404. El `EMPTY` provisional del servicio puede dejar una carga pendiente mientras
  se completa el ejercicio. La solución informa los errores y permite otra consulta.
- Extras 03 estudia llamadas independientes: no coordina acciones HTTP simultáneas.
  Su guía explicita ese límite; el flujo continuo y su cancelación están en extras 06.
- Extras 04 usa base64 convencional y una firma de texto fijo. Sus datos y permisos
  son alterables desde el navegador. La API real y verificación del servidor pertenecen
  a la etapa 4. El vencimiento se comprueba al leer/guardar o consultar, sin temporizador de cierre.
- Los datos CRUD de 05 y 08 se comparten entre ejercicio y solución en la misma
  ejecución, pero no sobreviven a una recarga. El estado NgRx de 09 también está en
  memoria; sus dos variantes tienen stores separados.
- En 06, `switchMap` recibe el texto después del debounce. Reintentar exactamente el
  mismo texto y reproducir fallos desde la UI quedan para la práctica 11 prevista.
- En 07 se eligió un único comodín global; Angular también admite comodines anidados.
- Tutorial 24 invierte unidades de texto de JavaScript; los emojis compuestos y
  grafemas quedan fuera del ejemplo, que usa una frase simple.
- El reinicio de tutorial 13 incluye el archivo global de rutas completo. La guía y
  el README raíz indican guardar antes otros cambios personales de ese archivo.

## Comprobaciones

- Inventario estructural: 34 guías, registros en índices, rutas de ejercicio/solución
  y archivos de trabajo revisados; sin referencias locales faltantes detectadas.
- Compilación de producción con modo estricto: correcta, sin advertencias Angular.
- Compilación de una copia con las lecciones 01–09 restauradas a sus TODO iniciales:
  correcta, sin advertencias Angular.
- Pruebas automatizadas: 30 aprobadas y 8 `todo` de la práctica 10 conservados.
  Las regresiones cubren rutas reales, login y panel independientes del ejercicio,
  filtros y pestañas, estado NgRx, errores/cancelación del buscador, paginación e IDs.
- Navegador Chrome sin interfaz visible: las 67 rutas de actividad/solución se abrieron
  en ambos temas, sin excepciones. Se comprobaron también foco y Escape en el modal,
  borrado de la última fila paginada de Material y aparición de comentarios con
  `@defer`: 140 comprobaciones aprobadas en total.
- Snapshot generado con `npm run snapshot` desde una copia de mantenimiento sin
  respuestas personales: 34 actividades y 152 archivos. No se generó desde los
  ejercicios resueltos del espacio de trabajo.
- Restauración global en esa copia: se alteraron los 152 archivos registrados y se
  comprobaron sus contenidos exactos tras `restore -- todo --force`. La solución de
  referencia quedó intacta. También se probó `--dry-run` y la confirmación interactiva
  con «n» y «s».
- Las huellas SHA-256 de los 11 archivos con respuestas personales se conservaron.

La revisión del navegador comprueba renderizado y los casos indicados; no equivale
a automatizar todas las combinaciones de uso del curso. La auditoría AXE completa,
el recorrido desde una instalación limpia y la verificación integral de extremo a
extremo siguen en la etapa 6. Los artefactos temporales están en `tmp/` y no se versionan.

## Referencias técnicas consultadas

Se contrastaron las explicaciones con la versión instalada (Angular 22.2) y estas
fuentes oficiales. Las guías antiguas de Angular 20 se conservan como procedencia del tutorial.

- [Versiones compatibles](https://angular.dev/reference/versions).
- [Guards y autorización del servidor](https://angular.dev/guide/routing/route-guards).
- [Inputs desde datos de rutas](https://angular.dev/guide/routing/common-router-tasks).
- [Jerarquía de inyectores](https://angular.dev/guide/di/hierarchical-dependency-injection).
- [Limpieza opcional de inyectores](https://angular.dev/api/router/withAutoCleanupInjectors).
- [Pruebas de HTTP](https://angular.dev/guide/http/testing).
- [Operador catchError](https://rxjs.dev/api/operators/catchError), contrastado también
  con RxJS 7.8 instalado y las pruebas de recuperación/cancelación.

## Continuidad

La etapa 1 queda preparada para la evaluación del usuario. El siguiente trabajo,
después de esa revisión, es la etapa 2: acordar y aplicar la plantilla de guías y
mejorar la información del recorrido. No se creó la práctica 11 ni se incorporó
seguimiento de progreso o una API real en esta sesión.
