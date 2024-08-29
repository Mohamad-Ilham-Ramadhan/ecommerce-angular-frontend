import { Component, ContentChild, AfterContentInit, AfterViewInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { AlertComponent, AlertVariant} from '../alert/alert.component';
import { LabelComponent } from '../forms/label/label.component';
import { InputComponent } from '../forms/input/input.component';

import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, LabelComponent, InputComponent, AlertComponent],
  templateUrl: './seller-login.component.html',
  styleUrl: './seller-login.component.scss'
})
export class SellerLoginComponent implements AfterViewInit {
  constructor(private http: HttpClient, private router: Router, public sellerService: SellerService) {}
  
  @ViewChild(InputComponent) emailContent?: InputComponent;
  ngAfterViewInit(): void {
      this.emailContent?.inputFocus();
  }

  loading = false;
  alertText = '';
  alertVariant: AlertVariant = 'primary';
  showAlert = false;
  closeAlert() {
    this.showAlert = false;
  }

  showPassword = false;
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  submit(e: any) {
    e.preventDefault();
    console.log('submit', this.form.valid);
    if (!this.form.valid) return;

    this.loading = true;

    
    const {email, password} = this.form.controls;
    const data = new FormData();
    data.append('email', email.value !== null ? email.value : '')
    data.append('password', password.value !== null ? password.value : '');

    this.http.post('http://localhost:3000/sellers/login', data).subscribe({
      next: (res: any) => {
        this.loading = false;
        console.log('response', res)
        this.showAlert = true;
        if (res.token) {
          localStorage.setItem('sellerToken', res.token);
          this.alertText = res.message;
          this.alertVariant = 'primary';
          this.sellerService.seller = res.seller;
          this.router.navigate(['seller'])
        } else {
          this.alertText = 'Something went wrong';
          this.alertVariant = 'danger';
        }
        // this.showAlert = true;
        // this.isFormLoading = false;

        // this.sellerForm.reset()
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        console.log('THIS IS ERROR', e);
        this.alertText = e.error.message;
        this.alertVariant = 'danger';
        this.showAlert = true;
        // this.isFormLoading = false;
      },
    })
  }

  get email() { return this.form.get('email');}
  get password() { return this.form.get('password');}
}
