import React from "react";
import { CRUDDefaultTableProps } from "@hoc/index";
import { TableGenericCRUD } from "@components/shared";
import { TABLE_HEADERS } from "@utils/index";
import { formatIntoMoney } from "@utils/functions";
import { GetEscortCategoryRate } from "@api/escort";

export const EscortCategoryRateCRUDTable: React.FunctionComponent<
  CRUDDefaultTableProps<GetEscortCategoryRate>
> = ({
  onOpenDelete,
  onOpenEdit,
  list,
  canEdit,
  canDelete,
}: CRUDDefaultTableProps<GetEscortCategoryRate>) => {
  return (
    <TableGenericCRUD<GetEscortCategoryRate>
      idField="id"
      headers={[
        {
          field: "id",
          headerName: TABLE_HEADERS.GENERAL.HEADER_ID,
          style: { width: "50px" },
          styleHeader: { width: "50px" },
        },
        {
          field: "toString",
          headerName: TABLE_HEADERS.ESCORT_CATEGORIES_RATES.NAME,
          style: { width: "300px", textAlign: "left" },
          styleHeader: { width: "300px", textAlign: "left" },
        },
        {
          field: "categoryName",
          headerName: TABLE_HEADERS.ESCORT_CATEGORIES_RATES.CATEGORY_NAME,
          style: { width: "80px", textAlign: "center" },
          styleHeader: { width: "80px", textAlign: "center" },
        },
        {
          field: "minutes",
          headerName: TABLE_HEADERS.ESCORT_CATEGORIES_RATES.MINUTES,
          style: { width: "50px", textAlign: "center" },
          styleHeader: { width: "50px", textAlign: "center" },
        },
        {
          field: "value",
          formatNumber: formatIntoMoney,
          headerName: TABLE_HEADERS.ESCORT_CATEGORIES_RATES.VALUE,
          style: { minWidth: "50px", textAlign: "right" },
          styleHeader: { minWidth: "50px", textAlign: "left" },
        },
        {
          field: "publishedWeb",
          headerName: TABLE_HEADERS.ESCORT_CATEGORIES_RATES.PUBLISHED_WEB,
          style: { minWidth: "50px", textAlign: "center" },
          styleHeader: { minWidth: "50px", textAlign: "center" },
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
