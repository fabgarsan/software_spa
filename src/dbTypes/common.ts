export interface AxiosResponsePaginationData<E> {
  next: string;
  previous: string;
  count: number;
  results: E[];
}
