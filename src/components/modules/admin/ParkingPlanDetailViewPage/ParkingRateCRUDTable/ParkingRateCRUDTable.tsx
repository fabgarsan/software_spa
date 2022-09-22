import React from "react";
import { CRUDDefaultTableProps } from "@hoc/index";
import { ParkingRate } from "@dto/parking";
import { TableGenericCRUD } from "@components/shared";
import { isNumber, TABLE_HEADERS } from "@utils/index";
import {
  displayHoursAndMinutesFromMinutes,
  formatIntoMoney,
} from "@utils/functions";

export const ParkingRateCRUDTable: React.FunctionComponent<
  CRUDDefaultTableProps<ParkingRate>
> = ({
  onOpenDelete,
  onOpenEdit,
  list,
  canDelete,
  canEdit,
}: CRUDDefaultTableProps<ParkingRate>) => {
  return (
    <TableGenericCRUD<ParkingRate>
      idField="id"
      headers={[
        {
          field: "id",
          headerName: TABLE_HEADERS.GENERAL.HEADER_ID,
          style: { width: "50px" },
          styleHeader: { width: "50px" },
        },
        {
          field: "minutes",
          headerName: TABLE_HEADERS.PARKING_RATE.MINUTES,
          style: { maxWidth: "80px" },
          styleHeader: { maxWidth: "80px" },
          format: (value) =>
            (isNumber(value) && displayHoursAndMinutesFromMinutes(value)) || "",
        },
        {
          field: "value",
          headerName: TABLE_HEADERS.PARKING_RATE.VALUE,
          style: { maxWidth: "100px", textAlign: "center" },
          styleHeader: { maxWidth: "100px", textAlign: "center" },
          formatNumber: formatIntoMoney,
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
