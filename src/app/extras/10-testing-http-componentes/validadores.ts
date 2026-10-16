import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validador PARAMETRIZABLE (fábrica de ValidatorFn) — la regla de negocio
 * que la práctica 10 testea con casos puros (sin DOM, sin HTTP).
 *
 * Regla: el stock de un producto no puede quedar por debajo de `min`.
 * - valor < min             → `{ stockMinimo: { min } }` (rechaza, devolviendo DATA)
 * - valor == min (el borde) → null (el mínimo ES válido: acepta)
 * - valor > min             → null (acepta)
 * - valor vacío/null/''     → null (ese caso lo cubre `Validators.required`)
 *
 * ⚠️ Devuelve DATA (`{ min }`), no un mensaje: la UI arma la frase. Por eso
 * "cambiar el mensaje de error" nunca puede romper los tests de esta regla.
 */
export function stockMinimo(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value;

    // El vacío no es problema de ESTE validador (lo maneja required).
    if (valor === null || valor === undefined || valor === '') {
      return null;
    }

    return valor < min ? { stockMinimo: { min } } : null;
  };
}
