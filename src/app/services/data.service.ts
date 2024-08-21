import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  getAllUser() {
    return this.http.get('api/users');
  }
  getUserbyId(id: number) {
    return this.http.get('api/users/' + id)
  }
  updateUser(id: number, updateBody: any) {
    return this.http.put('api/users/' + id, updateBody)
  }
}
