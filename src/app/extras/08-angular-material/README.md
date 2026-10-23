# Práctica 08 — Angular Material: diálogo, tabla y feedback

## Cómo hacer la práctica

1. Levantá el servidor: `npm start`
2. Ejercicio: <http://localhost:4200/extras/08>
3. Solución para comparar en otra pestaña: <http://localhost:4200/extras/08/solucion>
4. Archivos de trabajo: `src/app/extras/08-angular-material/ejercicio/` — buscá los comentarios `TODO: [Paso X]` (Pasos 1–7). Tu trabajo es `abm-page.ts` (Pasos 1, 3, 4, 5 y 7) y `dialogo-editor.ts` + su HTML (Pasos 2 y 6).
5. El "backend" ya está hecho: `insumos-crud.service.ts` (en la raíz de la carpeta, compartido entre ejercicio y solución) es el backend en memoria con signals. NO tiene TODOs: el foco de esta práctica es la UI con Material, no la lógica del CRUD (esa ya la hiciste en la 05).
6. **La pantalla ya renderiza la app completa**: la `MatTable` con sus columnas y el `MatPaginator` ya funcionan (así el ejercicio no arranca roto y ves el resultado final desde el minuto uno). Lo que te falta programar se nota al usarla: los botones de alta/edición no abren nada, el paginator cambia de número pero la tabla no se mueve, y borrar no hace nada. En particular, el **Paso 3 no construye la tabla: le agrega a la que ya ves la columna calculada "subtotal"**.

## Objetivo

El problema laboral: **refactorizar el CRUD de la práctica 05 a la "forma oficina"**. La tabla paginada ya no es un `<table>` con `@for` casero, el modal no vive en la plantilla, el borrado no usa `confirm()` de JavaScript. Todo eso lo resuelven los componentes de Angular Material:

1. **`MatDialog`**: la página _abre_ un diálogo y recibe el resultado por `afterClosed()` — flujo imperativo que reemplaza al modal siempre-vivo con `input()`/`output()` de la 05.
2. **`MatTable` + `MatPaginator`**: columnas declarativas con `matColumnDef` y paginación con `PageEvent` conectado a signals.
3. **`MatSnackBar`**: feedback de acciones (nada de `alert()`) con acción "Deshacer".

## Conceptos clave

### 1. El "contrato" del diálogo: entra por `MAT_DIALOG_DATA`, sale por `close()`

En la 05 el modal era un componente más del template: le llegaban datos por `input()`, precargaba con un `effect()` y devolvía con `output()`. En Material el contrato cambia de dirección:

```ts
// La página ABRE (flujo imperativo) y escucha el resultado:
this.dialogos
  .open(DialogoEditor, { data: { insumo }, width: '440px' })
  .afterClosed()
  .subscribe((datos) => { if (datos) this.guardarDesdeDialogo(datos, insumo.id); });

// El diálogo RECIBE y DEVUELVE:
protected readonly data = inject<DialogoEditorData>(MAT_DIALOG_DATA);
this.dialogRef.close(this.form.getRawValue()); // esto es lo que llega a afterClosed()
```

Cancelar o ESC devuelve `undefined`, por eso se comprueba `if (datos)`. El diálogo
se crea en cada apertura, con datos fijos, y los controles nacen precargados. En la
práctica 05 el modal también se monta condicionalmente, pero recibe un `input()`;
su sincronización con el formulario usa `effect()` como puente con la API de forms.

### 2. `MatTable`: columnas declarativas

Cada columna es un `<ng-container matColumnDef="...">` con encabezado (`*matHeaderCellDef`) y celda (`*matCellDef="let fila"`), y el array `columnas` del componente define **qué columnas y en qué orden** se renderizan:

```ts
protected readonly columnas = ['nombre', 'categoria', 'stock', 'precio', 'subtotal', 'acciones'];
```

El par (entrada del array ↔ `matColumnDef`) es el contrato: si no emparejan, la tabla se queja. Una columna calculada como **subtotal** es solo otro `matColumnDef` cuya celda muestra un dato derivado de la fila:

