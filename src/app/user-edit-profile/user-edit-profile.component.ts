import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { ButtonComponent } from '../button/button.component';
import { LabelComponent } from '../forms/label/label.component';
import { InputComponent } from '../forms/input/input.component';
import { AlertComponent, AlertVariant } from '../alert/alert.component';

import { UserService } from '../services/user.service';
import { LocalStorageService } from '../services/local-storage.service';
import { EnvironmentService } from '../services/environment.service';

import { matchPasswordsValidator } from '../validators/password.validator';
@Component({
  selector: 'app-user-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ButtonComponent, LabelComponent, InputComponent, AlertComponent],
  templateUrl: './user-edit-profile.component.html',
  styleUrl: './user-edit-profile.component.scss'
})
export class UserEditProfileComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router, public userService: UserService, private localStorageService: LocalStorageService, private env: EnvironmentService) {}
  ngOnInit(): void {

    // on page load or refresh
    this.userService.afterSetUser.subscribe((user: any) => {
      this.form.controls.name.patchValue(user.name);
      this.form.controls.username.patchValue(user.username);
      this.form.controls.email.patchValue(user.email);
    });
    // from another page (route)
    if (this.userService.user) {
      this.form.controls.name.patchValue(this.userService.user.name);
      this.form.controls.username.patchValue(this.userService.user.username);
      this.form.controls.email.patchValue(this.userService.user.email);
    };
  }
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.minLength(4)]),
    rePassword: new FormControl('', [Validators.minLength(4)]),
    image: new FormControl(null, ),
  }, {validators: matchPasswordsValidator});

  get name() {return this.form.get('name')}
  get username() {return this.form.get('username')}
  get email() {return this.form.get('email')}
  get password() {return this.form.get('password')}
  get rePassword() {return this.form.get('rePassword')}

  imagePreview: string = '';
  changeImage(e: any) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
        this.form.controls.image.patchValue(file)
      }
      reader.readAsDataURL(file)
    } else {
      this.form.controls.image.patchValue(null)
      this.imagePreview = '';
    }
  }
  
  isLoading: boolean = false;
  alertText: string = '';
  alertVariant: AlertVariant = 'primary';
  isAlertShow: boolean = true;
  
  submit(e: Event) {
    e.preventDefault();
    if (this.form.invalid) return;
    this.isLoading = true;
    const { name, username, email, password, rePassword, image } = this.form.controls;
    const data = new FormData();
    data.append('name', name.value ? name.value : '');
    data.append('username', username.value ? username.value : '');
    data.append('email', email.value ? email.value : '');
    data.append('password', password.value ? password.value : '');
    data.append('rePassword', rePassword.value ? rePassword.value : '');
    data.append('image', image.value ? image.value : '');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.localStorageService.getData('userToken')}`)
    this.http.patch(this.env.apiUrl()+'/users/profile/edit', data, {headers}).subscribe({
      next: (response: any) => {
        console.log('user-edit-profile response', response);
        this.isLoading = false;
        this.isAlertShow = true;
        this.alertText = 'Edit your profile success!';
        this.alertVariant = 'primary';
      },
      error: (error: any) => {
        console.log('error', error)
        this.isLoading = false;
        this.isAlertShow = true;
        this.alertText = error.error.message;
        this.alertVariant = 'danger';
      }
    });
  }
}
