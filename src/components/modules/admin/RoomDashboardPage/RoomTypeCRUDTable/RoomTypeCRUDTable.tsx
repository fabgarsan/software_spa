import React from "react";
import { CRUDDefaultTableProps } from "@hoc/index";
import { RoomType } from "@dto/room";
import { TableGenericCRUD } from "@components/shared";
import { TABLE_HEADERS } from "@utils/index";
import { formatIntoMoney } from "@utils/functions";

export const RoomTypeCRUDTable: React.FunctionComponent<
  CRUDDefaultTableProps<RoomType>
> = ({ onOpenDelete, onOpenEdit, list, canEdit, canDelete }) => {
  return (
    <TableGenericCRUD<RoomType>
      idField="id"
      headers={[
        {
          field: "id",
          headerName: TABLE_HEADERS.GENERAL.HEADER_ID,
          style: { width: "50px" },
          styleHeader: { width: "50px" },
        },
        {
          field: "name",
          headerName: TABLE_HEADERS.ROOM_TYPE.NAME,
          style: { minWidth: "250px" },
          styleHeader: { minWidth: "250px" },
        },
        {
          field: "value",
          headerName: TABLE_HEADERS.ROOM_TYPE.VALUE,
          style: { minWidth: "200px", textAlign: "right" },
          styleHeader: { minWidth: "200px", textAlign: "right" },
          formatNumber: formatIntoMoney,
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
