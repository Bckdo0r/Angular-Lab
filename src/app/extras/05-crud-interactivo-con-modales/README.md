# Práctica 05 — CRUD Interactivo con Modales

## Cómo hacer la práctica

1. Levantá el servidor: `npm start`
2. Ejercicio: <http://localhost:4200/extras/05>
3. Solución para comparar en otra pestaña: <http://localhost:4200/extras/05/solucion>
4. Archivos de trabajo: `src/app/extras/05-crud-interactivo-con-modales/ejercicio/` — buscá los comentarios `// TODO:`. La plantilla y los estilos **ya están maquetados**; tu trabajo es en `empleados-page.ts` (Pasos 1–4 y 7) y en `modal-editor.ts` (Pasos 5 y 6).
5. El "backend" ya está hecho: `empleados-crud.service.ts` (en la raíz de la carpeta, compartido entre ejercicio y solución) es el backend en memoria con signals. NO tiene TODOs: es el material sobre el que trabajás.

## Objetivo

El CRUD es el pan de cada día de cualquier sistema de gestión: listar, filtrar, dar de alta, editar y borrar — todo sin recargar la página. La parte difícil no es el `HttpClient` (eso fue la práctica 03) sino la **experiencia interactiva**: paginar resultados, confirmar un borrado sin `confirm()` del navegador, y un modal que precarga el formulario al editar. Acá vas a combinar todo lo de las prácticas anteriores:

1. **Estado derivado con `computed()`**: filtrar y paginar como funciones de las señales.
2. **Un modal reutilizable**: componente con `input()`/`output()` que precarga el form con `patchValue()`.
3. **Borrado con confirmación inline**: el mensaje vive en la propia fila de la tabla.

## Conceptos clave

### 1. Estado derivado: `filtrados` y `paginados`

El orden del pipeline es: lista completa → filtro → página. Cada eslabón es un `computed()` que lee al anterior, así Angular recalcula en cadena solo lo necesario:

```ts
filtrados = computed(() => lista.filter(...));           // depende de filtro + servicio
paginados = computed(() => filtrados().slice(...));       // depende de filtrados + pagina
totalPaginas = computed(() => Math.max(1, Math.ceil(...)));
```

Dos trampas clásicas (que la solución comenta): `Math.ceil` para la página parcial, y **volver a la página 1 al tipear en el filtro** — si estás en la página 3 y el resultado pasa a tener 1 página, quedarías mirando una página que ya no existe.

### 2. Modal con `input()` + `output()`

El modal es un componente más, sin lógica de negocio: recibe al empleado por `input()` (`null` = alta), emite `guardar` con los datos validados y la página decide qué hacer:

```ts
empleado = input<Empleado | null>(null);
guardar = output<Omit<Empleado, 'id'>>();
```

La precarga se hace en un **`effect()`** (dentro del constructor, contexto de inyección): corre cada vez que cambia el input — editar precarga, alta resetea:

```ts
effect(() => {
  const empleado = this.empleado();
  if (empleado) this.form.patchValue(empleado);
  else this.form.reset();
});
```

¿`patchValue` y no `setValue`? `patchValue` acepta un objeto **parcial**: `Empleado` trae `id`, que no es control del form, y `patchValue` lo ignora (`setValue` explotaría).

### 3. `getRawValue()` y el flujo de guardado

```ts
// En el modal (Paso 6): validar antes de emitir
if (this.form.invalid) {
  this.form.markAllAsTouched();
  return;
}
this.guardar.emit(this.form.getRawValue());

// En la página (Paso 7): ¿edición o alta? Lo decide seleccionado()
const seleccionado = this.seleccionado();
if (seleccionado) {
  this.servicio.actualizar({ ...datos, id: seleccionado.id });
} else {
  this.servicio.crear(datos);
}
```

### 4. El servicio como "backend en memoria"

