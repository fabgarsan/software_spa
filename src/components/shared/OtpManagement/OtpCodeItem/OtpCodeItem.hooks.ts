import { useMutation } from "@tanstack/react-query";
import { deleteOptCode } from "@api/authenticator";

export const useDeleteOTPCodeMutation = ({
  onSuccessCallBack,
}: {
  onSuccessCallBack?: () => void;
}) =>
  useMutation((id: number) => deleteOptCode(id).then((res) => res.data), {
    onSuccess: () => {
      if (onSuccessCallBack) onSuccessCallBack();
    },
  });
