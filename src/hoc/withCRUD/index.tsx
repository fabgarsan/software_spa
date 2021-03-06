import React, { useCallback, useEffect, useReducer, useState } from "react";
import {
  Box,
  Button,
  Grid,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCheckGenericUserPermissions, useNotifications } from "@hooks/index";
import { DialogConfirmation } from "@components/index";
import {
  DIALOG_MESSAGES,
  isNumber,
  setIfNotString,
  NOTIFICATION_MESSAGES,
  UI,
  TABLE_PAGINATOR,
  InstancesDescriptorValue,
} from "@utils/index";
import { AxiosResponseListPaginationData } from "@dto/common";
import NoViewDisplayAllowed from "@components/NoViewDisplayAllowed";
import {
  reducerPagination,
  paginatorInitial,
  reducerElementActions,
  elementActionsStateInitial,
} from "./withCRUD.reducers";

export interface CRUDDefaultTableProps<E> {
  list: E[];
  canDelete: boolean;
  canView?: boolean;
  viewUrl?: string;
  canEdit: boolean;
  onOpenDelete: ((element: E) => void) | undefined;
  onOpenEdit: ((element: E) => void) | undefined;
}

export interface CRUDDefaultFormProps<E> {
  instance: E | null;
  onSave: (formValues: E) => void;
  handleClose: () => void;
  open: boolean;
}

interface DefaultCRUDProps<E> {
  viewUrl?: string;
  instancesDescriptorValue: InstancesDescriptorValue;
  toStringField: keyof E;
  idField: keyof E;
  deleteMethod?: (id: number) => void;
  createMethod?: (data: E) => Promise<E>;
  editMethod?: (id: number, data: E) => Promise<E>;
  fetchMethod?: (id: number) => Promise<E>;
  fetchAllParams?: any;
  hasSearch?: boolean;
  withTitle?: boolean;
  fetchAllPaginationMethod?: (
    limit: number,
    offset: number,
    params?: any
  ) => Promise<AxiosResponseListPaginationData<E>>;
}

