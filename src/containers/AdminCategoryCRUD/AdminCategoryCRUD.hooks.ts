import { useCallback } from "react";
import {
  createEscortCategory,
  fetchEscortCategories,
  deleteEscortCategory,
  fetchEscortCategory,
  editEscortCategory,
} from "@api/escortCategory";
import { trackPromise } from "react-promise-tracker";

const useAdminCategoryCRUDApi = () => {
  const destroy = async (id: number | string) => {
    const response = await trackPromise(deleteEscortCategory(id));
    return response.data;
  };
  const fetch = async <T>(id: number | string) => {
    const response = await trackPromise(fetchEscortCategory<T>(id));
    return response.data;
  };
  const create = async <T>(dataCreate: T) => {
    const response = await trackPromise(createEscortCategory<T>(dataCreate));
    return response.data;
  };
  const edit = async <T>(id: number | string, dataCreate: T) => {
    const response = await trackPromise(editEscortCategory<T>(id, dataCreate));
    return response.data;
  };

  const fetchAll = useCallback(async <T>(limit: number, offset: number) => {
    const response = await trackPromise(
      fetchEscortCategories<T>(limit, offset)
    );
    return response.data;
  }, []);

  return {
    create,
    fetchAll,
    fetch,
    edit,
    destroy,
  };
};

export default useAdminCategoryCRUDApi;
