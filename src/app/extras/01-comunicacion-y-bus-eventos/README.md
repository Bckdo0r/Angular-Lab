# Práctica 01 — Comunicación entre componentes y Bus de Eventos

> **Guía modelo del curso.** Esta actividad usa la plantilla completa de guías:
> qué vas a aprender, conocimientos previos, problema que resuelve, consigna,
> pistas progresivas, errores frecuentes, criterios de aceptación, preguntas de
> comprensión y desafío opcional.

## Cómo hacer la práctica

1. Levantá el servidor: `npm start`
2. Ejercicio: <http://localhost:4200/extras/01>
3. Solución para comparar en otra pestaña: <http://localhost:4200/extras/01/solucion>
4. Archivos de trabajo: `src/app/extras/01-comunicacion-y-bus-eventos/ejercicio/` — buscá los comentarios `// TODO:` y completalos. Al guardar, el navegador se recarga solo.

## Qué vas a aprender

Al terminar vas a poder:

- **Reemplazar el par `input()` + `output()` por un enlace bidireccional con `model()`**, y explicar qué deja de hacer falta.
- **Publicar y recibir eventos entre componentes que no se conocen entre sí** con un `Subject` y `asObservable()`.
- **Cerrar suscripciones con `takeUntilDestroyed()`** para no filtrar memoria.
- **Decidir quién es el dueño del estado** (el abuelo) y quién solo notifica intenciones (el nieto).

## Conocimientos previos

