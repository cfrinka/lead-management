export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: 'new' | 'contacted' | 'qualified' | 'unqualified';
}

export interface Opportunity {
  id: string;
  name: string;
  stage: string;
  amount?: number;
  accountName: string;
  createdFrom?: string;
}

export type SortField = 'score' | 'name' | 'company';
export type SortDirection = 'asc' | 'desc';

export interface FilterState {
  search: string;
  status: string;
  sortField: SortField;
  sortDirection: SortDirection;
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
}
