# Pulido visual de las prácticas extras (01–10)

El usuario reporta páginas "feas": catálogo de la 01, tarjetas superpuestas de la 07, la 08 sin estilos. Pasada de CSS sobre todas las extras con verificación visual real (capturas Playwright, claro + oscuro).

## Specs

S1: «le des una pulida a los css de todos los ejercicios extra, porque hay algunos que se ven feos, por ejemplo el catalogo del 01, las tarjetas del 07 que estan superpuestas y el 08 todo, le faltan muchos estilos».

S2: Convenciones de estilo del repo (AGENTS.md 10.4): SOLO tokens de `src/styles.css` (`--fondo`, `--superficie`, `--texto`, `--texto-suave`, `--borde`, `--acento*`, `--error*`, `--exito*`, `--entrada-*`, `--sombra-tarjeta`, `--resplandor`); nada de colores hardcodeados; botones radius 8px, transición 0.15s, `:hover` y `:focus-visible`; inputs con foco `--acento` + `--resplandor`; tablas con hover en `--acento-suave`; probar claro y oscuro (el oscuro es la clase `oscuro` en `<html>`).

S3: La fuente de íconos y el tema Material ya los arregló el parent (`mat.theme` en `src/tema-material.scss` + `material-icons` en angular.json, commit propio).

S4: Verificación visual: cada práctica corregida se captura ANTES y DESPUÉS en ambos temas (script de captura con Chromium headless contra `ng serve` propio en puerto dedicado) y el reporte declara qué se corrigió.

S5: «after creating or modifying an exercise, run `npm run snapshot`» → el parent regenera el snapshot al cierre y lo commitea.

## Tasks

- T1 [worker] 01 + 03: catálogo (botón Agregar con ícono amontonado, precios pegados "ARS45,000", botón borrar desprolijo, filas) + revisión de la 03.
- T2 [worker] 02 + 04 + 05: pasada general de pulido con capturas.
- T3 [worker] 06 + 07: tarjetas superpuestas del listado de la 07 (grid) + pulido de la 06.
- T4 [worker] 08: formato de precios consistente, hover de filas, diálogo pulido, ambos temas.
- T5 [worker] 09 + 10: pasada general de pulido con capturas.
- T6 [parent] Verificación global: build, test, snapshot, revisión de capturas finales, commits por grupo.

## Log

- L1 (petición original, verbatim): «Bien, ahora necesito que le des una pulida a los css de todos los ejercicios extra, porque hay algunos que se ven feos, por ejemplo el catalogo del 01, las tarjetas del 07 que estan superpuestas y el 08 todo, le faltan muchos estilos»
- L2 (hallazgo del parent): el server viejo del usuario en 4200 no tenía el tema (config anterior). Con server fresco se confirmó que `azure-blue.css` (tokens M3) dejaba los componentes `mat-unthemed`; corregido con `mat.theme` en Sass + fuente de íconos `material-icons` local (offline). Verificado con capturas: botón filled, íconos y paginator renderizan.
- L3 (decisión): cada worker levanta SU propio `ng serve` en puerto dedicado y verifica con capturas propias antes/después; el server 4200 del usuario no se toca.
- L4 (evidencia): T5 cerrada — 09/10 commiteadas `a0c76e6` (capas ocultas atenuadas vía clase .oculta, selección con box-shadow inset en vez de border para no saltar, jerarquía tipográfica en la demo de la 10; capturas antes/después en ambos temas).
- L5 (evidencia): T2 cerrada — 02/04/05 commiteadas `7834857` (04 era la deficitaria: tarjetas, :focus de inputs y :focus-visible agregados; 05 numeración tabular + thead reforzado; 02 hover consistente).
- L6 (evidencia): T4 cerrada — 08 commiteada `93e844e` — precios ARS es-AR con CurrencyPipe, tabla/paginator con tokens del sitio, diálogo 520px. Hallazgo del worker sobre overlays claros en oscuro resultó falso positivo del método de captura (toggleaba solo la clase .oscuro sin style.colorScheme): TemaService setea ambos y los tokens light-dark() de Material cambian solos. A verificar en T6 con capturas usando colorScheme real.
- L7 (evidencia): T1 cerrada — 01/03 commiteadas `b501d73` (botón Agregar inline-flex, formato ARS es-AR con Intl, icon-button de borrado, tarjeta de tabla en 03).
- L8 (evidencia): T3 cerrada — 07 commiteada `0190ffb` (causa raíz medida: height:100% cíclico → flex; solapamiento false, margen 16px) y 06 `9e30552` (chips de estado, tabla tarjeta, sin cabecera huérfana).
- L9 (cierre): verificación global — build exit 0 sin warnings nuevos, npm test 12 passed + 8 todo, snapshot regenerado (150 archivos, commit `3dbd75e`). Capturas finales con método real (clase .oscuro + style.colorScheme como TemaService): 07 sin solapamiento en ambos temas, 08 con Material oscuro correcto (tokens light-dark() conmutan con color-scheme). Ajuste final: snippet del README de la 08 alineado a CurrencyPipe (`70638e6`).
- L10 (incidente): un worker usó `pkill -f "ng serve"` para limpiar su server propio y mató también el server del usuario en 4200. No reiniciado por mí: el usuario debe relanzar `npm start` (el puerto quedó libre).
