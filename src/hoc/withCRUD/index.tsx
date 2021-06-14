import React, { useCallback, useEffect, useReducer, useState } from "react";
import {
  Box,
  Button,
  Grid,
  TablePagination,
  TextField,
  Typography,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNotifications } from "@hooks/index";
import { DialogConfirmation } from "@components/index";
import {
  DIALOG_MESSAGES,
  isNumber,
  setIfNotString,
  NOTIFICATION_MESSAGES,
  UI,
  TABLE_PAGINATOR,
} from "@utils/index";
import { AxiosResponsePaginationData } from "@dbTypes/common";
import {
  reducerPagination,
  paginatorInitial,
  reducerElementActions,
  elementActionsStateInitial,
} from "./withCRUD.reducers";

export interface CRUDDefaultTableProps<E> {
  list: E[];
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
  instanceNameSingular: string;
  instanceNamePlural: string;
  toStringField: keyof E;
  idField: keyof E;
  deleteMethod?: (id: number) => void;
  createMethod?: (data: E) => Promise<E>;
  editMethod?: (id: number, data: E) => Promise<E>;
  fetchMethod?: (id: number) => Promise<E>;
  fetchAllParams?: any;
  hasSearch?: boolean;
  fetchAllPaginationMethod?: (
    limit: number,
    offset: number,
    params?: any
  ) => Promise<AxiosResponsePaginationData<E>>;
}

const index = <ElementInterface,>(
  Form: React.FC<CRUDDefaultFormProps<ElementInterface>> | null,
  Table: React.FC<CRUDDefaultTableProps<ElementInterface>> | null
) => {
  const CRUD: React.FC<DefaultCRUDProps<ElementInterface>> = ({
    instanceNamePlural,
    toStringField,
    deleteMethod,
    createMethod,
    editMethod,
    fetchMethod,
    fetchAllPaginationMethod,
    idField,
    instanceNameSingular,
    fetchAllParams,
    hasSearch,
  }: DefaultCRUDProps<ElementInterface>) => {
    const { createSuccessNotification } = useNotifications();
    const [searchText, setSearchText] = useState<string>("");

    const [paginatorState, dispatchPaginatorAction] = useReducer(
      reducerPagination<ElementInterface>(),
      paginatorInitial
    );

    const [elementActionsState, dispatchElementActions] = useReducer(
      reducerElementActions<ElementInterface>(),
      elementActionsStateInitial
    );

    const handleOnFetchAll = useCallback(async () => {
      if (fetchAllPaginationMethod) {
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
                instanceNameSingular,
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
              instanceNameSingular,
              setIfNotString(data[toStringField])
            );
            createSuccessNotification(message, 5000);
          }
        } else if (createMethod) {
          const data = await createMethod(formValues);
          dispatchElementActions({ type: "closeSaveEditDialog" });
          const message = NOTIFICATION_MESSAGES.CRUD_SUCCESS_ON_SAVE(
            instanceNameSingular,
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
      const loadAll = async () => {
        if (mounted) {
          await handleOnFetchAll();
        }
      };
      loadAll();
      return () => {
        mounted = false;
      };
    }, [handleOnFetchAll]);

    const showForm = Form && (createMethod || editMethod) && fetchMethod;

    return (
      <Box>
        {elementActionsState.openDeleteDialog &&
          elementActionsState.element && (
            <DialogConfirmation
              title={DIALOG_MESSAGES.CRUD_DELETE_DIALOG_TITLE(
                instanceNameSingular
              )}
              message={DIALOG_MESSAGES.CRUD_DELETE_DIALOG_TEXT(
                instanceNameSingular,
                setIfNotString(elementActionsState.element[toStringField])
              )}
              open={elementActionsState.openDeleteDialog}
              onAccept={handleOnDestroy}
              onCancel={() =>
                dispatchElementActions({ type: "closeDeleteDialog" })
              }
            />
          )}
        {Form && showForm && elementActionsState.openSaveEditDialog && (
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
            <Typography variant="h5" gutterBottom color="primary">
              {instanceNamePlural}
            </Typography>
          </Grid>
          <Grid container item sm={4} xs={12}>
            {showForm && (
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
        {hasSearch && (
          <Grid container>
            <Grid item xs={12} sm={4}>
              <TextField
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
              nextIconButtonText={TABLE_PAGINATOR.NEXT_ICON_BUTTON_TEXT}
              backIconButtonText={TABLE_PAGINATOR.BACK_ICON_BUTTON_TEXT}
              component="div"
              count={paginatorState.count}
              page={paginatorState.currentPage}
              onChangePage={handleChangePage}
              rowsPerPage={paginatorState.limit}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          )}
        </Box>
      </Box>
    );
  };
  CRUD.defaultProps = {
    fetchAllPaginationMethod: undefined,
    createMethod: undefined,
    fetchMethod: undefined,
    deleteMethod: undefined,
    editMethod: undefined,
    fetchAllParams: {},
    hasSearch: false,
  };
  return CRUD;
};

export default index;