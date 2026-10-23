# Temario completo del curso de Angular

Este documento describe los conceptos, términos y prácticas que se aprenden en los ejercicios de `src/app/tutorial` y `src/app/extras`, a partir de sus índices, guías, ejercicios y soluciones.

El recorrido enseña a construir aplicaciones Angular por componentes y después integrar esos componentes en aplicaciones con formularios, datos, navegación, autenticación, estado compartido y pruebas.

## Organización y alcance

- **Tutorial:** 24 entradas: 23 lecciones con ejercicio y un cierre de lectura.
- **Prácticas avanzadas:** 10 ejercicios que integran los fundamentos en escenarios más completos.
- La numeración del tutorial salta del 20 al 22: actualmente no existe una lección 21.
- El tutorial toma como referencia material de Angular 20, mientras que `package.json` declara Angular 22.

Hay contenidos para implementar, configuraciones que ya vienen preparadas y temas que se presentan como lectura o desafío adicional. Las distinciones se indican cuando afectan el alcance del aprendizaje.

## Índice

1. [Fundamentos del tutorial](#fundamentos-del-tutorial)
2. [Prácticas avanzadas](#prácticas-avanzadas)
3. [Aprendizajes transversales](#aprendizajes-transversales)
4. [Profundidad y límites del curso](#profundidad-y-límites-del-curso)

## Fundamentos del tutorial

### Lección 01: anatomía de un componente

Un **componente** es una unidad de interfaz que reúne comportamiento, presentación y estilos.

Los términos principales son:

- **Clase:** contiene los datos y métodos del componente.
- **Template o plantilla:** HTML que describe su interfaz.
- **Estilos:** reglas CSS que definen su presentación.
- **Decorador `@Component`:** configura cómo Angular interpreta la clase.
- **Selector:** nombre con el que se utiliza el componente dentro de otra plantilla.
- **Metadatos:** opciones como `selector`, `imports`, `template` y `styles`.
- **Componente standalone:** declara directamente las dependencias que necesita su plantilla.

**Práctica:** modificar una interfaz comprendiendo la responsabilidad de cada parte del componente.

### Lección 02: estado e interpolación

Se aprende a declarar propiedades en la clase y mostrarlas mediante interpolación:

```html
<p>{{ city }}</p>
```

La **interpolación** evalúa una expresión y muestra su resultado como texto.

- **Estado:** datos que representan la situación actual de la interfaz.
- **Expresión de plantilla:** expresión que Angular evalúa desde el HTML.
- **Enlace de datos o data binding:** conexión entre los datos del componente y su presentación.

**Práctica:** hacer que el contenido visible dependa de las propiedades de la clase.

### Lección 03: composición de componentes

Se aprende a construir una pantalla utilizando otros componentes.

- **Componente padre:** contiene a otro componente.
- **Componente hijo:** se utiliza dentro de la plantilla del padre.
- **Árbol de componentes:** estructura formada por esas relaciones.
- **Reutilización:** uso de una misma pieza de interfaz en diferentes lugares.
- **Dependencias de plantilla:** componentes, directivas o pipes disponibles mediante `imports`.

**Práctica:** dividir una pantalla en piezas con responsabilidades concretas.

### Lección 04: renderizado condicional

Con `@if` y `@else` se muestra contenido según una condición.

- **Control de flujo:** determina qué parte de la plantilla se renderiza.
- **Condición booleana:** expresión que resulta verdadera o falsa.
- **Renderizado condicional:** creación de contenido dependiendo del estado.

**Práctica:** presentar secciones o mensajes alternativos según los datos del componente.

### Lección 05: listas e identidad

Con `@for` se generan elementos a partir de una colección:

```html
@for (user of users; track user.id) {
  <p>{{ user.name }}</p>
}
```

- **Colección:** conjunto de elementos, habitualmente representado por un array.
- **Iteración:** recorrido de los elementos de la colección.
- **Identidad:** información que permite reconocer cada elemento entre actualizaciones.
- **`track`:** expresión que permite relacionar los datos con sus vistas y reutilizarlas cuando cambia la colección.

**Práctica:** renderizar listas eficientemente como preparación para tablas y catálogos.

### Lección 06: enlace de propiedades

El **property binding** asigna el resultado de una expresión a una propiedad de un elemento o componente:

```html
<button [disabled]="isDisabled">Guardar</button>
```

- `{{ valor }}` muestra una representación textual.
- `[propiedad]="valor"` asigna el resultado a una propiedad.

**Práctica:** controlar comportamientos de la interfaz, como deshabilitar botones o habilitar edición.

### Lección 07: manejo de eventos

El **event binding** conecta un evento con una respuesta del componente:

```html
<button (click)="save()">Guardar</button>
```

- **Evento:** suceso como un clic o una entrada de texto.
- **Handler o manejador:** método que responde al evento.
- **`$event`:** información entregada por el evento.

**Práctica:** conectar una acción del usuario con un método y una actualización del estado.

### Lección 08: comunicación del padre al hijo

Con `input()` se reciben datos desde otro componente.

Un **input** forma parte de la API pública del componente: define qué información puede proporcionar quien lo usa.

Se practica:

- Declarar una entrada.
- Pasarle valores desde el padre.
- Leerla en la plantilla del hijo.
- Parametrizar un componente para reutilizarlo.

**Aplicación:** una tarjeta que recibe un producto o un editor que recibe un empleado.

### Lección 09: comunicación del hijo al padre

Con `output()` se emiten eventos personalizados.

- **Output:** comunica que ocurrió algo, como agregar un elemento o confirmar una edición.
- **Emisión:** anuncio del evento mediante `.emit()`.
- **Payload:** información que acompaña al evento.
- **Contrato del componente:** entradas que recibe y eventos que puede emitir.

**Práctica:** el hijo comunica una intención y el padre decide cómo responder.

### Lección 10: carga diferida de vistas

Con `@defer` se pospone la carga de partes de la interfaz.

- **Vista diferible:** contenido cuya carga puede demorarse.
- **Trigger o disparador:** condición que inicia la carga.
- **Viewport:** área visible de la página.
- **`@placeholder`:** contenido anterior al inicio de la carga.
- **`@loading`:** contenido presentado durante la carga.
- **Duración mínima:** tiempo mínimo de visualización de ciertos estados para evitar parpadeos.

**Práctica:** decidir qué contenido necesita estar disponible inicialmente y cuál puede esperar.

### Lección 11: optimización de imágenes

Con `NgOptimizedImage` se aprende a usar `ngSrc`, declarar dimensiones y priorizar imágenes relevantes.

- **Dimensiones reservadas:** ayudan a evitar desplazamientos del contenido mientras carga la imagen.
- **Prioridad de carga:** identifica imágenes importantes para la presentación inicial.
- **Image loader:** mecanismo para construir URLs de imágenes; se presenta como opción adicional.

**Práctica:** mejorar el rendimiento y la estabilidad visual mediante decisiones sobre las imágenes.

### Lecciones 12, 13 y 14: navegación y rutas

Se aprende a mostrar distintas pantallas a partir de la URL.

- **Router:** sistema de navegación de Angular.
- **Ruta:** configuración que relaciona una URL con una pantalla.
- **`Routes`:** tipo para declarar la configuración de rutas.
- **`provideRouter()`:** registra el sistema de navegación.
- **`RouterOutlet`:** lugar donde se renderiza la pantalla correspondiente.
- **`RouterLink`:** directiva para navegar desde una plantilla.
- **`title`:** título asociado a una ruta.
- **SPA:** aplicación que permite navegar entre vistas sin recargar un documento completo en cada navegación interna.

**Práctica:** comprender la configuración de navegación, definir rutas y conectar enlaces con pantallas. Parte de la configuración ya viene preparada.

### Lecciones 15 y 16: formularios basados en plantillas

Se aprende el enfoque **template-driven** con `FormsModule` y `ngModel`:

```html
<input [(ngModel)]="name" />
```

El **enlace bidireccional** permite que el valor de la clase aparezca en el campo y que las modificaciones del campo actualicen ese valor.

Se practica:

- Vincular un control con una propiedad.
- Mostrar su valor actual.
- Consultarlo desde un método.
- Relacionar la interacción del usuario con el estado del componente.

Estas lecciones permiten conocer este enfoque antes de pasar a los formularios definidos desde TypeScript.

### Lección 17: formularios reactivos

Se aprende a construir explícitamente el modelo del formulario en código.

- **`FormControl`:** representa un campo y su estado.
- **`FormGroup`:** agrupa controles.
- **`ReactiveFormsModule`:** incorpora las directivas necesarias.
- **`[formGroup]`:** conecta el formulario HTML con su modelo.
- **`formControlName`:** conecta un campo con un control del grupo.
- **`ngSubmit`:** permite manejar el envío.

**Práctica:** definir la estructura del formulario en TypeScript, conectarla con la vista y procesar sus valores.

### Lección 18: validación de formularios

Se declaran restricciones mediante `Validators` y se consulta la validez del formulario.

Se trabaja con:

- Campos obligatorios.
- Validación de formato, como correo electrónico.
- Estados `valid` e `invalid`.
- Habilitación o deshabilitación del envío según la validez.

**Práctica:** distinguir entre recibir un dato y aceptar que cumple las reglas requeridas.

### Lecciones 19 y 20: servicios e inyección de dependencias

Se aprende a extraer responsabilidades de los componentes y ubicarlas en servicios.

- **Servicio:** clase que encapsula una responsabilidad, como acceder a datos.
- **`@Injectable`:** permite configurar su participación en la inyección de dependencias.
- **Provider o proveedor:** indica cómo obtener una dependencia.
- **Inyector:** mecanismo que resuelve y entrega dependencias.
- **`inject()`:** solicita una dependencia.
- **`providedIn: 'root'`:** registra el servicio en el inyector raíz para compartir su instancia dentro de ese ámbito.

**Práctica:** permitir que el componente se concentre en la interfaz y delegue otras tareas.

### Lecciones 22, 23 y 24: transformación de datos con pipes

Un **pipe** transforma la presentación de un valor:

```html
{{ amount | currency }}
```

Se trabaja con:

- **`LowerCasePipe`:** representación en minúsculas.
- **`DecimalPipe`:** formato numérico.
- **`DatePipe`:** formato de fechas.
- **`CurrencyPipe`:** formato monetario.
- **Parámetros:** opciones para configurar la transformación.
- **`@Pipe`:** decorador para definir un pipe propio.
- **`transform()`:** método que implementa la transformación.

**Práctica:** reutilizar transformaciones de presentación y mantener simples las plantillas.

### Lección 25: próximos pasos

Es un cierre de lectura con recursos para continuar aprendiendo. No incorpora un ejercicio técnico adicional.

## Prácticas avanzadas

### Práctica 01: comunicación entre componentes y bus de eventos

Amplía la comunicación entre varios niveles de componentes: página, tabla y fila.

Se aprende:

- **`model()`:** entrada con actualización bidireccional.
- **`[(cantidad)]`:** enlace bidireccional de un componente propio.
- **Convención `cantidad` / `cantidadChange`:** contrato equivalente expresado mediante entrada y salida.
- **Bus de eventos:** servicio que distribuye eventos entre componentes.
- **`Subject`:** fuente RxJS a la que se envían valores mediante `.next()`.
- **`Observable`:** interfaz para consumir una secuencia de eventos.
- **`asObservable()`:** expone la escucha sin exponer directamente el `Subject`.
- **`takeUntilDestroyed()`:** termina una suscripción al destruir su contexto.

La práctica desarrolla el **desacoplamiento**: una fila informa una intención sin conocer cómo la procesará la página. La página conserva el estado y centraliza sus actualizaciones.

[Guía de la práctica 01](src/app/extras/01-comunicacion-y-bus-eventos/README.md).

### Práctica 02: formularios reactivos avanzados

Profundiza en los estados de los controles y en la presentación de errores.

| Término | Significado |
|---|---|
| `touched` | El control fue marcado como visitado; normalmente ocurre al perder el foco. |
| `dirty` | El usuario modificó su valor desde la interfaz. |
| `invalid` | Alguna validación está fallando. |
| `errors` | Información estructurada de las validaciones que fallaron. |

Se aprende a decidir cuándo mostrar un error para no presentar todos los errores antes de la interacción del usuario.

También se crea un **validador personalizado parametrizable**:

- **`ValidatorFn`:** contrato de una función de validación.
- **`ValidationErrors`:** estructura que describe los errores.
- **`null`:** indica que ese validador no encontró un error.
- **Factoría de validadores:** función que recibe configuración y devuelve un validador.

El ejemplo de dominios de correo prohibidos enseña a separar responsabilidades: un validador comprueba el dominio y otro puede encargarse de que el campo sea obligatorio.

[Guía de la práctica 02](src/app/extras/02-formularios-reactivos-avanzados/README.md).

### Práctica 03: HTTP y manejo de errores

Se aprende a consumir una API desde un servicio.

- **API:** interfaz para solicitar operaciones o datos.
- **Endpoint:** dirección de una operación concreta.
- **`HttpClient`:** cliente HTTP de Angular.
- **GET:** petición para consultar datos.
- **`HttpHeaders`:** cabeceras o metadatos de la petición.
- **`HttpParams`:** parámetros de consulta.
- **Respuesta tipada:** declaración del tipo de datos esperado; no implica validar automáticamente los datos recibidos en ejecución.
- **`HttpErrorResponse`:** representación de un fallo HTTP.
- **`catchError`:** operador para tratar errores del flujo.
- **`throwError`:** crea un observable que comunica un error.

Se practica el tratamiento de errores **404**, cuando un recurso no existe, y **500**, cuando falla el servidor. También se integran estados de carga, datos disponibles y error.

La aplicación incluye un **backend falso**, implementado con un interceptor, que permite practicar peticiones y fallos sin necesitar un servidor real.

Código de referencia: [servicio resuelto](src/app/extras/03-http-client-y-manejo-errores/solucion/empleados.service.ts) y [backend falso](src/app/extras/backend-falso.ts).

### Práctica 04: autenticación, autorización y sesión

Se distinguen dos conceptos:

- **Autenticación:** identificar al usuario.
- **Autorización:** decidir qué puede hacer ese usuario.

Se trabaja con:

- Inicio y cierre de sesión.
- Credenciales.
- JWT simulado.
- **Payload:** contenido del token.
- Persistencia en `localStorage`.
- Restauración de la sesión.
- Roles `admin` y `user`.
- Cabecera `Authorization` con esquema `Bearer`.
- **Interceptor funcional:** procesa peticiones en un lugar compartido.
- **Guard:** decide si una navegación puede continuar.
- **`CanActivateFn`:** contrato de un guard de activación.
- **`UrlTree` y `createUrlTree()`:** representan el destino de una redirección.

Se distinguen los errores:

- **401:** falta una autenticación válida.
- **403:** el usuario está identificado, pero no tiene permiso suficiente.

El alcance es una simulación del flujo de autenticación en el cliente. El token del ejercicio no implementa una firma criptográfica real. Los permisos efectivos de una aplicación con servidor deben verificarse también en ese servidor.

[Guía de la práctica 04](src/app/extras/04-auth-jwt-guards-interceptors/README.md).

### Práctica 05: CRUD, filtrado, paginación y modales

**CRUD** significa:

- **Create:** crear.
- **Read:** consultar.
- **Update:** actualizar.
- **Delete:** eliminar.

También aparece **ABM**: altas, bajas y modificaciones.

Se integran:

- Listados y filtrado local.
- Paginación.
- Selección de registros.
- Alta y edición.
- Precarga de formularios.
- Confirmación de eliminación.
- Apertura y cierre de modales.
- Comunicación con `input()` y `output()`.

En formularios se trabaja con:

- **`setValue()`:** asignación que exige respetar la estructura completa del control.
- **`patchValue()`:** actualización parcial.
- **`getRawValue()`:** lectura que incluye controles deshabilitados.
- **`reset()`:** reinicio del formulario.

Se practica **estado derivado**: la lista filtrada y la página visible se calculan a partir de los datos y controles actuales.

La solución utiliza un `effect()` para sincronizar el empleado recibido con el formulario del modal. El servicio funciona como almacenamiento en memoria.

[Guía de la práctica 05](src/app/extras/05-crud-interactivo-con-modales/README.md).

### Práctica 06: RxJS y asincronía

Se aprende a controlar una secuencia de eventos que produce operaciones asincrónicas.

- **Asincronía:** operaciones cuyos resultados llegan después.
- **Stream o flujo:** secuencia de valores producidos en el tiempo.
- **Observable:** representación de una secuencia a la que se puede suscribir un consumidor.
- **Suscripción:** vínculo mediante el que se reciben emisiones y notificaciones.
- **Operador:** función que transforma o controla un flujo.
- **Pipeline:** composición de operadores mediante `.pipe()`.

El buscador integra:

| Operador | Función en el ejercicio |
|---|---|
| `debounceTime()` | Espera una pausa en la escritura antes de emitir. |
| `distinctUntilChanged()` | Evita repetir valores consecutivos iguales. |
| `switchMap()` | Cambia a la búsqueda más reciente y abandona la suscripción anterior. |
| `tap()` | Ejecuta acciones sin transformar el valor emitido. |
| `takeUntilDestroyed()` | Finaliza la suscripción al destruir el componente. |

La comparación entre `switchMap` y `mergeMap` introduce las **condiciones de carrera**: una respuesta vieja podría llegar después y reemplazar resultados recientes. `mergeMap` permite concurrencia; `switchMap` conserva la suscripción interna correspondiente a la última emisión de su fuente.

También se explican:

- **Observable frente a Promise:** secuencias de emisiones frente al resultado único de una promesa.
- **Cold:** la ejecución de la fuente se inicia por suscripción; los observables de `HttpClient` son el ejemplo del curso.
- **Hot:** los consumidores escuchan una fuente compartida, como el `Subject` del buscador.
- **`shareReplay`:** permite compartir una suscripción y reproducir emisiones recientes según su configuración.
- **`toSignal()` y `toObservable()`:** puentes entre signals y RxJS.
- **Fugas de memoria:** recursos o suscripciones que permanecen activos más allá de su uso previsto.
- Estados de carga, vacío y error mediante signals.

Parte de estos temas aparece como lectura o desafío adicional. La recuperación después de un error depende de dónde y cómo se gestione el error dentro del flujo.

[Guía de la práctica 06](src/app/extras/06-rxjs-y-asincronia/README.md).

### Práctica 07: ruteo avanzado

Se aprende a utilizar la URL como parte del estado de la aplicación.

- **Parámetro de ruta:** identifica un recurso, como `:id`.
- **Query parameter:** representa opciones como filtros o pestañas.
- **`withComponentInputBinding()`:** permite recibir información de la ruta mediante inputs.
- **`Router.navigate()`:** navegación desde TypeScript.
- **`RouterLink`:** navegación declarada en la plantilla.
- **`RouterLinkActive`:** aplica estilos cuando un enlace está activo.
- **Ruta comodín `**`:** captura URLs que no coincidieron con rutas anteriores.
- **Rutas hijas:** organizan pantallas dentro de otra ruta.
- **Layout:** estructura visual compartida por varias pantallas.
- **`canMatch`:** participa en la decisión de si una configuración de ruta puede coincidir; si devuelve `false`, se pueden considerar otras rutas.
- **Lazy loading:** carga diferida mediante `loadComponent`.
- **Chunk:** archivo generado que puede descargarse por separado.

Se practica `linkedSignal()`: los filtros pueden actualizarse desde la URL y seguir siendo editables por el usuario.

La habilidad principal es construir pantallas cuyos filtros y selección puedan representarse en un enlace y restaurarse al navegar.

[Guía de la práctica 07](src/app/extras/07-ruteo-avanzado/README.md).

### Práctica 08: Angular Material y experiencia de usuario

Se reconstruye una pantalla de gestión con componentes de Angular Material.

- **`MatTable`:** tabla con columnas declarativas.
- **`MatPaginator`:** control de paginación.
- **`PageEvent`:** información de un cambio de página.
- **`MatDialog`:** apertura de diálogos.
- **`MAT_DIALOG_DATA`:** entrada de datos al diálogo.
- **`MatDialogRef`:** referencia para interactuar con el diálogo.
- **`close()`:** cierre con resultado.
- **`afterClosed()`:** recepción del resultado del cierre.
- **`MatSnackBar`:** notificación temporal.
- Acción **Deshacer**.
- **`MatError`:** presentación de errores de validación.

Se establece un contrato: el diálogo recibe datos y devuelve una decisión o un resultado.

También hay lectura sobre accesibilidad, animaciones y **design systems**: criterios compartidos para mantener consistentes los componentes y estilos. Se discute cuándo conviene utilizar Material y cuándo desarrollar componentes propios.

[Guía de la práctica 08](src/app/extras/08-angular-material/README.md).

### Práctica 09: estado compartido con NgRx

Se aprende a gestionar estado mediante un flujo explícito:

```text
Interacción → Acción → Reducer → Estado → Selector → Interfaz
```

- **Store:** contenedor del estado.
- **Action:** descripción de algo que ocurrió o se solicita.
- **Payload:** datos de la acción.
- **Dispatch:** envío de una acción.
- **Reducer:** función que calcula el estado siguiente.
- **Función pura:** depende de sus entradas y no introduce efectos secundarios.
- **Inmutabilidad:** crear nuevos valores en lugar de modificar los existentes.
- **Selector:** función que obtiene datos del estado.
- **Memoización:** reutilización de resultados cuando las entradas relevantes no cambian.
- **Feature:** agrupación de una porción del estado y su configuración.

Se trabaja con `createAction`, `props`, `createFeature`, `createSelector`, `store.dispatch()` y `store.select()`.

También se practica:

- Convertir selecciones del store a signals mediante `toSignal()`.
- Guardar un identificador seleccionado y resolver el objeto al consultar.
- Compartir estado entre pantallas.
- Registrar proveedores en rutas y razonar sobre el alcance del estado.
- Inspeccionar acciones con Redux DevTools.
- Consultar estados anteriores mediante **time travel**.
- Evaluar cuándo NgRx resulta útil y cuándo basta con estado local.

Los **NgRx Effects** se presentan como teoría: no están implementados como ejercicio ni instalados en el proyecto. Son distintos de `effect()` de Angular y se utilizan para coordinar efectos secundarios dentro del flujo de acciones de NgRx.

[Guía de la práctica 09](src/app/extras/09-ngrx-store/README.md).

### Práctica 10: testing

Se aprende a verificar comportamiento mediante pruebas automatizadas.

- **Test unitario:** prueba de una unidad concreta.
- **Suite:** agrupación de pruebas.
- **Caso de prueba:** escenario individual.
- **Aserción:** comprobación de un resultado esperado.
- **Preparación y limpieza:** configuración anterior y posterior a cada caso.
- **Aislamiento:** control de dependencias para obtener pruebas predecibles.
- **Stub:** sustituto simple de una dependencia.

El runner es **Vitest**. Se usan `describe`, `it`, `expect`, `beforeEach` y `afterEach`.

Para las pruebas HTTP:

- **`TestBed`:** entorno de pruebas e inyección de Angular.
- **`provideHttpClientTesting()`:** backend HTTP de pruebas.
- **`HttpTestingController`:** inspección y control de peticiones.
- **`expectOne()`:** búsqueda de una petición esperada.
- **`flush()`:** respuesta simulada.
- **`error()`:** fallo simulado.
- **`verify()`:** comprobación de peticiones pendientes en el controlador.

Se prueban métodos HTTP, parámetros, cabeceras, respuestas y transformación de errores.

También se escriben pruebas puras para validadores, incluyendo **casos límite**, como un valor exactamente igual al mínimo permitido. Se busca comprobar el contrato y la regla de negocio evitando depender innecesariamente del texto de los mensajes.

Aunque el título menciona componentes, los ejercicios de escritura se concentran en los specs del servicio HTTP y del validador. Los stubs de servicios para probar componentes se explican como criterio de elección.

[Guía de la práctica 10](src/app/extras/10-testing-http-componentes/README.md).

## Aprendizajes transversales

### Reactividad con signals

En especial en las prácticas avanzadas se trabaja con:

- **`signal()`:** representa un valor reactivo.
- **`.set()`:** reemplaza su valor.
- **`.update()`:** calcula el siguiente valor desde el anterior.
- **`computed()`:** representa información derivada.
- **`linkedSignal()`:** combina dependencia reactiva con actualización explícita.
- **`effect()`:** ejecuta una reacción ante cambios de las señales que lee.

La distinción central es **estado fuente frente a estado derivado**. Por ejemplo, los productos y el texto de búsqueda son datos fuente; los productos filtrados se calculan a partir de ellos.

### TypeScript aplicado

El curso ejercita:

- Interfaces para representar entidades.
- Tipos unión para roles y categorías.
- Tipos genéricos, como `Observable<Empleado[]>`.
- Valores opcionales y `null`.
- Propiedades `readonly`.
- Visibilidad `private` y `protected`.
- Funciones y callbacks.
- Spread y operaciones como `map`, `filter`, `slice` y `reduce`.
- Aserciones de tipo al leer eventos del DOM.

Es aprendizaje de TypeScript en contexto; no constituye un temario exhaustivo del lenguaje.

### Arquitectura y mantenibilidad

Se repiten estas prácticas:

- Mantener responsabilidades concretas.
- Separar interfaz, acceso a datos y modelos.
- Diseñar contratos de componentes.
- Centralizar las actualizaciones del estado.
- Derivar información en lugar de duplicarla.
- Reutilizar validadores y transformaciones.
- Usar actualizaciones inmutables.
- Limpiar suscripciones.
- Representar estados vacíos y errores.
- Comparar una implementación propia con una solución comentada.

### Interfaz y estilos

Hay exposición a:

- Variables CSS como tokens visuales.
- Temas claro y oscuro.
- Estados de foco.
- Etiquetas de formularios.
- Feedback de carga, éxito y error.
- Confirmación de acciones.
- Accesibilidad en diálogos y controles.

Son prácticas para construir interfaces utilizables. La revisión del código por sí sola no demuestra el cumplimiento de una auditoría completa de accesibilidad.

### Método de aprendizaje

La estructura del curso permite:

1. Leer la guía y reconocer el objetivo.
2. Identificar los archivos de trabajo.
3. Completar la lógica marcada con `TODO` o los casos `it.todo`.
4. Observar el comportamiento de la aplicación o ejecutar las pruebas.
5. Verificar los criterios de aceptación.
6. Comparar con la solución comentada.
7. Restaurar el ejercicio para repetir la práctica.

Este método desarrolla lectura de código, implementación guiada, comprobación de resultados y comparación de alternativas.

## Profundidad y límites del curso

El recorrido va desde una introducción a Angular hasta una base intermedia amplia, con introducción a temas avanzados.

Al completar y comprender las prácticas se trabajan las piezas necesarias para construir una aplicación de gestión:

- Navegación.
- Formularios validados.
- Listados y tablas.
- Filtros y paginación.
- Modales y diálogos.
- Comunicación con APIs.
- Sesión y permisos en el cliente.
- Estado compartido.
- Pruebas unitarias.

Conviene distinguir lo que aparece en las instrucciones de desarrollo de lo que tiene ejercicios concretos. En estas carpetas no hay ejercicios específicos implementados de `resource()`, `httpResource()`, Signal Forms o streaming con resources.

Tampoco se desarrolla un backend real, autenticación criptográfica completa, SSR e hidratación o pruebas de extremo a extremo.

El aprendizaje integrador es decidir dónde debe vivir cada responsabilidad: qué pertenece al componente, qué se comunica mediante eventos, qué se delega a un servicio, qué conviene calcular, qué debe estar en la URL y qué necesita un store compartido.
