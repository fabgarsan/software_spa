import React from "react";
import { Backdrop } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { usePromiseTracker } from "react-promise-tracker";

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

const LoadingOverlay = () => {
  const classes = useStyles();
  const { promiseInProgress } = usePromiseTracker();
  return (
    <Backdrop className={classes.backdrop} open={promiseInProgress}>
      <FontAwesomeIcon
        className={classes.loadingIcon}
        icon={["fal", "spinner"]}
        size="5x"
        spin
      />
    </Backdrop>
  );
};

export default LoadingOverlay;
