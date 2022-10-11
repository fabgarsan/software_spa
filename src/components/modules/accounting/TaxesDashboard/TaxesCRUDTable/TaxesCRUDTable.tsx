import React from "react";
import { CRUDDefaultTableProps } from "@hoc/index";
import { TableGenericCRUD } from "@components/shared";
import { isNumber, TABLE_HEADERS } from "@utils/index";
import { GetTaxResponse } from "@api/accountingTax";
import { numberFormat } from "@utils/functions";

export const TaxesCRUDTable: React.FunctionComponent<
  CRUDDefaultTableProps<GetTaxResponse>
> = ({ onOpenDelete, onOpenEdit, list, canDelete, canEdit }) => {
  return (
    <TableGenericCRUD<GetTaxResponse>
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
          headerName: TABLE_HEADERS.ACCOUNTING_TAXES.NAME,
          style: { maxWidth: "250px" },
          styleHeader: { maxWidth: "250px" },
        },
        {
          field: "typeDisplay",
          headerName: TABLE_HEADERS.ACCOUNTING_TAXES.TYPE,
          style: { maxWidth: "150px", textAlign: "left" },
          styleHeader: { maxWidth: "150px", textAlign: "left" },
        },
        {
          field: "amount",
          headerName: TABLE_HEADERS.ACCOUNTING_TAXES.AMOUNT,
          style: { maxWidth: "120px", textAlign: "center" },
          styleHeader: { maxWidth: "120px", textAlign: "center" },
          format: (value) => (isNumber(value) && numberFormat(value)) || "",
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
