import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  let authService: { isAuthenticated: ReturnType<typeof vi.fn> };
  let router: { navigate: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    authService = { isAuthenticated: vi.fn() };
    router = { navigate: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    });
  });

  function runGuard() {
    return TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));
  }

  it('allows navigation when the user is authenticated', () => {
    authService.isAuthenticated.mockReturnValue(true);

    const result = runGuard();

    expect(result).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('redirects to /login and blocks navigation when not authenticated', () => {
    authService.isAuthenticated.mockReturnValue(false);

    const result = runGuard();

    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
