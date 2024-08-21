import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { 
    console.log('shared constructor()');
   }

  baby() {
    console.log('shawty eenie menie mo lover');
  }
}
