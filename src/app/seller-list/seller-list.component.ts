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
  deleteLoading: boolean = false;

  constructor(private http: HttpClient) {
    http.get('http://localhost:3000/sellers').subscribe({
      next: (response) => {
        this.sellers = response
      },
      error: (error) => {

      }
    })
  }

  deleteAll() {
    this.deleteLoading = true;

    this.http.delete('http://localhost:3000/sellers/truncate').subscribe({
      next: (response) => {
        console.log('deleteAll() response', response)
        this.sellers = [];
        this.deleteLoading = false;
      },
      error: (error) => {
        console.log('deleteAll() error', error)
        this.deleteLoading = false;
      }
    });
  }
  
  deleteSingle(id: number) {
    console.log('delete', id)
    this.deleteLoading = true;

    this.http.delete(`http://localhost:3000/sellers/${id}`).subscribe({
      next: (response: any) => {
        console.log('deleteSingle() response', response)
        this.deleteLoading = false;
        this.sellers = response.sellers;
      },
      error: (error) => {
        console.log('deleteSingle() error', error)
        this.deleteLoading = false;
      }
    });
  }

}
