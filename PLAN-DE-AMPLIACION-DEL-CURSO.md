# Plan de ampliación del curso de Angular

## Objetivo

Ampliar el curso para pasar de ejercicios guiados a la resolución autónoma de funcionalidades: diseñar, implementar, probar y explicar las decisiones de una aplicación Angular.

Este documento es una hoja de trabajo. Las casillas permiten registrar el avance; no indican que las funcionalidades ya estén implementadas.

## Recorridos previstos

| Recorrido | Objetivo | Contenido |
|---|---|---|
| Tutorial | Comprender los fundamentos | Lecciones actuales |
| Prácticas avanzadas | Profundizar herramientas y problemas concretos | Ejercicios actuales y nuevas prácticas |
| Proyecto profesional | Integrar conocimientos y tomar decisiones | Proyecto por entregas con ayudas progresivas |

## Estado general

- [x] Etapa 1: revisar y reforzar el material actual.
- [ ] Etapa 2: mejorar la experiencia de aprendizaje.
- [ ] Etapa 3: agregar prácticas avanzadas enfocadas.
- [ ] Etapa 4: preparar una API para el aprendizaje.
- [ ] Etapa 5: crear el proyecto profesional.
- [ ] Etapa 6: integrar y verificar el recorrido completo.

Las etapas agrupan el trabajo por objetivo. Se pueden entregar partes de distintas etapas siguiendo el [orden de implementación recomendado](#orden-de-implementación-recomendado).

**Modalidad acordada para estas sesiones:** completar las etapas en orden, de a una,
y detenerse para que el usuario evalúe el resultado antes de pasar a la siguiente.
El orden de entregas combinadas del final queda como referencia, sujeto a este acuerdo.

## Etapa 1: revisar y reforzar el material actual

**Objetivo:** disponer de una base confiable antes de extender el curso.

### Tareas

- [x] Inventariar las lecciones de `src/app/tutorial` y las prácticas de `src/app/extras`.
- [x] Comprobar que cada guía coincida con los archivos, rutas, ejercicio y solución actuales.
- [x] Revisar las explicaciones de rutas, autenticación y ciclo de vida del estado.
- [x] Contrastar las afirmaciones técnicas dudosas con documentación oficial de la versión utilizada.
- [x] Identificar errores intencionales y distinguirlos de limitaciones de las soluciones.
- [x] Aclarar qué contenido es obligatorio, opcional o solo de lectura.
- [x] Verificar que los ejercicios con lógica incompleta compilen y se rendericen.
- [x] Registrar los ajustes necesarios y resolverlos en cambios pequeños.

### Criterios de finalización

- [x] Las consignas, archivos de trabajo y enlaces son consistentes.
- [x] Las soluciones no presentan como resuelto un comportamiento que todavía falla.
- [x] Las simplificaciones didácticas están explicadas.
- [x] La compilación termina sin errores ni advertencias nuevas.
- [x] Se actualizaron los snapshots de los ejercicios modificados.

**Resultado esperado:** material actual consistente y listo para servir como base de las ampliaciones.

### Lecciones nuevas para el tutorial

El tutorial actual sigue el recorrido de Angular 20. Quedan fuera conceptos que el proyecto ya
usa (señales, `linkedSignal`, zoneless, OnPush) y que no aparecen en ninguna lección.

- [ ] Incorporar una lección sobre el modelo de cambio de detección: por qué la aplicación corre
      zoneless, qué significa OnPush en Angular 22 y por qué mutar un array puede dejar la vista
      congelada.
- [ ] Incorporar una lección sobre señales como estado: `signal`, `computed`, `linkedSignal` y
      `effect`, con el criterio de cuándo usar cada una.
- [ ] Explicar en las lecciones nuevas por qué el ejemplo funciona, no solo cómo se escribe.
- [ ] Registrar las lecciones nuevas en el índice del tutorial, en el temario y en el snapshot.

### Tooling de calidad y verificación automática

Hoy el material se verifica a mano. Con más prácticas y más entregas, esa verificación manual deja
de ser viable: hace falta que el propio repositorio detecte los errores.

- [x] Configurar ESLint 9 con `@angular-eslint` para TypeScript y para plantillas.
- [x] Adoptar reglas que detecten errores reales de Angular y no criterios de estilo discutibles.
- [x] Verificar que el linter distingue el código de las consignas del código de las soluciones.
- [x] Activar `typeCheckHostBindings` en `angularCompilerOptions`.
- [x] Agregar los scripts de lint y de verificación al `package.json` y documentarlos en el README.
- [x] Configurar un flujo de verificación automática que ejecute compilación, pruebas y linting.
- [x] Comprobar que la verificación automática falla a propósito ante una alteración en un ejercicio.

### Notas y decisiones

Revisión realizada el 2026-10-23. El [informe de la etapa 1](REVISION-ETAPA-1.md)
incluye el inventario de 24 lecciones y 10 prácticas, los hallazgos, sus correcciones,
los límites didácticos y las fuentes oficiales consultadas.

- Se preservaron los 11 archivos con resoluciones personales de las lecciones 01 a 09.
- Se corrigieron guías faltantes, enlaces, consignas de routing, autenticación,
  recuperación del buscador, ciclo de vida del estado y explicaciones de testing.
- Se reforzaron paginación, identificadores al deshacer, acceso por teclado y
  renderizado de los estados iniciales. Se activaron TypeScript y plantillas estrictas.
- Compilación sin advertencias Angular, 30 pruebas aprobadas y 8 tareas de testing
  conservadas como `todo`; 140 comprobaciones de navegador en ambos temas.
- Snapshot generado en una copia con los ejercicios sin resolver: 34 actividades,
  152 archivos. Restauración completa e interacción de confirmación verificadas.
- El resultado queda pendiente de evaluación del usuario antes de iniciar la etapa 2.

_Decisión (2026-10-23):_ se incorporan a esta etapa dos bloques nuevos —lecciones nuevas y tooling
de calidad— porque son el punto de partida del material que se va a ampliar. El tooling no espera a
la API ni al proyecto profesional, de modo que puede adelantarse sin bloquear el resto del plan.

_Decisión (2026-10-23, tooling):_ el linter quedó configurado con una distinción explícita entre
consignas y soluciones: en las consignas los imports sin usar son el andamiaje del ejercicio y solo
generan avisos, mientras que en el material resuelto son errores. El formateo con Prettier queda
disponible como herramienta manual (`npm run format`) pero **no** se verifica de forma automática:
más de cien archivos nunca se pasaron por Prettier y aplicarlo de golpe mezclaría el formato con
los cambios de contenido. Conviene hacerlo en un cambio propio y aparte.

## Etapa 2: mejorar la experiencia de aprendizaje

**Objetivo:** ayudar a identificar qué estudiar, en qué orden y cómo comprobar lo aprendido.

### Plantilla común de las guías

- [ ] Preparar una guía modelo y aplicarla primero a una actividad.
- [ ] Incorporar progresivamente la estructura a las demás guías.

| Sección | Propósito |
|---|---|
| Qué vas a aprender | Definir resultados concretos |
| Conocimientos previos | Indicar qué conviene completar antes |
| Problema que resuelve | Explicar el propósito del concepto |
| Consigna | Describir el comportamiento esperado |
| Pistas progresivas | Ayudar sin entregar inmediatamente la solución |
| Errores frecuentes | Enseñar a reconocer problemas |
| Criterios de aceptación | Permitir comprobar el resultado |
| Preguntas de comprensión | Evaluar el criterio |
| Desafío opcional | Ofrecer una extensión para profundizar |

### Funcionalidades de la página

- [ ] Mostrar dificultad y conocimientos previos por actividad.
- [ ] Distinguir ejercicios, desafíos y lecturas.
- [ ] Incorporar estados manuales: pendiente, en curso y completado.
- [ ] Persistir el progreso en el navegador.
- [ ] Manejar datos de progreso ausentes o inválidos sin bloquear la página.
- [ ] Mostrar el recorrido recomendado.
- [ ] Dar acceso al [temario completo](TEMARIO-COMPLETO-DEL-CURSO.md) desde la aplicación mediante una presentación apropiada para la web.
- [ ] Aclarar que marcar una actividad como completada es un registro personal y no una evaluación automática.

### Criterios de finalización

- [ ] El estudiante puede identificar su siguiente actividad y sus requisitos.
- [ ] El progreso se conserva al recargar la página.
- [ ] La interfaz funciona cuando no hay progreso guardado.
- [ ] Las ayudas permiten avanzar gradualmente antes de consultar la solución.
- [ ] Los controles son utilizables con teclado en ambos temas.

**Resultado esperado:** un recorrido comprensible y una forma sencilla de registrar el avance.

### Notas y decisiones

_Registrar aquí el formato elegido para las guías y las decisiones sobre el progreso._

## Etapa 3: agregar prácticas avanzadas enfocadas

**Objetivo:** profundizar problemas reales que requieren más que completar una llamada a una API.

### Práctica 11: asincronía resistente a errores

- [ ] Preparar un buscador que permita reproducir un fallo controlado.
- [ ] Enseñar recuperación de errores dentro del flujo RxJS.
- [ ] Mantener la cancelación de búsquedas anteriores.
- [ ] Incorporar reintento explícito cuando corresponda.
- [ ] Explicar la diferencia entre tratar un error y terminar una suscripción.

**Aceptación:** una búsqueda falla y una búsqueda posterior funciona sin recargar la página. Una respuesta anterior no reemplaza el resultado vigente.

### Práctica 12: datos con resources

- [ ] Verificar las APIs de `resource()` y `httpResource()` en la versión utilizada.
- [ ] Preparar una consulta con estados de carga, datos y error.
- [ ] Separar los valores que se editan de los que disparan la consulta.
- [ ] Incorporar reintento mediante la API del resource.
- [ ] Explicar cuándo utilizar resources y cuándo resulta útil un flujo RxJS.

**Aceptación:** la consulta se dispara cuando corresponde, muestra estados coherentes y permite reintentar después de un fallo.

### Práctica 13: escrituras y sincronización

- [ ] Implementar el ejercicio de creación, edición y eliminación.
- [ ] Evitar envíos duplicados mientras hay una operación pendiente.
- [ ] Actualizar los datos visibles después de una operación exitosa.
- [ ] Mantener o recuperar un estado coherente cuando la operación falla.
- [ ] Explicar la estrategia elegida para sincronizar la interfaz con los datos.

**Aceptación:** la interfaz queda consistente después de éxito o fallo, y un doble clic no produce dos operaciones equivalentes.

### Práctica 14: testing de componentes

- [ ] Preparar servicios sustitutos para aislar componentes.
- [ ] Probar el bloqueo del envío de un formulario inválido.
- [ ] Probar eventos emitidos por un componente.
- [ ] Probar estados de carga, error y reintento.
- [ ] Evitar pruebas que dependan innecesariamente de detalles internos.

**Aceptación:** las pruebas verifican comportamiento observable y detectan cambios que rompen el contrato del componente.

### Práctica 15: diagnóstico y refactorización

- [ ] Preparar una aplicación parcialmente funcional con fallos reproducibles.
- [ ] Incluir un problema de suscripción o ciclo de vida.
- [ ] Incluir un problema de estado o filtros de navegación.
- [ ] Incluir un problema de recuperación después de un error.
- [ ] Proponer la separación de un componente con demasiadas responsabilidades.
- [ ] Pedir la explicación de la causa y la comprobación de cada corrección.

**Aceptación:** el estudiante reproduce el fallo, identifica su causa, lo corrige y demuestra el comportamiento esperado.

### Práctica 16: criterio de elección

El curso usa signals, RxJS, NgRx y el resource API en distintas prácticas, pero nunca pide
justificar cuál corresponde. Esta práctica cierra ese hueco: la decisión es el ejercicio.

- [ ] Presentar el mismo problema resuelto con dos herramientas distintas.
- [ ] Explicar los criterios de elección: quién es el dueño del dato, cuándo hay un flujo de eventos
      y cuándo hace falta una fuente de verdad compartida.
- [ ] Pedir que el estudiante justifique qué usaría en cada caso y qué descartaría.
- [ ] Incluir el caso límite en que dos opciones son válidas y hay que argumentar.
- [ ] Recalcar la regla de oro: un solo dueño del estado por dato.

**Aceptación:** el estudiante elige una herramienta para cada escenario, explica por qué descarta
las otras y defiende la decisión ante un criterio nuevo.

### Convenciones para cada práctica

- [ ] Crear una carpeta numerada en `src/app/extras/`.
- [ ] Agregar un `README.md` con pasos, archivos de trabajo y enlaces locales.
- [ ] Mantener archivos compartidos en la raíz de la práctica.
- [ ] Crear `ejercicio/` con tareas sin resolver que compilen.
- [ ] Crear `solucion/` con explicación didáctica.
- [ ] Registrar las rutas mediante carga diferida.
- [ ] Agregar la entrada al índice de prácticas.
- [ ] Verificar ejercicio y solución en ambos temas.
- [ ] Ejecutar `npm run snapshot` y verificar la restauración.
- [ ] Ejecutar `npm run build` y las pruebas que correspondan.

**Resultado esperado:** seis prácticas que desarrollan recuperación, sincronización, pruebas, diagnóstico y criterio de elección.

### Notas y decisiones

_Registrar aquí el alcance definitivo y los escenarios de cada práctica._

_Decisión (2026-10-23):_ se agrega la práctica 16 para cubrir el criterio de elección entre
signals, RxJS, NgRx y resources, que hasta ahora quedaba implícito en el material existente.

## Etapa 4: preparar una API para el aprendizaje

**Objetivo:** practicar integración real con un entorno reproducible, manteniendo el foco del estudiante en Angular.

La API se entrega preparada para ejecutar. Aprender a desarrollar el servidor no es un requisito de esta etapa.

### Funcionalidades

- [ ] Definir y documentar el contrato de la API.
- [ ] Proporcionar usuarios y sesión.
- [ ] Permitir consultas con filtros y paginación.
- [ ] Permitir alta, edición y eliminación.
- [ ] Persistir los datos.
- [ ] Validar entradas en el servidor.
- [ ] Verificar permisos en el servidor.
- [ ] Proporcionar datos iniciales.
- [ ] Incorporar un mecanismo documentado de reinicio de datos.

### Modo didáctico

- [ ] Permitir simular respuestas lentas.
- [ ] Permitir provocar fallos controlados.
- [ ] Permitir reproducir sesiones vencidas.
- [ ] Permitir reproducir rechazos de validación.
- [ ] Documentar cómo activar y desactivar cada escenario.

### Integración con el curso

- [ ] Explicar cómo iniciar y comprobar la API.
- [ ] Indicar qué actividades usan simulación y cuáles requieren servidor.
- [ ] Documentar configuración y solución de problemas de arranque.
- [ ] Explicar la diferencia entre validación del cliente y del servidor.
- [ ] Explicar la diferencia entre leer un token y verificarlo.
- [ ] Mantener credenciales privadas y secretos fuera del código compilado para el navegador.

### Criterios de finalización

- [ ] Los datos sobreviven a una recarga del navegador.
- [ ] Las operaciones respetan permisos verificados por el servidor.
- [ ] Los errores de validación pueden presentarse en la interfaz.
- [ ] Se puede volver al estado inicial siguiendo la guía.
- [ ] El entorno puede iniciarse desde una instalación limpia.

**Resultado esperado:** una API local lista para las actividades que requieren persistencia y permisos reales.

### Notas y decisiones

_Elegir aquí la tecnología del servidor, la persistencia y el contrato definitivo antes de implementarlos._

## Etapa 5: crear el proyecto profesional

**Objetivo:** integrar los conocimientos con menos instrucciones sobre cómo implementar cada parte.

### Proyecto propuesto

Sistema de gestión de solicitudes internas.

**Entidades iniciales:** usuario, solicitud, categoría, estado y responsable.

**Roles iniciales:** solicitante y administrador.

### Entregas

| Entrega | Funcionalidad | Decisiones del estudiante |
|---|---|---|
| 1. Diseño inicial | Modelo, pantallas y navegación | División de componentes y estructura |
| 2. Consulta | Listado, detalle, filtros y paginación | Estado en URL y estado local |
| 3. Formularios | Alta y edición con validación | Reutilización y mensajes de error |
| 4. Integración | API y persistencia | Actualización de datos y recuperación |
| 5. Permisos | Sesión y operaciones según rol | Navegación y manejo de rechazos |
| 6. Calidad | Pruebas de componentes y un recorrido completo | Comportamientos que conviene probar |
| 7. Entrega | Compilación, configuración y publicación | Preparación de una aplicación utilizable |

### Preparación del proyecto

- [ ] Definir el alcance mínimo para evitar un proyecto demasiado grande.
- [ ] Escribir las reglas de negocio y permisos de cada rol.
- [ ] Definir el contrato con la API de la etapa 4.
- [ ] Decidir la ubicación del proyecto y su registro en la navegación.
- [ ] Definir cómo guardar o restaurar el punto de partida de las entregas.
- [ ] Preparar datos de ejemplo y escenarios de error.

### Material de cada entrega

- [ ] Escribir una consigna funcional con criterios de aceptación.
- [ ] Explicitar conocimientos previos.
- [ ] Preparar pistas de diseño e implementación.
- [ ] Preparar una solución de referencia comentada.
- [ ] Explicar decisiones y alternativas válidas.
- [ ] Incluir una lista de comprobación manual o automatizada apropiada.

### Niveles de ayuda

1. **Consigna:** describe qué debe hacer la funcionalidad.
2. **Pistas:** orientan decisiones sin entregar inmediatamente la implementación.
3. **Referencia:** muestra una implementación y explica sus decisiones.

El estudiante no tiene que reproducir exactamente los archivos de la solución para considerar correcta su entrega. Se evalúan el comportamiento, la mantenibilidad y la justificación de las decisiones.

### Seguimiento de entregas

- [ ] Entrega 1: diseño inicial.
- [ ] Entrega 2: consulta.
- [ ] Entrega 3: formularios.
- [ ] Entrega 4: integración.
- [ ] Entrega 5: permisos.
- [ ] Entrega 6: calidad.
- [ ] Entrega 7: preparación y publicación.

### Criterios de finalización

- [ ] El proyecto permite completar el recorrido principal de principio a fin.
- [ ] Los errores previstos tienen una respuesta comprensible en la interfaz.
- [ ] Los permisos se respetan en el servidor.
- [ ] Hay pruebas de componentes y al menos un recorrido de extremo a extremo.
- [ ] Se documenta cómo instalar, ejecutar, probar y preparar la aplicación para su publicación.
- [ ] La referencia explica las decisiones sin presentar una única organización de archivos como obligatoria.

**Resultado esperado:** una práctica que permita demostrar autonomía además de conocimiento de las APIs.

### Notas y decisiones

_Registrar aquí el alcance, los permisos y las decisiones de organización del proyecto._

## Etapa 6: integrar y verificar el recorrido completo

**Objetivo:** presentar las ampliaciones como un curso coherente y comprobar que se pueden utilizar de principio a fin.

### Integración en la página

- [ ] Mostrar los tres recorridos: tutorial, prácticas y proyecto profesional.
- [ ] Mostrar los requisitos de cada actividad.
- [ ] Mostrar el progreso por recorrido.
- [ ] Incorporar las entregas del proyecto profesional.
- [ ] Dar acceso a guías, pistas y soluciones.
- [ ] Presentar las instrucciones para ejecutar pruebas y API.
- [ ] Mostrar los criterios de finalización.

### Verificación final

- [ ] Ejecutar `npm run build` sin errores ni advertencias nuevas.
- [ ] Comprobar que los ejercicios incompletos compilan y se muestran.
- [ ] Comprobar las soluciones funcionales.
- [ ] Revisar temas claro y oscuro.
- [ ] Revisar navegación por teclado y accesibilidad; ejecutar comprobaciones AXE cuando el entorno lo permita.
- [ ] Ejecutar las pruebas correspondientes a las funcionalidades incorporadas.
- [ ] Ejecutar `npm run snapshot` para los ejercicios creados o modificados.
- [ ] Verificar que la restauración recupera el estado inicial esperado.
- [ ] Comprobar el recorrido completo desde una instalación limpia.
- [ ] Actualizar el temario y la documentación de arranque.
- [x] Ejecutar el linter y las reglas de plantilla sin errores.
- [x] Confirmar que la verificación automática corre en cada cambio y falla ante una alteración real.

**Resultado esperado:** una ampliación integrada, documentada y comprobable.

### Notas y decisiones

_Registrar aquí incidencias de integración y comprobaciones pendientes._

## Orden de implementación recomendado

Este orden permite obtener mejoras utilizables sin esperar a completar todas las etapas.

| Orden | Entrega de trabajo | Etapas relacionadas |
|---|---|---|
| 1 | Revisar el material y definir la plantilla común de guías | 1 y 2 |
| 2 | Incorporar el temario y la información del recorrido | 2 |
| 3 | Crear la práctica 11 de recuperación de errores | 3 |
| 4 | Agregar seguimiento de progreso | 2 |
| 5 | Crear las prácticas 12 y 13 de datos y escrituras | 3 |
| 6 | Crear las prácticas 14 y 15 de pruebas y diagnóstico | 3 |
| 7 | Preparar la API | 4 |
| 8 | Incorporar el proyecto profesional por entregas | 5 |
| 9 | Completar la integración y verificación del recorrido | 6 |

La API es necesaria antes de completar las entregas de integración y permisos del proyecto profesional. Su consigna y diseño inicial pueden prepararse antes.

El tooling de calidad de la etapa 1 no depende de ninguna otra entrega y puede adelantarse en cualquier momento. Conviene cerrarlo antes de crear las prácticas nuevas: a partir de la etapa 3, el volumen de ejercicios y soluciones hace inviable la verificación manual.

## Primera entrega concreta

- [x] Revisar el material actual y registrar los ajustes necesarios.
- [ ] Preparar una guía modelo.
- [ ] Crear la práctica 11: asincronía resistente a errores.
- [ ] Verificar que una búsqueda posterior a un fallo sigue funcionando.
- [ ] Comprobar ejercicio, solución, compilación y restauración.

Esta entrega permite validar el formato didáctico y el nivel de profundidad antes de extenderlos al resto del curso.

## Registro de sesiones de trabajo

### Sesión: 2026-10-23

- Etapa o entrega trabajada: etapa 1 completa, preparada para evaluación.
- Tareas completadas: inventario, contraste de guías/código, correcciones de las
  inconsistencias detectadas y comprobación de los estados iniciales.
- Archivos modificados: guías y componentes indicados en `REVISION-ETAPA-1.md`,
  rutas, simulador HTTP, regresiones, configuración estricta, restaurador y snapshot.
- Comprobaciones realizadas: build del espacio de trabajo y de una copia sin
  respuestas, pruebas automatizadas, navegador en ambos temas y restauración exacta.
- Decisiones tomadas: preservar las respuestas personales y mantener las etapas
  posteriores sin iniciar hasta que el usuario evalúe esta entrega.
- Problemas pendientes: no se detectaron bloqueos de la etapa 1 en los casos
  comprobados. AXE completo e instalación limpia siguen previstos en la etapa 6.
- Próximo paso concreto: evaluar la etapa 1; después, comenzar la etapa 2.

Copiar esta plantilla para dejar una continuidad clara entre sesiones:

```md
### Sesión: AAAA-MM-DD

- Etapa o entrega trabajada:
- Tareas completadas:
- Archivos modificados:
- Comprobaciones realizadas:
- Decisiones tomadas:
- Problemas pendientes:
- Próximo paso concreto:
```
