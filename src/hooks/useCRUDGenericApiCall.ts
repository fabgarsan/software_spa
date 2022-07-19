import { useCallback } from "react";
import {
  createGenericApiCall,
  fetchAllGenericPaginationApiCall,
  deleteGenericApiCall,
  fetchGenericApiCall,
  editGenericApiCall,
  fetchAllGenericApiCall,
} from "@api/index";
import { trackPromise } from "react-promise-tracker";

const setTrackPromise = <T>(
  promise: Promise<T>,
  hasTracking = true
): Promise<T> => (hasTracking && trackPromise(promise)) || promise;

const useCRUDGenericApiCall = <T>(url: string) => {
  const destroy = async (id: number | string) => {
    const response = await setTrackPromise(deleteGenericApiCall(url, id));
    return response.data;
  };

  const fetch = async (id: number | string) => {
    const response = await setTrackPromise(fetchGenericApiCall<T>(url, id));
    return response.data;
  };

  const create = async (dataCreate: T) => {
    const response = await setTrackPromise(
      createGenericApiCall<T>(url, dataCreate)
    );
    return response.data;
  };

  const edit = async (id: number | string, dataCreate: Partial<T>) => {
    const response = await setTrackPromise(
      editGenericApiCall<T>(url, id, dataCreate)
    );
    return response.data;
  };

  const fetchAllPagination = useCallback(
    async (limit: number, offset: number, params: Record<string, unknown>) => {
      const response = await setTrackPromise(
        fetchAllGenericPaginationApiCall<T>(url, limit, offset, params)
      );
      return response.data;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [url]
  );
  const fetchAll = useCallback(
    async (params?: Record<string, unknown>) => {
      const response = await setTrackPromise(
        fetchAllGenericApiCall<T>(url, params)
      );
      return response.data;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [url]
  );

  return {
    create,
    fetchAllPagination,
    fetch,
    edit,
    destroy,
    fetchAll,
  };
};

export default useCRUDGenericApiCall;
