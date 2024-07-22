import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';


import { LabelComponent } from '../forms/label/label.component';
import { InputComponent } from '../forms/input/input.component';

@Component({
  selector: 'app-seller-form',
  standalone: true,
  imports: [ReactiveFormsModule, LabelComponent, InputComponent],
  templateUrl: './seller-form.component.html',
  styleUrl: './seller-form.component.scss'
})
export class SellerFormComponent {
  sellerForm = new FormGroup({
    name: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
    email: new FormControl(''),
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
}
