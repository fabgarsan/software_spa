import { AxiosResponse } from "axios";
import { mainAxiosClient } from "@clients/axios";

const client = mainAxiosClient.getInstance();

import {
  instancesDescriptor,
  InstancesDescriptorKeys,
} from "@utils/instancesDescriptors";
import { Printer } from "@dto/sysConfiguration";

const instancesDescriptorEscortCategories =
  instancesDescriptor[InstancesDescriptorKeys.printer];

export const fetchPrinters = (): Promise<AxiosResponse<Printer[]>> =>
  client.get<Printer[]>(instancesDescriptorEscortCategories.apiRoute || "");
