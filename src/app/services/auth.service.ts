import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://reqres.in/api';
  private endpoint = 'login';
  constructor(private http: HttpClient) { }

  public isLoggedIn() {
    console.log('eyeyeye')
   return !!localStorage.getItem('token');
  }

  public login(data: any) {
    return this.http.post(`${this.url}/${this.endpoint}`, data)
      .pipe(
        map((response: any) => {
            const user = {...response};
            if (user.token) {
              localStorage.setItem('token', user.token);
            }
        })
      );
  }

  public register(data: any) {
    return this.http.post(`${this.url}/register`, data );
  }

}
