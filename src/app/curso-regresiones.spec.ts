import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { firstValueFrom, Observable, of, Subject, throwError } from 'rxjs';
import { vi } from 'vitest';
import { routes } from './app.routes';
import { backendFalso } from './extras/backend-falso';
import { authTokenInterceptor } from './extras/04-auth-jwt-guards-interceptors/ejercicio/auth.interceptor';
import { AuthServiceSolucion } from './extras/04-auth-jwt-guards-interceptors/solucion/auth.service';
import { EmpleadosCrudService } from './extras/05-crud-interactivo-con-modales/empleados-crud.service';
import { EmpleadosPageSolucion } from './extras/05-crud-interactivo-con-modales/solucion/empleados-page';
import { BusquedaService, EmpleadoBuscado } from './extras/06-rxjs-y-asincronia/buscador.service';
import { BuscadorPageSolucion } from './extras/06-rxjs-y-asincronia/solucion/buscador-page';
import { InsumosCrudService } from './extras/08-angular-material/insumos-crud.service';
import { Leccion19 } from './tutorial/19-injectable-service/leccion';

function enterText(root: HTMLElement, selector: string, value: string): HTMLInputElement {
  const input = root.querySelector<HTMLInputElement>(selector);
  if (!input) throw new Error(`No se encontró el campo ${selector}`);
  input.value = value;
  input.dispatchEvent(new Event('input', { bubbles: true }));
  return input;
}

function clickButton(root: HTMLElement, text: string): void {
  const button = Array.from(root.querySelectorAll('button')).find(
    (element) => element.textContent?.trim() === text,
  );
  if (!button) throw new Error(`No se encontró el botón ${text}`);
  button.click();
}

describe('Regresiones del material del curso', () => {
  beforeEach(() => {
    TestBed.resetTestingModule();
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes, withComponentInputBinding()),
        provideHttpClient(withInterceptors([authTokenInterceptor, backendFalso])),
      ],
    });
  });

  afterEach(() => {
    TestBed.resetTestingModule();
    localStorage.clear();
  });

  it('abre la lección 19 sin resolver el registro del servicio', () => {
    const fixture = TestBed.createComponent(Leccion19);
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Completá el paso 1');
  });

  it('resuelve los enlaces Home de las lecciones 12 y 14', async () => {
    const harness = await RouterTestingHarness.create();
    for (const url of ['/tutorial/12/home', '/tutorial/14/home', '/tutorial/14/solucion/home']) {
      await harness.navigateByUrl(url);
      expect(harness.routeNativeElement?.textContent).not.toContain('Página no encontrada');
      expect(TestBed.inject(Router).url).toBe(url);
    }
    expect(harness.routeNativeElement?.textContent).toContain('Home Page');
  });

  it('restaura filtros desde un enlace y sigue los cambios de query params sin recrear la página', async () => {
    const harness = await RouterTestingHarness.create('/extras/07/solucion?q=ana&area=Desarrollo');
    const page = harness.routeNativeElement;
    expect(page?.querySelector('.tarjetas')?.textContent).toContain('Ana Gutiérrez');
    expect(page?.querySelectorAll('.tarjetas li').length).toBe(1);
    await harness.navigateByUrl('/extras/07/solucion?q=bruno&area=QA');
    expect(harness.routeNativeElement?.querySelector<HTMLInputElement>('input')?.value).toBe(
      'bruno',
    );
    expect(harness.routeNativeElement?.querySelector('.tarjetas')?.textContent).toContain(
      'Bruno Díaz',
    );
  });

  it('recibe el ID en el detalle y valida las pestañas de la URL', async () => {
    const harness = await RouterTestingHarness.create(
      '/extras/07/solucion/detalle/3?tab=auditoria',
    );
    expect(harness.routeNativeElement?.querySelector('.contenido-tab')?.textContent).toContain(
      'auditoria',
    );
    expect(harness.routeNativeElement?.textContent).toContain('Carla Pérez');
    await harness.navigateByUrl('/extras/07/solucion/detalle/3?tab=inexistente');
    expect(harness.routeNativeElement?.querySelector('.contenido-tab')?.textContent).toContain(
      'resumen',
    );
  });

  it('conserva el estado NgRx en ayuda y al salir y volver, y permite restablecerlo', async () => {
    const harness = await RouterTestingHarness.create('/extras/09/solucion');
    enterText(harness.routeNativeElement!, 'input[type="search"]', 'agua');
    harness.detectChanges();
    await harness.navigateByUrl('/extras/09/solucion/ayuda');
    expect(harness.routeNativeElement?.textContent).toContain('agua');
    await harness.navigateByUrl('/extras/02');
    await harness.navigateByUrl('/extras/09/solucion');
    expect(
      harness.routeNativeElement?.querySelector<HTMLInputElement>('input[type="search"]')?.value,
    ).toBe('agua');
    clickButton(harness.routeNativeElement!, 'Restablecer');
    harness.detectChanges();
    expect(
      harness.routeNativeElement?.querySelector<HTMLInputElement>('input[type="search"]')?.value,
    ).toBe('');
    await harness.navigateByUrl('/extras/09');
    expect(
      harness.routeNativeElement?.querySelector<HTMLInputElement>('input[type="search"]')?.value,
    ).toBe('');
  });

  it('permite completar el login y consultar el panel de la solución con el interceptor del ejercicio incompleto', async () => {
    const harness = await RouterTestingHarness.create('/extras/04/solucion/admin');
    expect(TestBed.inject(Router).url).toContain('/extras/04/solucion/login?returnUrl=');
    enterText(harness.routeNativeElement!, 'input[autocomplete="username"]', 'admin');
    enterText(harness.routeNativeElement!, 'input[type="password"]', 'admin123');
    clickButton(harness.routeNativeElement!, 'Ingresar');
    await vi.waitFor(
      () => {
        harness.detectChanges();
        expect(harness.routeNativeElement?.textContent).toContain('rolRecibido:');
      },
      { timeout: 3000 },
    );
    expect(harness.routeNativeElement?.textContent).toContain('Admin General');
    expect(harness.routeNativeElement?.textContent).not.toContain('No estás autenticado');
    await harness.navigateByUrl('/extras/04/solucion/perfil');
    expect(harness.routeNativeElement?.querySelector('dd')?.textContent).toContain('admin');
  });

  it('rechaza payloads sin forma de usuario o vencidos antes de restaurar la sesión', () => {
    const auth = TestBed.inject(AuthServiceSolucion);
    for (const payload of [{}, { usuario: 'admin', nombre: 'Admin', rol: 'admin', exp: 1 }]) {
      expect(auth.decodificarToken(`cabecera.${btoa(JSON.stringify(payload))}.firma`)).toBeNull();
    }
    expect(auth.decodificarToken('texto inválido')).toBeNull();
  });

  it('la demo de productos obtiene datos del simulador sin servidor externo', async () => {
    const http = TestBed.inject(HttpClient);
    const products = await firstValueFrom(
      http.get<unknown[]>('/api/productos', {
        headers: { 'X-Canal': 'practica-10' },
      }),
    );
    expect(products.length).toBeGreaterThan(0);
  });

  it('ajusta la página del CRUD cuando se borra la última fila de la página final', () => {
    const fixture = TestBed.createComponent(EmpleadosPageSolucion);
    fixture.detectChanges();
    const page = fixture.nativeElement as HTMLElement;
    clickButton(page, '›');
    fixture.detectChanges();
    expect(page.textContent).toContain('Página 2 de 2');
    const service = TestBed.inject(EmpleadosCrudService);
    service.eliminar(5);
    service.eliminar(6);
    fixture.detectChanges();
    expect(page.textContent).toContain('Página 1 de 1');
    expect(page.querySelectorAll('tbody tr').length).toBe(4);
  });

  it('no reutiliza un ID eliminado mientras todavía se puede deshacer', () => {
    const service = TestBed.inject(InsumosCrudService);
    const removed = service.eliminar(6)!;
    service.alta({ nombre: 'Insumo nuevo', categoria: 'Prueba', stock: 10, precio: 20 });
    service.reingresar(removed);
    const ids = service.insumos().map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(service.insumos().some((item) => item.nombre === 'Insumo nuevo')).toBe(true);
  });
});

