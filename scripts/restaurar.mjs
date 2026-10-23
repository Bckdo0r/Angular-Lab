/**
 * RESTAURACIÓN DE EJERCICIOS DESDE LA TERMINAL
 *
 * Restaura los archivos de un ejercicio a su estado ORIGINAL usando el
 * snapshot generado por `npm run snapshot` (`src/app/restauracion/snapshot.ts`).
 *
 * Los botones de la app copian el comando adecuado para este script. Así la
 * restauración funciona en cualquier navegador sin darle acceso al disco a la
 * página web.
 *
 * Uso:
 *   npm run restore -- extras/01            (un ejercicio)
 *   npm run restore -- extras/01 extras/02  (varios)
 *   npm run restore -- extras                (toda la sección)
 *   npm run restore -- todo                  (todo el proyecto)
 *   npm run restore -- --list                (ver claves disponibles)
 *   npm run restore -- extras/01 --dry-run   (ver qué tocaría, sin escribir)
 *   npm run restore -- extras/01 --force     (sin pregunta de confirmación)
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { createInterface } from 'node:readline/promises';
import { pathToFileURL } from 'node:url';

const RAIZ = process.cwd();
const SNAPSHOT_URL = pathToFileURL(join(RAIZ, 'src', 'app', 'restauracion', 'snapshot.ts')).href;

/** Muestra la ayuda y sale con el código indicado. */
function ayuda(salida) {
  console.log(`Uso:
  npm run restore -- <clave...> [--dry-run] [--force]
  npm run restore -- --list

Claves: 'extras/01', 'tutorial/03', ... | secciones: 'extras', 'tutorial' | 'todo'.
Sin --force se pide confirmación antes de sobrescribir.`);
  process.exit(salida);
}

/** Resuelve las claves pedidas a la lista única de rutas a restaurar. */
function resolverRutas(claves, ejercicios, grupos) {
  const rutas = new Set();
  for (const clave of claves) {
    if (clave === 'todo') {
      for (const lista of Object.values(ejercicios)) for (const r of lista) rutas.add(r);
    } else if (clave === 'tutorial' || clave === 'extras') {
      for (const k of grupos[clave] ?? []) for (const r of ejercicios[k] ?? []) rutas.add(r);
    } else if (ejercicios[clave]) {
      for (const r of ejercicios[clave]) rutas.add(r);
    } else {
      console.error(`❌ Clave desconocida: "${clave}". Usá --list para ver las válidas.`);
      process.exit(1);
    }
  }
  return [...rutas].sort();
}

/** Pregunta sí/no en la terminal (solo cuando hay TTY). */
async function confirmar(pregunta) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  try {
    const respuesta = await rl.question(`${pregunta} [s/N] `);
    return /^(s|s[ií]|y|yes)$/i.test(respuesta.trim());
  } finally {
    rl.close();
  }
}

const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h') || args.length === 0)
  ayuda(args.length === 0 ? 2 : 0);

const { CONTENIDOS, EJERCICIOS, GRUPOS } = await import(SNAPSHOT_URL);

if (args.includes('--list')) {
  console.log(
    `Secciones: tutorial, extras, todo\nEjercicios:\n  ${Object.keys(EJERCICIOS).sort().join('\n  ')}`,
  );
  process.exit(0);
}

const seco = args.includes('--dry-run');
const forzado = args.includes('--force') || args.includes('-y');
const claves = args.filter((a) => !a.startsWith('-'));
if (claves.length === 0) ayuda(2);

const rutas = resolverRutas(claves, EJERCICIOS, GRUPOS);
if (rutas.length === 0) {
  console.error('❌ No hay archivos registrados para esas claves.');
  process.exit(1);
}

const faltantes = rutas.filter((r) => !(r in CONTENIDOS));
if (faltantes.length > 0) {
  console.error(`❌ El snapshot no incluye:\n  ${faltantes.join('\n  ')}`);
  console.error('Corré `npm run snapshot` para regenerarlo.');
  process.exit(1);
}

console.log(`Se van a sobrescribir ${rutas.length} archivos (los TODOs vuelven sin resolver):`);
for (const r of rutas) console.log(`  ${r}`);

if (seco) {
  console.log('(dry-run: no se escribió nada.)');
  process.exit(0);
}

if (!forzado) {
  if (!process.stdin.isTTY) {
    console.error('❌ Sin terminal interactiva: repetí con --force para confirmar.');
    process.exit(1);
  }
  if (!(await confirmar('¿Restaurar el código original?'))) {
    console.log('Operación cancelada, no se cambió nada.');
    process.exit(0);
  }
}

for (const ruta of rutas) {
  const destino = join(RAIZ, ruta);
  mkdirSync(dirname(destino), { recursive: true });
  writeFileSync(destino, CONTENIDOS[ruta], 'utf8');
}
console.log(`✅ Listo: se restauraron ${rutas.length} archivos. El servidor recompila al guardar.`);
