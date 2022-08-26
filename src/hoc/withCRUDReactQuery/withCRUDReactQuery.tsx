import React, { useEffect, useReducer, useState } from "react";
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
import {
  DialogConfirmation,
  NoViewDisplayAllowed,
  BackdropLoading,
} from "@components/shared";
import {
  DIALOG_MESSAGES,
  isNumber,
  setIfNotString,
  NOTIFICATION_MESSAGES,
  UI,
  TABLE_PAGINATOR,
  InstancesDescriptorKeys,
  instancesDescriptor,
} from "@utils/index";
import {
  reducerPagination,
  paginatorInitial,
  reducerElementActions,
  elementActionsStateInitial,
} from "./withCRUDReactQuery.reducers";
import { useReactQueryCRUDGenericApiCall } from "@api/reactQueryApi";

import { QueryErrorBoundary } from "@components/shared";

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
  error: any;
  open: boolean;
}

interface DefaultCRUDProps<E> {
  viewUrl?: string;
  descriptorKey: InstancesDescriptorKeys;
  toStringField: keyof E;
  idField: keyof E;
  fetchAllParams?: any;
  hasSearch?: boolean;
  withTitle?: boolean;
  secondsToReFetchList?: number;
}

export const withCRUDReactQuery = <ElementInterface,>(
  Form: React.FC<CRUDDefaultFormProps<ElementInterface>> | null,
  Table: React.FC<CRUDDefaultTableProps<ElementInterface>> | null
) => {
  const CRUD: React.FC<DefaultCRUDProps<ElementInterface>> = ({
    toStringField,
    viewUrl,
    idField,
    fetchAllParams,
    hasSearch,
    withTitle,
    descriptorKey,
    secondsToReFetchList,
  }: DefaultCRUDProps<ElementInterface>) => {
    const { useCreate, useEdit, useFetch, useFetchAllPagination, useDestroy } =
      useReactQueryCRUDGenericApiCall<ElementInterface>(descriptorKey);

    const instancesDescriptorValue = instancesDescriptor[descriptorKey];

    const { createSuccessNotification } = useNotifications();
    const [searchText, setSearchText] = useState<string>("");
    const permissions = useCheckGenericUserPermissions(
      instancesDescriptorValue.permissions.generic
    );

    const showAddButton = Form && permissions.ADD;
    const showList = Table && permissions.LIST;

    const [paginatorState, dispatchPaginatorAction] = useReducer(
      reducerPagination<ElementInterface>(),
      paginatorInitial
    );

    const [elementActionsState, dispatchElementActions] = useReducer(
      reducerElementActions<ElementInterface>(),
      elementActionsStateInitial
    );

    const fetchAllPaginationQueryResult = useFetchAllPagination({
      limit: paginatorState.limit,
      offset: paginatorState.offset,
      secondsToReFetch: secondsToReFetchList,
      onSuccessCallBack: (result) => {
        dispatchPaginatorAction({
          type: "changeList",
          payload: {
            next: result?.next,
            previous: result?.previous,
            count: result?.count,
          },
        });
      },
      params: { ...fetchAllParams, ...paginatorState.params },
    });

    const { data: elementInterfaceListData, refetch: refetchList } =
      fetchAllPaginationQueryResult;

    const { mutate: deleteMutation, isLoading: deleteMutationIsLoading } =
      useDestroy(async () => {
        await refetchList();
        createSuccessNotification(
          NOTIFICATION_MESSAGES.CRUD_DELETE_SUCCESS(
            instancesDescriptorValue.singular,
            setIfNotString(
              elementActionsState.element &&
                elementActionsState.element[toStringField]
            )
          )
        );
        dispatchElementActions({ type: "closeDeleteDialog" });
      });

    const elementIdToFetch =
      ((elementActionsState.fetchingForEdit ||
        elementActionsState.fetchingForDelete) &&
        elementActionsState.elementId) ||
      "";

    const {
      isLoading: fetchQueryIsLoading,
      fetchStatus: fetchQueryFetchStatus,
    } = useFetch(elementIdToFetch || "", (data) => {
      const elementId = data[idField];
      if (isNumber(elementId)) {
        if (elementActionsState.fetchingForEdit) {
          dispatchElementActions({
            type: "openEditDialog",
            element: data,
            elementId,
          });
        } else if (elementActionsState.fetchingForDelete) {
          dispatchElementActions({
            type: "openDeleteDialog",
            element: data,
            elementId,
          });
        }
      }
    });

    const {
      reset: editMutationReset,
      mutate: editMutation,
      isLoading: editMutationIsLoading,
      error: editMutationError,
    } = useEdit({
      id: elementActionsState?.elementId || "",
      onSuccessCallBack: async (data) => {
        await refetchList();
        createSuccessNotification(
          NOTIFICATION_MESSAGES.CRUD_SUCCESS_ON_EDIT(
            instancesDescriptorValue.singular,
            setIfNotString(data[toStringField])
          ),
          5000
        );
        dispatchElementActions({ type: "closeCreateEditDialog" });
      },
    });

    const onCreateCallBack = async (data: ElementInterface) => {
      await refetchList();
      dispatchElementActions({ type: "closeCreateEditDialog" });
      createSuccessNotification(
        NOTIFICATION_MESSAGES.CRUD_SUCCESS_ON_SAVE(
          instancesDescriptorValue.singular,
          setIfNotString(data[toStringField])
        )
      );
    };

    const {
      reset: createMutationReset,
      mutate: createMutation,
      isLoading: createMutationIsLoading,
      error: createMutationError,
    } = useCreate(async (data) => {
      await onCreateCallBack(data);
    });

    useEffect(() => {
      refetchList();
    }, [
      instancesDescriptorValue.apiRoute,
      paginatorState.limit,
      paginatorState.offset,
      paginatorState.params,
      refetchList,
    ]);

    const handleOnDestroy = async () => {
      const { element, openDeleteDialog } = elementActionsState;
      if (element && openDeleteDialog) {
        const elementId = element[idField];
        if (isNumber(elementId)) {
          deleteMutation(elementId);
        }
      }
    };

    const handleOnOpenEdit = async (element: ElementInterface) => {
      const elementId = element[idField];
      if (isNumber(elementId)) {
        dispatchElementActions({
          type: "fetchElementForEdit",
          elementId,
        });
      }
    };

    const handleOnSave = async (formValues: ElementInterface) => {
      try {
        if (elementActionsState.elementId) {
          editMutation(formValues);
        } else {
          createMutation(formValues);
        }
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
      const elementId = element[idField];
      if (isNumber(elementId)) {
        dispatchElementActions({
          type: "fetchElementForDelete",
          elementId,
        });
      }
    };

    if (!permissions.HAS_ANY) {
      return (
        <NoViewDisplayAllowed
          instanceNamePlural={instancesDescriptorValue.plural}
        />
      );
    }

    const showBackdropLoading =
      deleteMutationIsLoading ||
      editMutationIsLoading ||
      (fetchQueryIsLoading && fetchQueryFetchStatus === "fetching") ||
      createMutationIsLoading;

    const showForm = Form && elementActionsState.openCreateEditDialog;

    return (
      <Box>
        <BackdropLoading isOpen={showBackdropLoading} />
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
        {showForm && (
          <Form
            instance={elementActionsState.element}
            onSave={handleOnSave}
            open={elementActionsState.openCreateEditDialog}
            error={
              createMutationError?.response?.data ||
              editMutationError?.response?.data ||
              []
            }
            handleClose={() => {
              dispatchElementActions({ type: "closeCreateEditDialog" });
              createMutationReset();
              editMutationReset();
            }}
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
                    dispatchElementActions({ type: "openCreateDialog" })
                  }
                >
                  {UI.BUTTON_TEXT_ADD}
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
        {showList && (
          <QueryErrorBoundary queries={[fetchAllPaginationQueryResult]}>
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
                  canEdit={permissions.CHANGE}
                  viewUrl={viewUrl}
                  canView={permissions.VIEW}
                  canDelete={permissions.DELETE}
                  list={elementInterfaceListData?.results || []}
                  onOpenDelete={handleOnOpenDelete}
                  onOpenEdit={handleOnOpenEdit}
                />
              )}
              <Box>
                {paginatorState.count > TABLE_PAGINATOR.LIMIT && (
                  <TablePagination
                    component="div"
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
          </QueryErrorBoundary>
        )}
      </Box>
    );
  };
  CRUD.defaultProps = {
    withTitle: true,
    fetchAllParams: {},
    hasSearch: false,
    viewUrl: undefined,
  };
  return CRUD;
};
