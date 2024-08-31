import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SellerService } from '../services/seller.service';
import { UserService } from '../services/user.service';
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
  constructor(private http: HttpClient, private localStorageService: LocalStorageService, public env: EnvironmentService, public sellerService: SellerService, private router: Router, public userService: UserService) {
  }

  isSellerLoggedIn = false;
  isUserLoggedIn = false;

  ngOnInit(): void {
    console.log('seller', this.sellerService.seller)

    if (this.localStorageService.getData('userToken')) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.localStorageService.getData('userToken')}`)
      this.http.get(this.env.apiUrl()+'/users/find-one', {headers}).subscribe({
        next: (response: any) => {
          console.log('header fetch user')
          this.userService.setUser(response);
          this.isUserLoggedIn = true;
          this.sellerService.reset();
          this.localStorageService.removeData('sellerToken');
        },
        error: (error) => {
          console.log('header fetch user')
          console.log('get seller error', error)
        }
      })
    } else if (this.localStorageService.getData('sellerToken')) {

      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.localStorageService.getData('sellerToken')}`)
      this.http.get(this.env.apiUrl()+'/sellers/find-one', {headers}).subscribe({
        next: (response: any) => {
          console.log('header fetch seller')
          this.sellerService.setSeller(response.seller);
          this.isSellerLoggedIn = true;
          this.userService.reset();
          this.localStorageService.removeData('userToken');

        },
        error: (error) => {
          console.log('header fetch seller')
          console.log('get seller error', error)
        }
      })
    }
  }

  userLogout() {
    this.userService.reset();
    this.isUserLoggedIn = false;
    this.localStorageService.removeData('userToken');
    this.router.navigate(['/user/login']);
  }
  sellerLogout() {
    this.sellerService.reset();
    this.isSellerLoggedIn = false;
    this.localStorageService.removeData('sellerToken');
    this.router.navigate(['/seller/login']);
  }
}
