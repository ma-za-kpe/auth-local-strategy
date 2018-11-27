import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User } from '../../shared/user';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],

})
export class SignUpComponent implements OnInit {

  public user: User;

  constructor(public userService: UserService) {
    this.user = new User();
    this.user.firstname = '';
    this.user.lastname = '';
    this.user.email = '';
    this.user.password = '';
    this.user.phoneNumber
  }

  ngOnInit() {
  }

  onRegister() {
    //user object
    const user1 = {
      firstName: this.user.firstname,
      lastName: this.user.lastname,
      email: this.user.email,
      password: this.user.password,
      phoneNumber: this.user.phoneNumber
    }

    console.log(user1.firstName);


    this.userService.createUser(this.user);
  }

  // resetForm(form: NgForm) {
  //   this.userService = {
  //     firstname: '',
  //     lastname: '',
  //     email: '',
  //     password: ''
  //   };
  //   form.resetForm();
  // }

}
