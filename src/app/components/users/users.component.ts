import { Component, Input, OnInit } from '@angular/core';
import { FullUser } from 'src/app/Models/user.model';
import { UsersListComponent } from './users-list/users-list.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {
  @Input() users: FullUser[];

  ngOnInit(): void {
  }
}
