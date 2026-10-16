import { FormControl } from '@angular/forms';
import { stockMinimo } from '../validadores';

/**
 * EJERCICIO — Specs puros del validador `stockMinimo`.
 *
 * Este es el test MÁS RENTABLE de la práctica: no hay DOM, no hay HTTP,
 * no hay TestBed. Solo la regla de negocio: valor de entrada → resultado.
 *
 * El validador necesita un `AbstractControl` como argumento, pero alcanza
 * con un `FormControl` suelto: `new FormControl(valor)`.
 */
describe('stockMinimo(5) — la regla de negocio pura', () => {
  const validar = stockMinimo(5);

  // Helper para armar el control que el validador espera recibir.
  const controlDe = (valor: number | null | '') => new FormControl(valor);

  // ─── TU TURNO ──────────────────────────────────────────────────────────
  // Regla para afirmar: el test prueba la REGLA (rechaza/acepta), no un
  // texto de mensaje. El validador devuelve DATA: `{ stockMinimo: { min } }`
  // o `null`. Cambiar cualquier mensaje de la UI no puede romper estos tests.
  //
  // Nota: vitest falla una suite que NO tiene ningún test real (los
  // `it.todo` no cuentan), por eso hay un test "dado" acá abajo.

  // [Paso 5] (DADO, no se toca) — la fábrica devuelve el ValidatorFn.
  it('[Paso 5] stockMinimo(5) devuelve un validador (función)', () => {
    expect(typeof validar).toBe('function');
  });

  // TODO: [Paso 5] - valor por debajo del mínimo → rechaza con { stockMinimo: { min } }.
  //   `validar(controlDe(3))` tiene que devolver `{ stockMinimo: { min: 5 } }`.
  //   Usá `toEqual` (compara el objeto entero).
  it.todo('[Paso 5] valor por debajo del mínimo → rechaza con { stockMinimo: { min } }');

  // TODO: [Paso 5] - valor justo en el borde (== min) → acepta.
  //   EL CASO DE BORDE, donde viven los bugs: `validar(controlDe(5))` → null.
  //   El mínimo ES válido: la regla dice "no puede quedar POR DEBAJO de min".
  it.todo('[Paso 5] valor justo en el borde (== min) → acepta');

  // TODO: [Paso 5] - valor por encima del mínimo → acepta.
  //   `validar(controlDe(12))` → null.
  it.todo('[Paso 5] valor por encima del mínimo → acepta');

  // TODO: [Paso 5] - valor vacío → null (lo maneja Validators.required).
  //   `validar(controlDe(''))` y `validar(controlDe(null))` → null.
  //   Un validador de fábrica valida UNA sola cosa: el vacío no es su tema.
  it.todo('[Paso 5] valor vacío → null (lo maneja Validators.required)');
});
