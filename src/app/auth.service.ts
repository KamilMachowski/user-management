import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { EncryptService } from './encrypt.service';
import { User } from './_models/user';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;
  confirmed = false;
  constructor(private api: ApiService, private enc: EncryptService) {}

  check(email: string, pass: string): string {
    const token = `{"pass":"${pass}"}`;
    //const token = this.enc.getHash(email + pass);
    const result = this.api.getData(token).subscribe((data: User[]) => {
      //console.log(data[0]);
      if (data === undefined) {
        // console.log('no such user or wrong password');
        this.confirmed = false;
      } else {
        console.log(`Data: ${data[0]}`); // ok
        this.currentUser = data[0];
        // this.confirmed = true;
      }
    });
  }
}
