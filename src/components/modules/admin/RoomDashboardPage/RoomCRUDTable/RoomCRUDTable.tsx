import React from "react";
import { CRUDDefaultTableProps } from "@hoc/index";
import { TableGenericCRUD } from "@components/shared";
import { TABLE_HEADERS } from "@utils/index";
import { GetRoomApiResponse } from "@api/room";

export const RoomCRUDTable: React.FunctionComponent<
  CRUDDefaultTableProps<GetRoomApiResponse>
> = ({ onOpenDelete, onOpenEdit, list, canEdit, canDelete }) => {
  return (
    <TableGenericCRUD<GetRoomApiResponse>
      idField="id"
      headers={[
        {
          field: "id",
          headerName: TABLE_HEADERS.GENERAL.HEADER_ID,
          style: { width: "50px" },
          styleHeader: { width: "50px" },
        },
        {
          field: "number",
          headerName: TABLE_HEADERS.ROOM.NUMBER,
          style: { minWidth: "50px" },
          styleHeader: { minWidth: "50px" },
        },
        {
          field: "roomTypeName",
          headerName: TABLE_HEADERS.ROOM.TYPE,
          style: { minWidth: "100px" },
          styleHeader: { minWidth: "100px" },
        },
        {
          field: "companyName",
          headerName: TABLE_HEADERS.ROOM.COMPANY,
          style: { minWidth: "150px" },
          styleHeader: { minWidth: "150px" },
        },
        {
          field: "statusDisplay",
          headerName: TABLE_HEADERS.ROOM.STATUS,
          style: { width: "50px", textAlign: "left" },
          styleHeader: { width: "50px", textAlign: "left" },
        },
        {
          field: "isActive",
          headerName: TABLE_HEADERS.ROOM.IS_ACTIVE,
          style: { minWidth: "50px", textAlign: "center" },
          styleHeader: { minWidth: "50px", textAlign: "center" },
        },
      ]}
      canEdit={canEdit}
      canDelete={canDelete}
      list={list}
      onOpenDelete={onOpenDelete}
      onOpenEdit={onOpenEdit}
    />
  );
};
