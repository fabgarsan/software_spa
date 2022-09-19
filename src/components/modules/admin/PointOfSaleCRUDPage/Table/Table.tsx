import React from "react";
import { CRUDDefaultTableProps } from "@hoc/withCRUDReactQuery";
import { PointOfSale } from "@dto/pointOfSale";
import { TableGenericCRUD } from "@components/shared";
import { TABLE_HEADERS } from "@utils/index";

export const Table: React.FunctionComponent<
  CRUDDefaultTableProps<PointOfSale>
> = ({ onOpenDelete, onOpenEdit, list, canEdit, canDelete, canView }) => {
  return (
    <TableGenericCRUD<PointOfSale>
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
          headerName: TABLE_HEADERS.POINT_OF_SALE.NAME,
          style: { minWidth: "250px" },
          styleHeader: { minWidth: "250px" },
        },
        {
          field: "active",
          headerName: TABLE_HEADERS.POINT_OF_SALE.IS_ACTIVE,
          style: { minWidth: "70px" },
          styleHeader: { minWidth: "70px" },
        },
        {
          field: "hasEscortServicesSales",
          headerName: TABLE_HEADERS.POINT_OF_SALE.HAS_ESCORT_SERVICES,
          style: { minWidth: "70px" },
          styleHeader: { minWidth: "70px" },
        },
        {
          field: "hasParkingLotServicesSales",
          headerName: TABLE_HEADERS.POINT_OF_SALE.HAS_PARKING_LOT,
          style: { minWidth: "70px" },
          styleHeader: { minWidth: "70px" },
        },
        {
          field: "hasIncomeOperations",
          headerName: TABLE_HEADERS.POINT_OF_SALE.HAS_INCOME_OPERATIONS,
          style: { minWidth: "70px" },
          styleHeader: { minWidth: "70px" },
        },
        {
          field: "hasOutcomesOperations",
          headerName: TABLE_HEADERS.POINT_OF_SALE.HAS_OUTCOME_OPERATIONS,
          style: { minWidth: "70px" },
          styleHeader: { minWidth: "70px" },
        },
      ]}
      canEdit={canEdit}
      canDelete={canDelete}
      list={list}
      onOpenDelete={onOpenDelete}
      onOpenEdit={onOpenEdit}
      canView={canView}
    />
  );
};
