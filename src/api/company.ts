import {
  instancesDescriptor,
  InstancesDescriptorKeys,
} from "@utils/instancesDescriptors";
import { AxiosError, AxiosResponse } from "axios";
import { Company } from "@dto/companies";
import { mainAxiosClient } from "@clients/axios";
import { useQuery } from "@tanstack/react-query";

const client = mainAxiosClient.getInstance();

const instancesDescriptorCompany =
  instancesDescriptor[InstancesDescriptorKeys.company];

export const fetchCompanies = (): Promise<AxiosResponse<Company[]>> =>
  client.get<Company[]>(instancesDescriptorCompany.apiRoute || "");

export const useCompaniesQuery = () => {
  return useQuery<Company[], AxiosError>(
    ["companies"],
    () => fetchCompanies().then((response) => response.data),
    {
      staleTime: 5000,
    }
  );
};
