import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url =  environment.apiBaseUrl;
  private endpoint = 'login';
  constructor(private http: HttpClient, private router: Router) { }

  public isLoggedIn() {
   return !!localStorage.getItem('token');
  }

  public login(data: any) {
    return this.http.post(`${this.url}/${this.endpoint}`, data)
      .pipe(
        map((response: any) => {
            const user = {...response};
            if (user.token) {
              localStorage.setItem('token', user.token);
              this.router.navigate(['users']);
            }
        })
      );
  }

  public register(data: any) {
    return this.http.post(`${this.url}/register`, data );
  }

  public logout() {
    localStorage.clear();
    this.router.navigate(['home']);
  }

}
