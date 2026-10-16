/**
 * MODELO — Insumo del depósito: la "fila" de la práctica 08.
 *
 * Es el equivalente al `Empleado` de la práctica 05: un registro simple con
 * id autogenerado. La práctica 08 tiene su PROPIO modelo y su PROPIO servicio
 * (no reutiliza los de la 05) para que las carpetas no queden acopladas.
 */
export interface Insumo {
  id: number;
  nombre: string;
  categoria: string;
  stock: number;
  precio: number;
}

/** Insumo sin id: lo que viaja en el payload del diálogo (el id lo asigna el service). */
export type InsumoNuevo = Omit<Insumo, 'id'>;
