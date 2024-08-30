import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SellerService } from '../services/seller.service';
import { LocalStorageService } from '../services/local-storage.service';
import { EnvironmentService } from '../services/environment.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  constructor(private http: HttpClient, private localStorageService: LocalStorageService, public env: EnvironmentService, public sellerService: SellerService, private router: Router) {
  }

  isSellerLoggedIn = false;

  ngOnInit(): void {
    console.log('seller', this.sellerService.seller)

    if (this.localStorageService.getData('userToken')) {
      console.log('user exist')

    } else if (this.localStorageService.getData('sellerToken')) {
      console.log('seller exist')
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.localStorageService.getData('sellerToken')}`)
      this.http.get(this.env.apiUrl()+'/sellers/find-one', {headers}).subscribe({
        next: (response: any) => {
          this.sellerService.setSeller(response.seller);
          this.isSellerLoggedIn = true;
        },
        error: (error) => {
          console.log('get seller error', error)
        }
      })
    }
  }

  logout() {
    this.sellerService.reset();
    this.isSellerLoggedIn = false;
    this.localStorageService.removeData('sellerToken');
    this.router.navigate(['/seller/login']);
  }
}
