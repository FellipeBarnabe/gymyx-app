import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, take } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.loading() && !authService.isLoggedIn) {
    return router.createUrlTree(['/login']);
  }

  if (!authService.loading() && authService.isLoggedIn) {
    return true;
  }

  return toObservable(authService.loading).pipe(
    filter((loading) => !loading),
    take(1),
    map(() => {
      if (authService.isLoggedIn) return true;
      return router.createUrlTree(['/login']);
    }),
  );
};
