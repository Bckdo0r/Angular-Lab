import { FormControl } from '@angular/forms';
import { stockMinimo } from '../validadores';

/**
 * SOLUCIÓN — Specs puros del validador `stockMinimo`.
 *
 * El test más rentable de la práctica: no hay DOM, no hay HTTP, no hay
 * TestBed. Solo la regla de negocio: valor de entrada → resultado.
 *
 * ⚠️ Criterio del temario ("testear la regla de negocio, no la
 * implementación"): estos tests afirman RECHAZO/ACEPTACIÓN y la DATA del
 * error (`{ stockMinimo: { min } }`), nunca un texto de mensaje. El
 * validador no tiene frases: la UI las arma a partir de la data. Por eso,
 * cambiar cualquier mensaje de error del código NO rompe este suite.
 */
describe('stockMinimo(5) — la regla de negocio pura', () => {
  const validar = stockMinimo(5);

  // Helper mínimo: el validador pide un AbstractControl, alcanza con un
  // FormControl suelto creado por test (sin formularios, sin componentes).
  const controlDe = (valor: number | null | '') => new FormControl(valor);

  it('[Paso 5] valor por debajo del mínimo → rechaza con { stockMinimo: { min } }', () => {
    expect(validar(controlDe(3))).toEqual({ stockMinimo: { min: 5 } });
  });

  it('[Paso 5] valor justo en el borde (== min) → acepta', () => {
    // EL caso de borde, donde viven los bugs: la regla dice "por DEBAJO de
    // min", así que el mínimo exacto ES válido.
    expect(validar(controlDe(5))).toBeNull();
  });

  it('[Paso 5] valor por encima del mínimo → acepta', () => {
    expect(validar(controlDe(12))).toBeNull();
  });

  it('[Paso 5] valor vacío → null (lo maneja Validators.required)', () => {
    // Un validador de fábrica valida UNA sola cosa: el vacío no es su tema.
    expect(validar(controlDe(''))).toBeNull();
    expect(validar(controlDe(null))).toBeNull();
  });
});
