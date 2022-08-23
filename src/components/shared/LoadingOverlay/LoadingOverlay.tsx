import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import { BackdropLoading } from "@components/shared";

export const LoadingOverlay = () => {
  const { promiseInProgress } = usePromiseTracker();
  return <BackdropLoading isOpen={promiseInProgress} />;
};
