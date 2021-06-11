import React, { CSSProperties } from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CRUDDefaultTableProps } from "@hoc/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TABLE_HEADERS, setIfNotString } from "@utils/index";
import IconButton from "@material-ui/core/IconButton";

interface TableHeader<DataTableInterface> {
  headerName: string;
  field: keyof DataTableInterface;
  width?: number | string | null;
  align?: "inherit" | "left" | "center" | "right" | "justify";
  styleHeader?: CSSProperties;
  style?: CSSProperties;
}

interface TableGenericProps<DataTableInterface>
  extends CRUDDefaultTableProps<DataTableInterface> {
  headers: TableHeader<DataTableInterface>[];
  idField: keyof DataTableInterface;
}

const useStyles = makeStyles({
  tableContainer: {
    boxShadow: "none",
  },
  tableHeader: {
    borderBottomStyle: "solid",
    borderBottomColor: "rgba(0, 0, 0, 0.4)",
  },
  tableCell: {
    padding: "10px",
  },
  tableCellHeader: {
    padding: "10px",
  },
  tableCellIcon: {
    textAlign: "center",
  },
  tableCellButtonHeader: {
    width: 20,
    textAlign: "center",
  },
  tableCellButton: {
    padding: "2px",
    textAlign: "center",
    width: 20,
  },
});

const TableGenericCRUD = <DataTableInterface,>({
  headers,
  idField,
  list,
  onOpenEdit,
  onOpenDelete,
}: TableGenericProps<DataTableInterface>) => {
  const classes = useStyles();
  const configMap: { [name: string]: TableHeader<DataTableInterface> } =
    headers.reduce((a, b) => {
      return { ...a, [b.field]: b };
    }, {});
  const headerFields = headers.map((header) => header.field);

  const renderHeaders = () => {
    return headers.map((header) => {
      const fieldName = setIfNotString(header.field);
      const cellConfig = configMap[fieldName];
      return (
        <TableCell
          key={header.headerName}
          style={cellConfig.styleHeader || {}}
          className={classes.tableCellHeader}
        >
          <Typography variant="body2" color="textSecondary">
            {header.headerName}
          </Typography>
        </TableCell>
      );
    });
  };
  return (
    <TableContainer className={classes.tableContainer}>
      <Table>
        <TableHead className={classes.tableHeader}>
          <TableRow>
            {renderHeaders()}
            {onOpenEdit && (
              <TableCell className={classes.tableCellButtonHeader}>
                <Typography variant="body2" color="textSecondary">
                  {TABLE_HEADERS.GENERAL.HEADER_EDIT}
                </Typography>
              </TableCell>
            )}
            {onOpenDelete && (
              <TableCell className={classes.tableCellButtonHeader}>
                <Typography variant="body2" color="textSecondary">
                  {TABLE_HEADERS.GENERAL.HEADER_DELETE}
                </Typography>
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row) => (
            <TableRow
              // @ts-ignore
              key={row[idField]}
            >
              {headerFields.map((fieldName) => {
                const field = setIfNotString(fieldName);
                const cellConfig = configMap[field];
                return (
                  <TableCell
                    padding="none"
                    key={field}
                    component="th"
                    scope="row"
                    style={cellConfig.style || {}}
                  >
                    {row[fieldName]}
                  </TableCell>
                );
              })}
              {onOpenEdit && (
                <TableCell
                  component="th"
                  scope="row"
                  padding="none"
                  className={classes.tableCellButton}
                >
                  <IconButton
                    color="inherit"
                    aria-label="edit"
                    className={classes.tableCellIcon}
                    onClick={() => onOpenEdit(row)}
                    edge="start"
                  >
                    <FontAwesomeIcon icon={["fal", "edit"]} size="xs" />
                  </IconButton>
                </TableCell>
              )}
              {onOpenDelete && (
                <TableCell
                  component="th"
                  scope="row"
                  padding="none"
                  className={classes.tableCellButton}
                >
                  <IconButton
                    color="inherit"
                    aria-label="delete"
                    className={classes.tableCellIcon}
                    onClick={() => onOpenDelete(row)}
                    edge="start"
                  >
                    <FontAwesomeIcon icon={["fal", "trash"]} size="xs" />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableGenericCRUD;
