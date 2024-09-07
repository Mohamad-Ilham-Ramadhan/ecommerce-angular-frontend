import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ButtonComponent } from '../button/button.component';
import { UserService } from '../services/user.service';
import { EnvironmentService } from '../services/environment.service';
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  constructor(public userService: UserService, public env: EnvironmentService) {}

  ngOnInit(): void {
    console.log('user-profile ngOnInit', this.userService)
  }

  edit() {
    
  }
}
