import { Component } from '@angular/core';
import { RouterLink, RouterOutlet} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LocalStorageService } from '../services/local-storage.service';
import { EnvironmentService } from '../services/environment.service';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  constructor(private http: HttpClient, private localStorageService: LocalStorageService, private env: EnvironmentService) {}

  truncateProducts() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.localStorageService.getData('adminToken')}`);
    this.http.delete(this.env.apiUrl()+'/products/truncate', { headers}).subscribe({
      next: (response: any) => {
        console.log('response', response);
      },
      error: (error: any) => {
        console.log('error', error);
      }
    });
  }
}
