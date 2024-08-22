import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { environment } from '../../environments/environment.development';
@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.scss'
})
export class SellerHomeComponent implements OnInit {
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // this.http.get(environment.apiUrl + '/sellers/');
    this.activatedRoute.url.subscribe( (urls) => {
      this.http.get(environment.apiUrl + '/sellers/' + urls[1].path).subscribe( (response) => {
        console.log('response', response)
      });
    });
  }
}
