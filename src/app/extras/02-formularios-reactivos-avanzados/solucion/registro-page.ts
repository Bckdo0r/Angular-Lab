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
 * SOLUCIÓN — Página de registro con formularios reactivos avanzados.
 *
 * Compará con ../ejercicio/registro-page.ts: los TODO se resuelven
 * completando los arrays de `validators` y el método `handleSubmit()`.
 */
@Component({
  selector: 'registro-page-solucion',
  imports: [ReactiveFormsModule],
  templateUrl: './registro-page.html',
  styleUrl: './registro-page.css',
})
export class RegistroPageSolucion {
  protected readonly dominiosProhibidos = DOMINIOS_PROHIBIDOS;

  protected readonly registroForm = new FormGroup({
    nombre: new FormControl('', {
      nonNullable: true,
      // [Paso 1] required + longitud mínima.
      validators: [Validators.required, Validators.minLength(3)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      // [Pasos 2 y 3] formato nativo + validador propio parametrizado.
      // Fijate que NO usamos Validators.compose: con pasarlos en el array
      // alcanza, y TypeScript los tipa mejor.
      validators: [
        Validators.required,
        Validators.email,
        prohibirDominiosEmail(DOMINIOS_PROHIBIDOS),
      ],
    }),
    password: new FormControl('', {
      nonNullable: true,
      // [Paso 4] longitud + validador simple propio.
      validators: [Validators.required, Validators.minLength(8), sinEspacios],
    }),
  });

  protected readonly registroOk = signal(false);

  protected readonly nombreRegistrado = signal('');

  /**
   * Helper para la plantilla: solo muestra errores de campos "activos"
   * (tocado o editado). Así el usuario no ve errores apenas carga la página.
   */
  protected mostrarErrores(nombre: NombreControl): boolean {
    const control = this.registroForm.controls[nombre];
    return control.invalid && (control.touched || control.dirty);
  }

  protected handleSubmit(): void {
    // [Paso 5] Envío inválido: marcamos todo como tocado para que la
    // plantilla revele los mensajes de error y cortamos el flujo con return.
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }

    // [Paso 6] Envío válido: guardamos datos, avisamos éxito y limpiamos.
    // Gracias a `nonNullable: true`, reset() vuelve a '' y no a null.
    this.nombreRegistrado.set(this.registroForm.controls.nombre.value);
    this.registroOk.set(true);
    this.registroForm.reset();
  }
}
