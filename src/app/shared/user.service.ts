import { Injectable } from '@angular/core';
import { User } from './user';
import { Http, Response } from '@angular/http';
import { Router } from "@angular/router";
import * as config from '../config/server.json';
import { isDevMode } from '@angular/core';

// let addr = (<any>config).live_server;

// if (isDevMode()) {
//   // dev code
//   addr = (<any>config).local_server;
//   console.log('development');
// } else {
//   // production code
//   addr = (<any>config).live_server;
//   console.log('live');
// }

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private addr = '/api';

  constructor(private http: Http, private router: Router) { }

  // get("/api/users/userReg")
  getUser(): Promise<void | User[]> {
    return this.http.get(this.addr + '/users/userReg')
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }


  // post("/api/users/register")
  createUser(newUser: User): Promise<void | User> {
    return this.http.post(this.addr + '/users/register', newUser)
      .toPromise()
      .then(response => response.json() as User)
      .then(() => {
        this.router.navigate(['/users/login']);
      })
      .catch(this.handleError);
  }

  // get("/api/contacts/:id") endpoint not used by Angular app


  // delete("/api/contacts/:id")
  deleteUser(delUserId: String): Promise<void | String> {
    return this.http.delete(this.addr + '/' + delUserId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.handleError);
  }

  // put("/api/contacts/:id")
  updateUser(putUser: User): Promise<void | User> {
    var putUrl = this.addr + '/' + putUser._id;
    return this.http.put(putUrl, putUser)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
