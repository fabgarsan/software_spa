import React from "react";
import { CRUDDefaultTableProps } from "@hoc/index";
import { GetParkingPlan } from "@api/parking";
import { TableGenericCRUD } from "@components/shared";
import { TABLE_HEADERS } from "@utils/index";

export const ParkingPlanCRUDTable: React.FunctionComponent<
  CRUDDefaultTableProps<GetParkingPlan>
> = ({
  onOpenDelete,
  onOpenEdit,
  list,
  canDelete,
  canEdit,
  canView,
}: CRUDDefaultTableProps<GetParkingPlan>) => {
  return (
    <TableGenericCRUD<GetParkingPlan>
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
          headerName: TABLE_HEADERS.PARKING_PLAN.NAME,
          style: { maxWidth: "200px" },
          styleHeader: { maxWidth: "200px" },
        },
        {
          field: "vehicleTypeName",
          headerName: TABLE_HEADERS.PARKING_PLAN.VEHICLE_TYPE,
          style: { maxWidth: "100px" },
          styleHeader: { maxWidth: "100px" },
        },
        {
          field: "timeFrom",
          headerName: TABLE_HEADERS.PARKING_PLAN.TIME_FROM,
          style: { maxWidth: "100px" },
          styleHeader: { maxWidth: "100px" },
        },
        {
          field: "monday",
          headerName: TABLE_HEADERS.PARKING_PLAN.MONDAY,
          style: { width: "60px", textAlign: "center" },
          styleHeader: { width: "60px" },
        },
        {
          field: "tuesday",
          headerName: TABLE_HEADERS.PARKING_PLAN.TUESDAY,
          style: { width: "60px", textAlign: "center" },
          styleHeader: { width: "60px" },
        },
        {
          field: "wednesday",
          headerName: TABLE_HEADERS.PARKING_PLAN.WEDNESDAY,
          style: { width: "60px", textAlign: "center" },
          styleHeader: { width: "60px" },
        },
        {
          field: "thursday",
          headerName: TABLE_HEADERS.PARKING_PLAN.THURSDAY,
          style: { width: "60px", textAlign: "center" },
          styleHeader: { width: "60px" },
        },
        {
          field: "friday",
          headerName: TABLE_HEADERS.PARKING_PLAN.FRIDAY,
          style: { width: "60px", textAlign: "center" },
          styleHeader: { width: "60px" },
        },
        {
          field: "saturday",
          headerName: TABLE_HEADERS.PARKING_PLAN.SATURDAY,
          style: { width: "60px", textAlign: "center" },
          styleHeader: { width: "60px" },
        },
        {
          field: "sunday",
          headerName: TABLE_HEADERS.PARKING_PLAN.SUNDAY,
          style: { width: "60px", textAlign: "center" },
          styleHeader: { width: "60px" },
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
