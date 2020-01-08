import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.css']
})
export class LoggedComponent implements OnInit {
  // auth: boolean;
  @Input() currentUser: User;
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    // if (!this.auth.confirmed) this.router.navigate(['/login']);
    // else console.log(this.auth.share());
    // console.log(`data from logged ${this.auth.user}`);
  }

}
