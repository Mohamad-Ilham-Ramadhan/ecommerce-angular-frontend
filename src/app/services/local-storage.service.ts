import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor(@Inject(DOCUMENT) private document: Document) {

  }
  saveData(key: string, value: string) {
    this.document.defaultView?.localStorage.setItem(key, value)
  }
  removeData(key: string) {
    this.document.defaultView?.localStorage.removeItem(key)
  }
  getData(key: string) {
    return this.document.defaultView?.localStorage.getItem(key)
  }
  clearData() {
    this.document.defaultView?.localStorage.clear();
  }
}
