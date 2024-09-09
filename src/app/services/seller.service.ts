import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  seller: any;
  coba: number = 0;
  image: string = '';
  setSeller(seller: any) {
    this.seller = seller;
  }
  reset() {
    this.seller = undefined;
  }
}
