import React from "react";
import { AxiosError } from "axios";
import type { UseQueryResult, UseMutationResult } from "@tanstack/react-query";

type QueryErrorBoundaryProps = {
  children: JSX.Element;
  queries?: UseQueryResult<any, AxiosError>[];
  mutations?: UseMutationResult<any, AxiosError>[];
  showRefetchButton?: boolean;
};

export const QueryErrorBoundary = ({
  showRefetchButton: canRefetch = false,
  children,
  queries,
  mutations,
}: QueryErrorBoundaryProps) => {
  const areLoadingQueries = queries?.some(({ isLoading }) => isLoading);
  const hasErrorQueries = queries?.some(({ isError }) => isError);

  if (areLoadingQueries) {
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
