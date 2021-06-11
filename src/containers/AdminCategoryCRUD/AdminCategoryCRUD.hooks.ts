import { useCallback } from "react";
import {
  createGenericApiCall,
  fetchAllGenericPaginationApiCall,
  deleteGenericApiCall,
  fetchGenericApiCall,
  editGenericApiCall,
} from "@api/index";
import { EscortCategory } from "@dbTypes/escorts";
import { trackPromise } from "react-promise-tracker";
import { API_ROUTES } from "@utils/index";

const useAdminCategoryCRUDApi = () => {
  const destroy = async (id: number | string) => {
    const response = await trackPromise(
      deleteGenericApiCall(API_ROUTES.ESCORT_CATEGORY, id)
    );
    return response.data;
  };
  const fetch = async (id: number | string) => {
    const response = await trackPromise(
      fetchGenericApiCall<EscortCategory>(API_ROUTES.ESCORT_CATEGORY, id)
    );
    return response.data;
  };
  const create = async (dataCreate: EscortCategory) => {
    const response = await trackPromise(
      createGenericApiCall<EscortCategory>(
        API_ROUTES.ESCORT_CATEGORY,
        dataCreate
      )
    );
    return response.data;
  };
  const edit = async (id: number | string, dataCreate: EscortCategory) => {
    const response = await trackPromise(
      editGenericApiCall<EscortCategory>(
        API_ROUTES.ESCORT_CATEGORY,
        id,
        dataCreate
      )
    );
    return response.data;
  };

  const fetchAll = useCallback(async (limit: number, offset: number) => {
    const response = await trackPromise(
      fetchAllGenericPaginationApiCall<EscortCategory>(
        API_ROUTES.ESCORT_CATEGORY,
        limit,
        offset
      )
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
