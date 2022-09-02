import React from "react";
import { AxiosError } from "axios";
import type { UseQueryResult } from "@tanstack/react-query";

type QueryErrorBoundaryProps = {
  children: JSX.Element;
  queries?: UseQueryResult<unknown, AxiosError>[];
  showRefetchButton?: boolean;
  loadOnFetching?: boolean;
};

export const QueryErrorBoundary = ({
  showRefetchButton: canRefetch = false,
  loadOnFetching = false,
  children,
  queries,
}: QueryErrorBoundaryProps) => {
  const areLoadingQueries = queries?.some(
    ({ isLoading, fetchStatus }) => isLoading && fetchStatus !== "idle"
  );
  const areFetchingQueries =
    (loadOnFetching &&
      queries?.some(({ fetchStatus }) => fetchStatus === "fetching")) ||
    false;
  const hasErrorQueries = queries?.some(({ isError }) => isError);

  if (areLoadingQueries || areFetchingQueries) {
    return <div>Cargando...</div>;
  }

  if (hasErrorQueries) {
    const queriesWithError = queries?.filter(({ isError }) => isError);
    const defaultMessage = `Failed to fetch data for ${queriesWithError?.length} resources`;
    return (
      <div>
        <div>{defaultMessage}</div>
        {canRefetch && (
          <div>
            <div
              onClick={() => {
                queriesWithError?.forEach(({ refetch }) => refetch());
              }}
            >
              Refresh
            </div>
          </div>
        )}
      </div>
    );
  }

  return children;
};
