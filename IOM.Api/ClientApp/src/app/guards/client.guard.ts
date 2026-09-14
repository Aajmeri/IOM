import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const clientGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  if (auth.isClient()) return true;
  inject(Router).navigate(['/access-denied']);
  return false;
};
