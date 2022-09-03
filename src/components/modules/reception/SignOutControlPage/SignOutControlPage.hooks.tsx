import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchUsersForSignInSignOut, performSignOut } from "@api/signInControl";
import { AxiosError } from "axios";
import { useNotifications } from "@hooks/index";
import { NOTIFICATION_MESSAGES } from "@utils/constants";
import { ExtendedUser } from "@dto/users";

export const usePresentUsersQuery = () => {
  const params = {
    extended_user__present: true,
  };
  return useQuery<ExtendedUser[], AxiosError>(
    ["absent-users", params],
    () => fetchUsersForSignInSignOut(params).then((response) => response.data),
    {
      staleTime: 1000,
      refetchInterval: 1000 * 30,
    }
  );
};

export const useSignOutMutation = ({
  onSuccessCallback,
  userFullName,
}: {
  onSuccessCallback?: () => void;
  userFullName: string;
}) => {
  const { createSuccessNotification, createErrorNotification } =
    useNotifications();
  return useMutation(
    (id: number) => performSignOut(id).then((response) => response.data),
    {
      onSuccess: (data) => {
        if (onSuccessCallback) onSuccessCallback();
        createSuccessNotification(
          `${NOTIFICATION_MESSAGES.SIGN_IN_SUCCESSFUL_MESSAGE} ${data.fullName}`
        );
      },
      onError: () =>
        createErrorNotification(
          `${NOTIFICATION_MESSAGES.SIGN_IN_FAILED_MESSAGE} ${userFullName}`
        ),
    }
  );
};
