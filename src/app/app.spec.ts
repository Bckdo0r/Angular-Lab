import { Component } from '@angular/core';
import {
  ComponentFixture,
  DeferBlockBehavior,
  DeferBlockState,
  TestBed,
} from '@angular/core/testing';
import { provideRouter, Router, Routes } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

@Component({ template: '<p>Output de prueba</p>' })
class PaginaPrueba {}

// Se conservan las rutas públicas, sin cargar ejercicios incompletos ni ejecutar sus efectos.
const rutasPrueba: Routes = [
  { path: '', pathMatch: 'full', component: PaginaPrueba },
  { path: 'tutorial', component: PaginaPrueba },
  { path: 'extras', component: PaginaPrueba },
  ...routes
    .filter((ruta) => /^(tutorial|extras)\/\d{2}(?:\/solucion)?$/.test(ruta.path ?? ''))
    .map((ruta) => ({ path: ruta.path, pathMatch: 'full' as const, component: PaginaPrueba })),
  ...[
    'tutorial/12/user',
    'tutorial/13/solucion/user',
    'tutorial/14/home',
    'extras/04/login',
    'extras/04/solucion/login',
    'extras/07/detalle/:id',
    'extras/07/solucion/panel/equipo',
    'extras/09/ayuda',
    'extras/09/solucion/ayuda',
  ].map((path) => ({ path, component: PaginaPrueba })),
  { path: '**', component: PaginaPrueba },
];

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(rutasPrueba)],
      deferBlockBehavior: DeferBlockBehavior.Manual,
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the tutorial link', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.nav a')?.textContent).toContain('Tutorial');
  });

  it('muestra Comando de Reinicio conservando el icono en tutoriales y prácticas', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    fixture.detectChanges();

    for (const url of ['/tutorial/01', '/extras/01']) {
      await router.navigateByUrl(url);
      await fixture.whenStable();
      fixture.detectChanges();
      const [bloque] = await fixture.getDeferBlocks();
      await bloque.render(DeferBlockState.Complete);
      const boton = (fixture.nativeElement as HTMLElement).querySelector('reinicio-boton button');
      expect(boton?.textContent?.trim()).toBe('Comando de Reinicio');
      expect(boton?.querySelector('icono-svg[nombre="refrescar"]')).not.toBeNull();
      expect(boton?.getAttribute('aria-label')).toBe(
        `Copiar comando para reiniciar ${url.slice(1)}`,
      );
    }
  });

  describe('navegación de ejercicios', () => {
    let fixture: ComponentFixture<App>;
    let router: Router;

    beforeEach(() => {
      fixture = TestBed.createComponent(App);
      router = TestBed.inject(Router);
      fixture.detectChanges();
    });

    async function navegar(url: string): Promise<HTMLElement> {
      await router.navigateByUrl(url);
      await fixture.whenStable();
      fixture.detectChanges();
      return fixture.nativeElement as HTMLElement;
    }

    function enlaces(pagina: HTMLElement): Record<string, string | null> {
      const navegacion = pagina.querySelector('nav[aria-label="Navegación de ejercicios"]');
      expect(navegacion).not.toBeNull();
      return Object.fromEntries(
        Array.from(navegacion?.querySelectorAll('a') ?? []).map((enlace) => [
          enlace.textContent?.trim(),
          enlace.getAttribute('href'),
        ]),
      );
    }

    it('permite ir al anterior y al siguiente en cada ejercicio de ambas secciones', async () => {
      for (const seccion of ['tutorial', 'extras']) {
        const ejercicios = routes
          .map((ruta) => ruta.path ?? '')
          .filter((path) => new RegExp(`^${seccion}/\\d{2}$`).test(path))
          .sort();

        for (const [indice, ejercicio] of ejercicios.entries()) {
          const pagina = await navegar(`/${ejercicio}`);
          const destinos = enlaces(pagina);
          if (indice > 0) {
            expect(destinos['Anterior']).toBe(`/${ejercicios[indice - 1]}`);
          } else {
            expect(
              pagina.querySelector('nav[aria-label="Navegación de ejercicios"] button:disabled')
                ?.textContent,
            ).toContain('Anterior');
          }
          if (indice < ejercicios.length - 1) {
            expect(destinos['Siguiente']).toBe(`/${ejercicios[indice + 1]}`);
          } else {
            expect(
              pagina.querySelector('nav[aria-label="Navegación de ejercicios"] button:disabled')
                ?.textContent,
            ).toContain('Siguiente');
          }
          expect(pagina.textContent).toContain('Output de prueba');
        }
      }
    });

    it('abre cada solución y permite volver al output del mismo ejercicio', async () => {
      const soluciones = routes
        .map((ruta) => ruta.path ?? '')
        .filter((path) => /^(tutorial|extras)\/\d{2}\/solucion$/.test(path));

      for (const solucion of soluciones) {
        const ejercicio = `/${solucion.replace(/\/solucion$/, '')}`;
        let pagina = await navegar(ejercicio);
        expect(enlaces(pagina)['Ver solución']).toBe(`/${solucion}`);
        pagina.querySelector<HTMLAnchorElement>('a[href="/' + solucion + '"]')?.click();
        await fixture.whenStable();
        fixture.detectChanges();
        expect(router.url).toBe(`/${solucion}`);
        pagina = fixture.nativeElement as HTMLElement;
        expect(enlaces(pagina)['Volver al ejercicio']).toBe(ejercicio);
        expect(enlaces(pagina)['Ver solución']).toBeUndefined();
        pagina.querySelector<HTMLAnchorElement>('a[href="' + ejercicio + '"]')?.click();
        await fixture.whenStable();
        fixture.detectChanges();
        expect(router.url).toBe(ejercicio);
        expect(pagina.textContent).toContain('Output de prueba');
      }
    });

    it('navega entre outputs también desde soluciones y rutas internas', async () => {
      for (const [url, anterior, siguiente, alterno] of [
        ['/tutorial/12/user', '/tutorial/11', '/tutorial/13', '/tutorial/12/solucion'],
        ['/tutorial/13/solucion/user', '/tutorial/12', '/tutorial/14', '/tutorial/13'],
        ['/tutorial/14/home', '/tutorial/13', '/tutorial/15', '/tutorial/14/solucion'],
        ['/tutorial/20/solucion', '/tutorial/19', '/tutorial/22', '/tutorial/20'],
        [
          '/extras/04/login?returnUrl=%2Fextras%2F04%2Fperfil',
          '/extras/03',
          '/extras/05',
          '/extras/04/solucion',
        ],
        ['/extras/04/solucion/login', '/extras/03', '/extras/05', '/extras/04'],
        [
          '/extras/07/detalle/3?filtro=angular#output',
          '/extras/06',
          '/extras/08',
          '/extras/07/solucion',
        ],
        ['/extras/07/solucion/panel/equipo', '/extras/06', '/extras/08', '/extras/07'],
        ['/extras/09/ayuda', '/extras/08', '/extras/10', '/extras/09/solucion'],
        ['/extras/09/solucion/ayuda', '/extras/08', '/extras/10', '/extras/09'],
      ]) {
        const pagina = await navegar(url);
        const destinos = enlaces(pagina);
        expect(destinos['Anterior']).toBe(anterior);
        expect(destinos['Siguiente']).toBe(siguiente);
        expect(destinos['Ver solución'] ?? destinos['Volver al ejercicio']).toBe(alterno);
      }

      const pagina = await navegar('/extras/07/solucion/panel/equipo');
      pagina.querySelector<HTMLAnchorElement>('a[href="/extras/08"]')?.click();
      await fixture.whenStable();
      expect(router.url).toBe('/extras/08');
    });

    it('no inventa una solución para la lección de solo lectura', async () => {
      const pagina = await navegar('/tutorial/25');
      expect(enlaces(pagina)).toEqual({ Anterior: '/tutorial/24' });
    });

    it('no modifica la navegación principal ni agrega controles a índices o páginas inexistentes', async () => {
      for (const url of ['/', '/tutorial', '/extras', '/tutorial/21', '/extras/07/inexistente']) {
        const pagina = await navegar(url);
        expect(pagina.querySelector('nav[aria-label="Navegación de ejercicios"]')).toBeNull();
        expect(pagina.querySelector('.nav a[href="/tutorial"]')?.textContent).toContain('Tutorial');
        expect(pagina.querySelector('.nav a[href="/extras"]')).not.toBeNull();
      }
    });
  });
});
