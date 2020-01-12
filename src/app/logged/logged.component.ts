import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.css']
})
export class LoggedComponent implements OnInit {
  editable = false;
  passChange = false;

  oldPass = '';
  newPass = '';
  newPass2 = '';
  @Input() users: User[];
  @Input() currentUser: User;
  @Input() editBtn = 'Edit Personal Data';
  constructor(
    private router: Router,
    private auth: AuthService,
    private api: ApiService
  ) {}

  ngOnInit() {
    if (!this.auth.msg.logged) this.router.navigate(['']);
    else {
      this.currentUser = this.auth.currentUser;
      this.api.getWeather(this.currentUser.city).subscribe();
    }
  }
  editOn() {
    // edition on/off method
    this.editable = !this.editable;
    if (this.editable) {
      document.getElementById('city').removeAttribute('disabled');
      document.getElementById('country').removeAttribute('disabled');
      document
        .getElementById('editBtn')
        .classList.replace('btn-primary', 'btn-success');
      this.editBtn = 'Update Personal Data';
    } else {
      document.getElementById('city').setAttribute('disabled', '');
      document.getElementById('country').setAttribute('disabled', '');
      document
        .getElementById('editBtn')
        .classList.replace('btn-success', 'btn-primary');
      this.editBtn = 'Edit Personal Data';
      this.update();
    }
  }
  update() {
    this.api
      .putData(
        `{"email":"${this.currentUser.email}","city":"${this.currentUser.city}","country":"${this.currentUser.country}","token":"${this.currentUser.token}"}`
      )
      .subscribe();
  }
  delete() {
    if (
      confirm(
        `User ${this.currentUser.name} ${this.currentUser.surname} will be deleted from DB. This operation is irreversible. Are you sure?`
      )
    ) {
      this.api.deleteData(this.currentUser.email).subscribe();
      this.auth.logout(
        `User ${this.currentUser.name} ${this.currentUser.surname} succesfully deleted.`,
        ''
      );
    }
  }
  changePass() {
    this.passChange = !this.passChange;
    if (!this.passChange) {
      const token = this.auth.genToken(this.currentUser.email, this.oldPass);
      if (token === this.currentUser.token && this.newPass === this.newPass2) {
        this.currentUser.token = this.auth.genToken(
          this.currentUser.email,
          this.newPass
        );
        this.update();
        this.msgGen(this.currentUser.email);
      }
    }
  }
  msgGen(email) {
    this.auth.msg.msg1 = `Password of user ${email} was succesfully changed.`;
    this.auth.msg.msg2 = `New password is set to ${this.newPass}`;
    this.auth.msg.returnUrl = '/logged';
    this.router.navigate(['msg']);
  }
  genPass() {
    this.newPass = this.newPass2 = this.auth.passGenerator();
  }
  getUsers() {
    if (this.users === undefined) {
      this.api
        .getData('{}')
        .pipe()
        .subscribe((data: User[]) => {
          this.users = data;
          console.log(this.users);
        });
    }
  }
  selectUser(i: number) {
    this.genPass();
    this.users[i].token = this.auth.genToken(this.users[i].email, this.newPass);
    this.api
      .putData(
        `{"email":"${this.users[i].email}","token":"${this.users[i].token}"}`
      )
      .subscribe();
    this.msgGen(this.users[i].email);
  }
}
