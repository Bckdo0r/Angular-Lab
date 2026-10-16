import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Dominios de email personales que la app corporativa no acepta.
 * La lista vive acá para que el validador sea 100% parametrizable: mañana
 * podés crear otra regla con otra lista sin tocar el validador.
 */
export const DOMINIOS_PROHIBIDOS = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com'];

/**
 * Validador SIMPLE (sin parámetros) de referencia: prohibe espacios en blanco.
 *
 * Este ya está implementado para que veas la "forma" de un ValidatorFn:
 * una función que recibe el control y devuelve...
 *   - `null`  → el valor es VÁLIDO (para este validador).
 *   - un objeto → el valor es INVÁLIDO; la key del objeto identifica el error
 *     (ej.: `{ sinEspacios: true }`) y así la plantilla puede mostrar un
 *     mensaje específico con `hasError('sinEspacios')`.
 */
export function sinEspacios(control: AbstractControl): ValidationErrors | null {
  const valor = (control.value as string | null) ?? '';
  return /\s/.test(valor) ? { sinEspacios: true } : null;
}

/**
 * Validador personalizado PARAMETRIZABLE (fábrica de ValidatorFn).
 *
 * Es una función que devuelve OTRA función: la primera recibe la
 * configuración (la lista de dominios) y la segunda, que es la que Angular
 * ejecuta en cada cambio, recibe el control.
 *
 * Uso en un FormControl:
 *   validators: [Validators.required, prohibirDominiosEmail(DOMINIOS_PROHIBIDOS)]
 */
export function prohibirDominiosEmail(dominiosProhibidos: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // TODO: [Paso 3a] - Implementá la lógica del validador:
    //
    //  1. Tomá el valor y normalizalo:
    //       const email = ((control.value as string | null) ?? '').trim().toLowerCase();
    //
    //  2. Si `email` está vacío devolvé `null`: el campo vacío lo maneja
    //     `Validators.required` (cada validador se ocupa de UNA sola cosa).
    //
    //  3. Extraé el dominio: la parte después del '@'
    //       const dominio = email.split('@')[1] ?? '';
    //
    //  4. Buscá si el dominio está en la lista `dominiosProhibidos`
    //     (compará en minúsculas con .some() o .includes()).
    //
    //  5. Si está → devolvé el error:
    //       return { dominioProhibido: { dominio } };
    //     (el objeto `{ dominio }` permite a la plantilla mostrar CUÁL
    //      dominio fue bloqueado con getError('dominioProhibido').dominio)
    //
    //  6. Si no está → devolvé `null` (válido para este validador).
    return null;
  };
}
