import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../shared/user.service';
import { Router, Route } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {


  constructor(public userService: UserService, private router: Router) { }

  canLoad(route: Route): boolean {

    if (this.userService.isLoggedIn()) {
      this.router.navigate(['/admin/list']);
      return true;
    }
    this.router.navigate(['/users/login']);
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.userService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/users/login']);
  }

}
