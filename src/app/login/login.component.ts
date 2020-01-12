import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  pass: string;
  invalid: string;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    this.auth.currentUser = new User();
    this.auth.msg.logged = false;
  }
  submit() {
    this.auth.loading = true;
    this.auth.currentUser = undefined;
    const token = this.auth.genToken(this.email, this.pass);
    this.auth
      .login(token)
      .pipe(first())
      .subscribe(() => {
        if (!this.auth.loading) {
          this.email = '';
          this.pass = '';
          this.invalid = 'Please type correct email-password pair.';
        }
      });
  }
}
