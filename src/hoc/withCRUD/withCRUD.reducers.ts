import React from "react";
import { TABLE_PAGINATOR } from "@utils/index";

export interface PaginatorState<L> {
  list: L[];
  limit: number;
  offset: number;
  count: number;
  currentPage: number;
  next: string | null;
  previous: string | null;
  params: Record<string, unknown>;
}

export type PaginationActions<L> =
  | { type: "changePage"; newPage: number }
  | { type: "changeLimit"; newLimit: number }
  | { type: "setSearch"; search: string }
  | {
      type: "changeList";
      payload: { next: string; previous: string; count: number; list: L[] };
    };

export const paginatorInitial = {
  list: [],
  count: 0,
  limit: TABLE_PAGINATOR.LIMIT,
  next: null,
  previous: null,
  offset: 0,
  currentPage: 0,
  params: {},
};

export const reducerPagination = <T>() => {
  const reducer: React.Reducer<PaginatorState<T>, PaginationActions<T>> = (
    state,
    action
  ): PaginatorState<T> => {
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
          list: action.payload.list,
        };
      default:
        throw new Error();
    }
  };
  return reducer;
};

interface ElementActionsState<E> {
  element: E | null;
  objectId: number | null;
  openDeleteDialog: boolean;
  openSaveEditDialog: boolean;
}

export const elementActionsStateInitial = {
  objectId: null,
  element: null,
  openDeleteDialog: false,
  openSaveEditDialog: false,
};

type ElementActions<E> =
  | { type: "openDeleteDialog"; element: E }
  | { type: "openEditDialog"; element: E }
  | { type: "openNewDialog" }
  | { type: "closeDeleteDialog" }
  | { type: "closeSaveEditDialog" };

export const reducerElementActions = <T>() => {
  const reducer: React.Reducer<ElementActionsState<T>, ElementActions<T>> = (
    state,
    action
  ): ElementActionsState<T> => {
    switch (action.type) {
      case "openDeleteDialog":
        return {
          ...state,
          openDeleteDialog: true,
          element: action.element,
        };
      case "openEditDialog":
        return {
          ...state,
          openSaveEditDialog: true,
          element: action.element,
        };
      case "openNewDialog":
        return {
          ...state,
          openSaveEditDialog: true,
          element: null,
        };
      case "closeSaveEditDialog":
        return {
          ...state,
          openSaveEditDialog: false,
          element: null,
        };
      case "closeDeleteDialog":
        return {
          ...state,
          openDeleteDialog: false,
          objectId: null,
        };
      default:
        throw new Error();
    }
  };
  return reducer;
};
