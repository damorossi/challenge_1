import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, Type } from '@angular/core';
import { BaseModel } from 'src/app/Models/base-model';
import { ClientApiService } from 'src/app/services/client-api.service';
import { Dictionary, ListPagingInfo, SearchParams, SortParam } from 'src/app/ui/model-list/basic-types';
import { ItemUserAction } from 'src/app/ui/model-list/table-base.component';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.css']
})
export class MainTableComponent implements OnInit, OnChanges {
  @Input() classPrefix = 'modelList';
  @Input() dyamicModelName: string;
  @Input() items: BaseModel[];
  @Input() loading: boolean;

  @Input() otherInputProperties: Dictionary<any> = {};
  @Input() pagingInfo: ListPagingInfo;
  @Input() showHeader: boolean;
  @Input() shrinked: boolean;
  @Input() tableComponent: Type<any>;
  @Input() title: string;
  @Input() searchParams: SearchParams;
  @Input() sortField: SortParam;
  @Output() editItem = new EventEmitter<BaseModel>();
  @Output() deleteItem = new EventEmitter<BaseModel>();
  @Output() itemAction = new EventEmitter<ItemUserAction<BaseModel>>();
  @Output() pageIndexChange = new EventEmitter<number>();
  @Output() update = new EventEmitter();
  @Output() searchParamsChange = new EventEmitter<SearchParams>();
  @Output() sortFieldChange = new EventEmitter<SortParam>();
  @Output() fetchPrev = new EventEmitter(); // watch the type
  @Output() fetchNext = new EventEmitter(); // watch the type
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  fetchForward = false;

  /**
  * @Output properties to pass dynamically to component trough props.
  */
  tableComponentOutputProperties = {
    editItem: ($event) => this.editItem.emit($event),
    deleteItem: ($event) => this.deleteItem.emit($event),
    itemAction: ($event) => this.itemAction.emit($event),
    search: ($event) => this.update.emit($event),
    searchParamsChange: ($event) => this.searchParamsChange.emit($event),
    sortFieldChange: ($event) => this.sortFieldChange.emit($event),
    fetchPrev: ($event) => this.fetchPrev.emit(),
    fetchNext: ($event) => this.fetchNext.emit(),
  };

   /**
   * @Input same as output.
   */
  tableComponentInputProperties: {
    items?: BaseModel[];
    searchParams?: SearchParams;
    shrinked?: boolean;
    sortField?: SortParam;
  } = {};

  // TODO: remove call to apiservice, its used in the container instead.
  constructor( private apiService: ClientApiService) { }

  ngOnInit(): void {
    if (this.dyamicModelName !== '') {
    } else {
      this.dyamicModelName = 'users';
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    Object.assign(this.tableComponentInputProperties, {
      items: this.items,
      shrinked: this.shrinked,
      searchParams: this.searchParams,
      sortField: this.sortField,
      ...this.otherInputProperties
    });
    if (changes.items && this.items) {
      this.pageIndex = this.pagingInfo.index;
      this.pageSize = this.pagingInfo.pageSize;
      this.totalPages = this.pagingInfo.totalPages;
      this.totalItems = this.pagingInfo.totalItems;
      this.fetchForward = this.pagingInfo.totalPages > this.pagingInfo.index;
    }
  }

  onFetchNext() {
    this.fetchNext.emit()
  }
}
