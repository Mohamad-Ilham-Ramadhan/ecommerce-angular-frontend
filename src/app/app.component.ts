import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule  } from '@angular/forms';

import { SellerFormComponent } from './seller-form/seller-form.component';
import { HeaderComponent } from './header/header.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive, RouterLink, FormsModule, SellerFormComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  dataName = '';
  dataEmail = '';

  constructor(private http: HttpClient) {}

  getData() {
    this.http.get('http://localhost:3000/').subscribe( (data: any)  => {
      console.log('data', data)
      this.dataName = data.name ;
      this.dataEmail = data.email ;
    })
  }
  clear() {
    this.dataName = ''; this.dataEmail = '';
  }
  adminForm = new FormGroup({
    username: new FormControl('admin'),
    password: new FormControl('asdfasdf'),
    name: new FormControl('ilham ganteng'),
    email: new FormControl('ilham@ganteng.com'),
    image: new FormControl<File | null>(null),
  });

  changeImage(e: Event) {
    let file: File | null;
    // @ts-ignore
    file =  e?.target?.files[0] === undefined ? null : e?.target?.files[0];
    this.adminForm.patchValue({image: file})
  }
  
  submitAdmin($event: any) {
    const {username, password, name, email, image} = this.adminForm.controls;
    console.log('this.adminForm', this.adminForm, 'username', username.getRawValue())
    const form = new FormData();
    form.append('username', username.value ? username.value : '')
    form.append('password', password.value ? password.value : '')
    form.append('name', name.value ? name.value : '')
    form.append('email', email.value ? email.value : '')
    // @ts-ignore
    form.append('image', image.value ? image.value : '')
    console.log('submited form', form.get('username'))

    const formJson = JSON.stringify({
      username: username.value,
      password: password.value,
      name: name.value,
      email: email.value
    })

    const h = new HttpHeaders()
    
    this.http.post('http://localhost:3000/', form).subscribe(response => {
      console.log('server response:', response);
    });
  }
}
