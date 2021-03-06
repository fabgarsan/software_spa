import React, { useEffect, useReducer, useState } from "react";
import { useCheckPermissions, useCRUDGenericApiCall } from "@hooks/index";
import {
  API_ROUTES,
  CONTAINERS,
  FORMATS,
  PERMISSION_INSTANCES,
} from "@utils/constants";
import { SignInControl } from "@dto/authentication";
import {
  CommonLayout,
  SignInOutControlLogBookFilter,
  SignInOutControlLogBookList,
} from "@components/index";
import {
  reducerFilter,
  filterInitial,
} from "@containers/SignInOutControlLogBookContainer/SignInOutControlLogBookContainer.reducer";
import { format } from "date-fns";

const SignInOutControlLogBookContainer = () => {
  const [state, dispatch] = useReducer(reducerFilter, filterInitial);
  const [data, setData] = useState<SignInControl[]>([]);
  const { fetchAll } = useCRUDGenericApiCall<SignInControl>(
    API_ROUTES.SIGN_IN_CONTROL
  );
  useEffect(() => {
    (async () => {
      const responseData = await fetchAll({
        date: format(new Date(), FORMATS.DATE_TIME_TO_SEND),
      });
      setData(responseData);
    })();
  }, [fetchAll]);

  const handleOnSearch = async () => {
    const responseData = await fetchAll(
      state.params as Record<string, unknown>
    );
    setData(responseData);
  };

  const canFilter = useCheckPermissions([
    PERMISSION_INSTANCES.SIGN_IN_CONTROL.FILTER_LOG_BOOK,
  ]);

  return (
    <CommonLayout title={CONTAINERS.SIGN_IN_OUT_LOG_BOOK_TITLE} canView>
      {canFilter && (
        <SignInOutControlLogBookFilter
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
          onSearch={handleOnSearch}
        />
      )}
      <SignInOutControlLogBookList list={data} />
    </CommonLayout>
  );
};

export default SignInOutControlLogBookContainer;
