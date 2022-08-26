import React from "react";
import { AxiosError } from "axios";
import type { UseQueryResult } from "@tanstack/react-query";

type QueryErrorBoundaryProps = {
  children: JSX.Element;
  queries: UseQueryResult<any, AxiosError>[];
  showRefetchButton?: boolean;
};

export const QueryErrorBoundary = ({
  showRefetchButton: canRefetch = false,
  children,
  queries,
}: QueryErrorBoundaryProps) => {
  const areLoading = queries.some(({ isLoading }) => isLoading);
  const hasError = queries.some(({ isError }) => isError);

  if (areLoading) {
    return <div>Loading</div>;
  }

  if (hasError) {
    const queriesWithError = queries.filter(({ isError }) => isError);
    const defaultMessage = `Failed to fetch data for ${queriesWithError.length} resources`;
    return (
      <div>
        <div>{defaultMessage}</div>
        {canRefetch && (
          <div>
            <div
              onClick={() => {
                queriesWithError.forEach(({ refetch }) => refetch());
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
