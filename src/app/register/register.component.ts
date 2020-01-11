import { Component, OnInit, Input } from '@angular/core';
import { User } from '../_models/user';
import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  pass: string;
  pass2: string;

  @Input() newUser: User = new User();
  constructor(
    private auth: AuthService,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {}
  register() {
    this.newUser.admin = false;
    if (this.auth.checkEmail(this.newUser.email)) {
      if (this.pass === this.pass2) {
        this.newUser.token = this.auth.genToken(this.newUser.email, this.pass);
        console.log(this.newUser);
        const data = JSON.stringify(this.newUser);
        this.api.postData(data).subscribe();
        this.auth.msg.message = `User ${this.newUser.name} ${this.newUser.surname} succesfully added. Now you will be redirected to login page within 5 sec.`;
        this.auth.msg.returnUrl = '';
        this.router.navigate(['/msg']);
      } else {
        alert('Paswords not match');
        this.pass = this.pass2 = '';
        return;
      }
    } else console.log(`user with email ${this.newUser.email} exist`);
  }
}
