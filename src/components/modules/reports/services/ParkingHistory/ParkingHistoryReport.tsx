import React, { useReducer, useState } from "react";
import { CONTAINERS } from "@utils/constants";
import { ParkingHistoryTable } from "./ParkingHistoryTable";
import { ParkingHistoryFilter } from "./ParkingHistoryFilter";
import { CommonLayout } from "@components/shared";
import {
  reducerFilter,
  filterInitial,
} from "@components/modules/reports/signControl/SignInOutControlLogBookPage/SignInOutControlLogBookContainer.reducer";
import { useParkingServicesQuery } from "@components/modules/reports/services/ParkingHistory/ParkingHistoryReport.hooks";

export const ParkingHistoryReport = () => {
  const [search, setSearch] = useState<boolean>(true);
  const [state, dispatch] = useReducer(reducerFilter, filterInitial);

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
    <CommonLayout title={CONTAINERS.REPORT_SIGN_IN_OUT_LOG_BOOK_TITLE} canView>
      <ParkingHistoryFilter
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
      <ParkingHistoryTable list={services || []} />
    </CommonLayout>
  );
};