```ts
@Injectable({ providedIn: 'root' })
export class EmpleadosCrudService {
  private readonly fuente = signal<Empleado[]>(SEMILLA);
  readonly empleados = this.fuente.asReadonly();

  crear(datos: Omit<Empleado, 'id'>): void {
    const id = Math.max(0, ...this.fuente().map((e) => e.id)) + 1;
    this.fuente.update((lista) => [...lista, { ...datos, id }]);
  }
  // actualizar() y eliminar(): update() con map/filter (copia inmutable)
}
```

`providedIn: 'root'` → singleton. Mutar con `update()` (nunca `push()`) cambia la referencia del array y toda la UI reacciona al instante.

## Consigna paso a paso (checklist)

Abrí el ejercicio (<http://localhost:4200/extras/05>) y probá: el filtro no filtra, el modal no precarga al editar, y guardar no hace nada. Cada `TODO: [Paso X]` del código corresponde a un paso de acá.

- [ ] **Paso 1 — `empleados-page.ts`:** implementá `filtrados` como `computed()` real: nombre, email o área con `includes` (y `toLowerCase()` para no distinguir mayúsculas). Con filtro vacío, devolver todo.
- [ ] **Paso 2 — `empleados-page.ts`:** implementá `paginados` (`slice` por `porPagina`), `totalPaginas` (`Math.ceil`, mínimo 1), `cambiarPagina(delta)` clampeado, y `alTipearFiltro(event)` (setear filtro + volver a página 1).
- [ ] **Paso 3 — `empleados-page.ts`:** implementá `abrirNuevo()` (seleccionado `null`) y `abrirEdicion(empleado)`.
- [ ] **Paso 4 — `empleados-page.ts`:** completá `confirmarEliminacion()`: `servicio.eliminar(id)` + reset de `eliminandoId` (la confirmación inline y su cancelación ya están hechas).
- [ ] **Paso 5 — `modal-editor.ts`:** en un `effect()` dentro del constructor, precargá el form: con empleado → `patchValue(empleado)`; sin empleado (alta) → `reset()`.
- [ ] **Paso 6 — `modal-editor.ts`:** implementá `confirmar()`: inválido → `markAllAsTouched()` y `return`; válido → `guardar.emit(getRawValue())`.
- [ ] **Paso 7 — `empleados-page.ts`:** implementá `guardarCambios(datos)`: con `seleccionado()` → `actualizar({ ...datos, id })`; si no → `crear(datos)`; y cerrá el modal.
- [ ] **Paso 8:** probá los criterios de aceptación de abajo.

## Criterios de aceptación

Probá en <http://localhost:4200/extras/05>:

1. **Filtrado en vivo:** escribir "ana" reduce la tabla y vuelve a página 1.
2. **Paginación:** "‹ ›" navega entre páginas, deshabilitado/clampeado en los extremos.
3. **Modal:** "Nuevo empleado" abre el modal vacío; "Editar" lo abre **precargado** con los datos de la fila.
4. **Validación:** guardar con campos vacíos marca los errores; guardar válido actualiza la fila al instante (signals).
5. **Borrado:** pide confirmación inline en la fila; "Sí" borra, "No" cancela.
6. **Singleton:** el servicio es `providedIn: 'root'`: ejercicio y solución comparten los mismos datos (probá: creá uno en el ejercicio y mirá la solución).
7. **Cancelar:** cerrar el modal con Cancelar no altera la fila.

## Solución

La versión resuelta y comentada está en `src/app/extras/05-crud-interactivo-con-modales/solucion/` y se navega en `/extras/05/solucion`.

Los pasos 1 a 7 son obligatorios; la lectura de los archivos compartidos no implica
completarlos. Los datos solo viven en memoria y una recarga recupera la semilla.
La solución conserva una página válida también al borrar la última fila de la página
final. El modal ya incluye gestión de foco, recorrido con teclado y cierre con Escape
en ambas versiones; esa infraestructura no forma parte de los TODO.
