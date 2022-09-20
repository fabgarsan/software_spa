import { AxiosError } from "axios";

export interface AxiosResponseListPaginationData<E> {
  next: string;
  previous: string;
  count: number;
  results: E[];
}

export type AxiosDjangoSerializerDetailError = AxiosError<{
  detail?: string;
}>;

export type DjangoSerializerFormError<TData> = Record<
  keyof TData | "nonFieldErrors",
  string[]
>;

export type AxiosDjangoSerializerFormError<TData> = AxiosError<
  DjangoSerializerFormError<TData>
>;
