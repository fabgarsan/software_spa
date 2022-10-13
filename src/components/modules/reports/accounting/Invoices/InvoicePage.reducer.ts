import React from "react";
import { FORMATS } from "@utils/index";
import { format } from "date-fns";
import { FetchInvoicesParams } from "@api/accounting";

export interface FilterState {
  filterType: "range" | "date" | string;
  params: FetchInvoicesParams;
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
    case "changeFilterType":
      return {
        ...state,
        filterType: action.mode,
        params: { ...filterInitial.params },
      };
    default:
      throw new Error();
  }
};
