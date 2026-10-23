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
3. **Interceptores** (`HttpInterceptorFn`): agregar `Authorization: Bearer <token>` a las consultas protegidas de la API sin repetirlo en cada servicio.

## Conceptos clave

### 1. El JWT simulado y su decodificación

El simulador usa tres segmentos separados por puntos: `header.payload.firma`.
Codifica el JSON con base64 convencional y usa una firma de texto fijo: **no genera
JWT reales**, que usan base64url y verificación criptográfica. El payload incluye
`usuario`, `nombre`, `rol` y `exp` (segundos desde la época Unix).

```ts
decodificarToken(token: string): PayloadJwt | null {
  try {
    return JSON.parse(atob(token.split('.')[1])) as PayloadJwt;
  } catch {
    return null;
  }
}
```

Ese fragmento solo ilustra la decodificación. `try/catch` detecta errores de lectura,
pero `as PayloadJwt` no valida el objeto. En el paso 2 comprobá también los campos,
el rol y `exp > Date.now() / 1000`, como hace la solución. Decodificar y comprobar
la forma **no verifica autenticidad**: el simulador vive en el navegador y sus roles
se pueden alterar. En una aplicación real, el servidor debe verificar token y permisos.
Los guards controlan navegación y experiencia de uso; no protegen datos del servidor.

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

Ambos guards forman la condición de acceso: `canActivate: [authGuard, roleGuard('admin')]`.
No dependas de que sus efectos se ejecuten secuencialmente: cada guard debe resolver
su propio caso de sesión ausente y devolver `UrlTree` para redirigir.

### 3. Interceptores: un solo lugar para la cabecera

En vez de repetir la cabecera en cada servicio, el interceptor la agrega al endpoint protegido:

```ts
export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token && req.url === '/api/panel') {
    return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
  }
  return next(req);
};
```

`req.clone()` porque `HttpRequest` es inmutable (igual que `HttpParams` en la 03). Y en `app.config.ts` el orden importa: el interceptor de token va **primero**, así envuelve al resto (incluido el backend falso) y el token ya está cuando el backend lo mira.

El interceptor del **ejercicio** está registrado globalmente en `app.config.ts`.
La **solución** registra su propio `HttpClient`, interceptor y servicio en `rutas.ts`:
funciona completa aunque los TODO del ejercicio sigan pendientes. Se provee también
el servicio en esa ruta para que reciba ese cliente HTTP, en lugar del cliente raíz.
No envíes el token a direcciones externas ni a recursos que no lo necesitan.

### 4. 401 vs 403 (no son lo mismo)

- **401 Unauthorized**: no sé quién sos → falta (o es inválido) el token.
- **403 Forbidden**: sé quién sos y no alcanza → tu rol no es admin.

El endpoint simulado responde 401 sin token o con uno inválido/vencido, y 403 con un
token vigente de `ana`. Una vez implementado `roleGuard`, Ana será redirigida antes
de consultar el panel; para observar el 403 podés probar el endpoint en un test aislado.

## Consigna paso a paso (checklist)

Abrí el ejercicio (<http://localhost:4200/extras/04>) y recorré las rutas: con los guards stub (`return true`) TODO está "abierto", incluso sin sesión. Esa es la brecha de seguridad que vas a cerrar.

- [ ] **Paso 1 — `auth.service.ts`:** restaurá la sesión en el constructor: leer `localStorage.getItem(TOKEN_KEY)`, decodificar y setear `usuarioActual` si es válido.
- [ ] **Paso 2 — `auth.service.ts`:** implementá `decodificarToken()`: try/catch, `atob` del segmento medio, comprobación de campos/rol y vigencia de `exp` en segundos.
- [ ] **Paso 3 — `auth.service.ts`:** implementá `login()` (POST + `map`) y `guardarSesion()` (guardar token, decodificar, setear la señal, devolver el usuario).
- [ ] **Paso 4 — `auth.service.ts`:** implementá `cerrarSesion()`.
- [ ] **Paso 5 — `auth.guard.ts`:** implementá `authGuard`: sesión → `true`; si no, `createUrlTree` al login con `returnUrl`.
- [ ] **Paso 6 — `auth.guard.ts`:** implementá `roleGuard(rolRequerido)`: sin sesión → login; con sesión y rol distinto → perfil; rol correcto → `true`.
- [ ] **Paso 7 — `auth.interceptor.ts`:** para `/api/panel`, leé el token, cloná la petición con la cabecera `Authorization: Bearer <token>` y pasá el clon a `next`. Para las demás peticiones, usá `next(req)`.
- [ ] **Paso 8 — `login-page.ts`:** en `ingresar()`, llamá `auth.login(...)` y en `next` navegá al `returnUrl` (o a `/extras/04/perfil`); en `error` mostrá `e.message`.
- [ ] **Paso 9 — `admin-page.ts`:** consultá `GET /api/panel` con `inject(HttpClient)` y seteá `datos` o un `mensajeError` amigable (401/403).
- [ ] **Paso 10:** probá los criterios de aceptación de abajo.

## Criterios de aceptación

Probá en <http://localhost:4200/extras/04>:

1. **Estado inicial:** las tres rutas abren porque los guards son stubs. El panel todavía no consulta nada: su método también es un TODO. Después del paso 9 y antes del 7 muestra el 401 amigable.
2. Login con `admin/admin123` → redirige a `returnUrl` si venía de una ruta protegida; si no, al perfil.
3. Al loguearse, el layout muestra la sesión (nombre + rol) — el payload del JWT fue decodificado con `atob`.
4. Tras implementar el interceptor: "Panel admin" muestra los datos y `rolRecibido: 'admin'`.
5. `roleGuard`: con `ana/ana123` (rol user), la ruta `/extras/04/admin` redirige (no muestra el panel).
6. Recargar la página con sesión abierta sigue logueado (restauración desde localStorage).
7. "Cerrar sesión" vuelve al estado sin sesión y las rutas protegidas redirigen al login.
8. En `/extras/04/solucion` el flujo completo funciona con el ejercicio sin completar. El perfil muestra también el nombre de usuario, coherente con el payload.

## Límites y estado de la simulación

Los diez pasos son parte del ejercicio; leer `rutas.ts` y el simulador ayuda a entender
el entorno. No hay servidor real ni verificación de firma. El token persiste en
`localStorage`; ejercicio y solución comparten la clave `pp_token`, pero sus señales
de sesión son distintas. Recargá al comparar una sesión que cambiaste desde la otra
vista. La solución valida vencimiento al leer/guardar el token y el simulador lo valida
en el endpoint; no hay cierre automático por temporizador durante una pantalla abierta.

Referencia: [guards y límites del control de acceso en el cliente](https://angular.dev/guide/routing/route-guards).

## Solución

La versión resuelta y comentada está en `src/app/extras/04-auth-jwt-guards-interceptors/solucion/` y se navega en `/extras/04/solucion`.
