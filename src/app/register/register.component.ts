import { Component, OnInit, Input } from '@angular/core';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';
import { ApiService } from '../_services/api.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

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
    this.auth
      .checkEmail(this.newUser.email)
      .pipe(first())
      .subscribe((data: User[]) => {
        if (data[0] === undefined) {
          if (this.pass === this.pass2) {
            this.newUser.token = this.auth.genToken(
              this.newUser.email,
              this.pass
            );
            this.api.postData(this.newUser).subscribe();
            this.auth.msg.msg1 = `User ${this.newUser.name} ${this.newUser.surname} succesfully added.`;
            this.auth.msg.msg2 = `Redirection to login page within 3 sec.`;
            this.auth.msg.returnUrl = '';
            this.router.navigate(['/msg']);
          } else {
            alert('Paswords not match');
            this.pass = this.pass2 = '';
            return;
          }
        } else console.log(`user with email ${this.newUser.email} exist`);
      });
  }
}
