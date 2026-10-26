/**
 * CATÁLOGO DE ACTIVIDADES DEL CURSO
 *
 * Fuente única de datos de las lecciones y las prácticas. Los índices de
 * `src/app/tutorial/` y `src/app/extras/` toman los datos de acá, y las
 * funcionalidades de la página (dificultad, requisitos, recorrido recomendado
 * y seguimiento de progreso) se apoyan en el mismo catálogo.
 *
 * Los prerrequisitos se expresan con ids (`'tutorial/08'`), nunca con texto:
 * el título se resuelve contra este mismo catálogo, así un requisito no
 * puede quedar desactualizado si se renombra una lección.
 */

import { Actividad, Leccion, Practica } from './actividad';

/** Lecciones del tutorial, en orden. */
export const LECCIONES: Leccion[] = [
  {
    id: 'tutorial/01',
    tipo: 'leccion',
    numero: '01',
    titulo: 'Anatomía de un Componente',
    dificultad: 'iniciada',
    prerrequisitos: [],
  },
  {
    id: 'tutorial/02',
    tipo: 'leccion',
    numero: '02',
    titulo: 'Actualizar la clase del componente',
    dificultad: 'iniciada',
    prerrequisitos: ['tutorial/01'],
  },
  {
    id: 'tutorial/03',
    tipo: 'leccion',
    numero: '03',
    titulo: 'Componer componentes',
    dificultad: 'iniciada',
    prerrequisitos: ['tutorial/02'],
  },
  {
    id: 'tutorial/04',
    tipo: 'leccion',
    numero: '04',
    titulo: 'Control de flujo: @if',
    dificultad: 'iniciada',
    prerrequisitos: ['tutorial/03'],
  },
  {
    id: 'tutorial/05',
    tipo: 'leccion',
    numero: '05',
    titulo: 'Control de flujo: @for',
    dificultad: 'iniciada',
    prerrequisitos: ['tutorial/04'],
  },
  {
    id: 'tutorial/06',
    tipo: 'leccion',
    numero: '06',
    titulo: 'Property binding (enlace de propiedades)',
    dificultad: 'iniciada',
    prerrequisitos: ['tutorial/05'],
  },
  {
    id: 'tutorial/07',
    tipo: 'leccion',
    numero: '07',
    titulo: 'Manejo de eventos',
    dificultad: 'iniciada',
    prerrequisitos: ['tutorial/06'],
  },
  {
    id: 'tutorial/08',
    tipo: 'leccion',
    numero: '08',
    titulo: 'Inputs: comunicación padre → hijo',
    dificultad: 'iniciada',
    prerrequisitos: ['tutorial/07'],
  },
  {
    id: 'tutorial/09',
    tipo: 'leccion',
    numero: '09',
    titulo: 'Outputs: comunicación hijo → padre',
    dificultad: 'iniciada',
    prerrequisitos: ['tutorial/08'],
  },
  {
    id: 'tutorial/10',
    tipo: 'leccion',
    numero: '10',
    titulo: 'Vistas diferibles (@defer)',
    dificultad: 'intermedia',
    prerrequisitos: ['tutorial/09'],
  },
  {
    id: 'tutorial/11',
    tipo: 'leccion',
    numero: '11',
    titulo: 'Optimización de imágenes (NgOptimizedImage)',
    dificultad: 'intermedia',
    prerrequisitos: ['tutorial/10'],
  },
  {
    id: 'tutorial/12',
    tipo: 'leccion',
    numero: '12',
    titulo: 'Habilitar el routing',
    dificultad: 'intermedia',
    prerrequisitos: ['tutorial/11'],
  },
  {
    id: 'tutorial/13',
    tipo: 'leccion',
    numero: '13',
    titulo: 'Definir una ruta',
    dificultad: 'intermedia',
    prerrequisitos: ['tutorial/12'],
  },
  {
    id: 'tutorial/14',
    tipo: 'leccion',
    numero: '14',
    titulo: 'Navegación con routerLink',
    dificultad: 'intermedia',
    prerrequisitos: ['tutorial/13'],
  },
  {
    id: 'tutorial/15',
    tipo: 'leccion',
    numero: '15',
    titulo: 'Formularios',
    dificultad: 'iniciada',
    prerrequisitos: ['tutorial/14'],
  },
  {
    id: 'tutorial/16',
    tipo: 'leccion',
    numero: '16',
    titulo: 'Valores de controles de formulario',
    dificultad: 'iniciada',
    prerrequisitos: ['tutorial/15'],
  },
  {
    id: 'tutorial/17',
    tipo: 'leccion',
    numero: '17',
    titulo: 'Formularios reactivos',
    dificultad: 'intermedia',
    prerrequisitos: ['tutorial/16'],
  },
  {
    id: 'tutorial/18',
    tipo: 'leccion',
    numero: '18',
    titulo: 'Validación de formularios',
    dificultad: 'intermedia',
    prerrequisitos: ['tutorial/17'],
  },
  {
    id: 'tutorial/19',
    tipo: 'leccion',
    numero: '19',
    titulo: 'Crear un servicio inyectable',
    dificultad: 'intermedia',
    prerrequisitos: ['tutorial/18'],
  },
  {
    id: 'tutorial/20',
    tipo: 'leccion',
    numero: '20',
    titulo: 'Inyección de dependencias con inject()',
    dificultad: 'intermedia',
    prerrequisitos: ['tutorial/19'],
  },
  {
    id: 'tutorial/22',
    tipo: 'leccion',
    numero: '22',
    titulo: 'Pipes',
    dificultad: 'iniciada',
    prerrequisitos: ['tutorial/20'],
  },
  {
    id: 'tutorial/23',
    tipo: 'leccion',
    numero: '23',
    titulo: 'Formatear datos con pipes',
    dificultad: 'iniciada',
    prerrequisitos: ['tutorial/22'],
  },
  {
    id: 'tutorial/24',
    tipo: 'leccion',
    numero: '24',
    titulo: 'Crear un pipe personalizado',
    dificultad: 'intermedia',
    prerrequisitos: ['tutorial/23'],
  },
  {
    id: 'tutorial/25',
    tipo: 'leccion',
    numero: '25',
    titulo: 'Próximos pasos',
    dificultad: 'iniciada',
    prerrequisitos: ['tutorial/24'],
    soloLectura: true,
  },
];

