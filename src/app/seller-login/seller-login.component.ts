import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { LabelComponent } from '../forms/label/label.component';
import { InputComponent } from '../forms/input/input.component';

@Component({
  selector: 'app-seller-login',
  standalone: true,
  imports: [LabelComponent, InputComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './seller-login.component.html',
  styleUrl: './seller-login.component.scss'
})
export class SellerLoginComponent {
  constructor(private http: HttpClient) {}
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  submit(e: any) {
    e.preventDefault();
    console.log('submit', this.form.valid);
    if (!this.form.valid) return;

    const {email, password} = this.form.controls;
    const data = new FormData();
    data.append('email', email.value !== null ? email.value : '')
    data.append('password', password.value !== null ? password.value : '');

    this.http.post('http://localhost:3000/sellers/login', data).subscribe({
      next: (res: any) => {
        console.log('response', res)
        if (res.token) {
          localStorage.setItem('loginToken', res.token);
          // this.alertText = res.message;
          // this.alertVariant = 'primary';
        } else {
          // this.alertText = 'Something went wrong';
          // this.alertVariant = 'danger';
        }
        // this.showAlert = true;
        // this.isFormLoading = false;

        // this.sellerForm.reset()
      },
      error: (e: HttpErrorResponse) => {
        console.log('THIS IS ERROR', e);
        // this.alertText = e.error.message;
        // this.alertVariant = 'danger';
        // this.showAlert = true;
        // this.isFormLoading = false;
      },
    })
  }

  get email() { return this.form.get('email');}
  get password() { return this.form.get('password');}
}
