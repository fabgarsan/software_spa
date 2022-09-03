import { AxiosResponse } from "axios";
import { mainAxiosClient } from "@clients/axios";

const client = mainAxiosClient.getInstance();

import {
  instancesDescriptor,
  InstancesDescriptorKeys,
} from "@utils/instancesDescriptors";
import { EscortCategory, EscortCategoryRate } from "@dto/escorts";

export interface GetEscortCategoryRate extends EscortCategoryRate {
  readonly categoryName: string;
  readonly id: number;
  readonly toString: string;
}

const instancesDescriptorEscortCategories =
  instancesDescriptor[InstancesDescriptorKeys.escortCategory];

export const fetchCategories = (): Promise<AxiosResponse<EscortCategory[]>> =>
  client.get<EscortCategory[]>(
    instancesDescriptorEscortCategories.apiRoute || ""
  );
