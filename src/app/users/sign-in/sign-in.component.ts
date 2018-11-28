import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User } from '../../shared/user';
import { UserService } from '../../shared/user.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit() {
  }

  model = {
    email: '',
    password: ''
  }

  signIn(form: NgForm) {
    this.userService.login(form.value);
  }

}
