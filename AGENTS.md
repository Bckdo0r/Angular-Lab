# Angular Development Instructions (AGENTS.md)

You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## Language and Communication Rule
- **Spanish Output:** All code comments, documentation within the code, and chat explanations/responses provided to the user must be written **in Spanish**. Variable names, functions, and standard technical identifiers remain in English following standard coding conventions.

## 1. TypeScript Best Practices
- Use strict type checking.
- Prefer type inference when the type is obvious.
- Avoid the `any` type; use `unknown` when type is uncertain.

## 1.b. Static analysis (ESLint)

The project lints with **ESLint 9 + `@angular-eslint`** (`eslint.config.mjs`). Run `npm run lint`
before finishing, and `npm run verify` (lint + build + tests) before pushing.

- **Do NOT "fix" the unused-variable warnings in the exercise files.** In
  `src/app/tutorial/**` and `src/app/extras/*/ejercicio/` the unused imports, properties and
  parameters are the scaffolding the student is meant to use when solving the TODO. The linter
  downgrades them to warnings there on purpose; removing them would gut the exercise.
- In `solucion/` folders and shared material the same warnings are **errors**: dead code is a
  real defect there.
- `src/app/restauracion/snapshot.ts` is generated (`npm run snapshot`) and is excluded from linting.
- The CI workflow (`.github/workflows/ci.yml`) also regenerates the snapshot and fails if it
  changes. If you modify any exercise file, run `npm run snapshot` and commit the updated
  `snapshot.ts` in the same change.

## 2. Angular Architecture & Core Standards (v20+)
- Always use standalone components, directives, and pipes over NgModules.
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorators (Note: Do NOT set it explicitly if using Angular v22+, where `OnPush` is the default).
- Implement lazy loading (`loadComponent` / `loadChildren`) for all feature routes.
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead.
- Use `NgOptimizedImage` (`ngSrc`) for all static images (does not apply to inline base64 images).
- Avoid barrel files (`index.ts` with `export *`); prefer direct imports for optimal tree-shaking.

## 3. Component Design & APIs
- Keep components small and focused on a single responsibility.
- Use `input()` and `output()` functions instead of `@Input()` and `@Output()` decorators.
- Use `model()` for two-way bound properties with `[(prop)]` syntax instead of pairing `input()` with `output()`.
- Use `viewChild()` / `viewChildren()` and `contentChild()` / `contentChildren()` based on signals.
- Prefer Reactive Forms or Signal Forms (`@angular/forms/signals`) for new forms instead of Template-driven ones.
- Do NOT use `ngClass`; use class bindings instead (e.g., `[class.active]="isActive()"`).
- Do NOT use `ngStyle`; use style bindings instead (e.g., `[style.width.px]="width()"`).
- Do NOT import `CommonModule`. Import only the specific directives and pipes the template uses (e.g., `AsyncPipe`, `DatePipe`).
- Use relative paths to the component TS file for external templates and styles. Prefer inline templates for small components.

## 4. State Management & Reactivity (Signals + RxJS)
- Use `signal()` for local component state.
- Use `computed()` for derived state.
- Use `linkedSignal()` when state depends on multiple reactive sources that must stay synchronized or when tracking previous values.
- Keep state transformations pure and predictable. Do NOT use `.mutate()` on signals; use `.update()` or `.set()` instead.
- **RxJS Interoperability:** Avoid side effects in `effect()`. Convert observables to signals using `toSignal()` or consume them via `AsyncPipe` in templates. Clean up manual subscriptions with `takeUntilDestroyed()`.

## 5. Async Data & Signal Design Patterns (`resource` API)
Follow the official patterns from `angular.dev/ai/design-patterns` for asynchronous operations, HTTP requests, or streaming:
- **Use `resource()` / `httpResource()` instead of `effect()`:** Never trigger data fetching inside an `effect()`. Use `httpResource()` for standard REST calls and `resource()` for custom async loaders or external SDKs.
- **Decouple Live Input from Request Triggers:** Separate user input into two signals: one for live typing (e.g., as the user types) and a second "submitted" signal updated only on explicit submission. Bind the `resource` `params` computation ONLY to the submitted signal to prevent firing requests on every keystroke. Read non-triggering context signals (e.g., `sessionId`) inside the `loader` body rather than `params`.
- **Accumulate State with `linkedSignal`:** Use `linkedSignal` with its `previous` parameter (`computation: (newVal, previous) => ...`) when building append-only lists, chat histories, or preserving prior UI state while new data loads.
- **Resilient Templates (`isLoading`, `hasValue`, `reload`):** Avoid manual boolean loading flags. Drive templates using `myResource.isLoading()`, `myResource.hasValue()`, `myResource.value()`, and `myResource.error()`. Provide user-facing retry actions wired to `myResource.reload()`.
- **Streaming Responses:** For incremental data or streams, use the `stream` property of `resource()` returning a `signal<ResourceStreamItem<T>>` updated asynchronously as chunks arrive.

