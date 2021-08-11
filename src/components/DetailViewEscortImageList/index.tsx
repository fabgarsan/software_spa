import React from "react";
import "react-image-crop/dist/ReactCrop.css";
import { Box, Typography } from "@material-ui/core";
import { EscortImage } from "@dbTypes/index";
import { Ratio } from "@components/ImageCropper";
import { ImageCropper, DetailViewEscortImageListItem } from "@components/index";

interface DetailViewEscortImageProps {
  uploadImage: (file: Blob) => void;
  deleteImage: (imageId: number) => void;
  setPublished: (imageId: number, publishedWeb: boolean) => void;
  images: EscortImage[];
}

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
  return (
    <Box paddingLeft={2}>
      <Typography variant="h6">Imágenes Página Web</Typography>
      <ImageCropper
        aspectRatios={ASPECT_RATIOS}
        saveMethod={(blob) => uploadImage(blob)}
      />
      {images && (
        <Box display="flex" flexWrap="wrap">
          {images.map(
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
  );
};

export default DetailViewEscortImageList;
