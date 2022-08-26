import React from "react";
import { CRUDDefaultTableProps } from "@hoc/withCRUDReactQuery";
import { Company } from "@dto/companies";
import { TableGenericCRUD } from "@components/shared";
import { TABLE_HEADERS } from "@utils/index";

export const Table: React.FunctionComponent<CRUDDefaultTableProps<Company>> = ({
  onOpenDelete,
  onOpenEdit,
  list,
  canEdit,
  canDelete,
}: CRUDDefaultTableProps<Company>) => {
  return (
    <TableGenericCRUD<Company>
      idField="id"
      headers={[
        {
          field: "id",
          headerName: TABLE_HEADERS.GENERAL.HEADER_ID,
          style: { width: "50px" },
          styleHeader: { width: "50px" },
        },
        {
          field: "nit",
          headerName: TABLE_HEADERS.COMPANY.NIT,
          style: { width: "50px", padding: "10px" },
          styleHeader: { width: "50px", padding: "10px" },
        },
        {
          field: "name",
          headerName: TABLE_HEADERS.COMPANY.NAME,
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