const index = <ElementInterface,>(
  Form: React.FC<CRUDDefaultFormProps<ElementInterface>> | null,
  Table: React.FC<CRUDDefaultTableProps<ElementInterface>> | null
) => {
  const CRUD: React.FC<DefaultCRUDProps<ElementInterface>> = ({
    instancesDescriptorValue,
    toStringField,
    deleteMethod,
    createMethod,
    editMethod,
    viewUrl,
    fetchMethod,
    fetchAllPaginationMethod,
    idField,
    fetchAllParams,
    hasSearch,
    withTitle,
  }: DefaultCRUDProps<ElementInterface>) => {
    const { createSuccessNotification } = useNotifications();
    const [searchText, setSearchText] = useState<string>("");
    const permissions = useCheckGenericUserPermissions(
      instancesDescriptorValue.permissions.generic
    );

    const showAddButton = Form && createMethod && permissions.ADD;
    const showList = Table && fetchAllPaginationMethod && permissions.LIST;

    const [paginatorState, dispatchPaginatorAction] = useReducer(
      reducerPagination<ElementInterface>(),
      paginatorInitial
    );

    const [elementActionsState, dispatchElementActions] = useReducer(
      reducerElementActions<ElementInterface>(),
      elementActionsStateInitial
    );

    const handleOnFetchAll = useCallback(async () => {
      if (fetchAllPaginationMethod && showList) {
        const data = await fetchAllPaginationMethod(
          paginatorState.limit,
          paginatorState.offset,
          { ...fetchAllParams, ...paginatorState.params }
        );
        dispatchPaginatorAction({
          type: "changeList",
          payload: {
            next: data?.next,
            previous: data?.previous,
            count: data?.count,
            list: data?.results,
          },
        });
      }
    }, [
      fetchAllPaginationMethod,
      paginatorState.limit,
      paginatorState.offset,
      paginatorState.params,
      fetchAllParams,
      showList,
    ]);

    const handleOnDestroy = async () => {
      if (deleteMethod) {
        const { element, openDeleteDialog } = elementActionsState;
        if (element && openDeleteDialog) {
          const elementId = element[idField];
          if (isNumber(elementId)) {
            await deleteMethod(elementId);
            await handleOnFetchAll();
            createSuccessNotification(
              NOTIFICATION_MESSAGES.CRUD_DELETE_SUCCESS(
                instancesDescriptorValue.singular,
                setIfNotString(element[toStringField])
              )
            );
            dispatchElementActions({ type: "closeDeleteDialog" });
          }
        }
      }
    };

    const handleOnOpenEdit = async (element: ElementInterface) => {
      const id = element[idField];
      if (fetchMethod && isNumber(id)) {
        const data = await fetchMethod(id);
        dispatchElementActions({ type: "openEditDialog", element: data });
      }
    };

    const handleOnSave = async (formValues: ElementInterface) => {
      try {
        if (elementActionsState.element && editMethod) {
          const elementId = elementActionsState.element[idField];
          if (isNumber(elementId)) {
            const data = await editMethod(elementId, formValues);
            dispatchElementActions({ type: "closeSaveEditDialog" });
            const message = NOTIFICATION_MESSAGES.CRUD_SUCCESS_ON_EDIT(
              instancesDescriptorValue.singular,
              setIfNotString(data[toStringField])
            );
            createSuccessNotification(message, 5000);
          }
        } else if (createMethod) {
          const data = await createMethod(formValues);
          dispatchElementActions({ type: "closeSaveEditDialog" });
          const message = NOTIFICATION_MESSAGES.CRUD_SUCCESS_ON_SAVE(
            instancesDescriptorValue.singular,
            setIfNotString(data[toStringField])
          );
          createSuccessNotification(message);
        }
        await handleOnFetchAll();
      } catch (errors) {
        throw errors.response.data;
      }
    };

    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      dispatchPaginatorAction({
        type: "changeLimit",
        newLimit: parseInt(event.target.value, 10),
      });
    };

    const handleChangePage = (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number
    ) => {
      dispatchPaginatorAction({
        type: "changePage",
        newPage,
      });
    };

    const handleOnOpenDelete = (element: ElementInterface) => {
      dispatchElementActions({
        type: "openDeleteDialog",
        element,
      });
    };

    useEffect(() => {
      let mounted = true;
      (async () => {
        if (mounted) await handleOnFetchAll();
      })();
      return () => {
        mounted = false;
      };
    }, [handleOnFetchAll]);

    if (!permissions.HAS_ANY) {
      return (
        <NoViewDisplayAllowed
          instanceNamePlural={instancesDescriptorValue.plural}
        />
      );
    }

    return (
      <Box>
        {elementActionsState.openDeleteDialog &&
          elementActionsState.element && (
            <DialogConfirmation
              title={DIALOG_MESSAGES.CRUD_DELETE_DIALOG_TITLE(
                instancesDescriptorValue.singular
              )}
              message={DIALOG_MESSAGES.CRUD_DELETE_DIALOG_TEXT(
                instancesDescriptorValue.singular,
                setIfNotString(elementActionsState.element[toStringField])
              )}
              open={elementActionsState.openDeleteDialog}
              onAccept={handleOnDestroy}
              onCancel={() =>
                dispatchElementActions({ type: "closeDeleteDialog" })
              }
            />
          )}
        {Form && elementActionsState.openSaveEditDialog && (
          <Form
            instance={elementActionsState.element}
            onSave={handleOnSave}
            open={elementActionsState.openSaveEditDialog}
            handleClose={() =>
              dispatchElementActions({ type: "closeSaveEditDialog" })
            }
          />
        )}
        <Grid container>
          <Grid item sm={8} xs={12}>
            {withTitle && (
              <Typography variant="h5" gutterBottom color="primary">
                {instancesDescriptorValue.singular}
              </Typography>
            )}
          </Grid>
          <Grid container item sm={4} xs={12}>
            {showAddButton && (
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                height="100%"
                width="100%"
              >
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<FontAwesomeIcon icon={["fal", "plus"]} />}
                  onClick={() =>
                    dispatchElementActions({ type: "openNewDialog" })
                  }
                >
                  {UI.BUTTON_TEXT_ADD}
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
        {showList && (
          <>
            {hasSearch && (
              <Grid container>
                <Grid item xs={12} sm={4}>
                  <TextField
                    value={searchText}
                    fullWidth
                    onChange={(event) => setSearchText(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button
                    onClick={() =>
                      dispatchPaginatorAction({
                        type: "setSearch",
                        search: searchText,
                      })
                    }
                    type="button"
                    color="secondary"
                  >
                    {UI.BUTTON_TEXT_SEARCH}
                  </Button>
                </Grid>
              </Grid>
            )}
            {Table && (
              <Table
                canEdit={
                  permissions.CHANGE &&
                  Boolean(editMethod) &&
                  Boolean(fetchMethod)
                }
                viewUrl={viewUrl}
                canView={permissions.VIEW}
                canDelete={permissions.DELETE && Boolean(deleteMethod)}
                list={paginatorState.list}
                onOpenDelete={(deleteMethod && handleOnOpenDelete) || undefined}
                onOpenEdit={(editMethod && handleOnOpenEdit) || undefined}
              />
            )}
            <Box>
              {paginatorState.count > TABLE_PAGINATOR.LIMIT && (
                <TablePagination
                  rowsPerPageOptions={TABLE_PAGINATOR.ROWS_PER_PAGE_OPTIONS}
                  labelRowsPerPage={TABLE_PAGINATOR.LABEL_ROWS_PER_PAGE}
                  labelDisplayedRows={TABLE_PAGINATOR.LABEL_DISPLAYED_ROWS}
                  count={paginatorState.count}
                  page={paginatorState.currentPage}
                  rowsPerPage={paginatorState.limit}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  onPageChange={handleChangePage}
                  nextIconButtonProps={{
                    title: TABLE_PAGINATOR.NEXT_ICON_BUTTON_TEXT,
                  }}
                  backIconButtonProps={{
                    title: TABLE_PAGINATOR.BACK_ICON_BUTTON_TEXT,
                  }}
                />
              )}
            </Box>
          </>
        )}
      </Box>
    );
  };
  CRUD.defaultProps = {
    fetchAllPaginationMethod: undefined,
    createMethod: undefined,
    fetchMethod: undefined,
    withTitle: true,
    deleteMethod: undefined,
    editMethod: undefined,
    fetchAllParams: {},
    hasSearch: false,
    viewUrl: undefined,
  };
  return CRUD;
};

export default index;
