import {
  instancesDescriptor,
  InstancesDescriptorKeys,
} from "@utils/instancesDescriptors";
import { AxiosError, AxiosResponse } from "axios";
import { UniqueInvoiceNumber } from "@dto/accountingInvoice";
import { mainAxiosClient } from "@clients/axios";
import { useQuery } from "@tanstack/react-query";

const client = mainAxiosClient.getInstance();

const instancesDescriptorCompany =
  instancesDescriptor[InstancesDescriptorKeys.uniqueInvoiceNumber];

export interface GetUniqueInvoiceNumber extends UniqueInvoiceNumber {
  companyName: string;
  companyNit: string;
}

export const fetchUniqueInvoiceNumbers = (): Promise<
  AxiosResponse<GetUniqueInvoiceNumber[]>
> =>
  client.get<GetUniqueInvoiceNumber[]>(
    instancesDescriptorCompany.apiRoute || ""
  );

export const useUniqueInvoiceNumbersQuery = () => {
  return useQuery<GetUniqueInvoiceNumber[], AxiosError>(
    ["unique-invoice-numbers"],
    () => fetchUniqueInvoiceNumbers().then((response) => response.data),
    {
      staleTime: 5000,
    }
  );
};
