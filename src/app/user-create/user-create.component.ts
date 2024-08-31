import { Component, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { matchPasswordsValidator } from '../validators/password.validator';
import { InputComponent } from '../forms/input/input.component';
import { LabelComponent } from '../forms/label/label.component';

import { EnvironmentService } from '../services/environment.service';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, InputComponent, LabelComponent],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss'
})
export class UserCreateComponent {
  constructor(private http: HttpClient, private env: EnvironmentService, private localStorageService: LocalStorageService, private router: Router){}

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    rePassword: new FormControl('', [Validators.required]),
    image: new FormControl(null),
  }, {validators: matchPasswordsValidator});

  get name() {return this.form.get('name')}
  get username() {return this.form.get('username')}
  get email() {return this.form.get('email')}
  get image() {return this.form.get('image')}
  get password() {return this.form.get('password')}
  get rePassword() {return this.form.get('rePassword')}

  realImage: Blob | string = '';
  imagePreview: any;
  isFormLoading: boolean = false;

  imageOnChange(e: any) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result;
      }
      reader.readAsDataURL(file);
      this.realImage = file;
    } else {
      this.imagePreview = undefined;
      this.realImage = '';
    }
  }

  submit(e: Event) {
    e.preventDefault();
    if (this.form.invalid || this.isFormLoading) return;

    this.isFormLoading = true;
    
    console.log('submit form', this.image?.value);
    const { name, username, email, password, rePassword } = this.form.controls;
    const data = new FormData();
    data.append('name', name.value !== null ? name.value : '');
    data.append('username', username.value !== null ? username.value : '');
    data.append('email', email.value !== null ? email.value : '');
    data.append('password', password.value !== null ? password.value : '');
    data.append('rePassword', rePassword.value !== null ? rePassword.value : '');
    data.append('image', this.realImage);

    
    this.http.post(this.env.apiUrl()+'/users/create', data).subscribe({
      next: (response: any) => {
        console.log('response', response);
        this.isFormLoading = false;
        this.localStorageService.saveData('userToken', response.token)
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log('error', error);
        this.isFormLoading = false;
      }
    });
  }
}
