import React, { useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
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
} from "@material-ui/core";
import { DialogConfirmation } from "@components/index";
import { DIALOG_MESSAGES } from "@utils/constants";
import clsx from "clsx";

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

interface DetailViewEscortImageListItemProps {
  path: string;
  imageId: number;
  created: string;
  altText: string;
  publishedWeb: boolean;
  altTextEng: string;
  deleteImage: (imageId: number) => void;
  setPublished: (imageId: number, publishedWeb: boolean) => void;
}

const DetailViewEscortImageListItem = ({
  path,
  imageId,
  deleteImage,
  created,
  altText,
  altTextEng,
  setPublished,
  publishedWeb,
}: DetailViewEscortImageListItemProps) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [confirmationDeleteOpen, setConfirmationDeleteOpen] =
    useState<boolean>(false);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Box padding={1}>
      {confirmationDeleteOpen && (
        <DialogConfirmation
          title={DIALOG_MESSAGES.CRUD_DELETE_DIALOG_TITLE("Imagen")}
          message={DIALOG_MESSAGES.DELETE_DIALOG_TEXT("Imagen")}
          open={confirmationDeleteOpen}
          onAccept={() => deleteImage(imageId)}
          onCancel={() => setConfirmationDeleteOpen(false)}
        >
          <Box>
            <img src={path} alt="" width="100%" />
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
              <img src={path} alt="" width="100%" />
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
        <CardHeader subheader={created} />
        <CardMedia className={classes.media} image={path} title="Paella dish" />
        <CardActions disableSpacing>
          <IconButton
            aria-label="open preview"
            onClick={() => setPreviewOpen(true)}
          >
            <FontAwesomeIcon icon={["fal", "eye"]} size="xs" />
          </IconButton>
          <IconButton
            aria-label="publish photo"
            color={publishedWeb ? "primary" : "secondary"}
            onClick={() => setPublished(imageId, !publishedWeb)}
          >
            <FontAwesomeIcon icon={["fal", "globe-americas"]} size="xs" />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => setConfirmationDeleteOpen(true)}
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
          >
            <FontAwesomeIcon icon={["fal", "angle-down"]} size="xs" />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Alt Español:</Typography>
            <Typography paragraph>{altText}</Typography>
            <Typography paragraph>Alt Ingles:</Typography>
            <Typography paragraph>{altTextEng}</Typography>
            <Typography paragraph>Nombre Archivo:</Typography>
            <Typography paragraph>{path}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
};

export default DetailViewEscortImageListItem;
