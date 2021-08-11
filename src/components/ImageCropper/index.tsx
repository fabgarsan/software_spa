import React, { useCallback, useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import Compressor from "compressorjs";
import { trackPromise } from "react-promise-tracker";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@material-ui/core";

const savePhoto = async (
  img: HTMLImageElement | null,
  completedCrop: ReactCrop.Crop | undefined,
  onSavePhoto: (blob: Blob) => void,
  finalHeight: number,
  finalWidth: number
) => {
  const outputImage = document.createElement("canvas");
  if (img) {
    const ctx = outputImage.getContext("2d");
    const pixelRatio = window.devicePixelRatio;
    if (ctx) {
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = "high";
      const scaleX = img.naturalWidth / img.width;
      const scaleY = img.naturalHeight / img.height;

      const sx = (completedCrop?.x || 0) * scaleX;
      const sy = (completedCrop?.y || 0) * scaleY;

      const realCropWidth = (completedCrop?.width || 0) * scaleX;
      const realCropHeight = (completedCrop?.height || 0) * scaleY;
      outputImage.width = finalWidth;
      outputImage.height = finalHeight;
      ctx.drawImage(
        img,
        sx,
        sy,
        realCropWidth,
        realCropHeight,
        0,
        0,
        finalWidth,
        finalHeight
      );
      await outputImage.toBlob(
        async (blob: Blob | null) => {
          if (blob) {
            /* eslint-disable no-new */
            new Compressor(blob, {
              quality: 0.9,
              success: async (compressedResult) => {
                await onSavePhoto(compressedResult);
              },
            });
          }
        },
        "image/jpeg",
        1
      );
    }
  }
};

export type Ratio = {
  ratio: number;
  minWidth: number;
};

interface ImageCropperProps {
  aspectRatios: { [name: string]: Ratio };
  saveMethod: (blob: Blob) => void;
}

const ImageCropper = ({ aspectRatios, saveMethod }: ImageCropperProps) => {
  const [selectedAspectRatio, setSelectedAspectRatio] = useState(
    Object.keys(aspectRatios)[0]
  );
  const [upImg, setUpImg] = useState<ArrayBuffer | string | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const scaleX =
    (imgRef.current?.naturalWidth || 0) / (imgRef.current?.width || 1);
  const scaleY =
    (imgRef.current?.naturalHeight || 0) / (imgRef.current?.height || 1);
  const [crop, setCrop] = useState<ReactCrop.Crop>({
    unit: "%",
    width: 30,
    aspect: Object.values(aspectRatios)[0].ratio,
  });
  const [completedCrop, setCompletedCrop] = useState<ReactCrop.Crop>();

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      const file = e.target.files[0];
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(file);
    }
  };

  const { ratio, minWidth } = aspectRatios[selectedAspectRatio];
  const minHeight = minWidth / ratio;

  const isOriginalSizeValid =
    (imgRef.current?.naturalHeight || 0) >= minHeight &&
    (imgRef.current?.naturalWidth || 0) >= minWidth;

  const finalSizeWidth = scaleX * (crop?.width || 0);
  const finalSizeHeight = scaleY * (crop?.height || 0);

  const isValidFinalSizeWidth = finalSizeWidth >= minWidth;
  const isValidFinalSizeHeight = finalSizeHeight >= minHeight;

  const minimumSize = `${minWidth.toString().split(".")[0]} x ${
    minHeight.toString().split(".")[0]
  }`;

  const currentSize = `${finalSizeWidth.toString().split(".")[0]} x ${
    finalSizeHeight.toString().split(".")[0]
  }`;

  const onLoad = useCallback((img: HTMLImageElement | null) => {
    imgRef.current = img;
  }, []);
  if (!upImg) {
    return (
      <div>
        <input type="file" accept="image/*" onChange={onSelectFile} />
      </div>
    );
  }
  return (
    <>
      <Dialog
        open={Boolean(upImg)}
        onClose={() => setUpImg(null)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Box>
            <Typography variant="caption" gutterBottom>
              Tamaño Mínimo: ({minimumSize})
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" gutterBottom>
              Tamaño Actual: ({currentSize})
            </Typography>
          </Box>
          <ReactCrop
            crop={crop}
            onImageLoaded={onLoad}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            // @ts-ignore
            src={upImg}
          />
          <Box display="flex" flexWrap="wrap">
            {Object.entries(aspectRatios).map(([k, v]) => (
              <Box margin={1} key={k}>
                <Button
                  type="button"
                  variant="contained"
                  color={selectedAspectRatio === k ? "primary" : "secondary"}
                  onClick={() => {
                    setCrop({
                      ...crop,
                      aspect: v.ratio,
                      height: undefined,
                    });
                    setSelectedAspectRatio(k);
                  }}
                >
                  {k}
                </Button>
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setUpImg(null);
              setCrop({
                unit: "%",
                width: 30,
                aspect: Object.values(aspectRatios)[0].ratio,
              });
            }}
            color="primary"
          >
            Cancelar
          </Button>
          <Button
            disabled={
              !completedCrop?.width ||
              !completedCrop?.height ||
              !isValidFinalSizeWidth ||
              !isValidFinalSizeHeight ||
              !isOriginalSizeValid
            }
            onClick={async () => {
              try {
                await trackPromise(
                  savePhoto(
                    imgRef.current,
                    completedCrop,
                    saveMethod,
                    minHeight,
                    minWidth
                  )
                );
                setUpImg(null);
                setCrop({
                  unit: "%",
                  width: 30,
                  aspect: Object.values(aspectRatios)[0].ratio,
                });
              } catch (e) {
                console.log(e);
              }
            }}
            color="primary"
            autoFocus
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ImageCropper;
