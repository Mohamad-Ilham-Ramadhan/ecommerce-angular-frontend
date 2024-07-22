import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';


import { LabelComponent } from '../forms/label/label.component';
import { InputComponent } from '../forms/input/input.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-seller-form',
  standalone: true,
  imports: [ReactiveFormsModule, LabelComponent, InputComponent, ButtonComponent],
  templateUrl: './seller-form.component.html',
  styleUrl: './seller-form.component.scss'
})
export class SellerFormComponent {
  sellerForm = new FormGroup({
    name: new FormControl('ilham'),
    password: new FormControl('lodash'),
    rePassword: new FormControl('lodash'),
    email: new FormControl('ilham@lodash.com'),
    image: new FormControl<File | null>(null),
  });

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
    data.append('password', password.value !== null ? password.value : '')


  }
}
