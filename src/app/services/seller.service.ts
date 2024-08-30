import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  constructor() { }
  
  seller: any;
  setSeller(seller: any) {
    this.seller = seller
  }
  reset() {
    this.seller = undefined;
  }
}
