# Recuadro "Output" para páginas de resultado

Toda página que muestra el resultado de un ejercicio (y su solución) se renderiza
dentro de un recuadro con etiqueta "Output", implementado como layout de ruta
compartido (no como wrapper por plantilla).

## Specs

- **S1**: "en todas las paginas donde se muestra el resultado de lo que programaste
  y tambien donde se muestra la solucion, quiero que esten en un recuadro tipo
  'Output'" — cada lección del tutorial (ejercicio y solución) y cada práctica de
  `/extras` (ejercicio y solución) se ve dentro de un recuadro con chip "Output".

Decisiones de alcance (confirmadas por el usuario):
- Incluye las mini-apps full-page (04, 07, 08, 09).
- Excluciones: home `/`, índices `/tutorial` y `/extras`, lección 25 (solo lectura,
  sin resultado), lección 13 ejercicio (su README pide al alumno agregar `children`
  a esa ruta exacta: envolverla rompería la didáctica; la 13/solución sí va).

## Tasks

- T1 ✅ (S1): componente `SalidaDemo` + helper `salida()` en `src/app/compartido/`.
- T2 ✅ (S1): envolver rutas `tutorial/01..24` (ej + sol) en `app.routes.ts`; anidadas
  para 12/13sol/14/14sol; 13 ej y 25 sin recuadro.
- T3 ✅ (S1): envolver rutas planas de prácticas 01, 02, 03, 05, 06, 08, 10 (ej + sol).
- T4 ✅ (S1): envolver `rutas.ts` de prácticas 04, 07 y 09 (guards, redirects,
  providers y orden del `'**'` intactos).
- T5 ✅ (S1): snapshot regenerado (34 ejercicios, 150 archivos); notas en los
  `rutas.ts` y en `app.routes.ts`.
- T6 ✅ (S1): verificación — `npm run build` exit 0 sin errores; diff de paths
  no vacíos HEAD↔working: idéntico en los 4 archivos de rutas.

Risk: item 6 (un error en el árbol de rutas rompería navegación y ningún test la
cubre) → verificación funcional: build + diff de paths antes/después.

## Log

- L1 (pedido original, verbatim): "Bien, quiero que en todas las paginas donde se
  muestra el resultado de lo que programaste y tambien donde se muestra la
  solucion, quiero que esten en un recuadro tipo "Output", que te parece?"
- L1a: usuario eligió "Todo: tutorial + prácticas" (incluye 04, 07, 08, 09
  enmarcadas; salvo índices y solo-lectura).
- L1b: decisión del orquestador: lección 13 ejercicio sin recuadro (didáctica del
  `children` intacta); se comenta la excepción en la ruta.
