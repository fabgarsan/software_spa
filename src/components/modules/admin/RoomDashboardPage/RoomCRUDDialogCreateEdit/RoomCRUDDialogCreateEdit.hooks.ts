import { useMemo } from "react";
import * as yup from "yup";
import { useYupValidationResolver } from "@hooks/index";
import { FORM_VALIDATIONS } from "@utils/index";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { fetchRoomTypes } from "@api/room";
import { RoomType } from "@dto/room";
import { fetchCompanies } from "@api/company";
import { Company } from "@dto/companies";

const useDialogCreateEditCRUDValidation = () => {
  const validationSchema = useMemo(
    () =>
      yup.object({
        roomType: yup.string().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        company: yup.string().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        number: yup.number().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        isActive: yup.boolean(),
      }),
    []
  );
  return useYupValidationResolver(validationSchema);
};

export const useRoomTypesQuery = () => {
  return useQuery<RoomType[], AxiosError>(
    ["room-types"],
    () => fetchRoomTypes().then((response) => response.data),
    {
      staleTime: 5000,
    }
  );
};

export const useCompaniesQuery = () => {
  return useQuery<Company[], AxiosError>(
    ["companies"],
    () => fetchCompanies().then((response) => response.data),
    {
      staleTime: 5000,
    }
  );
};

export default useDialogCreateEditCRUDValidation;
