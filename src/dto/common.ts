export interface AxiosResponseListPaginationData<E> {
  next: string;
  previous: string;
  count: number;
  results: E[];
}
