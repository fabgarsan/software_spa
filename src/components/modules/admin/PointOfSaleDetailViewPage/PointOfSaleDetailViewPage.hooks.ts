import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  addAuthorizedUserToPointOfSaleId,
  fetchPointOfSaleById,
  GetPointOfSale,
  removeAuthorizedUserToPointOfSaleId,
} from "@api/pointOfSale";
import { fetchEmployees } from "@api/user";
import { ExtendedUser } from "@dto/users";

export const usePointOfSaleByIdQuery = (id: number) => {
  return useQuery<GetPointOfSale, AxiosError>(
    ["points-of-sale", id],
    () => fetchPointOfSaleById(id).then((response) => response.data),
    {
      staleTime: 2000,
    }
  );
};

export const useActiveEmployeeUsersQuery = () => {
  return useQuery<ExtendedUser[], AxiosError>(
    ["employees", "active"],
    () =>
      fetchEmployees({ params: { isActive: true } }).then(
        (response) => response.data
      ),
    {
      staleTime: 2000,
    }
  );
};

export const useAddAuthorizedEmployeeMutation = ({
  pointOfSaleId,
  onSuccessCallBack,
}: {
  pointOfSaleId: number;
  onSuccessCallBack?: () => void;
}) =>
  useMutation(
    (employeeId: number) =>
      addAuthorizedUserToPointOfSaleId({ employeeId, pointOfSaleId }).then(
        (res) => res.data
      ),
    {
      onSuccess: () => {
        if (onSuccessCallBack) onSuccessCallBack();
      },
    }
  );

export const useRemoveAuthorizedEmployeeMutation = ({
  pointOfSaleId,
  onSuccessCallBack,
}: {
  pointOfSaleId: number;
  onSuccessCallBack?: () => void;
}) =>
  useMutation(
    (employeeId: number) =>
      removeAuthorizedUserToPointOfSaleId({ employeeId, pointOfSaleId }).then(
        (res) => res.data
      ),
    {
      onSuccess: () => {
        if (onSuccessCallBack) onSuccessCallBack();
      },
    }
  );
