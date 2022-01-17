import { EventEmitter } from '@angular/core';
import { SearchParams, SortParam } from './basic-types';

export interface ItemUserAction<T> {
  action: string;
  item: T;
}

export interface TableComponent<T> {
  items: any[];
  editItem: EventEmitter<T>;
  searchParams?: SearchParams;
  shrinked: boolean;
  sortField?: SortParam;
  itemAction?: EventEmitter<ItemUserAction<T>>;
  searchParamsChange?: EventEmitter<SearchParams>;
  sortFieldChange?: EventEmitter<SortParam>;
}

export class TableBaseComponent {
  styleClassPrefix = 'table';
}
