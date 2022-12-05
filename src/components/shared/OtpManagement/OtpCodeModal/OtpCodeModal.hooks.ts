import { useMemo } from "react";
import * as yup from "yup";
import { useYupValidationResolver } from "@hooks/index";
import { FORM_VALIDATIONS } from "@utils/index";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  AxiosDjangoSerializerDetailError,
  AxiosDjangoSerializerFormError,
} from "@dto/common";
import {
  createNewOptCode,
  CreateNewOptCodeRequest,
  generateNewOptCode,
  GenerateNewOptCodeResponse,
} from "@api/authenticator";
import { createNewOptCodeByUser, generateNewOptCodeByUser } from "@api/user";

export const useValidation = () => {
  const validationSchema = useMemo(
    () =>
      yup.object({
        token: yup
          .string()
          .max(6, "El token debe ser de 6 dígitos")
          .min(6, "El token debe ser de 6 dígitos")
          .required(FORM_VALIDATIONS.REQUIRED_FIELD),
      }),
    []
  );
  return useYupValidationResolver(validationSchema);
};

export const useGenerateNewOTPCurrentUserQuery = ({
  enabled,
}: {
  enabled: boolean;
}) =>
  useQuery<GenerateNewOptCodeResponse, AxiosDjangoSerializerDetailError>(
    ["generated-otp-code"],
    () => generateNewOptCode().then((res) => res.data),
    {
      cacheTime: 0,
      enabled,
    }
  );

export const useGenerateNewOTPByUserQuery = ({
  userId,
  enabled,
}: {
  userId: number;
  enabled: boolean;
}) =>
  useQuery<GenerateNewOptCodeResponse, AxiosDjangoSerializerDetailError>(
    ["generated-otp-code"],
    () => generateNewOptCodeByUser(userId).then((res) => res.data),
    {
      cacheTime: 0,
      enabled,
    }
  );

export const useGenerateNewOTPQuery = (userId?: number) => {
  const generateNewOTPCurrentUserQuery = useGenerateNewOTPCurrentUserQuery({
    enabled: !userId,
  });
  const generateNewOTPQuery = useGenerateNewOTPByUserQuery({
    userId: userId || 0,
    enabled: !!userId,
  });
  if (userId) return generateNewOTPQuery;
  return generateNewOTPCurrentUserQuery;
};

export const useCreateNewOTPCurrentUserMutation = ({
  onSuccessCallBack,
}: {
  onSuccessCallBack?: () => void;
}) =>
  useMutation<
    void,
    AxiosDjangoSerializerFormError<{ token: string }>,
    CreateNewOptCodeRequest
  >(
    (data: CreateNewOptCodeRequest) =>
      createNewOptCode(data).then((res) => res.data),
    {
      onSuccess: () => {
        if (onSuccessCallBack) onSuccessCallBack();
      },
    }
  );

export const useCreateNewOTPByUserMutation = ({
  userId,
  onSuccessCallBack,
}: {
  onSuccessCallBack?: () => void;
  userId?: number;
}) =>
  useMutation<
    void,
    AxiosDjangoSerializerFormError<{ token: string }>,
    CreateNewOptCodeRequest
  >(
    (data: CreateNewOptCodeRequest) =>
      createNewOptCodeByUser(userId || 0, data).then((res) => res.data),
    {
      onSuccess: () => {
        if (onSuccessCallBack) onSuccessCallBack();
      },
    }
  );
