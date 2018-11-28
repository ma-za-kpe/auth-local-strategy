import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { UserService } from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'auth';

  constructor(private router: Router, private userService: UserService) { }

  onLogoutClick() {
    this.userService.logout();
    this.router.navigate(['/users/login']);
    return false;
  }
}
