import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  DOMINIOS_PROHIBIDOS,
  prohibirDominiosEmail,
  sinEspacios,
} from './validadores/dominios-prohibidos';

/** Los nombres de los controles del formulario (para tipar los helpers). */
type NombreControl = 'nombre' | 'email' | 'password';

/**
 * PÁGINA DE REGISTRO — Formularios reactivos avanzados
 *
 * El formulario está DEFINIDO POR CÓDIGO (no por la plantilla): la clase
 * es la dueña de los controles, sus validadores y su estado. La plantilla
 * solo "pinta" ese estado.
 *
 * La plantilla (registro-page.html) YA ESTÁ maquetada y muestra los estados
 * (touched, dirty, invalid) en la UI. Tu trabajo está acá, en este archivo,
 * y en `validadores/dominios-prohibidos.ts`.
 */
@Component({
  selector: 'registro-page',
  imports: [ReactiveFormsModule],
  templateUrl: './registro-page.html',
  styleUrl: './registro-page.css',
})
export class RegistroPage {
  protected readonly dominiosProhibidos = DOMINIOS_PROHIBIDOS;

  /**
   * FormGroup = el formulario entero. Cada FormControl = un campo.
   * `nonNullable: true` hace que .value sea siempre string (nunca null),
   * incluso después de un reset() (vuelve a '' y no a null).
   */
  protected readonly registroForm = new FormGroup({
    nombre: new FormControl('', {
      nonNullable: true,
      // TODO: [Paso 1] - Agregá `Validators.minLength(3)` a la lista de validators.
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      nonNullable: true,
      // TODO: [Paso 2] - Agregá `Validators.email` (el validador nativo de formato).
      // TODO: [Paso 3b] - Y también el validador propio que implementarás en
      //        validadores/dominios-prohibidos.ts: `prohibirDominiosEmail(DOMINIOS_PROHIBIDOS)`
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      // TODO: [Paso 4] - Agregá `Validators.minLength(8)` y `sinEspacios`
      //        (el validador simple que ya viene implementado, importalo arriba).
      validators: [Validators.required],
    }),
  });

  /** true solo cuando el formulario se envió con éxito. */
  protected readonly registroOk = signal(false);

  /** Nombre guardado al registrarse, para el mensaje de bienvenida. */
  protected readonly nombreRegistrado = signal('');

  /**
   * Helper que usa la plantilla: decide si mostrar los errores de un control.
   * Regla de UX: no mostrar errores de un campo que el usuario ni tocó,
   * salvo que haya intentado enviar el formulario (touched).
   */
  protected mostrarErrores(nombre: NombreControl): boolean {
    const control = this.registroForm.controls[nombre];
    return control.invalid && (control.touched || control.dirty);
  }

  protected handleSubmit(): void {
    // TODO: [Paso 5] - Si el formulario es inválido:
    //   this.registroForm.markAllAsTouched();
    //   return;
    // markAllAsTouched() marca TODOS los controles como tocados de una, así
    // la plantilla muestra todos los mensajes de error de golpe.
    //
    // TODO: [Paso 6] - Si es válido:
    //   1. guardá el nombre: this.nombreRegistrado.set(this.registroForm.controls.nombre.value);
    //   2. mostrá el éxito: this.registroOk.set(true);
    //   3. limpiá el formulario: this.registroForm.reset();
    //      (con nonNullable vuelve a '', y dirty/touched vuelven a false)
  }
}