describe('Ciclo de vida del buscador de referencia', () => {
  const employee: EmpleadoBuscado = { id: 1, nombre: 'Ana', area: 'IT', seniority: 'Senior' };

  afterEach(() => {
    TestBed.resetTestingModule();
    vi.useRealTimers();
  });

  it('se recupera de un fallo y agrupa una ráfaga de tipeos en una consulta', () => {
    vi.useFakeTimers();
    const list = vi
      .fn<(text: string) => Observable<EmpleadoBuscado[]>>()
      .mockReturnValueOnce(throwError(() => new Error('Fallo controlado')))
      .mockReturnValue(of([employee]));
    TestBed.configureTestingModule({
      providers: [{ provide: BusquedaService, useValue: { listar: list } }],
    });
    const fixture = TestBed.createComponent(BuscadorPageSolucion);
    fixture.detectChanges();
    const page = fixture.nativeElement as HTMLElement;
    enterText(page, 'input', 'falla');
    vi.advanceTimersByTime(301);
    fixture.detectChanges();
    expect(page.textContent).toContain('Fallo controlado');
    for (const text of ['a', 'an', 'ana']) enterText(page, 'input', text);
    vi.advanceTimersByTime(301);
    fixture.detectChanges();
    expect(list).toHaveBeenCalledTimes(2);
    expect(list).toHaveBeenLastCalledWith('ana');
    expect(page.querySelector('tbody')?.textContent).toContain('Ana');
    expect(page.textContent).not.toContain('Fallo controlado');
  });

  it('ignora una respuesta cancelada y cancela la consulta al destruirse', () => {
    vi.useFakeTimers();
    const first = new Subject<EmpleadoBuscado[]>();
    const second = new Subject<EmpleadoBuscado[]>();
    const cancelled = vi.fn();
    const list = vi
      .fn<(text: string) => Observable<EmpleadoBuscado[]>>()
      .mockReturnValueOnce(first)
      .mockReturnValueOnce(
        new Observable((subscriber) => {
          const subscription = second.subscribe(subscriber);
          return () => {
            subscription.unsubscribe();
            cancelled();
          };
        }),
      );
    TestBed.configureTestingModule({
      providers: [{ provide: BusquedaService, useValue: { listar: list } }],
    });
    const fixture = TestBed.createComponent(BuscadorPageSolucion);
    fixture.detectChanges();
    const page = fixture.nativeElement as HTMLElement;
    enterText(page, 'input', 'vieja');
    vi.advanceTimersByTime(301);
    enterText(page, 'input', 'actual');
    vi.advanceTimersByTime(301);
    first.next([{ ...employee, nombre: 'Respuesta vieja' }]);
    second.next([employee]);
    fixture.detectChanges();
    expect(page.querySelector('tbody')?.textContent).toContain('Ana');
    expect(page.textContent).not.toContain('Respuesta vieja');
    fixture.destroy();
    expect(cancelled).toHaveBeenCalledOnce();
  });
});
