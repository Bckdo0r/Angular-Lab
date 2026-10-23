/**
 * GENERADOR DEL SNAPSHOT DE RESTAURACIÓN
 *
 * Recorre las carpetas de lecciones (src/app/tutorial) y prácticas
 * (src/app/extras), guarda el contenido ORIGINAL de los archivos de
 * ejercicio en src/app/restauracion/snapshot.ts y expone:
 *
 *  - CONTENIDOS: ruta relativa → contenido del archivo.
 *  - EJERCICIOS: 'tutorial/01' | 'extras/03' | ... → lista de rutas.
 *  - GRUPOS:     'tutorial' | 'extras' → claves de ejercicio incluidas.
 *
 * Uso: npm run snapshot
 * (Corrélo después de agregar o modificar lecciones/prácticas para que el
 * snapshot refleje el estado original vigente.)
 */
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const RAIZ = process.cwd();

/** Archivos globales (fuera de las carpetas de lección) que un ejercicio edita. */
const ARCHIVOS_GLOBALES = {
  'tutorial/13': ['src/app/app.routes.ts'],
};

/** Conseguí todas las carpetas de lección/práctica, en orden. */
function carpetasDe(directorio) {
  return readdirSync(directorio, { withFileTypes: true })
    .filter((e) => e.isDirectory() && /^\d{2}-/.test(e.name))
    .map((e) => e.name)
    .sort();
}

/** Lista recursiva de archivos de una carpeta, excluyendo carpetas `solucion`. */
function archivosDe(carpeta) {
  const encontrados = [];
  for (const entrada of readdirSync(carpeta, { withFileTypes: true })) {
    const ruta = join(carpeta, entrada.name);
    if (entrada.isDirectory()) {
      if (entrada.name === 'solucion') continue; // la solución no se restaura
      encontrados.push(...archivosDe(ruta));
    } else if (entrada.isFile()) {
      encontrados.push(ruta);
    }
  }
  return encontrados;
}

const contenidos = {};
const ejercicios = {};
const grupos = { tutorial: [], extras: [] };

for (const seccion of ['tutorial', 'extras']) {
  for (const carpeta of carpetasDe(join(RAIZ, 'src', 'app', seccion))) {
    const clave = `${seccion}/${carpeta.slice(0, 2)}`;
    const rutas = [
      ...archivosDe(join(RAIZ, 'src', 'app', seccion, carpeta)),
      ...(ARCHIVOS_GLOBALES[clave] ?? []),
    ].map((rutaAbsoluta) => relative(RAIZ, rutaAbsoluta).split(sep).join('/'));

    for (const ruta of rutas) {
      if (!(ruta in contenidos)) {
        // Los finales de línea se normalizan a LF: el snapshot guarda el
        // CONTENIDO LÓGICO del ejercicio, no la convención de la plataforma.
        // Git hace lo mismo al commitear (core.autocrlf), así que el snapshot
        // es idéntico en Windows, Linux y macOS y la verificación automática
        // puede comparar contra el archivo versionado sin falsos positivos.
        contenidos[ruta] = readFileSync(join(RAIZ, ruta), 'utf8').replace(/\r\n/g, '\n');
      }
    }
    ejercicios[clave] = rutas;
    grupos[seccion].push(clave);
  }
}

// El grupo "todo" de cada sección incluye los archivos globales una sola vez
// (las claves comparten `CONTENIDOS`, así que la escritura repetida es inocua).

const cuerpoSnapshot = [
  '/**',
  ' * SNAPSHOT DE RESTAURACIÓN — estado ORIGINAL de los ejercicios.',
  ' *',
  ' * ⚠️ ARCHIVO GENERADO: no lo edites a mano.',
  ' * Regeneralo con: npm run snapshot',
  ' */',
  '',
  `export const CONTENIDOS: Record<string, string> = {`,
  ...Object.entries(contenidos).map(
    ([ruta, contenido]) => `  ${JSON.stringify(ruta)}: ${JSON.stringify(contenido)},`,
  ),
  `};`,
  '',
  `/** Rutas de archivos que componen el estado original de cada ejercicio. */`,
  `export const EJERCICIOS: Record<string, string[]> = {`,
  ...Object.entries(ejercicios).map(
    ([clave, rutas]) =>
      `  ${JSON.stringify(clave)}: [${rutas.map((r) => JSON.stringify(r)).join(', ')}],`,
  ),
  `};`,
  '',
  `/** Claves de ejercicio incluidas en cada sección (para el reinicio general). */`,
  `export const GRUPOS: Record<'tutorial' | 'extras', string[]> = {`,
  `  tutorial: [${grupos.tutorial.map((c) => JSON.stringify(c)).join(', ')}],`,
  `  extras: [${grupos.extras.map((c) => JSON.stringify(c)).join(', ')}],`,
  `};`,
  '',
].join('\n');

const destino = join(RAIZ, 'src', 'app', 'restauracion', 'snapshot.ts');
mkdirSync(join(RAIZ, 'src', 'app', 'restauracion'), { recursive: true });
writeFileSync(destino, cuerpoSnapshot, 'utf8');

const totalArchivos = Object.keys(contenidos).length;
console.log(
  `✅ snapshot.ts generado: ${Object.keys(ejercicios).length} ejercicios, ${totalArchivos} archivos únicos.`,
);
