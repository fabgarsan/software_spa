import { useMemo } from "react";
import * as yup from "yup";
import { useYupValidationResolver } from "@hooks/index";
import { FORM_VALIDATIONS } from "@utils/index";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { fetchVehicleTypes } from "@api/parking";
import { VehicleType } from "@dto/parking";

export const useValidation = () => {
  const validationSchema = useMemo(
    () =>
      yup.object({
        name: yup.string().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        timeFrom: yup.date().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        timeTo: yup.date().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        vehicleType: yup.number().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        monday: yup.boolean(),
        tuesday: yup.boolean(),
        wednesday: yup.boolean(),
        thursday: yup.boolean(),
        friday: yup.boolean(),
        saturday: yup.boolean(),
        sunday: yup.boolean(),
      }),
    []
  );
  return useYupValidationResolver(validationSchema);
};

export const useVehiclesTypesQuery = () => {
  return useQuery<VehicleType[], AxiosError>(
    ["vehicle-types"],
    () => fetchVehicleTypes().then((response) => response.data),
    {
      staleTime: 2000,
    }
  );
};
