import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';

import { LocalStorageService } from './local-storage.service';
import { EnvironmentService } from './environment.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private localStorageService: LocalStorageService, private http: HttpClient, private env: EnvironmentService) { }
  products: any[] = [];
  total: number = 0;
  afterBuy = new Subject();
  setProducts(products: any) {
    this.products = products;
    this.total = products.reduce( (acc: number, cv: any) => {
      console.log('this.total reduce', cv);
      return acc + (cv.price * cv.CartProducts.ProductQuantity)
    }, 0)
  }
  fetchProducts() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.localStorageService.getData('userToken')}`);
    this.http.get(this.env.apiUrl()+'/users/cart/', {headers}).subscribe({
      next: (response: any) => {
        console.log('cart service fetch products response', response);
        this.total = response.reduce( (acc: number, cv: any) => {
          return acc + (cv.price * cv.CartProducts.ProductQuantity)
        }, this.total)
        this.products = response;
      },
      error: (error) => {
        console.log('error', error)
      }
    });
  }
  buy() {
    const data = new FormData();
    data.append('hoho', 'hihi');
    let sub = new Subject()
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.localStorageService.getData('userToken')}`);
    const post = this.http.post(this.env.apiUrl()+'/users/cart/buy', data, {headers}).subscribe({
      next: (response: any) => {
        console.log('cart buy response', response)  
        this.products = [];
        this.total = 0;
        sub.next('subject from this.http.post.subscribe.next')
        this.afterBuy.next(response);
      },
      error: (error: any) => {
        console.log('cart buy error', error);
      }
    })

    return sub;
  }
}
