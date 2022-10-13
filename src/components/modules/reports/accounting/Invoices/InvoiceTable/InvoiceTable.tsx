import React from "react";
import { Typography, List, ListItem, Grid } from "@mui/material";
import { InstancesDescriptorKeys, instancesDescriptor } from "@utils/index";
import { GetInvoiceResponse } from "@api/accounting";

interface InvoiceTableProps {
  list: GetInvoiceResponse[];
}

const instanceDescriptorInvoice =
  instancesDescriptor[InstancesDescriptorKeys.invoice];

export const InvoiceTable = ({ list }: InvoiceTableProps) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom color="primary">
          {instanceDescriptorInvoice.plural} ({list.length})
        </Typography>
        <List dense>
          {list.map((invoice) => {
            const { uniqueInvoiceNumber, id, sourceDisplay } = invoice;
            return (
              <ListItem key={id}>
                {uniqueInvoiceNumber}
                {sourceDisplay}
              </ListItem>
            );
          })}
        </List>
      </Grid>
    </Grid>
  );
};
