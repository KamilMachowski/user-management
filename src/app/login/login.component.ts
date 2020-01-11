import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { EventEmitter } from 'events';
import { AuthService } from '../auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  pass: string;
  loading: boolean = false;
  confirmed: boolean = false;
  returnUrl = '/logged';
  currentUser: User[];

  @Output() dataEvent: EventEmitter = new EventEmitter();
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    this.auth.currentUser = new User();
    this.auth.msg.logged = false;
  }
  submit() {
    this.loading = true;
    this.auth.currentUser = undefined;
    const token = this.auth.genToken(this.email, this.pass);
    this.auth
      .login(token)
      .pipe(first())
      .subscribe();
  }
}
