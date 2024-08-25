import { Component, OnInit} from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { LabelComponent } from '../forms/label/label.component';
import { InputComponent } from '../forms/input/input.component';
import { ButtonComponent } from '../button/button.component';
import { AlertComponent, AlertVariant } from '../alert/alert.component';

import { matchPasswordsValidator } from '../validators/password.validator';
import { EnvironmentService } from '../services/environment.service';

@Component({
  selector: 'app-seller-edit',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, LabelComponent, InputComponent, ButtonComponent, AlertComponent],
  templateUrl: './seller-edit.component.html',
  styleUrl: './seller-edit.component.scss'
})
export class SellerEditComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router, private env: EnvironmentService) {}

  sellerId: null | number = null;
  
  pageLoading: boolean = true;

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
    password: new FormControl('', [Validators.minLength(4)]),
    rePassword: new FormControl('', [Validators.minLength(4)]),
    email: new FormControl('', [
      Validators.required, Validators.email
    ]),
    image: new FormControl(null),
  }, { validators: matchPasswordsValidator});

  ngOnInit(): void {
    console.log('history.state', history.state);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('sellerToken')}`)
    this.http.get(this.env.apiUrl() + '/sellers/'+ history.state.id, {headers}).subscribe({
      next: (result: any) => {
        this.pageLoading = false;
        console.log('get seller result', result);
        this.setName = result.name;
        this.setEmail = result.email;
        this.sellerId = result.id;
      },
      error: (error) => {

      }
    });
  }


  // shorten formControl
  get name() { return this.sellerForm.get('name')}
  get email() { return this.sellerForm.get('email')}
  get image() { return this.sellerForm.get('image')}
  get password() { return this.sellerForm.get('password')}
  get rePassword() { return this.sellerForm.get('rePassword')}
  // shorten
  set setName(value : string) {this.sellerForm.controls.name.patchValue(value)}
  set setEmail(value : string) {this.sellerForm.controls.email.patchValue(value)}
  // set set(value : string) {this.sellerForm.controls.email.patchValue(value)}

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
        console.log(element.value)
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


    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('sellerToken')}`)

    if (this.isFormLoading) {
      return;
    }
    
    if (this.sellerForm.invalid) {
      this.isFormLoading = false;
      return;
    }

    this.isFormLoading = true;


    this.http.patch('http://localhost:3000/sellers/edit/'+this.sellerId, data, {headers}).subscribe({
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
        console.log('create seller success response', res);
        localStorage.setItem('sellerToken', res.token);
        this.router.navigate(['/seller', res.seller.id])
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
