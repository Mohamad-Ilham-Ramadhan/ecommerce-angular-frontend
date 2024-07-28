import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { LabelComponent } from '../forms/label/label.component';
import { InputComponent } from '../forms/input/input.component';
import { ButtonComponent } from '../button/button.component';
import { AlertComponent, AlertVariant } from '../alert/alert.component';

import { HighlightDirective } from './highlight.directive';
import { matchPasswordsValidator } from './password.validator';

@Component({
  selector: 'app-seller-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, LabelComponent, InputComponent, ButtonComponent, AlertComponent, HighlightDirective],
  templateUrl: './seller-form.component.html',
  styleUrl: './seller-form.component.scss'
})
export class SellerFormComponent {

  alertText = '';
  showAlert = false;
  alertVariant: AlertVariant = 'primary';

  coba = '';

  
  closeAlert($event: any) {
    this.showAlert = false;
  }

  sellerForm = new FormGroup({
    name: new FormControl('rob', [
      Validators.required, Validators.minLength(4), Validators.maxLength(40)
    ]),
    password: new FormControl('lodash'),
    rePassword: new FormControl('lodash'),
    email: new FormControl('ilham@lodash.com', [
      Validators.required, Validators.email
    ]),
    image: new FormControl<File | null>(null),
  }, { validators: matchPasswordsValidator});

  constructor(private http: HttpClient) {}

  get name() { return this.sellerForm.get('name')}
  get email() { return this.sellerForm.get('email')}

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
