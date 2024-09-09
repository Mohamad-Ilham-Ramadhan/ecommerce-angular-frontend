import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  seller: any;
  image: string = '';
  setSeller(seller: any) {
    this.seller = seller;
  }
  reset() {
    this.seller = undefined;
  }
}
