import React from "react";
import { CRUDDefaultTableProps } from "@hoc/index";
import { ExtendedUser } from "@dto/users";
import { TableGenericCRUD } from "@components/shared";
import { TABLE_HEADERS } from "@utils/index";

export const Table: React.FunctionComponent<
  CRUDDefaultTableProps<ExtendedUser>
> = ({
  onOpenDelete,
  onOpenEdit,
  list,
  canDelete,
  canEdit,
}: CRUDDefaultTableProps<ExtendedUser>) => {
  return (
    <TableGenericCRUD<ExtendedUser>
      idField="id"
      headers={[
        {
          field: "id",
          headerName: TABLE_HEADERS.GENERAL.HEADER_ID,
          style: { width: "50px" },
          styleHeader: { width: "50px" },
        },
        {
          field: "fullName",
          headerName: TABLE_HEADERS.EXTENDED_USER.ALIAS,
          style: { maxWidth: "200px" },
          styleHeader: { maxWidth: "200px" },
        },
        {
          field: "username",
          headerName: TABLE_HEADERS.USER.USERNAME,
          style: { maxWidth: "100px" },
          styleHeader: { maxWidth: "100px" },
        },
        {
          field: "isActive",
          headerName: TABLE_HEADERS.USER.IS_ACTIVE,
          style: { width: "70px", textAlign: "center" },
          styleHeader: { width: "70px" },
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
