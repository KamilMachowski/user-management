import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, public auth: AuthService) {}
  logout() {
    this.auth.logout(`User ${this.auth.currentUser.name} ${this.auth.currentUser.surname} succesfully logged out.`,`Redirection to login page within 3 sec.`);
  }
}
