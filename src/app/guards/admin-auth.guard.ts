import { CanActivateFn } from '@angular/router';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const adminToken = localStorage.getItem('adminToken');
  console.log('admin token: ', adminToken);
  if (adminToken) {
    return true;
  } else {
    return false;
  }
};
