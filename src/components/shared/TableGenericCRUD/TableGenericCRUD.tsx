import React, { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { CRUDDefaultTableProps } from "@hoc/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TABLE_HEADERS, setIfNotString } from "@utils/index";
import IconButton from "@mui/material/IconButton";

interface TableHeader<DataTableInterface> {
  headerName: string;
  field: keyof DataTableInterface;
  width?: number | string | null;
  align?: "inherit" | "left" | "center" | "right" | "justify";
  styleHeader?: CSSProperties;
  style?: CSSProperties;
  isBoolean?: boolean;
  openViewUrl?: string | null;
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

export const TableGenericCRUD = <DataTableInterface,>({
  headers,
  idField,
  list,
  canDelete,
  canEdit,
  canView,
  onOpenEdit,
  onOpenDelete,
  viewUrl,
}: TableGenericProps<DataTableInterface>) => {
  const classes = useStyles();
  const navigate = useNavigate();
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
            {canEdit && (
              <TableCell className={classes.tableCellButtonHeader}>
                <Typography variant="body2" color="textSecondary">
                  {TABLE_HEADERS.GENERAL.HEADER_EDIT}
                </Typography>
              </TableCell>
            )}
            {canDelete && (
              <TableCell className={classes.tableCellButtonHeader}>
                <Typography variant="body2" color="textSecondary">
                  {TABLE_HEADERS.GENERAL.HEADER_DELETE}
                </Typography>
              </TableCell>
            )}
            {canView && (
              <TableCell className={classes.tableCellButtonHeader}>
                <Typography variant="body2" color="textSecondary">
                  {TABLE_HEADERS.GENERAL.HEADER_VIEW}
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
                    <>
                      {cellConfig.isBoolean ? (
                        <FontAwesomeIcon
                          icon={[
                            "fal",
                            row[fieldName] ? "check-circle" : "times-circle",
                          ]}
                          size="lg"
                        />
                      ) : (
                        row[fieldName]
                      )}
                    </>
                  </TableCell>
                );
              })}
              {onOpenEdit && canEdit && (
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
                    size="large"
                  >
                    <FontAwesomeIcon icon={["fal", "edit"]} size="xs" />
                  </IconButton>
                </TableCell>
              )}
              {onOpenDelete && canDelete && (
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
                    size="large"
                  >
                    <FontAwesomeIcon icon={["fal", "trash"]} size="xs" />
                  </IconButton>
                </TableCell>
              )}
              {canView && (
                <TableCell
                  component="th"
                  scope="row"
                  padding="none"
                  className={classes.tableCellButton}
                >
                  <IconButton
                    color="inherit"
                    aria-label="view"
                    className={classes.tableCellIcon}
                    onClick={() =>
                      (viewUrl && navigate(`${viewUrl}${row[idField]}`)) ||
                      navigate(`${row[idField]}`)
                    }
                    edge="start"
                    size="large"
                  >
                    <FontAwesomeIcon icon={["fal", "eye"]} size="xs" />
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
