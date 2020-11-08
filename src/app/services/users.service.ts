import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/user.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url = 'https://reqres.in/api';
  constructor(private http: HttpClient) { }


  // public createUser(user: User): Observable<User> {
  //    return this.http.post(`${this.url}/users/`, user)
  //     .pipe(
  //       map((resp: any) => {
  //         user.id = resp.id;
  //         return user;
  //       })
  //     );
  // }

  // public updateUser(user: User) {
  //   const userToUpdate = {
  //     ...user
  //   };
  //   delete userToUpdate.id;
  //   return this.http.put(`${this.url}/users/${user.id}`, userToUpdate);
  // }

  // public getUser(id: string) {
  //   return this.http.get(`${this.url}/users/${id}`);
  // }

  // public deleteUser(id: string) {
  //   return this.http.delete(`${this.url}/users/${id}`);
  // }

  // public getTotals() {
  //   const data = this.http.get(`${this.url}/users/`)
  //     .subscribe(
  //       map(data => {
  //         debugger;
  //       })
  //     );
  // }
}
