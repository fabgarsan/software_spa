import React from "react";
import "react-image-crop/dist/ReactCrop.css";
import { Box, Typography } from "@material-ui/core";
import { EscortImage } from "../../dto/index";
import { Ratio } from "@components/ImageCropper";
import { ImageCropper, DetailViewEscortImageListItem } from "@components/index";

interface DetailViewEscortImageProps {
  uploadImage: (file: Blob, imageType: "I" | "P") => void;
  deleteImage: (imageId: number) => void;
  setPublished: (imageId: number, publishedWeb: boolean) => void;
  images: EscortImage[];
}

const ASPECT_RATIOS_PROFILE: { [name: string]: Ratio } = {
  "2 / 3": { ratio: 2 / 3, minWidth: 350 },
};

const ASPECT_RATIOS: { [name: string]: Ratio } = {
  "2 / 3": { ratio: 2 / 3, minWidth: 700 },
  "3 / 2": { ratio: 3 / 2, minWidth: 1200 },
};
const DetailViewEscortImageList = ({
  images,
  uploadImage,
  setPublished,
  deleteImage,
}: DetailViewEscortImageProps) => {
  const galleryImages = images.filter((img) => img.type === "I");
  const profileImage = images.filter((img) => img.type === "P")[0];
  return (
    <Box paddingLeft={2}>
      <Typography variant="h5">Imágenes Página Web</Typography>
      <Box paddingLeft={2}>
        <Typography variant="h6">Imágen de Perfil</Typography>
        <ImageCropper
          aspectRatios={ASPECT_RATIOS_PROFILE}
          saveMethod={(blob) => uploadImage(blob, "P")}
        />
        <Box>
          {profileImage && (
            <DetailViewEscortImageListItem
              created={profileImage.created.toString()}
              path={profileImage.image}
              altTextEng={profileImage.altTextEng}
              altText={profileImage.altText}
              imageId={profileImage.id}
              deleteImage={deleteImage}
              publishedWeb={profileImage.publishedWeb}
              setPublished={setPublished}
            />
          )}
        </Box>
        <Box marginTop={1}>
          <Typography variant="h6">Imágenes de Galería</Typography>
          <Box>
            <ImageCropper
              aspectRatios={ASPECT_RATIOS}
              saveMethod={(blob) => uploadImage(blob, "I")}
            />
          </Box>
          {galleryImages && (
            <Box display="flex" flexWrap="wrap">
              {galleryImages.map(
                ({ image, id, created, altTextEng, altText, publishedWeb }) => (
                  <DetailViewEscortImageListItem
                    key={id}
                    created={created.toString()}
                    path={image}
                    altTextEng={altTextEng}
                    altText={altText}
                    imageId={id}
                    deleteImage={deleteImage}
                    publishedWeb={publishedWeb}
                    setPublished={setPublished}
                  />
                )
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DetailViewEscortImageList;
