import React, { useReducer, useState } from "react";
import { CONTAINERS } from "@utils/constants";
import { InvoiceTable } from "./InvoiceTable";
import { InvoiceFilter } from "./InvoiceFilter";
import { CommonLayout } from "@components/shared";
import {
  reducerFilter,
  filterInitial,
} from "@components/modules/reports/accounting/Invoices/InvoicePage.reducer";
import { useInvoicesQuery } from "@components/modules/reports/accounting/Invoices/InvoicePage.hooks";

export const InvoicePage = () => {
  const [search, setSearch] = useState<boolean>(true);
  const [state, dispatch] = useReducer(reducerFilter, filterInitial);

  const presentUsersQuery = useInvoicesQuery({
    params: state.params,
    enabled: search,
    disableSearch: () => setSearch(false),
  });
  const { data: invoices } = presentUsersQuery;

  const onSearch = () => {
    setSearch(true);
  };

  return (
    <CommonLayout title={CONTAINERS.REPORT_INVOICES} canView>
      <InvoiceFilter
        searchText={state.params.search || ""}
        setSearchText={(text) => dispatch({ type: "setSearchText", text })}
        filterType={state.filterType}
        date={state.params.date || ""}
        dateFrom={state.params.dateFrom || ""}
        dateTo={state.params.dateTo || ""}
        onDateToChange={(date) => dispatch({ type: "filterDateRangeTo", date })}
        onDateFromChange={(date) =>
          dispatch({ type: "filterDateRangeFrom", date })
        }
        onDateChange={(date) => {
          dispatch({ type: "filterDate", date });
        }}
        onFilterTypeChange={(event) =>
          dispatch({ type: "changeFilterType", mode: event.target.value })
        }
        onSearch={onSearch}
      />
      <InvoiceTable list={invoices || []} />
    </CommonLayout>
  );
};
