import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { EnvironmentService } from '../services/environment.service';
import { LocalStorageService } from '../services/local-storage.service';
import { IdrPipe } from '../pipes/idr.pipe';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-review-notif-list',
  standalone: true,
  imports: [IdrPipe, DatePipe, RouterLink],
  templateUrl: './review-notif-list.component.html',
  styleUrl: './review-notif-list.component.scss'
})
export class ReviewNotifListComponent implements OnInit {
  constructor(private http: HttpClient, public env: EnvironmentService, private localStorageService: LocalStorageService, public userService: UserService) {}
  ngOnInit(): void {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.localStorageService.getData('userToken')}`)
      this.http.get(this.env.apiUrl()+'/products/review-notif-list', {headers}).subscribe({
        next: (response: any) => {
          this.notifs = response;
          this.loading = false;
        },
        error: (error) => {
          console.log('eview-notif-list error', error)
          this.loading = false;
        }
      });
  }
  notifs: any[] = [];
  loading: boolean = true;
}
