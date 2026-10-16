/**
 * DATOS FALSOS EN MEMORIA — Práctica 07 (ruteo avanzado).
 *
 * Sin HTTP: esta práctica es de ROUTING puro. Los datos viven acá para que
 * el listado y el detalle compartan la misma fuente, igual que compartirían
 * un backend. Nada de services con HttpClient: lo que se practica es la URL.
 */

export interface Empleado {
  id: number;
  nombre: string;
  area: string;
  seniority: 'Junior' | 'Semi' | 'Senior';
  /** Pestañas que ofrece su ficha en el detalle; 'auditoria' siempre está. */
  tabs: string[];
}

export const AREAS = ['Desarrollo', 'QA', 'Datos', 'Infra'] as const;

export const EMPLEADOS: readonly Empleado[] = [
  { id: 1, nombre: 'Ana Gutiérrez', area: 'Desarrollo', seniority: 'Senior', tabs: ['resumen', 'proyectos', 'auditoria'] },
  { id: 2, nombre: 'Bruno Díaz', area: 'QA', seniority: 'Semi', tabs: ['resumen', 'auditoria'] },
  { id: 3, nombre: 'Carla Pérez', area: 'Datos', seniority: 'Senior', tabs: ['resumen', 'proyectos', 'auditoria'] },
  { id: 4, nombre: 'Diego Suárez', area: 'Desarrollo', seniority: 'Junior', tabs: ['resumen', 'auditoria'] },
  { id: 5, nombre: 'Elena Rojas', area: 'Infra', seniority: 'Semi', tabs: ['resumen', 'proyectos', 'auditoria'] },
  { id: 6, nombre: 'Fabio Lara', area: 'Datos', seniority: 'Junior', tabs: ['resumen', 'auditoria'] },
];

/** Búsqueda por ID (el parámetro de ruta llega como string: se convierte). */
export function buscarEmpleado(id: number): Empleado | undefined {
  return EMPLEADOS.find((empleado) => empleado.id === id);
}
