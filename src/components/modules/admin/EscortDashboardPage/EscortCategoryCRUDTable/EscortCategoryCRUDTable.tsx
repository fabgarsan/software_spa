import React from "react";
import { CRUDDefaultTableProps } from "@hoc/index";
import { EscortCategory } from "@dto/escorts";
import { TableGenericCRUD } from "@components/shared";
import { TABLE_HEADERS } from "@utils/index";

export const EscortCategoryCRUDTable: React.FunctionComponent<
  CRUDDefaultTableProps<EscortCategory>
> = ({
  onOpenDelete,
  onOpenEdit,
  list,
  canEdit,
  canDelete,
}: CRUDDefaultTableProps<EscortCategory>) => {
  return (
    <TableGenericCRUD<EscortCategory>
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
          headerName: TABLE_HEADERS.ESCORT_CATEGORIES.NAME,
          style: { minWidth: "250px" },
          styleHeader: { minWidth: "250px" },
        },
        {
          field: "order",
          headerName: TABLE_HEADERS.ESCORT_CATEGORIES.ORDER,
          style: { width: "50px", textAlign: "right" },
          styleHeader: { width: "50px", textAlign: "right" },
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
