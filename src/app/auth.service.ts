import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { User } from './_models/user';
import { EventEmitter } from 'events';
import { map, filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;
  logged: boolean;// = false;

  constructor(private api: ApiService, private router: Router) {}

  // this.auth.check(email, pass);
  returnUrl: string;
  genToken(email, pass){
    return `${email}${pass}`;
  }
  login(token) {
    return this.api.getData(token).pipe(
      map((user: User[]) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes

        if (user[0] === undefined) {
          console.log('No such user or wrong password');
          this.currentUser = undefined;
          this.logged = false;
          this.returnUrl = '';
        } else if (user[0]) {
          console.log(`Data: ${user[0]}`); // ok
          this.currentUser = user[0];
          this.logged = true;
          this.returnUrl = '/logged';
        }
        this.router.navigate([this.returnUrl]);
        //localStorage.setItem('currentUser', JSON.stringify(user));
        //this.currentUserSubject.next(user);
        //return user;
      })
    );
  }
  logout(){
    this.currentUser = new User;
    this.logged = false;
  }
  // login(token) {
  //   this.api.getData(token).subscribe(data => {
  //     if (data[0] === undefined) {
  //       console.log('No such user or wrong password');
  //       this.currentUser = undefined;
  //       this.logged = false;
  //     } else {
  //       console.log(`Data: ${data[0]}`); // ok
  //       this.currentUser = data[0];
  //       this.logged = true;
  //     }
  //   });
  // }
}
