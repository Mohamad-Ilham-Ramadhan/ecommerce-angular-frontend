import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdrCurrencyService {
  constructor() { }
  format(number: number | null) {
    let formatted = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number ? number : 0);
    
    return formatted.slice(0,formatted.lastIndexOf(','))
  }
}
