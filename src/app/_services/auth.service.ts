import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { map } from 'rxjs/operators';
import { Msg } from '../_models/msg';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;
  users: User[];
  msg: Msg;
  loading: boolean;
  constructor(private api: ApiService, private router: Router) {
    this.msg = {
      msg1: 'This is default message',
      msg2: '',
      logged: false,
      returnUrl: ''
    };
  }
  genToken(email, pass) {
    let token = `${email}${pass}`;
    let result = '';
    let charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0, n = charset.length; i < token.length; i++) {
      var tmp = token.charCodeAt(i) - 33;
      while (tmp > n) tmp -= n;
      result += charset.charAt(tmp);
    }
    return result;
  }
  login(token) {
    let query = `{"token":"${token}"}`;
    return this.api.getData(query).pipe(
      map((data: User[]) => {
        if (data[0] === undefined) {
          // user not exist in db
          this.currentUser = undefined;
          this.msg.logged = false;
          this.msg.returnUrl = '';
        } else if (data[0]) {
          // user present in db, loading data
          this.currentUser = data[0];
          this.msg.logged = true;
          this.msg.returnUrl = '/logged';
        }
        this.loading = false;
        this.router.navigate([this.msg.returnUrl]);
      })
    );
  }
  checkEmail(email) {
    let query = `{"email":"${email}"}`;
    return this.api.getData(query).pipe();
  }
  logout(msg1: string, msg2: string) {
    this.currentUser = new User();
    this.msg.logged = false;
    this.msg.returnUrl = '';
    this.msg.msg1 = msg1;
    this.msg.msg2 = msg2;
    this.router.navigate(['/msg']);
  }
  passGenerator() {
    const length = 8,
      charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let pass = '';
    for (var i = 0, n = charset.length; i < length; ++i) {
      pass += charset.charAt(Math.floor(Math.random() * n));
    }
    return pass;
  }
}
