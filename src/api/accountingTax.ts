import {
  instancesDescriptor,
  InstancesDescriptorKeys,
} from "@utils/instancesDescriptors";
import { AxiosError, AxiosResponse } from "axios";
import { Tax, TaxGroup } from "@dto/accountingTaxes";
import { mainAxiosClient } from "@clients/axios";
import { useQuery } from "@tanstack/react-query";

const client = mainAxiosClient.getInstance();

const instancesDescriptorTax = instancesDescriptor[InstancesDescriptorKeys.tax];
const instancesDescriptorTaxGroup =
  instancesDescriptor[InstancesDescriptorKeys.taxGroup];

export interface GetTaxResponse extends Tax {
  typeDisplay: string;
}

export interface GetTaxGroupResponse extends TaxGroup {
  taxAmount: number;
  taxName: string;
  taxType: string;
}

export const fetchTaxes = (): Promise<AxiosResponse<GetTaxResponse[]>> =>
  client.get<GetTaxResponse[]>(instancesDescriptorTax.apiRoute || "");

export const fetchTaxesGroups = (): Promise<
  AxiosResponse<GetTaxGroupResponse[]>
> =>
  client.get<GetTaxGroupResponse[]>(instancesDescriptorTaxGroup.apiRoute || "");

export const useTaxesQuery = () => {
  return useQuery<GetTaxResponse[], AxiosError>(
    ["taxes"],
    () => fetchTaxes().then((response) => response.data),
    {
      staleTime: 5000,
    }
  );
};

export const useTaxesGroupsQuery = () => {
  return useQuery<GetTaxGroupResponse[], AxiosError>(
    ["taxes-groups"],
    () => fetchTaxesGroups().then((response) => response.data),
    {
      staleTime: 5000,
    }
  );
};
