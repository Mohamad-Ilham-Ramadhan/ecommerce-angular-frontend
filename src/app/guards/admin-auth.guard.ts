import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
class AdminAuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    const adminToken = localStorage.getItem('adminToken');
    console.log('admin token: ', adminToken);
    if (adminToken) {
      return true;
    } else {
      this.router.navigate(['/admin/login']); // Redirect to login if not authenticated
      return false;
    }
  }
}

export const adminAuthGuard: CanActivateFn = (route, state) => {
  return inject(AdminAuthGuardService).canActivate(route, state);
};
