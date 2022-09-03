import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchUsersForSignInSignOut, performSignIn } from "@api/signInControl";
import { ExtendedUser } from "@dto/users";
import { AxiosError } from "axios";
import { useNotifications } from "@hooks/index";
import { NOTIFICATION_MESSAGES } from "@utils/constants";

export const useAbsentUsersQuery = ({
  search,
  enabled,
}: {
  search: string;
  enabled: boolean;
}) => {
  const params = {
    search,
    is_active: true,
    extended_user__present: false,
  };
  return useQuery<ExtendedUser[], AxiosError>(
    ["absent-users", params],
    () => fetchUsersForSignInSignOut(params).then((response) => response.data),
    {
      staleTime: 5000,
      enabled,
    }
  );
};

export const useSignInMutation = ({
  onSuccessCallback,
  userFullName,
}: {
  onSuccessCallback?: () => void;
  userFullName: string;
}) => {
  const { createSuccessNotification, createErrorNotification } =
    useNotifications();
  return useMutation(
    (id: number) => performSignIn(id).then((response) => response.data),
    {
      onSuccess: (data) => {
        if (onSuccessCallback) onSuccessCallback();
        createSuccessNotification(
          `${NOTIFICATION_MESSAGES.SIGN_OUT_SUCCESSFUL_MESSAGE} ${data.fullName}`
        );
      },
      onError: () =>
        createErrorNotification(
          `${NOTIFICATION_MESSAGES.SIGN_OUT_FAILED_MESSAGE} ${userFullName}`
        ),
    }
  );
};
