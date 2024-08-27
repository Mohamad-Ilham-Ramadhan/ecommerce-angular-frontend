import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdrCurrencyService {
  constructor() { }
  format(number: number | null) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number ? number : 0);
  }
}
