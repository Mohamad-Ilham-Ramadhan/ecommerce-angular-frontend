import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, FormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterLink} from '@angular/router';

import { InputComponent } from '../forms/input/input.component';
import { LabelComponent } from '../forms/label/label.component';
import { AlertComponent, AlertVariant } from '../alert/alert.component';
import { TextareaComponent } from '../textarea/textarea.component';

import { SellerService } from '../services/seller.service';
import { IdrCurrencyService } from '../services/idr-currency.service';
import { EnvironmentService } from '../services/environment.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink, InputComponent, LabelComponent, TextareaComponent],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss'
})
export class ProductCreateComponent {
  constructor(private http: HttpClient, public idr: IdrCurrencyService, private env: EnvironmentService, private router: Router, private localStorageService: LocalStorageService) {}

  consoleToken() {
    console.log(this.localStorageService.getData('sellerToken'))
  }
  
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    stock: new FormControl(0, [Validators.required, Validators.min(0)]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    image: new FormControl(null, [Validators.required])
  });
  get name() { return this.form.get('name')}
  get description() { return this.form.get('description')}
  get stock() { return this.form.get('stock')}
  get price() { return this.form.get('price')}
  get priceIdr() { return this.idr.format(this.price === null ? 0 : this.price.value)}
  get image() { return this.form.get('image')}

  imagePreview: string | undefined= '';
  formLoading: boolean = false;
  
  onImageChange(e: any) {
    const file = e.target.files[0];
    
    if (file) {
      let reader = new FileReader();

      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
        this.image?.patchValue(file);
      }

      reader.readAsDataURL(file)
    } else {
      this.imagePreview = undefined;
    }
  }

  submit(e: Event) {
    e.preventDefault();

    if (this.form.invalid) return;

    this.formLoading = true;
    
    const { name, description, stock, price, image} = this.form.controls;
    console.log('image.value', image.value)
    const data = new FormData();
    data.append('name', name.value !== null ? name.value : '')
    data.append('description', description.value !== null ? description.value : '')
    data.append('stock', String(stock.value) !== null ? String(stock.value) : '')
    data.append('price', String(price.value) !== null ? String(price.value) : '');
    data.append('image', image.value !== null ? image.value : '');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.localStorageService.getData('sellerToken')}`)

    this.http.post(this.env.apiUrl()+'/sellers/create-product/', data, {headers}).subscribe({
      next: response => {
        console.log('response', response)
        this.formLoading = false;
      }, 
      error: (e: any) => {
        console.log('error', e)
        this.formLoading = false;
        if (e.status === 401 || e?.error?.name === 'JsonWebTokenError' || e?.error?.name === 'TokenExpiredError') {
          this.localStorageService.removeData('sellerToken');
          this.router.navigate(['/seller/login']);
        }
      }
    });

  }
}
