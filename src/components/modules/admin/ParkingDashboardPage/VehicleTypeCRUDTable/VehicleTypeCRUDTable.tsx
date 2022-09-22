import React from "react";
import { CRUDDefaultTableProps } from "@hoc/index";
import { VehicleType } from "@dto/parking";
import { TableGenericCRUD } from "@components/shared";
import { TABLE_HEADERS } from "@utils/index";

export const VehicleTypeCRUDTable: React.FunctionComponent<
  CRUDDefaultTableProps<VehicleType>
> = ({
  onOpenDelete,
  onOpenEdit,
  list,
  canDelete,
  canEdit,
}: CRUDDefaultTableProps<VehicleType>) => {
  return (
    <TableGenericCRUD<VehicleType>
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
          headerName: TABLE_HEADERS.VEHICLE_TYPE.NAME,
          style: { maxWidth: "200px" },
          styleHeader: { maxWidth: "200px" },
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
