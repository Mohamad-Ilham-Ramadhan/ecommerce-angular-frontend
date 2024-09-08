import { Injectable, Inject, inject } from '@angular/core';
import { CanActivate, CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot, MaybeAsync, GuardResult } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
class UserAuthGuardService implements CanActivate {
  constructor(private router: Router, @Inject(DOCUMENT) private document: Document) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    // console.log('seller auth guard canActivate')
    const userToken = this.document.defaultView?.localStorage.getItem('userToken');
    if (userToken) {
      return true;
    } else {
      this.router.navigate(['/user/login']); // Redirect to login if not authenticated
      return false;
    }
  }
}

export const userAuthGuard: CanActivateFn = (route, state) => {
  return inject(UserAuthGuardService).canActivate(route, state);
};
