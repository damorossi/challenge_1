export abstract class Dictionary<T> {
    [id: string]: T;
}

export type FilterValue = string | string[];

export interface ListPagingInfo {
  index: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export type SearchParams = Dictionary<FilterValue>;

export enum SortDirection {
  asc = 'asc',
  desc = 'desc'
}

export interface SortParam {
  key: string;
  direction: SortDirection;
}
