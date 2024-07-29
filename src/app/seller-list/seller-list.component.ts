import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '../../environments/environment.development';

@Component({
  selector: 'app-seller-list',
  standalone: true,
  imports: [],
  templateUrl: './seller-list.component.html',
  styleUrl: './seller-list.component.scss'
})
export class SellerListComponent  {

  sellers: any = [];
  fetchLoading: boolean = true;
  deleteLoading: boolean = false;


  constructor(private http: HttpClient) {
    console.log('constructor called')
    http.get(env.apiUrl+'/sellers').subscribe({
      next: (response) => {
        console.log('response', response)
        this.sellers = response;
        this.fetchLoading = false;
      },
      error: (error) => {
        console.log('error', error);
        this.fetchLoading = false;
      }
    })
  }

  deleteAll() {
    this.deleteLoading = true;

    this.http.delete(env.apiUrl+'/sellers/truncate').subscribe({
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
