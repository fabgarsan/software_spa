import {
  instancesDescriptor,
  InstancesDescriptorKeys,
} from "@utils/instancesDescriptors";
import { AxiosError, AxiosResponse } from "axios";
import { Invoice, UniqueInvoiceNumber } from "@dto/accountingInvoice";
import { mainAxiosClient } from "@clients/axios";
import { useQuery } from "@tanstack/react-query";

const client = mainAxiosClient.getInstance();

const instancesDescriptorUniqueInvoiceNumber =
  instancesDescriptor[InstancesDescriptorKeys.uniqueInvoiceNumber];

const instancesDescriptorInvoice =
  instancesDescriptor[InstancesDescriptorKeys.invoice];

export interface GetUniqueInvoiceNumberResponse extends UniqueInvoiceNumber {
  companyName: string;
  companyNit: string;
}

export interface GetInvoiceResponse extends Invoice {
  sourceDisplay: string;
}

export interface FetchInvoicesParams {
  date?: string;
  dateTo?: string;
  dateFrom?: string;
}

export const fetchInvoices = (
  params?: FetchInvoicesParams
): Promise<AxiosResponse<GetInvoiceResponse[]>> =>
  client.get<GetInvoiceResponse[]>(instancesDescriptorInvoice.apiRoute || "", {
    params,
  });

export const fetchUniqueInvoiceNumbers = (): Promise<
  AxiosResponse<GetUniqueInvoiceNumberResponse[]>
> =>
  client.get<GetUniqueInvoiceNumberResponse[]>(
    instancesDescriptorUniqueInvoiceNumber.apiRoute || ""
  );

export const useUniqueInvoiceNumbersQuery = () => {
  return useQuery<GetUniqueInvoiceNumberResponse[], AxiosError>(
    ["unique-invoice-numbers"],
    () => fetchUniqueInvoiceNumbers().then((response) => response.data),
    {
      staleTime: 5000,
    }
  );
};
