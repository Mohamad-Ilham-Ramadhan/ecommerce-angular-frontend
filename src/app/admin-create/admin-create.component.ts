import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

import { LabelComponent } from '../forms/label/label.component';
import { InputComponent } from '../forms/input/input.component';
import { ButtonComponent } from '../button/button.component';
import { AlertComponent, AlertVariant } from '../alert/alert.component';

import { matchPasswordsValidator } from '../validators/password.validator';

import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-admin-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    LabelComponent,
    InputComponent,
    ButtonComponent,
    AlertComponent,
  ],
  templateUrl: './admin-create.component.html',
  styleUrl: './admin-create.component.scss',
})
export class AdminCreateComponent {
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
        return;
      case 're-password':
        this.showRePassword = !this.showRePassword;
        return;
    }
  }

  coba = '';

  closeAlert($event: any) {
    this.showAlert = false;
  }

  form = new FormGroup(
    {
      username: new FormControl('', [
        Validators.required, Validators.minLength(4), Validators.maxLength(50),
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(40),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      rePassword: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      image: new FormControl<File | null>(null),
    },
    { validators: matchPasswordsValidator }
  );

  constructor(private http: HttpClient) {}

  // shorten formControl
  get username() { return this.form.get('username')}
  get name() {
    return this.form.get('name');
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  get rePassword() {
    return this.form.get('rePassword');
  }

  checkValue() {
    for (const key in this.form.controls) {
      if (Object.prototype.hasOwnProperty.call(this.form.controls, key)) {
        // @ts-ignore
        const element = this.form.controls[key];
        console.log(element.value);
      }
    }
  }

  submitForm(e: Event) {
    const { name, email, password, username } = this.form.controls;
    const data = new FormData();
    data.append('name', name.value !== null ? name.value : '');
    data.append('username', username.value !== null ? username.value : '');
    data.append('email', email.value !== null ? email.value : '');
    data.append('password', password.value !== null ? password.value : '');

    const headers = new HttpHeaders().set(
      'Content-Type',
      'multipart/form-data'
    );

    if (this.isFormLoading) {
      return;
    }

    if (this.form.invalid) {
      this.isFormLoading = false;
      return;
    }

    this.isFormLoading = true;

    this.http.post(environment.apiUrl + '/admin/create', data).subscribe({
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

        this.form.reset();
      },
      error: (e: HttpErrorResponse) => {
        console.log('THIS IS ERROR', e);
        this.alertText = e.error.message;
        this.alertVariant = 'danger';
        this.showAlert = true;
        this.isFormLoading = false;
      },
    });
  }
}
