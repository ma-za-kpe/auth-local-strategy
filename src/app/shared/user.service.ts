import { Injectable } from '@angular/core';
import { User } from './user';
import { Http, Response } from '@angular/http';
import { Router, ActivatedRoute } from "@angular/router";
import * as config from '../config/server.json';
import { isDevMode } from '@angular/core';

let addr = (<any>config).live_server;

if (isDevMode()) {
  // dev code
  addr = (<any>config).local_server;
  console.log('development');
} else {
  // production code
  addr = (<any>config).live_server;
  console.log('live');
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private addrr = '/api';
  return: string = '';
  token: string;

  constructor(private http: Http, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // Get the query params
    this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/home');
  }

  // get("/api/users/userReg")
  getUser(): Promise<void | User[]> {
    return this.http.get(addr + '/users/userReg')
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }


  // post("/api/users/register")
  createUser(newUser: User): Promise<void | User> {
    return this.http.post(addr + '/users/register', newUser)
      .toPromise()
      .then(response => response.json() as User)
      .then(() => {
        this.router.navigate(['/users/login']);
      })
      .catch(this.handleError);
  }

  //login
  login(authCridentials: User): Promise<void | User> {

    return this.http.post(addr + '/users/authenticate', authCridentials)
      .toPromise()
      .then(response => response.json() as User)
      .then((respond) => {
        this.setToken(respond['token']);
        this.router.navigate(['/home']);
        // this.router.navigate([this.return]);
      })
      .catch(this.handleError);
  }

  logout() {
    this.token = null;
    localStorage.clear();
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  deleteToke() {
    localStorage.removeItem('token');
  }

  getUserPayLoad() {
    var token = localStorage.getItem('token');
    if (token) {
      var UserPayLoad = atob(token.split('.')[1]);
      return JSON.parse(UserPayLoad)
    } else {
      return null;
    }
  }

  isLoggedIn() {
    var UserPayLoad = this.getUserPayLoad();
    if (UserPayLoad) {
      return UserPayLoad.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  // get("/api/contacts/:id") endpoint not used by Angular app


  // delete("/api/contacts/:id")
  deleteUser(delUserId: String): Promise<void | String> {
    return this.http.delete(addr + '/' + delUserId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.handleError);
  }

  // put("/api/contacts/:id")
  updateUser(putUser: User): Promise<void | User> {
    var putUrl = addr + '/' + putUser._id;
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
