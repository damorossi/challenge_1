import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  public onSubmit(login: NgForm) {
    const loginSubscription = {
      next: x => console.log('user logged redirect to users'),
      error: err =>  this.router.navigate(['error'])
    };
    this.authService.login(login.value).subscribe(
      loginSubscription
    );
  }

  public checkLogin() {
    const status = this.authService.isLoggedIn();
  }
}
