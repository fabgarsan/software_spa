import React from "react";
import { CRUDDefaultTableProps } from "@hoc/index";
import { Escort } from "@dbTypes/escorts";
import { TableGenericCRUD } from "@components/index";
import { TABLE_HEADERS } from "@utils/constants";

const TableCRUDEscort: React.FunctionComponent<CRUDDefaultTableProps<Escort>> =
  ({ onOpenDelete, onOpenEdit, list }: CRUDDefaultTableProps<Escort>) => {
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
            headerName: TABLE_HEADERS.USER.ALIAS,
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
            field: "email",
            headerName: TABLE_HEADERS.USER.EMAIL,
            style: { minWidth: "250px" },
            styleHeader: { minWidth: "250px" },
          },
          {
            field: "categoryName",
            headerName: TABLE_HEADERS.USER.CATEGORY,
            style: { minWidth: "100px" },
            styleHeader: { minWidth: "100px" },
          },
        ]}
        list={list}
        onOpenDelete={onOpenDelete}
        onOpenEdit={onOpenEdit}
      />
    );
  };
export default TableCRUDEscort;
