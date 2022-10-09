import React from "react";
import { CRUDDefaultTableProps } from "@hoc/index";
import { TableGenericCRUD } from "@components/shared";
import { isNumber, TABLE_HEADERS } from "@utils/index";
import { UniqueInvoiceNumber } from "@dto/accountingInvoice";
import { numberFormat } from "@utils/functions";

export const UniqueInvoiceNumberCRUDTable: React.FunctionComponent<
  CRUDDefaultTableProps<UniqueInvoiceNumber>
> = ({ onOpenDelete, onOpenEdit, list, canDelete, canEdit }) => {
  return (
    <TableGenericCRUD<UniqueInvoiceNumber>
      idField="id"
      headers={[
        {
          field: "id",
          headerName: TABLE_HEADERS.GENERAL.HEADER_ID,
          style: { width: "50px" },
          styleHeader: { width: "50px" },
        },
        {
          field: "dianResolutionNumber",
          headerName: TABLE_HEADERS.UNIQUE_INVOICE_NUMBER.RESOLUTION,
          style: { maxWidth: "150px" },
          styleHeader: { maxWidth: "150px" },
        },
        {
          field: "prefix",
          headerName: TABLE_HEADERS.UNIQUE_INVOICE_NUMBER.PREFIX,
          style: { maxWidth: "80px" },
          styleHeader: { maxWidth: "80px" },
        },
        {
          field: "start",
          headerName: TABLE_HEADERS.UNIQUE_INVOICE_NUMBER.START,
          style: { maxWidth: "80px", textAlign: "right" },
          styleHeader: { maxWidth: "80px", textAlign: "right" },
          format: (value) => (isNumber(value) && numberFormat(value)) || "",
        },
        {
          field: "end",
          headerName: TABLE_HEADERS.UNIQUE_INVOICE_NUMBER.END,
          style: { maxWidth: "80px", textAlign: "right" },
          styleHeader: { maxWidth: "80px", textAlign: "right" },
          format: (value) => (isNumber(value) && numberFormat(value)) || "",
        },
        {
          field: "authorizationDateStart",
          headerName: TABLE_HEADERS.UNIQUE_INVOICE_NUMBER.START_DATE,
          style: { maxWidth: "100px", textAlign: "right" },
          styleHeader: { maxWidth: "100px" },
        },
        {
          field: "authorizationDateEnd",
          headerName: TABLE_HEADERS.UNIQUE_INVOICE_NUMBER.END_DATE,
          style: { maxWidth: "100px", textAlign: "right" },
          styleHeader: { maxWidth: "100px" },
        },
        {
          field: "currentNumber",
          headerName: TABLE_HEADERS.UNIQUE_INVOICE_NUMBER.CURRENT_NUMBER,
          style: { maxWidth: "80px", textAlign: "right" },
          styleHeader: { maxWidth: "80px", textAlign: "right" },
          format: (value) => (isNumber(value) && numberFormat(value)) || "",
        },
        {
          field: "active",
          headerName: TABLE_HEADERS.UNIQUE_INVOICE_NUMBER.IS_ACTIVE,
          style: { minWidth: "60px", textAlign: "center" },
          styleHeader: { minWidth: "60px", textAlign: "center" },
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
