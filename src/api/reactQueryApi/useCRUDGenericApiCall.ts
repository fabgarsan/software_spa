import { useQuery, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  createGenericApiCall,
  fetchAllGenericPaginationApiCall,
  deleteGenericApiCall,
  fetchGenericApiCall,
  patchGenericApiCall,
  fetchAllGenericApiCall,
} from "@api/reactQueryApi";
import { AxiosResponseListPaginationData } from "@dto/common";
import { InstancesDescriptorKeys, instancesDescriptor } from "@utils/index";

const buildTimeInSeconds = (seconds: number) => seconds * 1000;

type EditType<T> = { dataEdit: Partial<T>; id: number | string };

export const useReactQueryCRUDGenericApiCall = <T>(
  routeConstructor: InstancesDescriptorKeys | string
) => {
  let url = "";
  let cacheUrl = "";
  if (typeof routeConstructor === "string") {
    url = routeConstructor;
    cacheUrl = routeConstructor.replace("/", "");
  } else {
    const instanceDescriptor = instancesDescriptor[routeConstructor];
    url = instanceDescriptor?.apiRoute || "";
    cacheUrl = (instanceDescriptor?.apiRoute || "").replace("/", "");
  }
  const useDestroy = ({
    onSuccessCallBack,
  }: {
    onSuccessCallBack?: () => void;
  }) =>
    useMutation(
      (id: number | string) =>
        deleteGenericApiCall(url, id).then((res) => res.data),
      {
        onSuccess: () => {
          if (onSuccessCallBack) onSuccessCallBack();
        },
        onMutate: () => {},
      }
    );

  const useFetch = ({
    id,
    onSuccessCallBack,
  }: {
    id: number | string;
    onSuccessCallBack?: (data: T) => void;
  }) => {
    return useQuery<T, AxiosError>(
      [cacheUrl, id],
      () => fetchGenericApiCall<T>(url, id).then((res) => res.data),
      {
        onSuccess: (data) => {
          if (onSuccessCallBack) onSuccessCallBack(data);
        },
        enabled: !!id && id !== "",
        staleTime: 1000,
      }
    );
  };

  const useCreate = ({
    onSuccessCallBack,
  }: {
    onSuccessCallBack?: (data: T) => void;
  }) =>
    useMutation<T, AxiosError, T, () => void>(
      (dataCreate: T) =>
        createGenericApiCall<T>(url, dataCreate).then((res) => res.data),
      {
        onSuccess: (data) => {
          if (onSuccessCallBack) onSuccessCallBack(data);
        },
      }
    );

  const useEdit = ({
    onSuccessCallBack,
  }: {
    onSuccessCallBack?: (data: T) => void;
  }) =>
    useMutation<T, AxiosError, EditType<T>, () => void>(
      ({ dataEdit, id }: EditType<T>) =>
        patchGenericApiCall<T>(url, id, dataEdit).then((res) => res.data),
      {
        onSuccess: (data) => {
          if (onSuccessCallBack) onSuccessCallBack(data);
        },
      }
    );

  const useFetchAll = ({
    params,
    onSuccessCallBack,
    enabled = true,
  }: {
    params?: Record<string, unknown>;
    onSuccessCallBack?: (data: T[]) => void;
    enabled?: boolean;
  }) => {
    return useQuery<T[], AxiosError>(
      [cacheUrl, params],
      () => fetchAllGenericApiCall<T>(url, params).then((res) => res.data),
      {
        onSuccess: (data) => {
          if (onSuccessCallBack) onSuccessCallBack(data);
        },
        enabled,
      }
    );
  };

  const useFetchAllPagination = ({
    limit,
    offset,
    params,
    onSuccessCallBack,
    secondsToReFetch,
  }: {
    limit: number;
    secondsToReFetch?: number;
    offset: number;
    onSuccessCallBack: (data: AxiosResponseListPaginationData<T>) => void;
    params: Record<string, unknown>;
  }) => {
    return useQuery<AxiosResponseListPaginationData<T>, AxiosError>(
      [cacheUrl, limit, offset, params],
      () =>
        fetchAllGenericPaginationApiCall<T>(url, limit, offset, params).then(
          (res) => res.data
        ),
      {
        keepPreviousData: true,
        refetchInterval:
          (secondsToReFetch && buildTimeInSeconds(secondsToReFetch)) || false,
        onSuccess: (data) => onSuccessCallBack(data),
      }
    );
  };

  return {
    useFetchAllPagination,
    useFetchAll,
    useFetch,
    useCreate,
    useEdit,
    useDestroy,
  };
};