## 6. Templates
- Keep templates simple and avoid complex logic or inline array/object mutations.
- Use native control flow (`@if`, `@for`, `@empty`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`.
- Always include an efficient `track` expression inside `@for` loops (e.g., `@for (item of items(); track item.id)`).
- Use `@defer` blocks for heavy components that are not immediately needed above the fold.
- Do not assume globals like `new Date()` are available in templates, and avoid writing arrow functions inside template expressions.

## 7. Services & Dependency Injection
- Design services around a single responsibility.
- Use the `providedIn: 'root'` option for singleton services (or the `@Service` decorator in Angular v22+).
- Use the `inject()` function instead of constructor injection.

## 8. Accessibility (a11y) & Security
- **AXE & WCAG AA:** Code must pass all AXE checks and follow WCAG AA minimums (focus management, keyboard navigation, color contrast, and semantic ARIA attributes).
- **Security & Sanitization:** Avoid bypassing security (`bypassSecurityTrust*`) without strict justification.
- **No Client-side Secrets:** Never expose API keys or credentials in files compiled for the browser (such as `environment.ts`). Use server proxies, SSR environment variables, or secure secrets managers.
- **Resilience:** Design UIs to gracefully handle network failures, outages, or non-deterministic responses.

## 9. Context Sources (`llms.txt`) & MCP Tooling
When uncertain about modern APIs (`linkedSignal`, `resource`, `httpResource`, Signal Forms), retrieve context from official sources:
- **Documentation Index (`llms.txt`):** `https://v20.angular.dev/llms.txt` (or `https://angular.dev/llms.txt`) to locate specific guides.
- **Full Docs (`llms-full.txt`):** `https://v20.angular.dev/llms-full.txt` for comprehensive offline/remote reference filtering.
- **Angular CLI MCP Server (`ng mcp`):** If active in the environment, prioritize its native tools:
  - `list_projects`: Inspects `angular.json` workspace structure.
  - `get_best_practices`: Retrieves official standards.
  - `search_documentation`: Queries `https://angular.dev` for up-to-date API signatures.

## 10. Creating new exercises (tutorial lessons & practice modules)

Mandatory conventions when adding a tutorial lesson or an advanced practice module.
The general rules from sections 1–8 always apply; this section adds project-specific ones.

### 10.1 Folder structure

- Tutorial: `src/app/tutorial/NN-topic/` — practice: `src/app/extras/NN-topic/`.
  The folder name ALWAYS starts with a two-digit number (`05-crud-interactivo-con-modales`).
- `ejercicio/` folder (practices): code with incomplete logic marked with `TODO`s.
- `solucion/` folder: the same solution with didactic comments. Classes get the
  `Solucion` suffix (`EmpleadosPageSolucion`) and selectors `...-solucion`.
- One `README.md` per exercise: numbered steps guide, the working file, and the
  exercise/solution links at `http://localhost:4200/...`.
- Shared files for a practice (models, services) live at the practice folder
  level, NOT inside `ejercicio/`.

### 10.2 Exercise registration (all of it, or it won't work)

1. **Routes** in `src/app/app.routes.ts` (lazy via `loadComponent`), one entry
   for `NN` and another for `NN/solucion`. Child routes with guards go in the
   practice's own `rutas.ts` file (see `extras/04`).
2. **Index**: add the entry to the `LECCIONES` array (`tutorial/index.ts`) or
   `PRACTICAS` (`extras/index.ts`).

### 10.3 `TODO` format

- Comment placed exactly where the code goes, with the step number and the full
  instruction: `// TODO: [Step 3] - this.servicio.metodo(...): what it achieves.`
- The `ejercicio/` folder must compile and render without errors (the `TODO`s
  are NOT solved: that is what the student completes).
- The solution is never pasted into the exercise: it is written in `solucion/`.

### 10.4 Styles: mandatory tokens (NEVER hardcoded colors)

Every color/spacing uses the variables from `src/styles.css`, which already
handle light and dark mode automatically:

| Usage | Tokens |
|---|---|
| Page background / cards / text | `--fondo`, `--superficie`, `--texto` |
| Secondary text and borders | `--texto-suave`, `--borde` |
| Purple accent (links, buttons, badges) | `--acento`, `--acento-fuerte`, `--acento-suave`, `--acento-contraste` |
| Errors and alerts | `--error`, `--error-fuerte`, `--error-fondo`, `--error-borde` |
| Success | `--exito-fondo`, `--exito-borde` |
| Inputs and selects | `--entrada-borde`, `--entrada-fondo` |
| Shadows and focus | `--sombra-tarjeta`, `--resplandor` |

Style rules:

- Buttons: `border-radius: 8px`, `transition` of 0.15s, `font-weight: 600`,
  with `:hover` and `:focus-visible { outline: 2px solid var(--acento); outline-offset: 2px; }` states.
- Focused inputs: `border-color: var(--acento)` + `box-shadow: 0 0 0 3px var(--resplandor)`.
- Tables: row `:hover` on `var(--acento-suave)`, headers on `var(--texto-suave)`
  with `text-transform: uppercase`.
- ⚠️ **View encapsulation**: a component's styles do NOT apply to elements in a
  child component's template. If a table renders rows through a per-row
  component, the `td` elements are styled in the child's CSS (see `extras/01`).
- ⚠️ Dark mode is activated with the `oscuro` class on `<html>` (via
  `TemaService`). If you add a new color to the system, define it in `:root` AND
  in `html.oscuro` in `src/styles.css`, and test both themes in the browser.

### 10.5 Restore snapshot (baseline state)

The 🔄 buttons restore files from `src/app/restauracion/snapshot.ts`.

- **CRITICAL**: after creating or modifying an exercise, run `npm run snapshot`
  and commit the updated `snapshot.ts`. Otherwise the button restores an
  outdated version of the exercise.
- The snapshot includes ALL files of the lesson/practice folder except
  `solucion/` directories.

### 10.6 Checklist before finishing

1. `npm run build` with no errors or new warnings.
2. Exercise and solution render in both light and dark mode.
3. The `ejercicio/` compiles with the `TODO`s unsolved.
4. `npm run snapshot` run (if the exercise was created/modified).
5. The reset button restores the expected baseline.