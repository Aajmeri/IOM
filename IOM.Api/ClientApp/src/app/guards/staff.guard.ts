import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Protects staff-only (Admin/Warehouse) routes from the Client role.
 * A Client hitting a staff route is bounced to their own shop home
 * rather than an access-denied page, since it's a normal navigation
 * mistake (e.g. following the default '/products' redirect) rather
 * than an attempted privilege escalation.
 */
export const staffGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  if (auth.canManageProducts()) return true;
  const router = inject(Router);
  router.navigate([auth.isClient() ? '/shop' : '/access-denied']);
  return false;
};
