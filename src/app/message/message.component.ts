import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Msg } from '../_models/msg';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  msg: Msg;
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    this.msg = this.auth.msg;
    setTimeout(() => {
      this.router.navigate([this.msg.returnUrl]);
    }, 3000);
  }
}
