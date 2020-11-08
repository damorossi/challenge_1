import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  public onSubmit(login: NgForm) {
    const loginSubscription = {
      next: x => console.log('user logged redirect to users'),
      error: err => console.log('error, redirigir ' + err)
    };
    this.authService.register(login.value).subscribe(
      loginSubscription
    );
  }
}
