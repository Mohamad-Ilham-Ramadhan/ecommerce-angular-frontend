import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EnvironmentService } from '../services/environment.service';
import { environment } from '../../environments/environment.development';
@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.scss',
})
export class SellerHomeComponent implements OnInit {
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router, public env: EnvironmentService) {}

  loading = true;
  seller:any = {};

  ngOnInit(): void {
    // this.http.get(environment.apiUrl + '/sellers/');
    console.log('seller-home ngOnInit');
    this.activatedRoute.url.subscribe( (urls) => {
      console.log('this.activatedRoute.url.subscribe', urls);
      const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('sellerToken')}`)
      this.http.get(environment.apiUrl + '/sellers/' + urls[1].path, {headers}).subscribe({
        next: (response) => {
          console.log('next response', response)
          this.loading = false;
          this.seller = response;
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
