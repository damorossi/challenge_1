import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent  {
  isUserLoged: boolean;
  constructor(private authService: AuthService) { }

  public logOut(): void {
    this.authService.logout();
  }

  public isUserLogedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
