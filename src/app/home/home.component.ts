import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LocalStorageService } from '../services/local-storage.service';
import { EnvironmentService } from '../services/environment.service';
import { IdrCurrencyService } from '../services/idr-currency.service';
import { IdrPipe } from '../pipes/idr.pipe';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, IdrPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient, private localStorageService: LocalStorageService, public env: EnvironmentService) {}

  ngOnInit(): void {

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.localStorageService.getData('userToken')}`);
    
    this.http.get(this.env.apiUrl()+'/products', {headers}).subscribe({
      next: (response: any) => {
        console.log('get all products response', response);
        this.products = response;
      },
      error: (error) => {
        console.log('error', error)
      }
    });
  }

  products: any[] = [];

}
