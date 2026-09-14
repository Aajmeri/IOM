import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthService } from '../services/auth.service';
import { authInterceptor } from './auth.interceptor';

describe('authInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let authService: { getToken: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    authService = { getToken: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: authService }
      ]
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('attaches a Bearer Authorization header when a token is present', () => {
    authService.getToken.mockReturnValue('abc123');

    http.get('/api/products').subscribe();

    const req = httpMock.expectOne('/api/products');
    expect(req.request.headers.get('Authorization')).toBe('Bearer abc123');
    req.flush([]);
  });

  it('does not attach an Authorization header when there is no token', () => {
    authService.getToken.mockReturnValue(null);

    http.get('/api/products').subscribe();

    const req = httpMock.expectOne('/api/products');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush([]);
  });
});
