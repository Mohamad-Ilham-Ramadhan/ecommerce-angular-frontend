import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewNotifService {
  constructor() {}
  notifs: any[] = [];

  setNotifs(notifs: any[]) {
    this.notifs = notifs;
  }

  notif: any;
  setNotif(notif: any) {
    this.notif = notif;
  }

  pushNotif(notif: any) {
    this.notifs = [...this.notifs, notif];
  }
}
