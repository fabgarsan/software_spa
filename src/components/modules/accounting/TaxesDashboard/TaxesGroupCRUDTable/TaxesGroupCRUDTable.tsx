import React from "react";
import { CRUDDefaultTableProps } from "@hoc/index";
import { TableGenericCRUD } from "@components/shared";
import { isNumber, TABLE_HEADERS } from "@utils/index";
import { GetTaxGroupResponse } from "@api/accountingTax";
import { numberFormat } from "@utils/functions";

export const TaxesGroupCRUDTable: React.FunctionComponent<
  CRUDDefaultTableProps<GetTaxGroupResponse>
> = ({ onOpenDelete, onOpenEdit, list, canDelete, canEdit }) => {
  return (
    <TableGenericCRUD<GetTaxGroupResponse>
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
          headerName: TABLE_HEADERS.ACCOUNTING_TAXES_GROUP.NAME,
          style: { maxWidth: "250px" },
          styleHeader: { maxWidth: "250px" },
        },
        {
          field: "taxName",
          headerName: TABLE_HEADERS.ACCOUNTING_TAXES_GROUP.TAX_NAME,
          style: { maxWidth: "250px" },
          styleHeader: { maxWidth: "250px" },
        },
        {
          field: "taxType",
          headerName: TABLE_HEADERS.ACCOUNTING_TAXES_GROUP.TAX_TYPE,
          style: { maxWidth: "150px", textAlign: "left" },
          styleHeader: { maxWidth: "150px", textAlign: "left" },
        },
        {
          field: "taxAmount",
          headerName: TABLE_HEADERS.ACCOUNTING_TAXES_GROUP.TAX_AMOUNT,
          style: { maxWidth: "120px", textAlign: "center" },
          styleHeader: { maxWidth: "120px", textAlign: "center" },
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
