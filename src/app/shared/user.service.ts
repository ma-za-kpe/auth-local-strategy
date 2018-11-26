import { Injectable } from '@angular/core';
import { User } from './user';
import { Http, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = '/api/users';

  constructor(private http: Http) { }

  // get("/api/users/userReg")
  getContacts(): Promise<void | User[]> {
    return this.http.get(this.usersUrl + '/userReg')
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }

  // post("/api/users/register")
  createContact(newUser: User): Promise<void | User> {
    return this.http.post(this.usersUrl, newUser)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  // get("/api/contacts/:id") endpoint not used by Angular app


  // delete("/api/contacts/:id")
  deleteContact(delUserId: String): Promise<void | String> {
    return this.http.delete(this.usersUrl + '/' + delUserId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.handleError);
  }

  // put("/api/contacts/:id")
  updateContact(putUser: User): Promise<void | User> {
    var putUrl = this.usersUrl + '/' + putUser._id;
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
