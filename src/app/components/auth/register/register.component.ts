import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './../login/login.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  title = 'Register';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  public onSubmit(login: NgForm) {
    const loginSubscription = {
      next: x => this.router.navigate(['login']),
      error: err => this.router.navigate(['error'])
    };
    this.authService.register(login.value).subscribe(
      loginSubscription
    );
  }
}
