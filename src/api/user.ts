import { mainAxiosClientManager } from "@clients/index";
import { API_ROUTES } from "@utils/index";
import { useMutation } from "@tanstack/react-query";

const { client } = mainAxiosClientManager;

export const useAddEscortServiceMutation = ({
  escortId,
  onSuccessCallBack,
}: {
  escortId: string;
  onSuccessCallBack?: () => void;
}) =>
  useMutation(
    (serviceId: number) =>
      client
        .put(`${API_ROUTES.USER}${escortId}/services/`, { serviceId })
        .then((res) => res.data),
    {
      onSuccess: () => {
        if (onSuccessCallBack) onSuccessCallBack();
      },
    }
  );

export const useRemoveEscortServiceMutation = ({
  escortId,
  onSuccessCallBack,
}: {
  escortId: string;
  onSuccessCallBack?: () => void;
}) =>
  useMutation(
    (serviceId: number) =>
      client
        .delete(`${API_ROUTES.USER}${escortId}/services/${serviceId}`)
        .then((res) => res.data),
    {
      onSuccess: () => {
        if (onSuccessCallBack) onSuccessCallBack();
      },
    }
  );

export const useUploadEscortImageMutation = ({
  escortId,
  onSuccessCallBack,
}: {
  escortId: string | undefined;
  onSuccessCallBack?: () => void;
}) =>
  useMutation(
    ({ file, type }: { file: Blob; type: "I" | "P" }) => {
      const data = new FormData();
      const extension = file.type.split("/").slice(-1);
      data.append("image", file, `prueba.${extension}`);
      data.append("type", type);
      return client.post(
        `${API_ROUTES.USER}${escortId}/upload-escort-image/`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    {
      onSuccess: () => {
        if (onSuccessCallBack) onSuccessCallBack();
      },
    }
  );
