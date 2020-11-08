import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FullUser, User } from 'src/app/Models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {
  users: FullUser[];
  page = 1;
  loading = false;
  totalRecords = 0;
  fetchForward = false;
  constructor(private userService: UsersService) { }

  ngOnInit(): void {
   this.fetch(this.page);
  }

  fetch(page: number) {
      this.loading = true;
      this.userService.getUsers(page.toString())
      .subscribe(
        (data: any) => {
          this.loading = true;
          setTimeout(() => {

            this.totalRecords = data.total;
            this.fetchForward = (this.page * data.data.length) < data.total;
            this.loading = false;
            this.users = data.data;
          }, 6000);
      });
  }

  public fetchNext() {
    if(this.users.length > 0) {
      this.page++;
      this.fetch(this.page);
    }
  }

  public fetchPrev() {
    if(this.page > 1) {
      this.page--;
    }
    this.fetch(this.page);
  }

  public deleteUser(id: string, i: number) {

    this.userService.deleteUser(id).subscribe(
      data => {
        this.fetch(this.page);
      }
    );
  }
}
