# Práctica 01 — Comunicación entre componentes y Bus de Eventos

## Cómo hacer la práctica

1. Levantá el servidor: `npm start`
2. Ejercicio: <http://localhost:4200/extras/01>
3. Solución para comparar en otra pestaña: <http://localhost:4200/extras/01/solucion>
4. Archivos de trabajo: `src/app/extras/01-comunicacion-y-bus-eventos/ejercicio/` — buscá los comentarios `// TODO:` y completalos. Al guardar, el navegador se recarga solo.

## Objetivo

En aplicaciones reales, la jerarquía de componentes se parece a una empresa: una **página** (abuelo) renderiza una **tabla** (hijo) que renderiza **filas** (nietos). El problema clásico: ¿cómo hace el nieto para avisarle al abuelo "eliminá este producto" sin tener que pasar un `output()` por cada nivel intermedio? Ese encadenamiento manual se llama **prop drilling** y convierte a los componentes intermedios en mensajeros inútiles.

En esta práctica resolvés ese problema de dos formas, ambas estándar en **Angular v20**:

1. **Enlace bidireccional personalizado** con `model()`: el estándar moderno para que un componente hijo pueda escribir un valor que el padre también controla (reemplaza al par `input()` + `output('xChange')`).
2. **Bus de eventos desacoplado** con RxJS: un servicio con un `Subject` que cualquier componente puede usar para emitir y escuchar, sin conocerse entre sí.

## Conceptos clave

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

En Angular v20 lo moderno es `model()`: es un input de **lectura y escritura** que ya trae el output integrado:

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

Toda suscripción manual debe cerrarse cuando el componente muere. En Angular v20 la forma limpia es el operador de `@angular/core/rxjs-interop`:

```ts
constructor() {
  this.bus.eventos$
    .pipe(takeUntilDestroyed())   // se desuscribe solo al destruirse el componente
    .subscribe((evento) => { /* actualizar signals acá */ });
}
```

### 4. El abuelo actualiza signals, no hace DOM

El abuelo es el dueño del estado (`signal<Producto[]>`); los nietos solo **notifican intenciones**. Eso mantiene la lógica de negocio en un solo lugar y los componentes reutilizables.

## Consigna paso a paso (checklist)

Abrí la página del ejercicio (<http://localhost:4200/extras/01>) y verificá primero el estado "roto": la tabla se ve y los botones no hacen nada, y el selector suma pero no se sincroniza con el abuelo.

- [ ] **Paso 1 — `selector-cantidad.ts`:** reemplazá el par `input()` + `output()` por un único `cantidad = model(1)` y simplificá `incrementar()` / `decrementar()` usando `this.cantidad.update(...)`. *Test rápido: el selector de la sección "Carrito" ya debería reflejar el valor en el texto "elegidas".*
- [ ] **Paso 2 — `notificaciones-bus.ts`:** implementá `notificarProductoAgregado()` emitiendo `{ tipo: 'agregado', id, nombre, cantidad }` con `this.eventos.next(...)`.
- [ ] **Paso 3 — `notificaciones-bus.ts`:** implementá `notificarProductoEliminado()` emitiendo `{ tipo: 'eliminado', id, nombre }`.
- [ ] **Paso 4 — `producto-fila.ts` (el nieto):** completá `agregar()` (Paso 4a) y `eliminar()` (Paso 4b) llamando a los métodos del bus inyectado. Fijate que el componente **no tiene outputs**: esa es la gracia.
- [ ] **Paso 5 — `productos-page.ts` (el abuelo):** completá el cuerpo del `.subscribe()` dentro del constructor: con un `switch (evento.tipo)`, en `'agregado'` sumá la cantidad al signal `carrito` y en `'eliminado'` filtrá el producto del signal `productos`. En ambos casos agregá el mensaje correspondiente a las `notificaciones` (máximo 5, con el más nuevo primero).
- [ ] **Paso 6:** probá los criterios de aceptación de abajo.

## Criterios de aceptación

Probá en <http://localhost:4200/extras/01>:

1. **Two-way binding:** el selector de la sección "Carrito" suma y resta, y el número del texto (`1 elegidas`, `2 elegidas`...) cambia junto con él.
2. **Agregar:** tocá el botón "Agregar" en una fila (probá con cantidad 2 en el selector de la fila): el contador "Carrito: X unidades" aumenta exactamente esa cantidad y aparece la notificación `✅ Agregaste 2 × Teclado mecánico`.
3. **Eliminar:** tocá 🗑️ en una fila: el producto desaparece de la tabla, el **valor del catálogo se recalcula solo** (es un `computed()`) y aparece la notificación `🗑 Eliminaste "..."`.
4. **Nieto → abuelo sin intermediarios:** abrí `producto-tabla.ts` y verificá que no tuviste que tocarlo para que el flujo funcione (no tiene outputs ni inyecta el bus).
5. **Sin leaks:** navegá a otra ruta y volvé; todo sigue funcionando (la suscripción se limpia con `takeUntilDestroyed()`).
6. **Comparación:** abrí `/extras/01/solucion` en otra pestaña y comprobá que tu versión se comporta igual.

> 💡 **Para pensar (nivel oficina):** ¿qué pasa si dos componentes suscriptos escuchan el mismo evento? ¿Quién debería mutar la lista y quién solo mostrar un toast? Regla de oro: **un solo dueño del estado por dato**.

## Solución

La versión resuelta y comentada está en `src/app/extras/01-comunicacion-y-bus-eventos/solucion/` y se navega en `/extras/01/solucion`.
