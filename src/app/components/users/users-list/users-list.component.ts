import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FullUser, User } from 'src/app/Models/user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
  @Input() items: User[] | FullUser[];
  @Output() deleteInstance = new EventEmitter<any>();

}

