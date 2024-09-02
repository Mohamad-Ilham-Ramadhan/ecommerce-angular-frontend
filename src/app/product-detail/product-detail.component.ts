import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

import { EnvironmentService } from '../services/environment.service';
import { IdrPipe } from '../pipes/idr.pipe';

import { ButtonComponent } from '../button/button.component';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [IdrPipe, ReactiveFormsModule, ButtonComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  constructor(private http: HttpClient, public env: EnvironmentService, private route: ActivatedRoute, private router: Router, private localStorageService: LocalStorageService) {}

  loading: boolean = true;
  
  ngOnInit(): void {
    this.route.params.subscribe( params => {
      this.http.get(this.env.apiUrl()+'/products/'+params['id']).subscribe({
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
      })
    });
  }

  product: any = {
    name: '',
    image: '',
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
    data.append('product', this.product)
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.localStorageService.getData('userToken')}`);
    this.http.post(this.env.apiUrl()+'/products/buy-now', data, { headers}).subscribe({
      next: (response: any) => {
        console.log('response', response)
      },
      error: (error: any) => {
        console.log('error', error)
      }
    });
  }
}
