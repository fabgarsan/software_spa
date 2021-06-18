import React from "react";
import { CRUDDefaultTableProps } from "@hoc/index";
import { Escort } from "@dbTypes/index";
import { TableGenericCRUD } from "@components/index";
import { TABLE_HEADERS } from "@utils/index";

const TableCRUDEscort: React.FunctionComponent<CRUDDefaultTableProps<Escort>> =
  ({
    onOpenDelete,
    onOpenEdit,
    list,
    canEdit,
    canDelete,
  }: CRUDDefaultTableProps<Escort>) => {
    return (
      <TableGenericCRUD<Escort>
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
            field: "categoryName",
            headerName: TABLE_HEADERS.ESCORT_CATEGORIES.CATEGORY,
            style: { minWidth: "100px" },
            styleHeader: { minWidth: "100px" },
          },
          {
            field: "isActive",
            headerName: TABLE_HEADERS.USER.IS_ACTIVE,
            style: { width: "70px", textAlign: "center" },
            styleHeader: { width: "70px" },
            isBoolean: true,
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
export default TableCRUDEscort;
