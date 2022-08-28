import React, { useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Card,
  Typography,
  CardActions,
  IconButton,
  CardHeader,
  CardMedia,
  Collapse,
  CardContent,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { BackdropLoading, DialogConfirmation } from "@components/shared";
import { API_ROUTES, DIALOG_MESSAGES } from "@utils/constants";
import clsx from "clsx";
import { EscortImage } from "@dto/escorts";
import { useReactQueryCRUDGenericApiCall } from "@api/reactQueryApi";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: theme.palette.primary.main,
    },
  })
);

interface ImageListItemProps {
  escortImage: EscortImage;
  refetchImage: () => void;
}

export const ImageListItem = ({
  refetchImage,
  escortImage,
}: ImageListItemProps) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [confirmationDeleteOpen, setConfirmationDeleteOpen] =
    useState<boolean>(false);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { useDestroy: deleteImageMutation, useEdit: editImageMutation } =
    useReactQueryCRUDGenericApiCall<EscortImage>(API_ROUTES.ESCORT_IMAGES);
  const deleteImageMutationResult = deleteImageMutation({
    onSuccessCallBack: () => refetchImage(),
  });
  const { mutate: deleteImageMutate, isLoading: deleteImageMutateIsLoading } =
    deleteImageMutationResult;

  const editImageMutationResult = editImageMutation({
    onSuccessCallBack: () => refetchImage(),
  });
  const { mutate: editImageMutate, isLoading: editImageMutateIsLoading } =
    editImageMutationResult;
  return (
    <Box padding={1}>
      <BackdropLoading
        isOpen={deleteImageMutateIsLoading || editImageMutateIsLoading}
      />
      {confirmationDeleteOpen && (
        <DialogConfirmation
          title={DIALOG_MESSAGES.CRUD_DELETE_DIALOG_TITLE("Imagen")}
          message={DIALOG_MESSAGES.DELETE_DIALOG_TEXT("Imagen")}
          open={confirmationDeleteOpen}
          onAccept={() => deleteImageMutate(escortImage.id)}
          onCancel={() => setConfirmationDeleteOpen(false)}
        >
          <Box>
            <img src={escortImage.image} alt="" width="100%" />
          </Box>
        </DialogConfirmation>
      )}
      {previewOpen && (
        <Dialog
          open={previewOpen}
          onClose={() => setPreviewOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <Box>
              <img src={escortImage.image} alt="" width="100%" />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPreviewOpen(false)} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Card className={classes.root}>
        <CardHeader subheader={escortImage.created} />
        <CardMedia
          className={classes.media}
          image={escortImage.image}
          title="Paella dish"
        />
        <CardActions disableSpacing>
          <IconButton
            aria-label="open preview"
            onClick={() => setPreviewOpen(true)}
            size="large"
          >
            <FontAwesomeIcon icon={["fal", "eye"]} size="xs" />
          </IconButton>
          <IconButton
            aria-label="publish photo"
            color={escortImage.publishedWeb ? "primary" : "secondary"}
            onClick={() =>
              editImageMutate({
                id: escortImage.id,
                dataEdit: {
                  publishedWeb: !escortImage.publishedWeb,
                },
              })
            }
            size="large"
          >
            <FontAwesomeIcon icon={["fal", "globe-americas"]} size="xs" />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => setConfirmationDeleteOpen(true)}
            size="large"
          >
            <FontAwesomeIcon icon={["fal", "trash"]} size="xs" />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            size="large"
          >
            <FontAwesomeIcon icon={["fal", "angle-down"]} size="xs" />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Alt Español:</Typography>
            <Typography paragraph>{escortImage.altText}</Typography>
            <Typography paragraph>Alt Ingles:</Typography>
            <Typography paragraph>{escortImage.altTextEng}</Typography>
            <Typography paragraph>Nombre Archivo:</Typography>
            <Typography paragraph>{escortImage.image}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
};
