import React from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { EscortService } from "@dto/index";

interface ServicesProps {
  services: EscortService[];
  currentServices: number[];
  onCheckService: (serviceId: number, checked: boolean) => void;
}

export const Services = ({
  services,
  onCheckService,
  currentServices,
}: ServicesProps) => (
  <Box paddingLeft={2}>
    <Typography variant="h5">Servicios</Typography>
    <FormGroup row>
      {services.map((service) => (
        <FormControlLabel
          key={service.id}
          control={
            <Checkbox
              checked={currentServices.includes(service.id) || false}
              onChange={({ target: { checked } }) =>
                onCheckService(service.id, checked)
              }
              name={service.name}
            />
          }
          label={service.name}
        />
      ))}
    </FormGroup>
  </Box>
);
