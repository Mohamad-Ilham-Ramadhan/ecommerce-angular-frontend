import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

import { EnvironmentService } from '../services/environment.service';
import { IdrPipe } from '../pipes/idr.pipe';

import { ButtonComponent } from '../button/button.component';
import { LocalStorageService } from '../services/local-storage.service';
import { ReviewNotifService } from '../services/review-notif.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [IdrPipe, ReactiveFormsModule, ButtonComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  constructor(private http: HttpClient, public env: EnvironmentService, private route: ActivatedRoute, private router: Router, private localStorageService: LocalStorageService, private notifService: ReviewNotifService) {}

  loading: boolean = true;
  reviewsLoading: boolean = true;
  ngOnInit(): void {
    this.route.params.subscribe( params => {
      this.http.get(this.env.apiUrl()+'/products/single/'+params['id']).subscribe({
        next: (response: any) => {
          console.log('response', response)
          if (response === null) {
            this.router.navigate(['/'])
          }
          this.product = response;
          this.loading = false;
        },
        error: (error) => {
          console.log('error', error);
          this.loading = false;
        }
      });
      this.http.get(this.env.apiUrl()+'/products/review/'+params['id']).subscribe({
        next: (response: any) => {
          console.log('get reviews response', response);
          this.reviews = response;
          this.reviewsLoading = false;
          this.reviews = this.reviews.map( r => {
            let stars : boolean[] = [];
            for (let i = 1; i <= 5; i++) {
              stars[i-1] = i <= r.rate ? true : false
            }
            return {...r, stars};
          });
          console.log('new reviews', this.reviews);
        },
        error: (error) => {
          console.log('get reviews error', error);
          this.reviewsLoading = false;
        }
      });
    });
  }

  reviews: any[] = [];
  product: any = {
    id: 0,
    name: '',
    description: '',
    stock: 0,
    price: 0,

  };

  quantity = new FormControl<number>(0);

  get subtotal() {
    // @ts-ignore
    return this.product.price * this!.quantity!.value;
  }
  increment() {
    // @ts-ignore
    this.quantity.patchValue(this.quantity.value + 1);
  }
  decrement() {
    if (this.quantity.value === 0) return;
    // @ts-ignore
    this.quantity.patchValue(this.quantity.value - 1);
  }
  preventMinus(e: any) {
    if (e.key === '-') {
      e.preventDefault()
    }
  }

  buyNow() {
    const data = new FormData();
    if ((this.quantity.value ? this.quantity.value : 0) > this.product.stock) return;
    data.append('product', JSON.stringify(this.product));
    data.append('quantity', String(this.quantity.value));
    data.append('totalPrice', String((this.quantity.value ? this.quantity.value : 0) * this.product.price))
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.localStorageService.getData('userToken')}`);
    this.http.post(this.env.apiUrl()+'/products/buy-now', data, { headers}).subscribe({
      next: (response: any) => {
        console.log('response', response);
        this.notifService.setNotif(response);
        this.router.navigate(['/product/review', this.product.id], {state: {notif: response}})
      },
      error: (error: any) => {
        console.log('error', error)
      }
    });
  }
}