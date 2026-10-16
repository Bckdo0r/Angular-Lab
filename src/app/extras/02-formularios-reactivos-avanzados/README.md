# Práctica 02 — Formularios Reactivos Avanzados y Validadores Personalizados

## Cómo hacer la práctica

1. Levantá el servidor: `npm start`
2. Ejercicio: <http://localhost:4200/extras/02>
3. Solución para comparar en otra pestaña: <http://localhost:4200/extras/02/solucion>
4. Archivos de trabajo: `src/app/extras/02-formularios-reactivos-avanzados/ejercicio/` — buscá los comentarios `// TODO:`. La plantilla y los estilos **ya están maquetados**; tu trabajo es en `registro-page.ts` y en `validadores/dominios-prohibidos.ts`.

## Objetivo

Todo sistema corporativo tiene formularios de alta con reglas de negocio: "no aceptamos emails personales (@gmail, @hotmail)", "la contraseña no puede tener espacios", "si el usuario intenta enviar a medias, mostrale todos los errores de una". La lección básica del tutorial ya usó formularios reactivos; acá vas a manejarlos como en un entorno laboral real:

1. **Estado del formulario en la UI**: `dirty`, `touched`, `invalid` para mostrar errores recién cuando corresponde.
2. **Validadores personalizados parametrizables** (`ValidatorFn` de fábrica): la forma estándar de codificar reglas de negocio reutilizables.

## Conceptos clave

### 1. `FormGroup` + `FormControl` definidos por código

En formularios reactivos la clase es la dueña; la plantilla solo pinta:

```ts
registroForm = new FormGroup({
  nombre: new FormControl('', {
    nonNullable: true, // .value es siempre string, incluso tras reset()
    validators: [Validators.required, Validators.minLength(3)],
  }),
});
```

```html
<form [formGroup]="registroForm" (ngSubmit)="handleSubmit()">
  <input formControlName="nombre" />
</form>
```

### 2. Estados: `touched`, `dirty`, `invalid`

| Estado | Significado | Cuándo usarlo |
|---|---|---|
| `touched` | El usuario entró y salió del campo | No mostrar errores de campos que ni miró |
| `dirty` | El usuario **escribió** algo en el campo | Diferenciar "lo editó" de "solo pasó por arriba" |
| `invalid` | Falla al menos un validador | Pinta el borde rojo / mensajes |

La combinación clásica de UX: mostrar el error solo si `invalid && (touched || dirty)`. Y cuando el usuario intenta enviar un formulario incompleto, `markAllAsTouched()` revela todos los errores de golpe:

```ts
if (this.form.invalid) {
  this.form.markAllAsTouched(); // dispara los mensajes en la UI
  return;
}
```

### 3. Validador simple vs. validador parametrizable

Un `ValidatorFn` es una función que recibe el control y devuelve `null` (válido) o un objeto con la key del error (inválido):

```ts
// Simple: sin configuración
export function sinEspacios(control: AbstractControl): ValidationErrors | null {
  const valor = (control.value as string | null) ?? '';
  return /\s/.test(valor) ? { sinEspacios: true } : null;
}
```

El **parametrizable** es una **fábrica**: una función que devuelve el `ValidatorFn` ya configurado. Así la misma regla sirve para cualquier lista de dominios:

```ts
export function prohibirDominiosEmail(dominiosProhibidos: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = ((control.value as string | null) ?? '').trim().toLowerCase();
    if (!email) return null; // el vacío lo maneja Validators.required
    const dominio = email.split('@')[1] ?? '';
    return dominiosProhibidos.includes(dominio) ? { dominioProhibido: { dominio } } : null;
  };
}
```

El error devuelve **data** (`{ dominio }`), no solo una bandera: la plantilla puede mostrar un mensaje concreto con `getError('dominioProhibido').dominio`.

### 4. Cada validador valida UNA cosa

`required` se ocupa del vacío, `email` del formato y tu validador solo de los dominios prohibidos. Se acumulan en el array de `validators` y Angular los evalúa todos: el control es inválido si falla cualquiera.

## Consigna paso a paso (checklist)

Abrí el ejercicio (<http://localhost:4200/extras/02>) y jugá un rato: tocá campos, escribí, borrá, enviá. Vas a ver que faltan validaciones y el envío no hace nada.

- [ ] **Paso 1 — `registro-page.ts`:** al control `nombre` agregale `Validators.minLength(3)`.
- [ ] **Paso 2 — `registro-page.ts`:** al control `email` agregale `Validators.email` (el nativo de formato).
- [ ] **Paso 3 — `validadores/dominios-prohibidos.ts` y `registro-page.ts`:**
  - **3a:** implementá el cuerpo del factory `prohibirDominiosEmail()` (los pasos 1 a 6 están detallados en el `// TODO`).
  - **3b:** registrá el validador en el control `email` con `prohibirDominiosEmail(DOMINIOS_PROHIBIDOS)`.
- [ ] **Paso 4 — `registro-page.ts`:** al control `password` agregale `Validators.minLength(8)` y el validador simple `sinEspacios` (ya está implementado, solo importalo y usalo).
- [ ] **Paso 5 — `registro-page.ts`:** en `handleSubmit()`, si el formulario es inválido llamá `markAllAsTouched()` y hacé `return`.
- [ ] **Paso 6 — `registro-page.ts`:** si es válido: guardá el nombre en `nombreRegistrado`, activá `registroOk` con `.set(true)` y limpiá con `this.registroForm.reset()`.
- [ ] **Paso 7:** probá los criterios de aceptación de abajo.

## Criterios de aceptación

Probá en <http://localhost:4200/extras/02>:

1. **Estados en vivo:** apenas carga, la fila `dirty / touched / invalid` muestra `false / false / true` y **no hay mensajes de error** (aunque los campos estén vacíos).
2. **Errores al tocar:** escribí una letra en "Nombre" y salí del campo → aparece "Necesita al menos 3 caracteres". Mientras el campo está enfocado y vacío, no hay mensajes.
3. **Dominios bloqueados:** escribí `juan@gmail.com` → aparece el borde rojo y el mensaje *"No se aceptan cuentas del dominio 'gmail.com'"*. Con `juan@empresa.com.ar` el error desaparece (y `Validators.email` no se queja).
4. **Formato de email:** `juan.sin-arroba` → aparece "El formato del email no es válido".
5. **Contraseña:** probá `pass word` (con espacio) → "No puede contener espacios"; con `abc123` → "Necesita al menos 8 caracteres".
6. **Envío incompleto:** con errores presentes, tocá "Crear cuenta" → todos los mensajes aparecen de golpe (`markAllAsTouched`).
7. **Envío válido:** completá todo bien → aparece el panel "✅ ¡Cuenta creada!" con el nombre, y el formulario se limpia (estados `false / false / true` de nuevo).
8. **Comparación:** en `/extras/02/solucion` el comportamiento es idéntico.

> 💡 **Para pensar (nivel oficina):** ¿por qué `prohibirDominiosEmail` es una fábrica y no una función con la lista hardcodeada adentro? Pista: imaginá que mañana el mismo validador sirve para una lista blanca de dominios socios.

## Solución

La versión resuelta y comentada está en `src/app/extras/02-formularios-reactivos-avanzados/solucion/` y se navega en `/extras/02/solucion`.
