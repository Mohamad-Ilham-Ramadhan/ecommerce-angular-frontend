import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, RouterStateSnapshot, Router} from '@angular/router';
import { Injectable, inject, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
class AdminAuthGuardService implements CanActivate {
  constructor(private router: Router, @Inject(DOCUMENT) private document: Document) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    console.log('admin auth guard canActivate')
    const adminToken = this.document.defaultView?.localStorage.getItem('adminToken');
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
