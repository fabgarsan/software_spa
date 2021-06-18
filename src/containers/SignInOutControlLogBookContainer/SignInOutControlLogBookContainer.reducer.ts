import moment from "moment";
import { DateType } from "@date-io/type";

type MaterialUiPickersDate = DateType | null;

interface FilterParams {
  date?: string;
  dateTo?: string;
  dateFrom?: string;
  search?: string;
}

export interface FilterState {
  filterType: "range" | "date" | string;
  params: FilterParams;
}

export type FiltertActions =
  | { type: "filterDate"; date: MaterialUiPickersDate }
  | { type: "filterRangeFrom"; date: MaterialUiPickersDate }
  | { type: "filterRangeTo"; date: MaterialUiPickersDate }
  | { type: "setSearchText"; text: string }
  | { type: "changeFilterType"; mode: "range" | "date" | string };

export const filterInitial: FilterState = {
  filterType: "date",
  params: {
    date: moment(new Date()).format("YYYY-MM-DD"),
    dateFrom: moment(new Date()).format("YYYY-MM-DD"),
    dateTo: moment(new Date()).format("YYYY-MM-DD"),
    search: "",
  },
};

export const reducerFilter: React.Reducer<FilterState, FiltertActions> = (
  state,
  action
): FilterState => {
  switch (action.type) {
    case "filterDate":
      return {
        ...state,
        params: {
          date: action.date?.format("YYYY-MM-DD") || filterInitial.params.date,
        },
      };
    case "filterRangeFrom":
      return {
        ...state,
        params: {
          dateTo: state.params.dateTo,
          dateFrom:
            action.date?.format("YYYY-MM-DD") || filterInitial.params.date,
        },
      };
    case "filterRangeTo":
      return {
        ...state,
        params: {
          dateTo:
            action.date?.format("YYYY-MM-DD") || filterInitial.params.date,
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
