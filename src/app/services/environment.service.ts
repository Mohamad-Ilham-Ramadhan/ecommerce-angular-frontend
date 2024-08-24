import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  constructor() { }
  apiUrl() {
    return environment.apiUrl;
  }
}