- [Lección 08 — Inputs: comunicación padre → hijo](http://localhost:4200/tutorial/08): cómo un padre le pasa datos a un hijo.
- [Lección 09 — Outputs: comunicación hijo → padre](http://localhost:4200/tutorial/09): cómo un hijo le avisa al padre.
- [Lección 19 — Crear un servicio inyectable](http://localhost:4200/tutorial/19): un servicio con `providedIn: 'root'` es una única instancia compartida por toda la app.

Si te falta alguno, andá a esa lección primero: esta práctica los usa a diario.

## Problema que resuelve

En aplicaciones reales, la jerarquía de componentes se parece a una empresa: una **página** (abuelo) renderiza una **tabla** (hijo) que renderiza **filas** (nietos). El problema clásico: ¿cómo hace el nieto para avisarle al abuelo "eliminá este producto" sin tener que pasar un `output()` por cada nivel intermedio? Ese encadenamiento manual se llama **prop drilling** y convierte a los componentes intermedios en mensajeros inútiles.

En esta práctica resolvés ese problema de dos formas, ambas estándar en **Angular 22** (el proyecto usa 22.2):

1. **Enlace bidireccional personalizado** con `model()`: el estándar moderno para que un componente hijo pueda escribir un valor que el padre también controla (reemplaza al par `input()` + `output('xChange')`).
2. **Bus de eventos desacoplado** con RxJS: un servicio con un `Subject` que cualquier componente puede usar para emitir y escuchar, sin conocerse entre sí.

### 1. Enlace bidireccional personalizado: `model()`

Antes (y todavía válido) se hacía con el par input/output, donde el output **debe** llamarse igual que el input + `Change`:

```ts
// El par clásico
cantidad = input(1);
cantidadChange = output<number>();

incrementar() {
  this.cantidadChange.emit(this.cantidad() + 1);
}
```

Desde Angular v20 el estándar es `model()`: es un input de **lectura y escritura** que ya trae el output integrado:

```ts
// Con model() — el padre usa <selector-cantidad [(cantidad)]="miSignal" />
cantidad = model(1);

incrementar() {
  this.cantidad.update((v) => v + 1); // el padre se entera solo
}
```

### 2. Bus de eventos con `Subject` y `Observable`

Un `Subject` es a la vez Observable y observador: quien llama `.next(valor)` **emite**, y todos los suscriptos con `.subscribe()` **reciben** al instante. Como el servicio se declara `providedIn: 'root'`, todos los componentes comparten la **misma instancia**: lo que emite el nieto lo escucha el abuelo, aunque estén a tres niveles de distancia.

```ts
@Injectable({ providedIn: 'root' })
export class NotificacionesBus {
  private readonly eventos = new Subject<EventoBus>();       // la emisora (privada)
  readonly eventos$ = this.eventos.asObservable();           // el dial (solo escuchar)

  notificarProductoEliminado(id: number, nombre: string): void {
    this.eventos.next({ tipo: 'eliminado', id, nombre });    // emitir
  }
}
```

Por convención, las propiedades observables se nombran con el sufijo `$`. Se exponen con `asObservable()` para que nadie externo pueda emitir: los métodos del servicio son la única "radio autorizada".

### 3. Suscribirse sin memory leaks: `takeUntilDestroyed()`

Toda suscripción manual debe cerrarse cuando el componente muere. La forma limpia es el operador de `@angular/core/rxjs-interop`:

```ts
constructor() {
  this.bus.eventos$
    .pipe(takeUntilDestroyed())   // se desuscribe solo al destruirse el componente
    .subscribe((evento) => { /* actualizar signals acá */ });
}
```

### 4. El abuelo actualiza signals, no hace DOM

El abuelo es el dueño del estado (`signal<Producto[]>`); los nietos solo **notifican intenciones**. Eso mantiene la lógica de negocio en un solo lugar y los componentes reutilizables.

## Consigna

Abrí la página del ejercicio (<http://localhost:4200/extras/01>) y verificá primero el estado "roto": la tabla se ve y los botones no hacen nada, y el selector suma pero no se sincroniza con el abuelo.

- [ ] **Paso 1 — `selector-cantidad.ts`:** reemplazá el par `input()` + `output()` por un único `cantidad = model(1)` y simplificá `incrementar()` / `decrementar()` usando `this.cantidad.update(...)`. *Test rápido: el selector de la sección "Carrito" ya debería reflejar el valor en el texto "elegidas".*
- [ ] **Paso 2 — `notificaciones-bus.ts`:** implementá `notificarProductoAgregado()` emitiendo `{ tipo: 'agregado', id, nombre, cantidad }` con `this.eventos.next(...)`.
- [ ] **Paso 3 — `notificaciones-bus.ts`:** implementá `notificarProductoEliminado()` emitiendo `{ tipo: 'eliminado', id, nombre }`.
- [ ] **Paso 4 — `producto-fila.ts` (el nieto):** completá `agregar()` (Paso 4a) y `eliminar()` (Paso 4b) llamando a los métodos del bus inyectado. Fijate que el componente **no tiene outputs**: esa es la gracia.
- [ ] **Paso 5 — `productos-page.ts` (el abuelo):** completá el cuerpo del `.subscribe()` dentro del constructor: con un `switch (evento.tipo)`, en `'agregado'` sumá la cantidad al signal `carrito` y en `'eliminado'` filtrá el producto del signal `productos`. En ambos casos agregá el mensaje correspondiente a las `notificaciones` (máximo 5, con el más nuevo primero).
- [ ] **Paso 6:** probá los criterios de aceptación de abajo.

## Pistas progresivas

**Nivel 1 — si no sabés por dónde empezar.** En `selector-cantidad.ts` una sola línea reemplaza dos: importá `model` desde `@angular/core` y dejá `cantidad = model(1)`. Un `model()` es un signal que se puede **leer** (`this.cantidad()`) y **escribir** (`this.cantidad.set(...)`, `this.cantidad.update(...)`). El `output()` manual desaparece: el `[(cantidad)]` del padre ya queda conectado, porque `model()` genera su propio output `cantidadChange`.

**Nivel 2 — si ya tenés la forma del bus.** El `Subject` es privado: se emite **desde los métodos del servicio**, nunca desde afuera. El payload tiene que coincidir exactamente con la unión discriminada `EventoBus`: si el `tipo` es `'agregado'` el evento lleva `id`, `nombre` y `cantidad`; si es `'eliminado'` lleva `id` y `nombre`. Los nietos no emiten: llaman a `this.bus.notificarProductoAgregado(...)` o `this.bus.notificarProductoEliminado(...)`.

**Nivel 3 — si te falta un detalle.** El `switch` del abuelo queda así de forma:

```ts
this.bus.eventos$.pipe(takeUntilDestroyed()).subscribe((evento) => {
  switch (evento.tipo) {
    case 'agregado':
      // acá va tu código
      break;
    case 'eliminado':
      // acá va tu código
      break;
  }
});
```

Dos ayudas extra: los signals se modifican **sin mutar**, con `.update()` y un array nuevo (`this.productos.update((lista) => lista.filter((p) => p.id !== id))`); y las notificaciones se guardan con el mensaje nuevo primero y como máximo cinco (`this.notificaciones.update((lista) => [mensaje, ...lista].slice(0, 5))`).

## Errores frecuentes

1. **Dejar el `output()` viejo junto al `model()`.** `model()` ya genera el output `cantidadChange`: si mantenés el `output<number>()` declarado a mano queda un output duplicado y el componente no compila. Sacá `output` del import.
2. **Creer que `input()` se puede escribir.** Un `input()` es de solo lectura: `this.cantidad()` se lee, pero no se escribe. Para escribir necesitás `model()`.
3. **Emitir un evento con otra forma.** Si el payload no coincide con `EventoBus`, TypeScript te frena (para bien). Pero si el `tipo` no está contemplado en el `switch`, el evento se ignora **en silencio**: no pasa nada y parece que el bus no funciona.
4. **Mutar el array en vez de actualizar el signal.** `this.productos.push(...)` deja la vista congelada: con `OnPush` y sin zona, Angular no se entera. Usá `.update()` con un array nuevo.
5. **Suscribirse sin `takeUntilDestroyed()`.** La suscripción sobrevive al componente: cada visita a la página deja un oyente fantasma escuchando el mismo bus.
6. **Eliminar el producto desde la fila.** La fila es el nieto: no es dueña de la lista. Solo notifica la intención y el abuelo decide.

## Criterios de aceptación

Probá en <http://localhost:4200/extras/01>:

1. **Two-way binding:** el selector de la sección "Carrito" suma y resta, y el número del texto (`1 elegidas`, `2 elegidas`...) cambia junto con él.
2. **Agregar:** tocá el botón "Agregar" en una fila (probá con cantidad 2 en el selector de la fila): el contador "Carrito: X unidades" aumenta exactamente esa cantidad y aparece la notificación `✅ Agregaste 2 × Teclado mecánico`.
3. **Eliminar:** tocá 🗑️ en una fila: el producto desaparece de la tabla, el **valor del catálogo se recalcula solo** (es un `computed()`) y aparece la notificación `🗑 Eliminaste "..."`.
4. **Nieto → abuelo sin intermediarios:** abrí `producto-tabla.ts` y verificá que no tuviste que tocarlo para que el flujo funcione (no tiene outputs ni inyecta el bus).
5. **Sin leaks:** navegá a otra ruta y volvé; todo sigue funcionando (la suscripción se limpia con `takeUntilDestroyed()`).
6. **Comparación:** abrí `/extras/01/solucion` en otra pestaña y comprobá que tu versión se comporta igual.

## Preguntas de comprensión

1. ¿Qué cambia concreto al reemplazar `input()` + `output()` por `model()`, y qué deja de ser necesario escribir a mano?
2. ¿Por qué el bus expone `eventos$` con `asObservable()` y no el `Subject` completo? ¿Qué se rompe si se expone el `Subject`?
3. Si en el `switch` del abuelo faltara el `case 'eliminado'`, ¿qué se vería en pantalla? ¿Cómo te darías cuenta de que el evento sí llegó?
4. ¿Quién es el dueño del estado de la lista de productos? ¿Qué pasaría si la fila también la modificara?
5. ¿Qué se gana y qué se pierde al reemplazar el bus por un `output()` encadenado fila → tabla → página?

## Desafío opcional

**Deshacer el borrado.** Hoy el `🗑️` elimina para siempre. Agregá una acción de "deshacer" en la notificación de eliminación:

1. Sumá un tercer tipo de evento al bus: `{ tipo: 'restaurado'; id: number; nombre: string; precio: number }` (fijate que el precio también hace falta para reinsertar el producto).
2. Emití ese evento desde el abuelo cuando el usuario pulse "deshacer" en la notificación.
3. Manejalo en el `switch` reinsertando el producto en el signal `productos`.

Ahora el bus maneja **tres** tipos de evento y el type union te obliga a update: si emitís un evento sin `precio`, TypeScript te avisa antes de que rompa nada en pantalla.

## Solución

La versión resuelta y comentada está en `src/app/extras/01-comunicacion-y-bus-eventos/solucion/` y se navega en `/extras/01/solucion`.
