import React from "react";
import { FORMATS } from "@utils/index";
import { format } from "date-fns";
import { FetchSignInOutLogsParams } from "@api/signInControl";

export interface FilterState {
  filterType: "range" | "date" | string;
  params: FetchSignInOutLogsParams;
}

export type FilterActions =
  | { type: "filterDate"; date: string | null }
  | { type: "filterDateRangeFrom"; date: string | null }
  | { type: "filterDateRangeTo"; date: string | null }
  | { type: "setSearchText"; text: string }
  | { type: "changeFilterType"; mode: "range" | "date" | string };

export const filterInitial: FilterState = {
  filterType: "date",
  params: {
    date: format(new Date(), FORMATS.DATE_TIME_TO_SEND),
    dateFrom: format(new Date(), FORMATS.DATE_TIME_TO_SEND),
    dateTo: format(new Date(), FORMATS.DATE_TIME_TO_SEND),
    search: "",
  },
};

export const reducerFilter: React.Reducer<FilterState, FilterActions> = (
  state,
  action
): FilterState => {
  switch (action.type) {
    case "filterDate":
      return {
        ...state,
        params: {
          date:
            (action.date &&
              format(new Date(action.date), FORMATS.DATE_TIME_TO_SEND)) ||
            filterInitial.params.date,
        },
      };
    case "filterDateRangeFrom":
      return {
        ...state,
        params: {
          dateTo: state.params.dateTo,
          dateFrom:
            (action.date &&
              format(new Date(action.date), FORMATS.DATE_TIME_TO_SEND)) ||
            filterInitial.params.date,
        },
      };
    case "filterDateRangeTo":
      return {
        ...state,
        params: {
          dateTo:
            (action.date &&
              format(new Date(action.date), FORMATS.DATE_TIME_TO_SEND)) ||
            filterInitial.params.date,
          dateFrom: state.params.dateFrom,
        },
      };
    case "setSearchText":
      return {
        ...state,
        params: {
          ...state.params,
          search: action.text,
        },
      };
    case "changeFilterType":
      return {
        ...state,
        filterType: action.mode,
        params: { ...filterInitial.params, search: state.params.search },
      };
    default:
      throw new Error();
  }
};
