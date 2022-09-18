import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const BooleanIcon = ({ value }: { value: boolean }) => (
  <FontAwesomeIcon
    style={{ color: value ? "green" : "red" }}
    icon={["fal", value ? "check-circle" : "times-circle"]}
    size="lg"
  />
);
