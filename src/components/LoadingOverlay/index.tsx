import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import { BackdropLoading } from "@components/index";

const LoadingOverlay = () => {
  const { promiseInProgress } = usePromiseTracker();
  return <BackdropLoading isOpen={promiseInProgress} />;
};

export default LoadingOverlay;
