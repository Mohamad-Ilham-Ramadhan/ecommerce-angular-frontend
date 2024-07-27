import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-seller-list',
  standalone: true,
  imports: [],
  templateUrl: './seller-list.component.html',
  styleUrl: './seller-list.component.scss'
})
export class SellerListComponent {

  sellers: any;
  constructor(private http: HttpClient) {
    http.get('http://localhost:3000/sellers').subscribe({
      next: (response) => {
        console.log('response', response)
        this.sellers = response
      },
      error: (error) => {

      }
    })
  }

  deleteAll() {
    this.http.delete('http://localhost:3000/sellers/truncate').subscribe({
      next: (response) => {
        console.log('deleteAll() response', response)
        this.sellers = [];
      },
      error: (error) => {
        console.log('deleteAll() error', error)
      }
    });
  }

}
