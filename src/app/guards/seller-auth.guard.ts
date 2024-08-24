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
class SellerAuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    const sellerToken = localStorage.getItem('sellerToken');
    if (sellerToken) {
      return true;
    } else {
      this.router.navigate(['/seller/login']); // Redirect to login if not authenticated
      return false;
    }
  }
}
export const sellerAuthGuard: CanActivateFn = (route, state) => {
  return inject(SellerAuthGuardService).canActivate(route, state)
};
