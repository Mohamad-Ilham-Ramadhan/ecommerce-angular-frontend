import { Injectable } from '@angular/core';

import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class CalcService {

  constructor(private sharedService: SharedService) { }

  multiple(a: number, b: number): number {
    this.sharedService.baby()
    return a * b;
  }
}
