import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable, inject, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
class SellerAuthGuardService implements CanActivate {
  constructor(private router: Router, @Inject(DOCUMENT) private document: Document) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    // console.log('seller auth guard canActivate')
    const sellerToken = this.document.defaultView?.localStorage.getItem('sellerToken');
    if (sellerToken) {
      return true;
    } else {
      this.router.navigate(['/seller/login']); // Redirect to login if not authenticated
      return false;
    }
  }
}
export const sellerAuthGuard: CanActivateFn = (route, state) => {
  return inject(SellerAuthGuardService).canActivate(route, state);
};
