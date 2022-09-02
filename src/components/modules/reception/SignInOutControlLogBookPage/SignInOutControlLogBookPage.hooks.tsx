import { useQuery } from "@tanstack/react-query";
import {
  fetchSignInOutLogs,
  FetchSignInOutLogsParams,
} from "@api/signInControl";
import { AxiosError } from "axios";
import { SignInControl } from "@dto/authentication";

export const usePresentUsersQuery = ({
  params,
  enabled,
  disableSearch,
}: {
  params: FetchSignInOutLogsParams;
  enabled: boolean;
  disableSearch: () => void;
}) => {
  return useQuery<SignInControl[], AxiosError>(
    ["log-in-out-users", params],
    () => fetchSignInOutLogs(params).then((response) => response.data),
    {
      staleTime: 1000,
      refetchInterval: 1000 * 30,
      enabled,
      onSuccess: () => {
        if (disableSearch) disableSearch();
      },
      onError: () => disableSearch(),
    }
  );
};
