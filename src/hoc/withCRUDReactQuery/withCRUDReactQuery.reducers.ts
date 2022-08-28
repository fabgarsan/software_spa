import React from "react";
import { TABLE_PAGINATOR } from "@utils/index";

export interface PaginatorState {
  limit: number;
  offset: number;
  count: number;
  currentPage: number;
  next: string | null;
  previous: string | null;
  params: Record<string, unknown>;
}

export type PaginationActions =
  | { type: "changePage"; newPage: number }
  | { type: "changeLimit"; newLimit: number }
  | { type: "setSearch"; search: string }
  | {
      type: "changeList";
      payload: { next: string; previous: string; count: number };
    };

export const paginatorInitial = {
  count: 0,
  limit: TABLE_PAGINATOR.LIMIT,
  next: null,
  previous: null,
  offset: 0,
  currentPage: 0,
  params: {},
};

export const reducerPagination = () => {
  const reducer: React.Reducer<PaginatorState, PaginationActions> = (
    state,
    action
  ): PaginatorState => {
    switch (action.type) {
      case "changePage":
        return {
          ...state,
          currentPage: action.newPage,
          offset: action.newPage * state.limit,
        };
      case "changeLimit":
        return {
          ...state,
          limit: action.newLimit,
          offset: 0,
          currentPage: 0,
        };
      case "setSearch":
        return {
          ...state,
          params: { search: action.search },
        };
      case "changeList":
        return {
          ...state,
          next: action.payload.next,
          previous: action.payload.previous,
          count: action.payload.count,
        };
      default:
        throw new Error();
    }
  };
  return reducer;
};

interface ElementActionsState<E> {
  element: E | null;
  elementId: number | null;
  openDeleteDialog: boolean;
  openCreateEditDialog: boolean;
  fetchingForDelete: boolean;
  fetchingForEdit: boolean;
}

export const elementActionsStateInitial = {
  element: null,
  elementId: null,
  openDeleteDialog: false,
  openCreateEditDialog: false,
  fetchingForDelete: false,
  fetchingForEdit: false,
};

type ElementActions<T> =
  | { type: "openDeleteDialog"; elementId: number; element: T }
  | { type: "openCreateDialog" }
  | { type: "openEditDialog"; elementId: number; element: T }
  | { type: "closeDeleteDialog" }
  | { type: "fetchElementForEdit"; elementId: number }
  | { type: "fetchElementForDelete"; elementId: number }
  | { type: "closeCreateEditDialog" };

export const reducerElementActions = <T>() => {
  const reducer: React.Reducer<ElementActionsState<T>, ElementActions<T>> = (
    state,
    action
  ): ElementActionsState<T> => {
    switch (action.type) {
      case "fetchElementForDelete":
        return {
          ...elementActionsStateInitial,
          elementId: action.elementId,
          fetchingForDelete: true,
        };
      case "fetchElementForEdit":
        return {
          ...elementActionsStateInitial,
          elementId: action.elementId,
          fetchingForEdit: true,
        };
      case "openDeleteDialog":
        return {
          ...elementActionsStateInitial,
          openDeleteDialog: true,
          elementId: action.elementId,
          element: action.element,
        };
      case "openEditDialog":
        return {
          ...elementActionsStateInitial,
          openCreateEditDialog: true,
          elementId: action.elementId,
          element: action.element,
        };
      case "openCreateDialog":
        return {
          ...elementActionsStateInitial,
          openCreateEditDialog: true,
        };
      case "closeDeleteDialog":
        return elementActionsStateInitial;
      case "closeCreateEditDialog":
        return elementActionsStateInitial;
      default:
        throw new Error();
    }
  };
  return reducer;
};
