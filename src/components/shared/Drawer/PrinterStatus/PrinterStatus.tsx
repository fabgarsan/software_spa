import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import {
  printerAvailableState,
  printerPrintingState,
  printerTooltipState,
} from "@stores/printerSlice";

export const PrinterStatus = () => {
  const available = useSelector(printerAvailableState);
  const printing = useSelector(printerPrintingState);
  const tooltip = useSelector(printerTooltipState);
  return (
    <Tooltip title={tooltip}>
      <Badge
        sx={{
          "& .MuiBadge-badge": {
            fontSize: 10,
            height: 10,
            minWidth: 10,
            border: "1px solid white",
          },
        }}
        color={(available && "success") || "warning"}
        overlap="rectangular"
        badgeContent=" "
        variant="dot"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <FontAwesomeIcon
          icon={["fal", "print"]}
          size="lg"
          beatFade={printing}
          border={true}
        />
      </Badge>
    </Tooltip>
  );
};