/** Prácticas avanzadas, en orden. */
export const PRACTICAS: Practica[] = [
  {
    id: 'extras/01',
    tipo: 'practica',
    numero: '01',
    titulo: 'Comunicación y Bus de Eventos',
    foco: 'Enlace bidireccional personalizado con model() y un bus de eventos desacoplado con RxJS (Subject + Observable) para que un nieto hable con su abuelo.',
    dificultad: 'iniciada',
    prerrequisitos: ['tutorial/08', 'tutorial/09', 'tutorial/19'],
    disponible: true,
  },
  {
    id: 'extras/02',
    tipo: 'practica',
    numero: '02',
    titulo: 'Formularios Reactivos Avanzados',
    foco: 'FormGroup/FormControl, estados (dirty, touched, invalid) en la UI y un validador personalizado parametrizable (ValidatorFn) que bloquea dominios de email.',
    dificultad: 'intermedia',
    prerrequisitos: ['tutorial/17', 'tutorial/18'],
    disponible: true,
  },
  {
    id: 'extras/03',
    tipo: 'practica',
    numero: '03',
    titulo: 'HttpClient y Manejo de Errores',
    foco: 'HttpClient con HttpHeaders y HttpParams, y captura elegante de errores 404/500 con catchError para mostrar alertas amigables.',
    dificultad: 'intermedia',
    prerrequisitos: ['tutorial/19', 'tutorial/20'],
    disponible: true,
  },
  {
    id: 'extras/04',
    tipo: 'practica',
    numero: '04',
    titulo: 'Auth JWT: Guards e Interceptores',
    foco: 'Login con JWT simulado en localStorage, HttpInterceptorFn que inyecta el Bearer token y authGuard/roleGuard con createUrlTree.',
    dificultad: 'avanzada',
    prerrequisitos: ['extras/03', 'tutorial/14'],
    disponible: true,
  },
  {
    id: 'extras/05',
    tipo: 'practica',
    numero: '05',
    titulo: 'CRUD Interactivo con Modales',
    foco: 'Tabla con paginación y filtrado local, confirmación de borrado y edición con un modal que precarga el formulario con setValue()/patchValue().',
    dificultad: 'intermedia',
    prerrequisitos: ['tutorial/16', 'tutorial/17'],
    disponible: true,
  },
  {
    id: 'extras/06',
    tipo: 'practica',
    numero: '06',
    titulo: 'RxJS y Asincronía Reactiva',
    foco: 'Buscador con Subject + debounceTime/distinctUntilChanged + switchMap para cancelar respuestas viejas, takeUntilDestroyed() contra fugas y estados (cargando/vacio/error) como signals.',
    dificultad: 'avanzada',
    prerrequisitos: ['tutorial/20', 'extras/03'],
    disponible: true,
  },
  {
    id: 'extras/07',
    tipo: 'practica',
    numero: '07',
    titulo: 'Ruteo Avanzado SPA',
    foco: 'Parámetros :id con input() y withComponentInputBinding, query params para compartir filtros por link, 404 con ruta comodín, routerLinkActive, canMatch y rutas hijas.',
    dificultad: 'avanzada',
    prerrequisitos: ['tutorial/08', 'tutorial/14'],
    disponible: true,
  },
  {
    id: 'extras/08',
    tipo: 'practica',
    numero: '08',
    titulo: 'Angular Material: Diálogo, Tabla y Feedback',
    foco: 'Refactor de CRUD a la forma oficina: MatTable + MatPaginator, alta/edición en MatDialog con MAT_DIALOG_DATA y feedback con MatSnackBar con acción deshacer.',
    dificultad: 'avanzada',
    prerrequisitos: ['extras/05'],
    disponible: true,
  },
  {
    id: 'extras/09',
    tipo: 'practica',
    numero: '09',
    titulo: 'Estado Global con NgRx',
    foco: 'Acciones como única fuente de mutación, reducer puro e inmutable, createFeature con selectors memoizados y el puente store.select() → toSignal() para la plantilla.',
    dificultad: 'avanzada',
    prerrequisitos: ['tutorial/07', 'extras/01', 'extras/06'],
    disponible: true,
  },
  {
    id: 'extras/10',
    tipo: 'practica',
    numero: '10',
    titulo: 'Testing de HTTP y Validadores',
    foco: 'TestBed + provideHttpClientTesting, HttpTestingController (expectOne/flush/error/verify), stub de servicios y tests puros de un ValidatorFn: probar la regla, no el texto.',
    dificultad: 'avanzada',
    prerrequisitos: ['extras/02', 'extras/03'],
    disponible: true,
  },
];

/** Todas las actividades del curso, tutorial primero y prácticas después. */
export const ACTIVIDADES: Actividad[] = [...LECCIONES, ...PRACTICAS];

/** Busca una actividad por su id. Devuelve `undefined` si no existe. */
export function actividadPorId(id: string): Actividad | undefined {
  return ACTIVIDADES.find((actividad) => actividad.id === id);
}