```html
<ng-container matColumnDef="subtotal">
  <th mat-header-cell *matHeaderCellDef>Subtotal</th>
  <td mat-cell *matCellDef="let insumo">
    {{ insumo.stock * insumo.precio | currency: 'ARS' : 'symbol' : '1.0-2' : 'es-AR' }}
  </td>
</ng-container>
```

### 3. `MatPaginator` + `PageEvent` → signals

El paginator pinta los botones solo, pero **la página visible la escribís vos**: el evento `(page)` emite un `PageEvent` con `pageIndex` y `pageSize`, y esos dos valores van a las signals `pagina` y `porPagina`:

```ts
protected alCambiarPagina(evento: PageEvent): void {
  this.pagina.set(evento.pageIndex);
  this.porPagina.set(evento.pageSize);
}
```

El `computed()` que hace `slice()` de la lista se recalcula solo — el estado vive en signals, no dentro del paginator.

### 4. `MatSnackBar` con "Deshacer" (5000 ms)

```ts
const eliminado = this.servicio.eliminar(insumo.id);
const snackBarRef = this.snackBar.open(`«${insumo.nombre}» eliminado`, 'Deshacer', {
  duration: 5000,
});
snackBarRef.onAction().subscribe(() => this.servicio.reingresar(eliminado!));
```

`duration: 5000` cierra el snackbar solo, y `onAction()` emite **solo si** el usuario tocó "Deshacer" antes de que venza. El service devuelve el insumo eliminado para que el deshacer lo reincorpore con su mismo id.

### 5. `MatError` con los validadores de la 02

Los validadores son los mismos `ValidatorFn` puros de la 02 (acá uno local: `precioPositivo`). Lo que cambia es el render: el `<mat-error>` vive **siempre dentro** del `mat-form-field` (reserva su lugar en la línea de ayuda) y el `@if` solo decide si se muestra:

```html
<mat-form-field>
  <mat-label>Precio</mat-label>
  <input matInput type="number" formControlName="precio" />
  @if (form.controls.precio.hasError('precioPositivo')) {
    <mat-error>El precio debe ser mayor que 0.</mat-error>
  }
</mat-form-field>
```

`markAllAsTouched()` en el submit hace visibles todos los errores a la vez.

### 6. ★ `provideAnimations()` y el costo de las animaciones (solo lectura)

En versiones anteriores de Angular, usar Material exigía agregar `provideAnimations()` (o `provideAnimationsAsync()`) en el `app.config.ts`, porque los componentes animaban con el Web Animations API del paquete `@angular/animations`: cada animación entraba en el ciclo de change detection y en el bundle:

```ts
// Lo viejo (Angular ≤ 19): proveer animaciones era obligatorio para Material
provideAnimations(), // bundle + trabajo de JS en cada ciclo de detección

// Angular 22 con Material: nada que proveer — las transiciones son CSS puro
```

Esta combinación instalada de Angular y Material 22 funciona sin registrar
`provideAnimations()`; `@angular/animations` no forma parte de sus dependencias
requeridas. Eso no significa que abrir un diálogo no tenga costo: se crean vistas,
se gestiona el foco y el navegador dibuja las transiciones. Medí antes de atribuir
problemas de rendimiento a una técnica de animación.

### 7. ★ Design system interno: ¿cuándo Material y cuándo componentes propios? (solo lectura)

En un producto real conviven dos mundos, y devOSSE es el ejemplo: el **mapa** usa componentes propios (canvas, capas, controles a medida) y el **panel de administración** usa Material (tablas, formularios, diálogos — exactamente lo que armaste acá). La discusión no es "cuál es mejor" sino **cuándo conviene cada uno**:

