export type DataSourceElement = { [key: string]: any }
export type DataSource = DataSourceElement[]
export type SortDirection = 'asc' | 'desc';
export type Sorting = { key: string, order: SortDirection };
