import { Component, Input, OnChanges, OnInit, SimpleChanges, Type } from '@angular/core';
import { FullUser } from 'src/app/Models/user.model';
import { ClientApiService } from 'src/app/services/client-api.service';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.css']
})
export class MainTableComponent implements OnInit, OnChanges {
  @Input() dyamicModelName = '';
  @Input() tableComponent: any;

  items: any[];
  page = 1;
  loading = false;
  totalRecords = 0;
  fetchForward = false;
  myContext = {items: []};
  tableComponentInputProperties: {
    items?: any[];
  } = {};

  tableComponentOutputProperties = {
    // editItem: ($event) => this.editItem.emit($event),
    deleteItem: ($event) => this.deleteItem($event),
  };

  constructor( private apiService: ClientApiService) { }

  ngOnInit(): void {
    if (this.dyamicModelName !== '') {
    } else {
      this.dyamicModelName = 'users';
    }
    this.fetch(this.page);
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dyamicModelName) {
      console.log(this.dyamicModelName);
    }
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
          this.items = data.data;
          this.myContext = { items: this.items}
      });
  }

  public fetchNext() {
    if(this.items.length > 0) {
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

  public deleteItem(id: string) {

    this.apiService.deleteInstance(this.dyamicModelName, id).subscribe(
     () => {
        this.fetch(this.page);
      }
    );
  }
}
