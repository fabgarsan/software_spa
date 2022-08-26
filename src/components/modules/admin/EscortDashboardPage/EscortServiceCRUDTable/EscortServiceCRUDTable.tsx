import React from "react";
import { CRUDDefaultTableProps } from "@hoc/index";
import { EscortService } from "@dto/escorts";
import { TableGenericCRUD } from "@components/shared";
import { TABLE_HEADERS } from "@utils/index";

export const EscortServiceCRUDTable: React.FunctionComponent<
  CRUDDefaultTableProps<EscortService>
> = ({
  onOpenDelete,
  onOpenEdit,
  list,
  canEdit,
  canDelete,
}: CRUDDefaultTableProps<EscortService>) => {
  return (
    <TableGenericCRUD<EscortService>
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
          headerName: TABLE_HEADERS.ESCORT_SERVICE.NAME,
          style: { minWidth: "250px" },
          styleHeader: { minWidth: "250px" },
        },
        {
          field: "nameEn",
          headerName: TABLE_HEADERS.ESCORT_SERVICE.NAME_EN,
          style: { minWidth: "250px" },
          styleHeader: { minWidth: "250px" },
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
