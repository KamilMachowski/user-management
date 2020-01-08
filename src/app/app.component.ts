import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './_models/user';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;

  constructor(private router: Router, private auth: AuthService) {
    // this.auth.share().subscribe((x: User) => {this.currentUser = x});
  }
  recieveData($event: string) {
    this.currentUser = JSON.parse($event);
    console.log(`data in app comp: ${this.currentUser}`)
  }
  logout() {
    // this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
