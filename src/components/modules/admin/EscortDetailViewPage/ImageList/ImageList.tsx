import React from "react";
import "react-image-crop/dist/ReactCrop.css";
import { Box, Typography } from "@mui/material";
import { EscortImage } from "@dto/escorts";
import { Ratio } from "@components/shared/ImageCropper";
import { ImageListItem } from "../ImageListItem";
import { ImageCropper, BackdropLoading } from "@components/shared";
import { useReactQueryCRUDGenericApiCall } from "@api/reactQueryApi";
import { API_ROUTES } from "@utils/constants";
import { useUploadEscortImageMutation } from "@api/user";

interface ImageListProps {
  escortId: string | undefined;
}

const ASPECT_RATIOS_PROFILE: { [name: string]: Ratio } = {
  "2 / 3": { ratio: 2 / 3, minWidth: 350 },
};

const ASPECT_RATIOS: { [name: string]: Ratio } = {
  "2 / 3": { ratio: 2 / 3, minWidth: 700 },
  "3 / 2": { ratio: 3 / 2, minWidth: 1200 },
};
export const ImageList = ({ escortId }: ImageListProps) => {
  const { useFetchAll: fetchImagesQuery } =
    useReactQueryCRUDGenericApiCall<EscortImage>(API_ROUTES.ESCORT_IMAGES);
  const {
    data: imagesData,
    isLoading: imagesQueryIsLoading,
    refetch: refetchImageQuery,
  } = fetchImagesQuery({
    params: {
      extended_user__user_id: escortId,
      ordering: "-created",
    },
  });

  const galleryImages = imagesData?.filter((img) => img.type === "I");
  const profileImage = imagesData?.filter((img) => img.type === "P")[0];
  const {
    mutate: uploadEscortImageMutate,
    isLoading: uploadImageMutateIsLoading,
  } = useUploadEscortImageMutation({
    escortId,
    onSuccessCallBack: () => refetchImageQuery(),
  });

  return (
    <Box paddingLeft={2}>
      <BackdropLoading
        isOpen={imagesQueryIsLoading || uploadImageMutateIsLoading}
      />
      <Typography variant="h5">Imágenes Página Web</Typography>
      <Box paddingLeft={2}>
        <Typography variant="h6">Imágen de Perfil</Typography>
        <ImageCropper
          aspectRatios={ASPECT_RATIOS_PROFILE}
          saveMethod={(file) => uploadEscortImageMutate({ type: "P", file })}
        />
        <Box>
          {profileImage && (
            <ImageListItem
              escortImage={profileImage}
              refetchImage={refetchImageQuery}
            />
          )}
        </Box>
        <Box marginTop={1}>
          <Typography variant="h6">Imágenes de Galería</Typography>
          <Box>
            <ImageCropper
              aspectRatios={ASPECT_RATIOS}
              saveMethod={(file) =>
                uploadEscortImageMutate({ type: "I", file })
              }
            />
          </Box>
          {galleryImages && (
            <Box display="flex" flexWrap="wrap">
              {galleryImages.map((galleryImage) => (
                <ImageListItem
                  refetchImage={refetchImageQuery}
                  key={galleryImage.id}
                  escortImage={galleryImage}
                />
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
