import {
  instancesDescriptor,
  InstancesDescriptorKeys,
} from "@utils/instancesDescriptors";
import { AxiosResponse } from "axios";
import { Company } from "@dto/companies";
import { mainAxiosClient } from "@clients/axios";

const client = mainAxiosClient.getInstance();

const instancesDescriptorCompany =
  instancesDescriptor[InstancesDescriptorKeys.company];

export const fetchCompanies = (): Promise<AxiosResponse<Company[]>> =>
  client.get<Company[]>(instancesDescriptorCompany.apiRoute || "");
