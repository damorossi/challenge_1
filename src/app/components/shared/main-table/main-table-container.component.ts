import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, Type } from '@angular/core';
import { BaseModel } from 'src/app/Models/base-model';
import { FullUser } from 'src/app/Models/user.model';
import { ClientApiService } from 'src/app/services/client-api.service';
import { Dictionary, ListPagingInfo, SearchParams, SortParam } from 'src/app/ui/model-list/basic-types';
import { ItemUserAction } from 'src/app/ui/model-list/table-base.component';

@Component({
  selector: 'app-main-table-container',
  template: `
  <app-main-table
      [items]="items"
      [loading]="loading"
      [otherInputProperties]="otherInputProperties"
      [pagingInfo]="pagingInfo"
      [showHeader]="showHeader"
      [shrinked]="shrinked"
      [title]="title"
      [tableComponent]="tableComponent"
      [searchParams]="searchParams"
      [sortField]="sortField"
      (deleteItem)="deleteItem($event)"
      (editItem)="editItem.emit($event)"
      (itemAction)="itemAction.emit($event)"
      (fetchNext)="fetchNext()"
      (fetchPrev)="fetchPrev()"
      (update)="fetch()"
      (searchParamsChange)="searchParamsChange($event)"
      (sortFieldChange)="sortFieldChange($event)">
    </app-main-table>
    `,
})
export class MainTableContainerComponent implements OnInit, OnChanges {
  @Input() classPrefix = 'modelList';
  @Input() dyamicModelName = '';
  @Input() tableComponent: any;
  @Input() otherInputProperties: Dictionary<any> = {};
  @Input() title = '';
  @Output() editItem = new EventEmitter<BaseModel>();
  @Output() itemAction = new EventEmitter<ItemUserAction<BaseModel>>();

  fetchForward = false;
  items: any[];
  loading = false;
  page = 1;
  pagingInfo: ListPagingInfo;
  searchParams: SearchParams;
  totalRecords = 0;
  sortField: SortParam;
  showHeader = false;
  shrinked = false;

  tableComponentOutputProperties = {
    deleteItem: ($event) => this.deleteItem($event),
  };

  constructor( private apiService: ClientApiService) { }

  ngOnInit(): void {
    if (this.dyamicModelName !== '') {
    } else {
      this.dyamicModelName = 'users';
    }
    this.pagingInfo = {
      index: this.page,
      pageSize: 10,
      totalItems: this.totalRecords,
      totalPages: 0,
    }
    this.pagingInfo.index = this.page;
    this.fetch(this.pagingInfo.index);

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dyamicModelName) {
      console.log(this.dyamicModelName);
    }
  }

  fetch(page: number = 0) {
      this.loading = true;
      this.apiService.listData( this.dyamicModelName, page.toString())
      .subscribe(
        (data: any) => {
          debugger;
          this.loading = true;
          this.totalRecords = data.total;
          this.fetchForward = (this.pagingInfo.index * data.data.length) < data.total;
          this.loading = false;
          this.items = data.data;
          this.pagingInfo = {
            index: data.page,
            pageSize: 10, // DEFINE BECAUSE API TESTS SET IT IN DEFAULT VALUE
            totalItems: data.total,
            totalPages: data.total_pages || 1
          }
      });
  }

  public fetchNext() {
    if(this.items.length > 0) {
      this.pagingInfo.index++;
      this.fetch(this.pagingInfo.index);
    }
  }

  public fetchPrev() {
    if(this.pagingInfo.index > 1) {
      this.pagingInfo.index--;
    }
    this.fetch(this.pagingInfo.index);
  }

  public deleteItem(id: string) {
    this.apiService.deleteInstance(this.dyamicModelName, id).subscribe(
     () => {
        this.fetch(this.pagingInfo.index);
      }
    );
  }

  searchParamsChange(searchParams: SearchParams) {
    this.pagingInfo.index = 1;
    this.searchParams = searchParams;
  }

  sortFieldChange(sortField: SortParam) {
    this.sortField = sortField;
    this.fetch(0);
  }
}
