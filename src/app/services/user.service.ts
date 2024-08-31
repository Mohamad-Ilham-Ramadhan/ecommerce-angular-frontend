import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: any;
  setUser(user: any) {
    this.user = user
  }
  reset() {
    this.user = undefined;
  }
}
