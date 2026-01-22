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
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export type SortDirection = 'asc' | 'desc' | null;

export type SortField = 'postId' | 'name' | 'email' | null;

export interface SortState {
  field: SortField;
  direction: SortDirection;
}

export interface FilterState {
  search: string;
  page: number;
  pageSize: number;
  sort: SortState;
}
