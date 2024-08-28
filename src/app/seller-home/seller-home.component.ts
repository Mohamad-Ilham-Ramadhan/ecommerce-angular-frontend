import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EnvironmentService } from '../services/environment.service';
import { environment } from '../../environments/environment.development';

import { ButtonComponent } from '../button/button.component';

import { LocalStorageService } from '../services/local-storage.service';
import { IdrPipe } from '../pipes/idr.pipe';
@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [RouterLink, IdrPipe, ButtonComponent],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.scss',
})
export class SellerHomeComponent implements OnInit {
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router, public env: EnvironmentService, private localStorageService: LocalStorageService) {}

  loading = true;
  seller:any = {};
  products: any[] = [];

  ngOnInit(): void {
    // this.http.get(environment.apiUrl + '/sellers/');
    console.log('seller-home ngOnInit');
    this.activatedRoute.url.subscribe( (urls) => {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.localStorageService.getData('sellerToken')}`)
      this.http.get(environment.apiUrl + '/sellers/find-one', {headers}).subscribe({
        next: (response: any) => {
          console.log('next response', response)
          this.loading = false;
          this.seller = response.seller;
          this.products = response.products;
        },
        error: (error) => {
          console.log('error response', error);
          if (error.status === 401) {
            localStorage.removeItem('sellerToken');
          }
          this.loading = false;
          this.router.navigate(['/seller/login']);
        }
      });
    });
  }

}
