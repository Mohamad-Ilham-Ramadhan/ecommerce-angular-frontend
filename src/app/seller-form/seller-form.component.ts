import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { LabelComponent } from '../forms/label/label.component';
import { InputComponent } from '../forms/input/input.component';
import { ButtonComponent } from '../button/button.component';
import { AlertComponent, AlertVariant } from '../alert/alert.component';

@Component({
  selector: 'app-seller-form',
  standalone: true,
  imports: [ReactiveFormsModule, LabelComponent, InputComponent, ButtonComponent, AlertComponent],
  templateUrl: './seller-form.component.html',
  styleUrl: './seller-form.component.scss'
})
export class SellerFormComponent {

  alertText = '';
  showAlert = false;
  alertVariant: AlertVariant = 'primary';
  
  closeAlert($event: any) {
    this.showAlert = false;
  }

  sellerForm = new FormGroup({
    name: new FormControl('ilham'),
    password: new FormControl('lodash'),
    rePassword: new FormControl('lodash'),
    email: new FormControl('ilham@lodash.com'),
    image: new FormControl<File | null>(null),
  });

  constructor(private http: HttpClient) {}

  checkValue() {
    for (const key in this.sellerForm.controls) {
      if (Object.prototype.hasOwnProperty.call(this.sellerForm.controls, key)) {
        // @ts-ignore
        const element = this.sellerForm.controls[key];
        console.log(element.value)
      }
    }
  }

  submitForm() {
    const {name, email, password} = this.sellerForm.controls;
    const data = new FormData();
    data.append('name', name.value !== null ? name.value : '')
    data.append('email', email.value !== null ? email.value : '')
    data.append('password', password.value !== null ? password.value : '');

    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data')

    this.http.post('http://localhost:3000/sellers/create', data).subscribe({
      next: (res: any) => {
        console.log('submit response', res)
        if (res.message) {
          this.alertText = res.message;
          this.alertVariant = 'primary';
        } else {
          this.alertText = 'Something went wrong';
          this.alertVariant = 'danger';
        }
        this.showAlert = true;
      },
      error: (e: HttpErrorResponse) => {
        console.log('THIS IS ERROR', e);
        this.alertText = e.error.message;
        this.alertVariant = 'danger';
        this.showAlert = true;
      }
    })
  }
}
