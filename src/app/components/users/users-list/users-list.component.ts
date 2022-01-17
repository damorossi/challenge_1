import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FullUser, User } from 'src/app/Models/user.model';
import { SearchParams, SortParam } from 'src/app/ui/model-list/basic-types';
import { TableComponent } from 'src/app/ui/model-list/table-base.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements TableComponent<User> {
  @Input() items: User[] | FullUser[];
  @Output() deleteInstance = new EventEmitter<any>();
  @Input() searchParams: SearchParams;
  @Input() shrinked: boolean;
  @Input() sortField: SortParam;
  @Output() editItem = new EventEmitter<User>();
  @Output() search = new EventEmitter();
  @Output() searchParamsChange = new EventEmitter<SearchParams>();
  @Output() sortFieldChange = new EventEmitter<SortParam>();
}
