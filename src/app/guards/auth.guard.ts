import { CanActivateFn , Router} from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const loginToken = localStorage.getItem('loginToken');
  console.log('login token: ', loginToken);
  if (loginToken) {
    return true;
  } else {
    return false;
  }
};
