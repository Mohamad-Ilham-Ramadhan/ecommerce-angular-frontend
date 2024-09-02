import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';

import { LocalStorageService } from '../services/local-storage.service';
import { EnvironmentService } from '../services/environment.service';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ModalDeleteComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  constructor(private localStorageService: LocalStorageService, private http: HttpClient, public env: EnvironmentService, private dialog: Dialog, private router: Router){}

  products: any[] = [];
  fetchLoading: boolean = true;
  deleteLoading: boolean = false;
  
  ngOnInit(): void {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.localStorageService.getData('adminToken')}`);
    this.http.get(this.env.apiUrl()+'/products', {headers}).subscribe({
      next: (response: any) => {
        console.log('get all products response', response);
        this.products = response;
        this.fetchLoading = false;
      },
      error: (error) => {
        console.log(error)
        this.fetchLoading = false;
      }
    });
  }
  
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

  deleteSingle(id: number) {
    this.deleteLoading = true;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.localStorageService.getData('adminToken')}`);
    this.http.delete(`http://localhost:3000/products/delete`, {body: {id}, headers}).subscribe({
      next: (response: any) => {
        console.log(response)
        this.deleteLoading = false;
        this.products = response;
      },
      error: (error) => {
        this.deleteLoading = false;
        if (error.status === 401) {
          this.localStorageService.removeData('adminToken')
          this.router.navigate(['/admin/login'])
        }
      }
    });
  }

  openDialog(user: any): void {
    const dialogRef = this.dialog.open(ModalDeleteComponent, {
      width: '450px',
      data: {
        user,
        text: `Delete users with name "${user.name}"`
      }
    });
    
    dialogRef.closed.subscribe( result => {
      if (result === 'delete') {
        this.deleteSingle(user.id)
      }
    });
    // dialogRef.eve
  }
}
