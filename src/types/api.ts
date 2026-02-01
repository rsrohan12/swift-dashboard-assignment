export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export type SortDirection = 'asc' | 'desc' | null;

export type SortField = 'postId' | 'name' | 'email' | null;

export interface SortState {
  direction: SortDirection;
  field: SortField;
}

export interface FilterState {
  search: string;
  sort: SortState;
  pageSize: number;
  page: number;
}
