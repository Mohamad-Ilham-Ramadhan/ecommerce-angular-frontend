import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: any;
  afterSetUser = new Subject();
  setUser(user: any) {
    this.user = user;
    this.afterSetUser.next(user);
  }
  reset() {
    this.user = undefined;
  }
}
