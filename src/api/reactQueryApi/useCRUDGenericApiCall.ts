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
import {
  AxiosDjangoSerializerFormError,
  AxiosResponseListPaginationData,
} from "@dto/common";
import { InstancesDescriptorKeys, instancesDescriptor } from "@utils/index";

const buildTimeInSeconds = (seconds: number) => seconds * 1000;

type EditType<T> = { dataEdit: Partial<T>; id: number | string };

export const useReactQueryCRUDGenericApiCall = <
  DataType,
  ApiResponseDataType = DataType,
  ApiRequestCreateDataType = DataType,
  ApiRequestEditDataType = DataType
>(
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
    useMutation<
      ApiResponseDataType,
      AxiosDjangoSerializerFormError<ApiResponseDataType>,
      number | string
    >(
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
    onSuccessCallBack?: (data: ApiResponseDataType) => void;
  }) => {
    return useQuery<ApiResponseDataType, AxiosError>(
      [cacheUrl, id],
      () =>
        fetchGenericApiCall<ApiResponseDataType>(url, id).then(
          (res) => res.data
        ),
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
    onSuccessCallBack?: (data: ApiResponseDataType) => void;
  }) =>
    useMutation<
      ApiResponseDataType,
      AxiosDjangoSerializerFormError<ApiRequestCreateDataType>,
      ApiRequestCreateDataType,
      () => void
    >(
      (dataCreate: ApiRequestCreateDataType) =>
        createGenericApiCall<ApiRequestCreateDataType, ApiResponseDataType>(
          url,
          dataCreate
        ).then((res) => res.data),
      {
        onSuccess: (data) => {
          if (onSuccessCallBack) onSuccessCallBack(data);
        },
      }
    );

  const useEdit = ({
    onSuccessCallBack,
  }: {
    onSuccessCallBack?: (data: ApiResponseDataType) => void;
  }) =>
    useMutation<
      ApiResponseDataType,
      AxiosDjangoSerializerFormError<ApiRequestEditDataType>,
      EditType<ApiRequestEditDataType>,
      () => void
    >(
      ({ dataEdit, id }: EditType<ApiRequestEditDataType>) =>
        patchGenericApiCall<ApiRequestEditDataType, ApiResponseDataType>(
          url,
          id,
          dataEdit
        ).then((res) => res.data),
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
    onSuccessCallBack?: (data: ApiResponseDataType[]) => void;
    enabled?: boolean;
  }) => {
    return useQuery<ApiResponseDataType[], AxiosError>(
      [cacheUrl, params],
      () =>
        fetchAllGenericApiCall<ApiResponseDataType>(url, params).then(
          (res) => res.data
        ),
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
    onSuccessCallBack: (
      data: AxiosResponseListPaginationData<ApiResponseDataType>
    ) => void;
    params: Record<string, unknown>;
  }) => {
    return useQuery<
      AxiosResponseListPaginationData<ApiResponseDataType>,
      AxiosError
    >(
      [cacheUrl, limit, offset, params],
      () =>
        fetchAllGenericPaginationApiCall<ApiResponseDataType>(
          url,
          limit,
          offset,
          params
        ).then((res) => res.data),
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
