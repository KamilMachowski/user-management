import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';

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

  @Input() currentUser: User;
  @Input() editBtn = 'Edit Personal Data';
  constructor(
    private router: Router,
    private auth: AuthService,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.currentUser = this.auth.currentUser;
    if (!this.auth.msg.logged) this.router.navigate(['']);
    //    console.log(`data from logged ${this.auth.currentUser}`);
  }
  editOn() {
    // edition on/off method
    this.editable = !this.editable;
    if (this.editable) {
      document.getElementById('email').removeAttribute('disabled');
      document.getElementById('city').removeAttribute('disabled');
      document.getElementById('country').removeAttribute('disabled');
      document
        .getElementById('editBtn')
        .classList.replace('btn-primary', 'btn-success');
      this.editBtn = 'Update Personal Data';
    } else {
      document.getElementById('email').setAttribute('disabled', '');
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
    // console.log(this.item);
    //console.log(this.currentUser.country);
    const data = JSON.stringify(this.currentUser);
    this.api.putData(data).subscribe(res => console.log(res));
    // API response: Item ${item.id} successfully updated
  }
  delete() {
    console.log(`Item ID: ${this.currentUser._id} will be deleted from DB`);
    if (
      confirm(
        `User ${this.currentUser.name} ${this.currentUser.surname} will be deleted from DB. This operation is irreversible. Are you sure?`
      )
    ) {
      this.api
        .deleteData(this.currentUser._id)
        .subscribe(res => console.log(res));
      this.auth.logout();
      this.auth.msg.message = `User ${this.currentUser.name} ${this.currentUser.surname} succesfully deleted. Now you will be redirected to login page within 5 sec.`;
      this.auth.msg.returnUrl = '';
      this.router.navigate(['/msg']);
    }
    // API response: Item ${itemId} successfully deleted
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
        this.auth.msg.message = `Password succesfully changed to ${this.newPass}`;
        this.auth.msg.returnUrl = '/logged';
        this.router.navigate(['msg']);
      }
    }
  }
  genPass() {
    const length = 8,
      charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let pass = '';
    for (var i = 0, n = charset.length; i < length; ++i) {
      pass += charset.charAt(Math.floor(Math.random() * n));
    }
    this.newPass = pass;
    this.newPass2 = pass;
  }
}
