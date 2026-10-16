# Práctica 07 — Ruteo avanzado SPA

**Carpeta:** `07-ruteo-avanzado/` · **Ruta:** `/extras/07` (con `rutas.ts` propio)

## Objetivo

Una mini-intranet con listado → detalle por ID, filtros que viven en la URL, página 404,
menú con ítem activo y una pantalla admin que solo existe para ciertos roles. Todo ruteo
puro: **sin HTTP**, con datos falsos en memoria (`empleados-mock.ts`).

Conceptos que practica:

- Parámetro de ruta `:id` + `withComponentInputBinding()` → `input()` en el componente
  (la forma moderna: nada de `ActivatedRoute` en el constructor).
- Navegación programática `Router.navigate([...])` vs `routerLink`.
- **Query params**: escribir/leer/restaurar filtros en la URL (compartir una vista por link).
- Ruta comodín `**` → 404, y por qué **el orden de las rutas importa**.
- `routerLinkActive` + `routerLinkActiveOptions` en un menú semántico.
- Lazy loading con `loadComponent` (observar el bundle partido en DevTools → Network).
- Guards como composición: `canMatch` vs `canActivate`.
- Rutas hijas con `children` y sub-layout propio.

## Cómo abrir

```bash
npm start
```

- Ejercicio: <http://localhost:4200/extras/07>
- Solución: <http://localhost:4200/extras/07/solucion>

## Pasos (guían los `// TODO: [Paso N]` del código)

1. **El árbol de rutas** — Leé `rutas.ts`: `''` (listado) / `'detalle/:id'` / sub-layout
   `panel` con hijos `equipo` y `admin` / `**` (404) al final. Fijate que cada página se
   carga con `loadComponent`: es lazy. En `app.routes.ts` esta práctica se registra con un
   spread (`...rutasPractica07`) al final del array global.
2. **El ID llega por `input()`** — `ejercicio/detalle-page.ts`: `id = input.required<string>()`.
   `withComponentInputBinding()` está activado globalmente en `app.config.ts`, así que el
   `:id` de la URL se bindea solo. Probá `/extras/07/detalle/3` y `/extras/07/detalle/9999`.
3. **Volver conservando filtros** — TODO `[Paso 3]`: el botón "volver al listado" del
   detalle debe usar `Router.navigate` reenviando los query params `q` y `area` que llegaron
   del listado (`queryParamsHandling="preserve"` en el link "Ver ficha" los trae hasta acá).
4. **Filtros en la URL** — Tres TODOs:
   - `[Paso 4a]` en `ejercicio/listado-page.ts`: escribir los filtros con
     `Router.navigate` + `queryParams` (y limpiarlos con `null`).
   - `[Paso 4b]`: restaurar los filtros al iniciar el componente desde los inputs `q`/`area`
     (llegan bindeados de los query params).
   - `[Paso 4c]` en `ejercicio/detalle-page.ts`: la pestaña activa se escribe como
     `?tab=...` (con `queryParamsHandling: 'merge'`) y se restaura al recargar.
5. **El 404 y el orden** — Sin TODO en el código: experimento mental (y en una copia, si
   querés verlo romper). ¿Qué pasa si `**` va primero? Que TODA la app cae en 404. Por eso
   es la última entrada de `rutas.ts` y por eso el spread global va al final.
6. **Menú con ítem activo** — TODO `[Paso 6]` en `ejercicio/panel-layout.ts`: agregá
   `routerLinkActive="activo"` y `[routerLinkActiveOptions]="{ exact: true }"` a los links
   del panel. La clase sigue a la URL, no a clicks.
7. **`canMatch` en las rutas de admin** — TODO `[Paso 7]` en `ejercicio/rol.guard.ts`:
   implementá `soloAdminCanMatch` leyendo el rol simulado de localStorage
   (clave `practica07-rol`, el toggle vive en el panel). Con rol "visitante", la ruta
   `admin` **desaparece**: caés al 404 y en Network **no baja ningún chunk** de la página
   admin. Esa es la diferencia con el `canActivate` de la práctica 04 (que decide con la
   ruta ya cargada y te redirige con mensaje).
8. **Rutas hijas con sub-layout** — Leé en `rutas.ts` el bloque de `extras/07/panel`:
   el layout (`PanelLayout`) se carga lazy una vez y `equipo`/`admin` se pintan en su
   `<router-outlet />`. En la 04 solo leíste esta estructura; acá está escrita entera para
   que la recorras línea por línea.

## Criterios de aceptación

- Entrar directo a `/extras/07/detalle/9999` muestra la vista (el ID llega por `input()`, no por subscribe).
- Recargar `/extras/07/detalle/7?tab=auditoria` restaura el tab.
- El listado filtrado se puede compartir por link y al abrirlo los filtros reaparecen.
- Cualquier path inválido cae en 404 sin romper el menú.

## DevTools: mirá los lazy chunks

Abrí DevTools → **Network**, filtrá por **JS** y navegar:

1. En la carga inicial **no** están las páginas de la práctica: cada una es un chunk aparte
   (`listado-page-*.js`, `detalle-page-*.js`, `panel-layout-*.js`, ...) que baja recién al
   navegar a su ruta (gracias a `loadComponent`).
2. Tocá "Ver ficha": aparece el chunk del detalle en ese momento, no antes.
3. Con el rol en "visitante", tocá "Admin": **no baja ningún chunk** — `canMatch` removió la
   ruta antes de pedir el bundle (Paso 7).

## Estructura

```
07-ruteo-avanzado/
├── rutas.ts              # Árbol de rutas de la práctica ('**' SIEMPRE última)
├── empleados-mock.ts     # 6 personas en memoria (id, nombre, area, seniority, tabs)
├── ejercicio/            # Lo que completás: TODO: [Paso N]
│   ├── listado-page.ts/.html/.css
│   ├── detalle-page.ts
│   ├── no-encontrado-page.ts
│   ├── panel-layout.ts   # Sub-layout con <router-outlet /> y menú
│   ├── admin-page.ts     # Instrumento del experimento canMatch
│   ├── equipo-page.ts    # Ruta hija sin guard
│   └── rol.guard.ts      # TODO: soloAdminCanMatch
└── solucion/             # Mismo árbol, implementado (clases/selector con sufijo Solucion)
```

La solución comparte la clave de localStorage con el ejercicio: el rol simulado es el
mismo "usuario" en las dos.
