import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../_models/user';
import { EventEmitter } from 'events';
import { send } from 'q';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  pass: string;
  loading: boolean = false;

  @Output() dataEvent = new EventEmitter();
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}
  submit(email, pass) {
    this.auth.check(email, pass);
    console.log(this.auth.currentUser);
    this.dataEvent.emit(JSON.stringify(this.auth.currentUser));
    //this.router.navigate(['/logged']);
  }
}
