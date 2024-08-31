import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dialog } from '@angular/cdk/dialog';

import { EnvironmentService } from '../services/environment.service';

import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { LocalStorageService } from '../services/local-storage.service';
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [ModalDeleteComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {

  users: any = [];
  fetchLoading: boolean = true;
  deleteLoading: boolean = false;


  constructor(private http: HttpClient, private router: Router, public dialog: Dialog, private env: EnvironmentService, private localStorageService: LocalStorageService) {}

  ngOnInit(): void {

    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    this.http.get(this.env.apiUrl()+'/users', {headers}).subscribe({
      next: (response) => {
        console.log('get all users response', response)
        this.users = response;
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

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.localStorageService.getData('adminToken')}`)
    this.http.delete(this.env.apiUrl()+'/users/truncate', {headers}).subscribe({
      next: (response: any) => {
        this.users = [];
        this.deleteLoading = false;
      },
      error: (error) => {
        this.deleteLoading = false;
        if (error.status === 401) {
          this.localStorageService.removeData('adminToken');
          this.router.navigate(['/admin/login'])
        }
      }
    });
  }
  
  deleteSingle(id: number) {
    this.deleteLoading = true;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.localStorageService.getData('adminToken')}`);
    this.http.delete(`http://localhost:3000/users/delete`, {body: {id}, headers}).subscribe({
      next: (response: any) => {
        this.deleteLoading = false;
        this.users = response;
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
