import React from "react";
import { Backdrop } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

interface BackdropLoadingProps {
  isOpen: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loadingIcon: {
      color: theme.palette.primary.main,
    },
    backdrop: {
      zIndex:
        Math.max(theme.zIndex.modal, theme.zIndex.drawer, theme.zIndex.appBar) +
        2,
      color: "rgba(0, 0, 0, 0.5)",
    },
  })
);

const BackdropLoading = ({ isOpen }: BackdropLoadingProps) => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={isOpen}>
      <FontAwesomeIcon
        className={classes.loadingIcon}
        icon={["fal", "spinner"]}
        size="5x"
        spin
      />
    </Backdrop>
  );
};

export default BackdropLoading;
