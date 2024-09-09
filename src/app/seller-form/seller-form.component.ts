import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { LabelComponent } from '../forms/label/label.component';
import { InputComponent } from '../forms/input/input.component';
import { ButtonComponent } from '../button/button.component';
import { AlertComponent, AlertVariant } from '../alert/alert.component';

import { matchPasswordsValidator } from '../validators/password.validator';

import { LocalStorageService } from '../services/local-storage.service';
import { SellerService } from '../services/seller.service';
@Component({
  selector: 'app-seller-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, LabelComponent, InputComponent, ButtonComponent, AlertComponent],
  templateUrl: './seller-form.component.html',
  styleUrl: './seller-form.component.scss'
})
export class SellerFormComponent {

  alertText = '';
  showAlert = false;
  alertVariant: AlertVariant = 'primary';
  isFormLoading = false;

  showPassword = false;
  showRePassword = false;
  


  toggleShowPassword(controlName: 'password' | 're-password') {
    switch (controlName) {
      case 'password':
        this.showPassword = !this.showPassword;
        return
      case 're-password':
        this.showRePassword = !this.showRePassword;
        return
    } 
  }

  coba = '';

  
  closeAlert($event: any) {
    this.showAlert = false;
  }

  sellerForm = new FormGroup({
    name: new FormControl('', [
      Validators.required, Validators.minLength(4), Validators.maxLength(40)
    ]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    rePassword: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [
      Validators.required, Validators.email
    ]),
    image: new FormControl(null),
  }, { validators: matchPasswordsValidator});

  constructor(private http: HttpClient, private router: Router, private localStorageService: LocalStorageService, private sellerService: SellerService) {}

  // shorten formControl
  get name() { return this.sellerForm.get('name')}
  get email() { return this.sellerForm.get('email')}
  get image() { return this.sellerForm.get('image')}
  get password() { return this.sellerForm.get('password')}
  get rePassword() { return this.sellerForm.get('rePassword')}

  previewImage: File | undefined;
  imageChange(e: any) {
    const file = e.target.files;
    // this.sellerForm.controls.image.patchValue(file[0]);
    this.sellerForm.patchValue({image: file[0]});
    if (file[0]) {
      const fileReader = new FileReader();
      fileReader.onload = (event: any) => {
          this.previewImage = event.target.result;
      }
      fileReader.readAsDataURL(file[0]);
    } else {
      this.previewImage = undefined;
    }

  }
  
  checkValue() {
    for (const key in this.sellerForm.controls) {
      if (Object.prototype.hasOwnProperty.call(this.sellerForm.controls, key)) {
        // @ts-ignore
        const element = this.sellerForm.controls[key];
      }
    }
  }

  submitForm(e: Event) {
    const {name, email, password, image} = this.sellerForm.controls;
    const data = new FormData();
    data.append('name', name.value !== null ? name.value : '')
    data.append('email', email.value !== null ? email.value : '')
    data.append('image', image.value !== null ? image.value : '')
    data.append('password', password.value !== null ? password.value : '');


    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data')

    if (this.isFormLoading) {
      return;
    }
    
    if (this.sellerForm.invalid) {
      this.isFormLoading = false;
      return;
    }

    this.isFormLoading = true;


    this.http.post('http://localhost:3000/sellers/create', data).subscribe({
      next: (res: any) => {
        if (res.message) {
          this.alertText = res.message;
          this.alertVariant = 'primary';
        } else {
          this.alertText = 'Something went wrong';
          this.alertVariant = 'danger';
        }
        this.showAlert = true;
        this.isFormLoading = false;

        this.sellerForm.reset();
        this.localStorageService.saveData('sellerToken', res.token);
        this.sellerService.setSeller(res.seller);
        this.router.navigate(['/seller'])
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
}
