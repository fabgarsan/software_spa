import {
  instancesDescriptor,
  InstancesDescriptorKeys,
} from "@utils/instancesDescriptors";
import { AxiosResponse } from "axios";
import { Room, RoomType } from "@dto/room";
import { mainAxiosClient } from "@clients/axios";

const client = mainAxiosClient.getInstance();

const instancesDescriptorRoomType =
  instancesDescriptor[InstancesDescriptorKeys.roomType];

export interface GetRoomApiResponse extends Room {
  companyName: string;
  roomTypeName: string;
  statusDisplay: string;
}

export const fetchRoomTypes = (): Promise<AxiosResponse<RoomType[]>> =>
  client.get<RoomType[]>(instancesDescriptorRoomType.apiRoute || "");
