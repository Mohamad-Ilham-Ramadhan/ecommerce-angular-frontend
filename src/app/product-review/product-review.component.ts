import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { TextareaComponent } from '../textarea/textarea.component';
import { LabelComponent } from '../forms/label/label.component';

import { ReviewNotifService } from '../services/review-notif.service';
import { EnvironmentService } from '../services/environment.service';
import { LocalStorageService } from '../services/local-storage.service';
import { IdrPipe } from '../pipes/idr.pipe';
@Component({
  selector: 'app-product-review',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, TextareaComponent, LabelComponent, IdrPipe],
  templateUrl: './product-review.component.html',
  styleUrl: './product-review.component.scss'
})
export class ProductReviewComponent implements OnInit {
  constructor(private notifService: ReviewNotifService, private http: HttpClient, public env: EnvironmentService, private localStorageService: LocalStorageService, private router: Router) {}

  ngOnInit(): void {
      console.log('history.state', history.state);
      console.log('notifService', this.notifService.notif);
      this.notif = history.state.notif;

      this.http.get(this.env.apiUrl() + '/products/single/' + this.notif.ProductId).subscribe({
        next: (response: any) => {
          console.log('get products/single response', response);
          this.product = response;
          this.productLoading = false;
        },
        error: (error: any) => {
          console.log('error', error);
          this.productLoading = false;
        }
      });
  }
  product: any;
  productLoading: boolean = true;
  form = new FormGroup({
    review: new FormControl(''),
  });
  
  rate: boolean[] = [true, false, false, false, false];
  setRate(index: number) {
    let newRate = [false, false, false, false, false];
    for (let i = 0; i < 5;i++) {
      newRate[i] = i <= index ? true : false;
    }
    this.rate = newRate;
  } 

  notif: any;
  
  submit(e: Event) {
    e.preventDefault();
    console.log('this.notif', this.notif);
    const { review } = this.form.controls;
    const rate = this.rate.reduce((acc, cv) => {
      console.log('cv', cv);
      return acc + (cv ? 1 : 0);
    },0)
    console.log('rate', rate);
    const data = new FormData();
    data.append('review', review.value !== null ? review.value : '' );
    data.append('rate', String(rate) );
    data.append('notifId', this.notif.id);
    data.append('userId', this.notif.UserId);
    data.append('productId', this.notif.ProductId);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.localStorageService.getData('userToken')}`);
    this.http.post(this.env.apiUrl()+'/products/review', data, {headers}).subscribe({
      next: (response: any) => {
        console.log('submit review response', response);
        this.notifService.setNotifs(response.notifs);
        this.router.navigate(['/review-notif-list']);
      },
      error: (error) => {
        console.log('error', error)
      }
    });
  }
}
