import { Component, Input, OnInit } from '@angular/core';
import { FullUser, User } from 'src/app/Models/user.model';
import { UsersListComponent } from './users-list/users-list.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent {
  editingInstance: User;
  listModelClass = User;
  tableComponent = UsersListComponent;

  editItem(user: User) {
    // TODO: must find an api to have more options for implementing all functionalities
    // (mst call constructor(private: router: Router))
    // this.router.navigate([`users/edit`, user.id]);
  }
}