- **Material cuando:** la pantalla es un CRUD/formularios (ABM, configs, admin), necesitás accesibilidad y teclado resueltos (foco, ARIA, focus-trap en diálogos), y querés velocidad de desarrollo sin diseñar un sistema visual.
- **Componentes propios cuando:** la UI es el producto (un mapa, un editor, un dashboard con identidad fuerte), el look "genérico" de Material le resta valor, o el componente tan específico que Material no lo tiene (un scheduler, un visor de capas).
- **El costo de mezclar:** dos sistemas = dos tamaños de bundle y dos lenguajes visuales. La forma de que convivan es un **design system interno**: tokens compartidos (en este proyecto, las variables de `src/styles.css`), decisiones documentadas de cuándo se usa cada uno, y los componentes propios construidos _encima_ de los tokens, no con colores sueltos:

```css
/* Los tokens viven en un solo lugar y ambos mundos consumen lo mismo */
.boton-propio { background: var(--acento); border-radius: 8px; }
```

## Consigna paso a paso (checklist)

Abrí el ejercicio (<http://localhost:4200/extras/08>) y probá: los botones de nueva/editar no abren nada, el paginator cambia de número pero la tabla no se mueve, y borrar no hace nada. Cada `TODO: [Paso X]` del código corresponde a un paso de acá.

- [ ] **Paso 1 — `abm-page.ts`:** implementá `abrirNuevo()` y `abrirEdicion(insumo)`: `MatDialog.open(DialogoEditor, { data: ... })` + `afterClosed().subscribe(...)`, con el `if (datos)` y el alta/edición vía `guardarDesdeDialogo` (ya hecho). El modal casero de la 05 se acabó: no hay template, hay apertura.
- [ ] **Paso 2 — `dialogo-editor.ts`:** la parte 1 es inyectar `MAT_DIALOG_DATA` y precargar los `FormControl` con la data de entrada (¡no con `effect()`!); la parte 2 es devolver el payload en `confirmar()` con `dialogRef.close(getRawValue())`.
- [ ] **Paso 3 — `abm-page.html` + `abm-page.ts`:** la tabla ya es una `MatTable` funcionando (así la pantalla no arranca rota). Tu tarea: agregale la columna calculada **subtotal** (stock × precio) — la entrada `'subtotal'` en el array `columnas` y su `ng-container matColumnDef` en la plantilla.
- [ ] **Paso 4 — `abm-page.ts`:** implementá `alCambiarPagina(evento: PageEvent)`: copiar `pageIndex` y `pageSize` a las signals `pagina` y `porPagina`.
- [ ] **Paso 5 — `abm-page.ts`:** implementá `eliminar(insumo)`: baja en el service + `MatSnackBar` con acción **"Deshacer"** y `duration: 5000`; en `onAction()`, `reingresar(eliminado)`.
- [ ] **Paso 6 — `dialogo-editor.html`:** agregá los `<mat-error>` con `@if` dentro de cada `mat-form-field` (usá los errores `required`, `minlength`, `min` y el `precioPositivo` del ValidatorFn local).
- [ ] **Paso 7 — `abm-page.ts`:** implementá `pedirEliminar(insumo)`: abrir `DialogoConfirmar` (ya está hecho, es chico) con título y mensaje por data, y solo si devuelve `true` llamar a `eliminar(insumo)`. **Sin `confirm()` de JavaScript.**
- [ ] **Paso 8:** probá los criterios de aceptación de abajo.

## Criterios de aceptación

Probá en <http://localhost:4200/extras/08>:

1. **Editar desde la tabla abre el diálogo precargado por data de entrada (no por `effect` — contrastar con la 05).**
2. **Guardar cierra el diálogo y la fila se actualiza sin recargar.**
3. **Eliminar muestra un snackbar con "deshacer" por 5 s.**

## Solución

La versión resuelta y comentada está en `src/app/extras/08-angular-material/solucion/` y se navega en `/extras/08/solucion`.

Los pasos 1 a 7 son de implementación; las secciones marcadas «solo lectura» no
requieren cambios. El servicio guarda datos en memoria durante la ejecución de la
app y se comparte entre ejercicio y solución; una recarga restaura la semilla.
La solución ajusta la página al borrar su última fila y usa identificadores que no
se reutilizan para que «Deshacer» no choque con un alta posterior.
