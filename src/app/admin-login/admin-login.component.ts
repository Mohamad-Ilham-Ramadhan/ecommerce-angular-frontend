import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../environments/environment.development';
import { LabelComponent } from '../forms/label/label.component';
import { InputComponent } from '../forms/input/input.component';
import { AlertComponent, AlertVariant } from '../alert/alert.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, LabelComponent, InputComponent, AlertComponent],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {
  constructor(private http: HttpClient, private router: Router) {}

  alertText = '';
  alertVariant: AlertVariant = 'primary';
  showAlert: boolean = false;
  closeAlert() {
    this.showAlert = false;
  }
  isFormLoading: boolean = false;
  
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  submit(e: any) {
    e.preventDefault();
    console.log('submit', this.form.valid);
    if (!this.form.valid) return;

    this.isFormLoading = true;

    const {username, password} = this.form.controls;
    const data = new FormData();
    data.append('username', username.value !== null ? username.value : '')
    data.append('password', password.value !== null ? password.value : '');

    this.http.post(environment.apiUrl + '/admin/login', data).subscribe({
      next: (res: any) => {
        console.log('response', res)
        if (res.token) {
          localStorage.setItem('adminToken', res.token);
          this.alertText = res.message;
          this.alertVariant = 'primary';

          this.router.navigate(['/admin/sellers'])

        } else {
          this.alertText = 'Login Failed. Something went wrong';
          this.alertVariant = 'danger';
        }
        this.showAlert = true;
        this.isFormLoading = false;

        this.form.reset()
      },
      error: (e: HttpErrorResponse) => {
        console.log('THIS IS ERROR', e);
        this.alertText = e.error.message;
        this.alertVariant = 'danger';
        this.showAlert = true;
        this.isFormLoading = false;
      },
    })
  }

  get username() { return this.form.get('username');}
  get password() { return this.form.get('password');}
}
