import React, { useReducer, useState } from "react";
import { CONTAINERS } from "@utils/constants";
import { HistoryTable } from "./HistoryTable";
import { HistoryFilter } from "./HistoryFilter";
import { CommonLayout } from "@components/shared";
import {
  reducerFilter,
  filterInitial,
} from "@components/modules/reports/signControl/SignInOutControlLogBookPage/SignInOutControlLogBookContainer.reducer";
import { useParkingServicesQuery } from "@components/modules/reports/services/parkingServices/HistoryPage/HistoryPage.hooks";

export const HistoryPage = () => {
  const [search, setSearch] = useState<boolean>(true);
  const [state, dispatch] = useReducer(reducerFilter, filterInitial);
  console.log(state.params, "LOS PARAMETROS");

  const presentUsersQuery = useParkingServicesQuery({
    params: state.params,
    enabled: search,
    disableSearch: () => setSearch(false),
  });
  const { data: services } = presentUsersQuery;

  const onSearch = () => {
    setSearch(true);
  };

  return (
    <CommonLayout title={CONTAINERS.SIGN_IN_OUT_LOG_BOOK_TITLE} canView>
      <HistoryFilter
        searchText={state.params.search || ""}
        setSearchText={(text) => dispatch({ type: "setSearchText", text })}
        filterType={state.filterType}
        date={state.params.date || ""}
        dateFrom={state.params.dateFrom || ""}
        dateTo={state.params.dateTo || ""}
        onDateToChange={(date) => dispatch({ type: "filterRangeTo", date })}
        onDateFromChange={(date) => dispatch({ type: "filterRangeFrom", date })}
        onDateChange={(date) => {
          dispatch({ type: "filterDate", date });
        }}
        onFilterTypeChange={(event) =>
          dispatch({ type: "changeFilterType", mode: event.target.value })
        }
        onSearch={onSearch}
      />
      <HistoryTable list={services || []} />
    </CommonLayout>
  );
};
