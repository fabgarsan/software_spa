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

type AllowedMethods =
  | "create"
  | "delete"
  | "fetchAll"
  | "fetchAllPagination"
  | "edit"
  | "fetch";

interface Method {
  method: AllowedMethods;
  trackPromise?: boolean;
}

interface Config {
  methods: Method[];
}

// const getConfiguration = (
//   lookedMethod: AllowedMethods,
//   config: Config
// ): Method => {
//   const functionConfig = config.methods.filter(
//     (option) => option.method === lookedMethod
//   );
//   return functionConfig && functionConfig[0];
// };

const setTrackPromise = <T>(
  promise: Promise<T>,
  hasTracking = true
): Promise<T> => {
  if (hasTracking) {
    return trackPromise(promise);
  }
  return promise;
};

// const hasConfig = (method: AllowedMethods, config: Config): boolean =>
//   config.methods.map((m) => m.method).includes(method);

const useCRUDGenericApiCall = <T>(url: string, config?: Config) => {
  // const deleteConfig = getConfiguration("delete", config);
  // const fetchConfig = getConfiguration("fetch", config);
  // const createConfig = getConfiguration("create", config);
  // const editConfig = getConfiguration("edit", config);
  // const fetchAllPaginationConfig = getConfiguration(
  //   "fetchAllPagination",
  //   config
  // );

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

  const edit = async (id: number | string, dataCreate: T) => {
    const response = await setTrackPromise(
      editGenericApiCall<T>(url, id, dataCreate)
    );
    return response.data;
  };
  const fetchAllPagination = useCallback(
    async (limit: number, offset: number, params: any) => {
      const response = await setTrackPromise(
        fetchAllGenericPaginationApiCall<T>(url, limit, offset, params)
      );
      return response.data;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [url]
  );
  const fetchAll = useCallback(
    async (params?: any) => {
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
