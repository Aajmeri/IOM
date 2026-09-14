import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { AuthService, AuthUser } from './auth.service';

describe('AuthService', () => {
  let httpMock: HttpTestingController;
  let router: { navigate: ReturnType<typeof vi.fn> };

  const sampleUser: AuthUser = { token: 'tok-123', name: 'Jane', email: 'jane@example.com', role: 'Admin' };

  function createService(): AuthService {
    router = { navigate: vi.fn() };
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), { provide: Router, useValue: router }]
    });
    return TestBed.inject(AuthService);
  }

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    httpMock?.verify();
    localStorage.clear();
  });

  it('has no current user and is not authenticated when localStorage is empty', () => {
    const service = createService();
    httpMock = TestBed.inject(HttpTestingController);

    expect(service.currentUser()).toBeNull();
    expect(service.isAuthenticated()).toBe(false);
    expect(service.getToken()).toBeNull();
  });

  it('loads a previously stored user from localStorage on construction', () => {
    localStorage.setItem('iom_token', sampleUser.token);
    localStorage.setItem('iom_user', JSON.stringify(sampleUser));

    const service = createService();
    httpMock = TestBed.inject(HttpTestingController);

    expect(service.currentUser()).toEqual(sampleUser);
    expect(service.isAuthenticated()).toBe(true);
  });

  it('login() POSTs credentials and stores the returned user', () => {
    const service = createService();
    httpMock = TestBed.inject(HttpTestingController);

    service.login('jane@example.com', 'secret').subscribe(user => expect(user).toEqual(sampleUser));

    const req = httpMock.expectOne('/api/auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'jane@example.com', password: 'secret' });
    req.flush(sampleUser);

    expect(service.currentUser()).toEqual(sampleUser);
    expect(localStorage.getItem('iom_token')).toBe(sampleUser.token);
    expect(JSON.parse(localStorage.getItem('iom_user')!)).toEqual(sampleUser);
  });

  it('register() POSTs the new-account payload and stores the returned user', () => {
    const service = createService();
    httpMock = TestBed.inject(HttpTestingController);

    service.register('Jane', 'jane@example.com', 'secret', 'secret').subscribe();

    const req = httpMock.expectOne('/api/auth/register');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      name: 'Jane',
      email: 'jane@example.com',
      password: 'secret',
      confirmPassword: 'secret'
    });
    req.flush(sampleUser);

    expect(service.currentUser()).toEqual(sampleUser);
  });

  it('logout() clears storage, resets currentUser, and navigates to /login', () => {
    const service = createService();
    httpMock = TestBed.inject(HttpTestingController);
    service.login('jane@example.com', 'secret').subscribe();
    httpMock.expectOne('/api/auth/login').flush(sampleUser);

    service.logout();

    expect(service.currentUser()).toBeNull();
    expect(localStorage.getItem('iom_token')).toBeNull();
    expect(localStorage.getItem('iom_user')).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('isAdmin()/isClient()/canManageProducts() reflect the current user role', () => {
    const service = createService();
    httpMock = TestBed.inject(HttpTestingController);

    service.login('jane@example.com', 'secret').subscribe();
    httpMock.expectOne('/api/auth/login').flush({ ...sampleUser, role: 'Admin' });
    expect(service.isAdmin()).toBe(true);
    expect(service.isClient()).toBe(false);
    expect(service.canManageProducts()).toBe(true);

    service.login('warehouse@example.com', 'secret').subscribe();
    httpMock.expectOne('/api/auth/login').flush({ ...sampleUser, role: 'Warehouse' });
    expect(service.isAdmin()).toBe(false);
    expect(service.canManageProducts()).toBe(true);

    service.login('client@example.com', 'secret').subscribe();
    httpMock.expectOne('/api/auth/login').flush({ ...sampleUser, role: 'Client' });
    expect(service.isAdmin()).toBe(false);
    expect(service.isClient()).toBe(true);
    expect(service.canManageProducts()).toBe(false);
  });
});
