import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { environment as env } from '../../environments/environment.development';

import { ModalComponent } from '../modal/modal.component';
import { Dialog, DialogRef, DIALOG_DATA, DialogModule } from '@angular/cdk/dialog';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-list',
  standalone: true,
  imports: [DialogModule, ModalComponent, NgIf],
  templateUrl: './seller-list.component.html',
  styleUrl: './seller-list.component.scss'
})
export class SellerListComponent implements OnInit {
  
  sellers: any = [];
  fetchLoading: boolean = true;
  deleteLoading: boolean = false;


  constructor(private http: HttpClient, private router: Router, public dialog: Dialog) {}

  ngOnInit(): void {

    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    this.http.get(env.apiUrl+'/sellers', {headers}).subscribe({
      next: (response) => {
        this.sellers = response;
        this.fetchLoading = false;
      },
      error: (error) => {
        console.log('error', error);
        this.fetchLoading = false;
        if (error.status === 401) {
          localStorage.removeItem('tokenAdmin');
          this.router.navigate(['/admin/login'])
        }
      }
    })
  }

  deleteAll() {
    this.deleteLoading = true;

    this.http.delete(env.apiUrl+'/sellers/truncate').subscribe({
      next: (response: any) => {
        this.sellers = response.sellers;
        this.deleteLoading = false;
      },
      error: (error) => {
        this.deleteLoading = false;
      }
    });
  }
  
  deleteSingle(id: number) {
    this.deleteLoading = true;

    this.http.delete(`http://localhost:3000/sellers/delete/${id}`).subscribe({
      next: (response: any) => {
        this.deleteLoading = false;
        this.sellers = response.sellers;
      },
      error: (error) => {
        this.deleteLoading = false;
      }
    });
  }

  openDialog(seller: any): void {
    const dialogRef = this.dialog.open(ModalDeleteComponent, {
      width: '450px',
      data: {
        seller,
        text: `Delete seller with name "${seller.name}"`
      }
    });
    
    dialogRef.closed.subscribe( result => {
      if (result === 'delete') {
        this.deleteSingle(seller.id)
      }
    });
    // dialogRef.eve
  }
}
