export type Area = 'IT' | 'RRHH' | 'Ventas';

/** Un empleado del equipo, tal como lo devuelve `GET /api/empleados`. */
export interface Empleado {
  id: number;
  nombre: string;
  area: Area;
  seniority: string;
}
