import { useQuery } from "@tanstack/react-query";
import {
  FetchInvoicesParams,
  fetchInvoices,
  GetInvoiceResponse,
} from "@api/accounting";
import { AxiosDjangoSerializerDetailError } from "@dto/common";

export const useInvoicesQuery = ({
  params,
  enabled,
  disableSearch,
}: {
  params: FetchInvoicesParams;
  enabled: boolean;
  disableSearch: () => void;
}) =>
  useQuery<GetInvoiceResponse[], AxiosDjangoSerializerDetailError>(
    ["invoices", params],
    () => fetchInvoices(params).then((res) => res.data),
    {
      cacheTime: 0,
      enabled,
      onSuccess: () => {
        if (disableSearch) disableSearch();
      },
      onError: () => disableSearch(),
    }
  );
