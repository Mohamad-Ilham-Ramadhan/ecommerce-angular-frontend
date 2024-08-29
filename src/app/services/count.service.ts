import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountService {
  constructor() { 
    this.count.next(6);
  }
  count = new Subject<number>();


}
