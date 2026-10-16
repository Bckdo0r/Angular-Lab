import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * SOLUCIÓN — Dominios de email personales que la app corporativa no acepta.
 */
export const DOMINIOS_PROHIBIDOS = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com'];

/**
 * SOLUCIÓN — Validador simple (sin parámetros), de referencia.
 * Sin cambios respecto al ejercicio: la idea era que vieras la forma de un ValidatorFn.
 */
export function sinEspacios(control: AbstractControl): ValidationErrors | null {
  const valor = (control.value as string | null) ?? '';
  return /\s/.test(valor) ? { sinEspacios: true } : null;
}

/**
 * SOLUCIÓN — Validador personalizado PARAMETRIZABLE (fábrica de ValidatorFn).
 *
 * Compará con ../ejercicio/validadores/dominios-prohibidos.ts: la única
 * diferencia es el cuerpo de la función interna.
 *
 * Detalles de buenas prácticas:
 * - Cada validador valida UNA sola cosa: el vacío lo maneja `Validators.required`.
 * - Normalizamos (trim + lowercase) para que "  juan@GMAIL.COM " también sea bloqueado.
 * - El error devuelve DATA (`{ dominio }`), no solo una bandera: la UI puede
 *   mostrar un mensaje concreto ("no se aceptan cuentas de gmail.com").
 */
export function prohibirDominiosEmail(dominiosProhibidos: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // 1. Normalizamos el valor (puede llegar '' o null mientras se tipea).
    const email = ((control.value as string | null) ?? '').trim().toLowerCase();

    // 2. Vacío → no es problema de ESTE validador.
    if (!email) {
      return null;
    }

    // 3. Dominio = lo que está después del '@'.
    const dominio = email.split('@')[1] ?? '';

    // 4/5. Si el dominio está en la lista, marcamos el control como inválido.
    const esProhibido = dominiosProhibidos.some((d) => d.toLowerCase() === dominio);
    if (esProhibido) {
      return { dominioProhibido: { dominio } };
    }

    // 6. Si no, válido para este validador (otros validadores siguen evaluando).
    return null;
  };
}
