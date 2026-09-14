import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { adminGuard } from './admin.guard';

describe('adminGuard', () => {
  let authService: { isAdmin: ReturnType<typeof vi.fn> };
  let router: { navigate: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    authService = { isAdmin: vi.fn() };
    router = { navigate: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    });
  });

  function runGuard() {
    return TestBed.runInInjectionContext(() => adminGuard({} as any, {} as any));
  }

  it('allows navigation when the user is an admin', () => {
    authService.isAdmin.mockReturnValue(true);

    const result = runGuard();

    expect(result).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('redirects to /access-denied and blocks navigation for non-admins', () => {
    authService.isAdmin.mockReturnValue(false);

    const result = runGuard();

    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/access-denied']);
  });
});
