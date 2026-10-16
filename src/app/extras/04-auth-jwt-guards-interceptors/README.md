# Práctica 04 — Auth JWT: Guards e Interceptores

## Cómo hacer la práctica

1. Levantá el servidor: `npm start`
2. Ejercicio: <http://localhost:4200/extras/04>
3. Solución para comparar en otra pestaña: <http://localhost:4200/extras/04/solucion>
4. Archivos de trabajo: `src/app/extras/04-auth-jwt-guards-interceptors/ejercicio/` — buscá los comentarios `// TODO:`. Las páginas usan template inline (son chicas); tu trabajo es en `auth.service.ts`, `auth.guard.ts`, `auth.interceptor.ts`, `login-page.ts` y `admin-page.ts`.
5. El backend sigue siendo 100% offline (`src/app/extras/backend-falso.ts`): `POST /api/login` devuelve un JWT simulado y `GET /api/panel` exige Bearer + rol admin.

## Objetivo

En cualquier empresa real, hay pantallas que solo ven usuarios logueados y otras que solo ve un admin. Acá vas a implementar ese circuito completo con las herramientas de Angular:

1. **Autenticación con JWT**: login que guarda el token, lo decodifica y restaura la sesión al recargar.
2. **Guards** (`CanActivateFn`): decidir ANTES de pintar una ruta si el usuario puede verla.
3. **Interceptores** (`HttpInterceptorFn`): agregar `Authorization: Bearer <token>` a TODAS las peticiones sin tocar cada servicio.

## Conceptos clave

### 1. El JWT simulado y su decodificación

Un JWT son tres segmentos base64 separados por puntos: `header.payload.firma`. El payload es el interesante (quién sos y qué rol tenés):

```ts
decodificarToken(token: string): PayloadJwt | null {
  try {
    return JSON.parse(atob(token.split('.')[1])) as PayloadJwt;
  } catch {
    return null;
  }
}
```

Fijate: NO se "confía" en el token — el `try/catch` devuelve `null` ante cualquier basura. (En producción, la firma se valida en el servidor; acá la simulamos.)

### 2. Guards: `CanActivateFn` y `createUrlTree`

Un guard devuelve `true` (pasar), `false` (bloquear) o un `UrlTree` (redirigir — la forma pro):

```ts
export const authGuard: CanActivateFn = (route, state) => {
  if (auth.usuarioActual()) return true;
  return router.createUrlTree(['/extras/04/login'], {
    queryParams: { returnUrl: state.url },
  });
};
```

`state.url` es la ruta que el usuario quería visitar: el login la usa para volver ahí después de loguear (patrón **returnUrl**). Y el guard de rol es una **fábrica**, como el validador parametrizable de la práctica 02:

```ts
export function roleGuard(rolRequerido: Rol): CanActivateFn {
  return (route, state) => { /* pregunta por rolRequerido */ };
}
```

En cascada: `canActivate: [authGuard, roleGuard('admin')]` — primero sesión, después rol.

### 3. Interceptores: un solo lugar para la cabecera

En vez de agregar la cabecera a mano en cada servicio, un interceptor lo hace por TODOS:

```ts
export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
  }
  return next(req);
};
```

`req.clone()` porque `HttpRequest` es inmutable (igual que `HttpParams` en la 03). Y en `app.config.ts` el orden importa: el interceptor de token va **primero**, así envuelve al resto (incluido el backend falso) y el token ya está cuando el backend lo mira.

> ⚠️ **Importante para la solución:** el interceptor registrado globalmente en `app.config.ts` es el del **ejercicio**. Una vez que implementes ese (Paso 7), tanto `/extras/04` como `/extras/04/solucion` funcionan; el interceptor de `solucion/` sirve solo de referencia y no está registrado.

### 4. 401 vs 403 (no son lo mismo)

- **401 Unauthorized**: no sé quién sos → falta (o es inválido) el token.
- **403 Forbidden**: sé quién sos y no alcanza → tu rol no es admin.

El panel admin de la práctica te muestra los dos: 401 antes del Paso 7, 403 con `ana/ana123`.

## Consigna paso a paso (checklist)

Abrí el ejercicio (<http://localhost:4200/extras/04>) y recorré las rutas: con los guards stub (`return true`) TODO está "abierto", incluso sin sesión. Esa es la brecha de seguridad que vas a cerrar.

- [ ] **Paso 1 — `auth.service.ts`:** restaurá la sesión en el constructor: leer `localStorage.getItem(TOKEN_KEY)`, decodificar y setear `usuarioActual` si es válido.
- [ ] **Paso 2 — `auth.service.ts`:** implementá `decodificarToken()` (try/catch, `atob` del segmento medio).
- [ ] **Paso 3 — `auth.service.ts`:** implementá `login()` (POST + `map`) y `guardarSesion()` (guardar token, decodificar, setear la señal, devolver el usuario).
- [ ] **Paso 4 — `auth.service.ts`:** implementá `cerrarSesion()`.
- [ ] **Paso 5 — `auth.guard.ts`:** implementá `authGuard`: sesión → `true`; si no, `createUrlTree` al login con `returnUrl`.
- [ ] **Paso 6 — `auth.guard.ts`:** implementá `roleGuard(rolRequerido)`: sin sesión → login; con sesión y rol distinto → perfil; rol correcto → `true`.
- [ ] **Paso 7 — `auth.interceptor.ts`:** implementá el Bearer: leer token, `req.clone({ setHeaders: { Authorization: \`Bearer ${token}\` } })` y `next(reqConToken)`.
- [ ] **Paso 8 — `login-page.ts`:** en `ingresar()`, llamá `auth.login(...)` y en `next` navegá al `returnUrl` (o a `/extras/04/perfil`); en `error` mostrá `e.message`.
- [ ] **Paso 9 — `admin-page.ts`:** consultá `GET /api/panel` con `inject(HttpClient)` y seteá `datos` o un `mensajeError` amigable (401/403).
- [ ] **Paso 10:** probá los criterios de aceptación de abajo.

## Criterios de aceptación

Probá en <http://localhost:4200/extras/04>:

1. **Estado inicial:** las 3 rutas abren (guards stub), pero "Panel admin" muestra el 401 amigable (el interceptor todavía no manda el token).
2. Login con `admin/admin123` → redirige al perfil conservando `returnUrl` si venía de una ruta protegida.
3. Al loguearse, el layout muestra la sesión (nombre + rol) — el payload del JWT fue decodificado con `atob`.
4. Tras implementar el interceptor: "Panel admin" muestra los datos y `rolRecibido: 'admin'`.
5. `roleGuard`: con `ana/ana123` (rol user), la ruta `/extras/04/admin` redirige (no muestra el panel).
6. Recargar la página con sesión abierta sigue logueado (restauración desde localStorage).
7. "Cerrar sesión" vuelve al estado sin sesión y las rutas protegidas redirigen al login.
8. En `/extras/04/solucion` el flujo completo funciona solo (aclarar en el README que el interceptor registrado globalmente en `app.config.ts` es el del ejercicio: una vez implementado ese, ambas vistas funcionan; el de `solucion/` sirve de referencia).

## Solución

La versión resuelta y comentada está en `src/app/extras/04-auth-jwt-guards-interceptors/solucion/` y se navega en `/extras/04/solucion`.
