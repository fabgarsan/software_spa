import React from "react";
import { CRUDDefaultTableProps } from "@hoc/withCRUDReactQuery";
import { Printer } from "@dto/sysConfiguration";
import { TableGenericCRUD } from "@components/shared";
import { TABLE_HEADERS } from "@utils/index";

export const Table: React.FunctionComponent<CRUDDefaultTableProps<Printer>> = ({
  onOpenDelete,
  onOpenEdit,
  list,
  canEdit,
  canDelete,
}) => {
  return (
    <TableGenericCRUD<Printer>
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
          headerName: TABLE_HEADERS.PRINTER.NAME,
          style: { minWidth: "250px" },
          styleHeader: { minWidth: "250px" },
        },
        {
          field: "brand",
          headerName: TABLE_HEADERS.PRINTER.BRAND,
          style: { minWidth: "250px" },
          styleHeader: { minWidth: "250px" },
        },
        {
          field: "model",
          headerName: TABLE_HEADERS.PRINTER.MODEL,
          style: { minWidth: "250px" },
          styleHeader: { minWidth: "250px" },
        },
        {
          field: "ipAddress",
          headerName: TABLE_HEADERS.PRINTER.IP_ADDRESS,
          style: { minWidth: "250px" },
          styleHeader: { minWidth: "250px" },
        },
        {
          field: "active",
          headerName: TABLE_HEADERS.PRINTER.IS_ACTIVE,
          style: { minWidth: "70px" },
          styleHeader: { minWidth: "70px" },
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
