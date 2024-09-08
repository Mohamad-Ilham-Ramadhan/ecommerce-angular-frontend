import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ButtonComponent } from '../button/button.component';

import { SellerService } from '../services/seller.service';
import { UserService } from '../services/user.service';
import { LocalStorageService } from '../services/local-storage.service';
import { EnvironmentService } from '../services/environment.service';
import { ReviewNotifService } from '../services/review-notif.service';
import { CartService } from '../services/cart.service';
import { IdrPipe } from '../pipes/idr.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, IdrPipe, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  constructor(private http: HttpClient, private localStorageService: LocalStorageService, public env: EnvironmentService, public sellerService: SellerService, private router: Router, public userService: UserService, public notifService: ReviewNotifService, public cartService: CartService) {
  }

  isSellerLoggedIn = false;
  isUserLoggedIn = false;

  ngOnInit(): void {
    const userToken = this.localStorageService.getData('userToken');
    if (userToken) {
      this.cartService.fetchProducts();

      const headers = new HttpHeaders().set('Authorization', `Bearer ${userToken}`)
      this.http.get(this.env.apiUrl()+'/users/find-one', {headers}).subscribe({
        next: (response: any) => {
          this.userService.setUser(response);
          this.isUserLoggedIn = true;
          this.sellerService.reset();
          this.localStorageService.removeData('sellerToken');
        },
        error: (error) => {
          console.log('get seller error', error)
        }
      });

      this.http.get(this.env.apiUrl() + '/products/review-notif', {headers}).subscribe({
        next: (response: any) => {
          // console.log('review notif response', response);
          this.notifService.setNotifs(response)
        },
        error: (error: any) => {
          console.log('error', error)
        }
      })

    } else if (this.localStorageService.getData('sellerToken')) {

      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.localStorageService.getData('sellerToken')}`)
      this.http.get(this.env.apiUrl()+'/sellers/find-one', {headers}).subscribe({
        next: (response: any) => {
          this.sellerService.setSeller(response.seller);
          this.isSellerLoggedIn = true;
          this.userService.reset();
          this.localStorageService.removeData('userToken');

        },
        error: (error) => {
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

  buy() {
    // @ts-ignore
    this.cartService.buy()
    this.cartService.afterBuy.subscribe((val: any) => {
      console.log('header buy() val', val)
      this.notifService.setNotifs(val);
    })
  }
}
