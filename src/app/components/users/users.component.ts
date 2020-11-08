import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientApiService } from 'src/app/client-api.service';
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
  // deleteSuccess
  constructor(private userService: UsersService, private apiService: ClientApiService) { }

  ngOnInit(): void {
   this.fetch(this.page);
  }

  fetch(page: number) {
      this.loading = true;
      this.apiService.listData('users', page.toString())
      .subscribe(
        (data: any) => {
          this.loading = true;
          this.totalRecords = data.total;
          this.fetchForward = (this.page * data.data.length) < data.total;
          this.loading = false;
          this.users = data.data;
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

    this.apiService.deleteInstance('users', id).subscribe(
      data => {
        this.fetch(this.page);
      }
    );
  }
}
