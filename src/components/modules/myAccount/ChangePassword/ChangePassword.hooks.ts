import { useMutation } from "@tanstack/react-query";
import { AxiosDjangoSerializerFormError } from "@dto/common";
import {
  changePasswordCurrentUser,
  ChangePasswordCurrentUserRequest,
} from "@api/user";
import { useMemo } from "react";
import * as yup from "yup";
import { FORM_VALIDATIONS } from "@utils/constantsUI";
import { useYupValidationResolver } from "@hooks/index";
import { createNotification } from "@stores/notificationSlice";
import store from "@stores/store";

export const useValidation = () => {
  const validationSchema = useMemo(
    () =>
      yup.object({
        oldPassword: yup.string().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        newPassword: yup.string().required(FORM_VALIDATIONS.REQUIRED_FIELD),
        newPasswordConfirmation: yup
          .string()
          .equals(
            [yup.ref("newPassword")],
            "El contraseña de confirmación is differente al contraseña"
          )
          .required(FORM_VALIDATIONS.REQUIRED_FIELD),
      }),
    []
  );
  return useYupValidationResolver(validationSchema);
};

export const useCreateParkingServiceMutation = ({
  onSuccessCallBack,
}: {
  onSuccessCallBack?: () => void;
}) =>
  useMutation<
    void,
    AxiosDjangoSerializerFormError<ChangePasswordCurrentUserRequest>,
    ChangePasswordCurrentUserRequest
  >(
    (data: ChangePasswordCurrentUserRequest) =>
      changePasswordCurrentUser(data).then((res) => res),
    {
      onSuccess: () => {
        if (onSuccessCallBack) onSuccessCallBack();
        store.dispatch(
          createNotification({
            message: `Cambio de password exitoso`,
            severity: "success",
            time: 5000,
          })
        );
      },
    }
  );
