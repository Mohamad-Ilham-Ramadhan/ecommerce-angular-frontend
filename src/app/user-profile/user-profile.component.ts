import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

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
export class UserProfileComponent {
  constructor(public userService: UserService, public env: EnvironmentService, private router: Router) {}

  edit() {
    this.router.navigate(['/user/profile/edit'])
  }
}
