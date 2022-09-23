import React, { useReducer, useState } from "react";
import { useCheckPermissions } from "@hooks/index";
import { CONTAINERS, PERMISSION_INSTANCES } from "@utils/constants";
import { LogBookList } from "./LogBookList";
import { LogBookFilter } from "./LogBookFilter";
import { CommonLayout } from "@components/shared";
import {
  reducerFilter,
  filterInitial,
} from "@components/modules/reports/signControl/SignInOutControlLogBookPage/SignInOutControlLogBookContainer.reducer";
import { usePresentUsersQuery } from "@components/modules/reports/signControl/SignInOutControlLogBookPage/SignInOutControlLogBookPage.hooks";
import { useQueryClient } from "@tanstack/react-query";

export const SignInOutControlLogBookPage = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState<boolean>(true);
  const [state, dispatch] = useReducer(reducerFilter, filterInitial);

  const presentUsersQuery = usePresentUsersQuery({
    params: state.params,
    enabled: search,
    disableSearch: () => setSearch(false),
  });
  const { data: users } = presentUsersQuery;

  const canFilter = useCheckPermissions([
    PERMISSION_INSTANCES.SIGN_IN_CONTROL.FILTER_LOG_BOOK,
  ]);

  const onSearch = () => {
    queryClient.removeQueries(["log-in-out-users"]);
    setSearch(true);
  };

  return (
    <CommonLayout title={CONTAINERS.SIGN_IN_OUT_LOG_BOOK_TITLE} canView>
      {canFilter && (
        <LogBookFilter
          searchText={state.params.search || ""}
          setSearchText={(text) => dispatch({ type: "setSearchText", text })}
          filterType={state.filterType}
          date={state.params.date || ""}
          dateFrom={state.params.dateFrom || ""}
          dateTo={state.params.dateTo || ""}
          onDateToChange={(date) => dispatch({ type: "filterRangeTo", date })}
          onDateFromChange={(date) =>
            dispatch({ type: "filterRangeFrom", date })
          }
          onDateChange={(date) => {
            dispatch({ type: "filterDate", date });
          }}
          onFilterTypeChange={(event) =>
            dispatch({ type: "changeFilterType", mode: event.target.value })
          }
          onSearch={onSearch}
        />
      )}
      <LogBookList list={users || []} />
    </CommonLayout>
  );
};
