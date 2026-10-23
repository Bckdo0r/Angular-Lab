/**
 * CONFIGURACIÓN DE ESLINT — Angular Lab
 *
 * Objetivo: que el repositorio detecte errores reales por sí solo, sin
 * depender de una revisión manual. Las reglas elegidas son las que detectan
 * errores de Angular y no criterios de estilo discutibles.
 *
 * Puntos propios de este proyecto:
 *
 * 1. El curso tiene dos tipos de código con reglas distintas:
 *    - CONSIGNAS: el código está incompleto a propósito (el estudiante lo
 *      completa). Ahí hay imports y propiedades sin usar que son parte del
 *      ejercicio, no código muerto: se avisa, no se bloquea.
 *    - SOLUCIONES y código compartido: ahí el código muerto sí es un error.
 * 2. `src/app/restauracion/snapshot.ts` es un archivo GENERADO (ver
 *    `npm run snapshot`). No se linta.
 * 3. Se usa `eslint-config-prettier` al final porque el proyecto ya formatea
 *    con Prettier y no queremos reglas de estilo peleándose con él.
 */
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import prettier from 'eslint-config-prettier';

/**
 * Rutas cuyo código es una consigna de ejercicio.
 *
 * Solo se usan patrones POSITIVOS: mezclar un patrón positivo con uno
 * negativo (`!`) dentro del mismo array `files` hace que el array termine
 * matcheando todo lo que el negativo NO excluye, no lo que el positivo sí
 * incluye. Por eso las exclusiones se resuelven con objetos de configuración
 * aparte, usando el orden (el último que matchea gana).
 */
const consignas = ['src/app/tutorial/**', 'src/app/extras/*/ejercicio/**'];

/** Rutas donde el código debe estar impecable: son soluciones ya resueltas. */
const soluciones = ['src/app/tutorial/**/solucion/**', 'src/app/extras/*/solucion/**'];

/** Material de lectura o de navegación: no es consigna ni solución. */
const material = ['src/app/tutorial/index.ts', 'src/app/tutorial/25-next-steps/**'];

/**
 * Reglas relajadas para el código de las consignas.
 *
 * En una consigna hay imports, propiedades y parámetros sin usar que son
 * parte del ejercicio: son el andamiaje que el estudiante completa, no
 * código muerto. Se avisa, no se bloquea.
 */
const reglasConsigna = {
  '@typescript-eslint/no-unused-vars': 'warn',
  // Un `let` que el estudiante va a reasignar (por ejemplo, un HttpParams
  // inmutable) es correcto en una consigna.
  'prefer-const': 'warn',
};

/** Reglas estrictas: el código muerto es un error real. */
const reglasEstrictas = {
  '@typescript-eslint/no-unused-vars': 'error',
  'prefer-const': 'error',
};

export default tseslint.config(
  {
    ignores: [
      'dist/**',
      'tmp/**',
      '.angular/**',
      'node_modules/**',
      // Archivo generado por `npm run snapshot`.
      'src/app/restauracion/snapshot.ts',
    ],
  },
  {
    name: 'angular-lab/typescript',
    files: ['**/*.ts'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...angular.configs.tsRecommended,
    ],
    // Permite lintar las plantillas escritas dentro del propio componente.
    processor: angular.processInlineTemplates,
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  {
    name: 'angular-lab/consignas',
    files: consignas,
    // En flat config cada objeto registra sus propios plugins.
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: reglasConsigna,
  },
  {
    name: 'angular-lab/soluciones',
    files: soluciones,
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: reglasEstrictas,
  },
  {
    name: 'angular-lab/material',
    files: material,
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: reglasEstrictas,
  },
  {
    name: 'angular-lab/scripts-js',
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: {
        console: 'readonly',
        process: 'readonly',
      },
    },
  },
  {
    name: 'angular-lab/plantillas',
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended],
    languageOptions: {
      parser: angular.templateParser,
    },
  },
  prettier,
);
