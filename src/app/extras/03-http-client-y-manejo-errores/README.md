# Práctica 03 — HttpClient y manejo de errores

## Cómo hacer la práctica

1. Iniciá el servidor con `npm start`.
2. Abrí el [ejercicio](http://localhost:4200/extras/03).
3. Completá los `TODO: [Paso N]` en `ejercicio/empleados.service.ts` y `ejercicio/empleados-page.ts`.
4. Compará con la [solución](http://localhost:4200/extras/03/solucion).

Los archivos están en `src/app/extras/03-http-client-y-manejo-errores/`.
Las plantillas, estilos y modelos ya están preparados. Todos los pasos siguientes
son parte del ejercicio; explorar otros códigos de estado es opcional.

## Pasos

1. **Lectura:** identificá `HttpClient`, el modelo `Empleado` y las señales de la página.
   El backend está simulado por `src/app/extras/backend-falso.ts`: no requiere servidor externo.
2. **Servicio:** en `getEmpleados(area)`, creá `HttpParams` y reasigná el resultado de
   `params.set('area', area)` cuando haya un área seleccionada.
3. **Servicio:** armá `HttpHeaders` con `X-Canal: practica-03`. Sin esa cabecera,
   el simulador devuelve 400.
4. **Servicio:** completá `manejarError()` para traducir 0, 400, 404 y 500 a mensajes
   comprensibles y devolver `throwError(() => new Error(mensaje))`.
5. **Servicio:** pasá `{ params, headers }` como **segundo argumento** de `get()`.
   La conexión de `catchError` con `manejarError` ya está escrita.
6. **Servicio:** completá `getEmpleado(id)` y `getReporte()` con URL, cabecera y
   manejo de errores. `/api/reporte` devuelve 500 a propósito; el legajo 999 devuelve 404.
7. **Página:** en `cargar(area)`, activá la carga, limpiá el mensaje anterior y consumí
   el servicio. Guardá la lista en `next`; mostrá el error en `error`; apagá la carga en ambos.
8. **Página:** completá `verEmpleadoInexistente()` consultando el legajo 999.
9. **Página:** completá `generarReporte()` y comprobá la alerta del fallo 500.

## Comprobación y límites didácticos

- «Cargar equipo» muestra seis empleados; «Solo IT», tres; «Solo RRHH», dos.
- Un legajo inexistente y el reporte muestran errores legibles y terminan la carga.
- Después de un error, «Cargar equipo» vuelve a funcionar.
- En el punto de partida los botones aún no hacen consultas. Si completás la página
  antes del servicio, el `EMPTY` provisional puede dejar la carga encendida: es una
  tarea intencional pendiente del paso 4, no el comportamiento final.
- La solución usa suscripciones independientes para estudiar una llamada por vez.
  Esperá a que termine cada operación antes de iniciar otra. La cancelación de búsquedas
  continuas se trabaja en la [práctica 06](http://localhost:4200/extras/06).
- Todo HTTP de esta práctica se resuelve en el navegador. La latencia es un `timer`
  del simulador: estas consultas no aparecen como solicitudes reales en Network.

Referencia: [peticiones con HttpClient](https://angular.dev/guide/http/making-requests).
