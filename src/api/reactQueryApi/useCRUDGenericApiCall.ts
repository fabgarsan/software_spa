import { useQuery, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  createGenericApiCall,
  fetchAllGenericPaginationApiCall,
  deleteGenericApiCall,
  fetchGenericApiCall,
  editGenericApiCall,
  fetchAllGenericApiCall,
} from "@api/reactQueryApi";
import { AxiosResponseListPaginationData } from "@dto/common";
import { InstancesDescriptorKeys, instancesDescriptor } from "@utils/index";

const buildTimeInSeconds = (seconds: number) => seconds * 1000;

export const useReactQueryCRUDGenericApiCall = <T>(
  descriptorKey: InstancesDescriptorKeys
) => {
  const instanceDescriptor = instancesDescriptor[descriptorKey];
  const url = instanceDescriptor?.apiRoute || "";
  const cacheUrl = (instanceDescriptor?.apiRoute || "").replace("/", "");
  const useDestroy = (onSuccessCallBack: () => void) =>
    useMutation(
      (id: number | string) =>
        deleteGenericApiCall(url, id).then((res) => res.data),
      {
        onSuccess: () => {
          onSuccessCallBack();
        },
        onMutate: () => {},
      }
    );

  const useFetch = (
    id: number | string,
    onSuccessCallBack: (data: T) => void
  ) => {
    return useQuery<T, AxiosError>(
      [cacheUrl, id],
      () => fetchGenericApiCall<T>(url, id).then((res) => res.data),
      {
        onSuccess: (data) => {
          onSuccessCallBack(data);
        },
        enabled: !!id && id !== "",
        staleTime: 1,
      }
    );
  };

  const useCreate = (onSuccessCallBack: (data: T) => void) =>
    useMutation<T, AxiosError, T, () => void>(
      (dataCreate: T) =>
        createGenericApiCall<T>(url, dataCreate).then((res) => res.data),
      {
        onSuccess: (data) => {
          onSuccessCallBack(data);
        },
      }
    );

  const useEdit = ({
    id,
    onSuccessCallBack,
  }: {
    id: number | string;
    onSuccessCallBack: (data: T) => void;
  }) =>
    useMutation<T, AxiosError, T, () => void>(
      (dataEdit: Partial<T>) =>
        editGenericApiCall<T>(url, id, dataEdit).then((res) => res.data),
      {
        onSuccess: (data) => {
          onSuccessCallBack(data);
        },
      }
    );

  const useFetchAll = (params?: Record<string, unknown>) => {
    return useQuery<T[], AxiosError>([cacheUrl, params], () =>
      fetchAllGenericApiCall<T>(url, params).then((res) => res.data)
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
