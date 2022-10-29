import React from "react";
import { Grid } from "@mui/material";
import { GetInvoiceResponse } from "@api/accounting";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { formatIntoMoney, toHumanDateTime } from "@utils/functions";
import { TABLE_PAGINATOR } from "@utils/constantsUI";
import { DownloadXLSXButton } from "@components/shared";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90, sortable: false },
  {
    field: "nit",
    headerName: "Nit",
    width: 100,
    sortable: false,
  },
  {
    field: "name",
    headerName: "Nombre Empresa",
    width: 250,
    sortable: false,
  },
  {
    field: "sourceDisplay",
    headerName: "Fuente",
    width: 110,
    sortable: false,
  },
  {
    field: "uniqueInvoiceNumber",
    headerName: "Consecutivo",
    width: 160,
    sortable: false,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.prefix || ""} ${params.row.uniqueInvoiceNumber || ""}`,
  },
  {
    field: "created",
    headerName: "Fecha",
    width: 200,
    sortable: false,
    valueFormatter: ({ value }) => toHumanDateTime(value),
  },
  {
    field: "base",
    type: "number",
    headerName: "Base Impositiva",
    width: 130,
    valueFormatter: ({ value }) => formatIntoMoney(value),
    cellClassName: "font-tabular-nums",
    sortable: false,
  },
  {
    field: "tax",
    type: "number",
    headerName: "Impuesto",
    width: 130,
    valueFormatter: ({ value }) => formatIntoMoney(value),
    cellClassName: "font-tabular-nums",
    sortable: false,
  },
  {
    field: "total",
    type: "number",
    headerName: "Valor Total",
    width: 130,
    valueFormatter: ({ value }) => formatIntoMoney(value),
    cellClassName: "font-tabular-nums",
    sortable: false,
  },
];

interface InvoiceTableProps {
  list: GetInvoiceResponse[];
}

export const InvoiceTable = ({ list }: InvoiceTableProps) => {
  return (
    <Grid container>
      <Grid item sx={{ height: 400, width: "100%" }}>
        <DataGrid
          // onRowClick={(data) => console.log(data, "Data aqui")}
          rows={list}
          columns={columns}
          disableColumnFilter
          disableColumnMenu
          pageSize={TABLE_PAGINATOR.LIMIT}
          rowsPerPageOptions={TABLE_PAGINATOR.ROWS_PER_PAGE_OPTIONS}
          disableSelectionOnClick
        />
      </Grid>
      <DownloadXLSXButton
        fileName="testing"
        apiData={list}
        columns={[
          "name",
          "uniqueInvoiceNumber",
          "created",
          "base",
          "tax",
          "total",
          "prefix",
          "sourceDisplay",
        ]}
        mapHeaderNames={{
          name: "nombreEmpresa",
          uniqueInvoiceNumber: "consecutivoFacturacion",
          created: "fecha",
          prefix: "prefijo",
          sourceDisplay: "origen",
          tax: "impuesto",
        }}
        headerOrder={[
          "nombreEmpresa",
          "fecha",
          "origen",
          "prefijo",
          "consecutivoFacturacion",
          "base",
          "impuesto",
          "total",
        ]}
      />
    </Grid>
  );
};
