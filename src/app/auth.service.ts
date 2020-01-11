import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { User } from './_models/user';
import { map } from 'rxjs/operators';
import { Msg } from './_models/msg';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;
  users:User[];
  msg: Msg;
  constructor(private api: ApiService, private router: Router) {
    //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.msg = { "message":'This is default message', "logged": false, "returnUrl":''};
  }

  // this.auth.check(email, pass);
  
  genToken(email, pass) {
    return `${email}${pass}`;
  }
  login(token) {
    let query = `{"token":"${token}"}`;
    return this.api.getData(query).pipe(
      map((data: User[]) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes

        if (data[0] === undefined) {
          console.log('No such user or wrong password');
          this.currentUser = undefined;
          this.msg.logged = false;
          this.msg.returnUrl = '';
        } else if (data[0]) {
          console.log(`Data: ${data[0]}`); // ok
          this.currentUser = data[0];        
          this.msg.logged = true;
          this.msg.returnUrl = '/logged';
        }
        this.router.navigate([this.msg.returnUrl]);
        //localStorage.setItem('currentUser', JSON.stringify(data[0]));
      })
    );
  }
  checkEmail(email) {
    let query = `{"email":"${email}"}`;
    return this.api.getData(query).pipe(
      map((data: User[]) => {
        if (data[0] === undefined) {
          console.log(`nie ma takiego usera`);
          return true;
        } else return false;
      })
    );
  }
  logout() {
    this.currentUser = new User();
    this.msg.logged = false;
  }
}
