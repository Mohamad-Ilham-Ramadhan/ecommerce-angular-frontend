import { CanActivateFn, CanActivate, Router} from '@angular/router';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
   const loginToken = localStorage.getItem('loginToken');
   console.log('loginToken', loginToken);

    if (loginToken) {
      return true; // Allow access if the user is authenticated
    } else {
      this.router.navigate(['/login']); // Redirect to login if not authenticated
      return false; // Prevent access to the route
    }
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  console.log('authGuard : CanActivateFn');
  return inject(AuthGuard).canActivate();
};
