/**
 * Formateo compartido de precios para la Práctica 01.
 *
 * El pipe `currency` pega el símbolo al número ("ARS45,000") y usa el
 * separador del locale por defecto ( coma ). Con `Intl.NumberFormat`
 * en es-AR obtenemos el formato argentino: "ARS 45.000".
 */
export function formatoPrecio(valor: number): string {
  const numero = new Intl.NumberFormat('es-AR', {
    maximumFractionDigits: 0,
  }).format(valor);
  return `ARS ${numero}`;
}
