export type Area = 'IT' | 'RRHH' | 'Ventas';

/** Un empleado de la "empresa": el modelo de la práctica 05. */
export interface Empleado {
  id: number;
  nombre: string;
  email: string;
  area: Area;
  seniority: string;
}

/** Un empleado sin id: lo que llega del formulario al dar de alta. */
export type EmpleadoNuevo = Omit<Empleado, 'id'>;
