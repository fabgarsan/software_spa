import Box from "@material-ui/core/Box";
import React from "react";
import { useNotifications } from "@hooks/index";

const Notify = () => {
  const { renderNotification } = useNotifications();
  return (
    <Box position="fixed" top={64} right={10}>
      {renderNotification()}
    </Box>
  );
};

export default Notify;
