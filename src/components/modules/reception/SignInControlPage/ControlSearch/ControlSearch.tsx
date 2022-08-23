import React from "react";
import { Button, Grid, TextField } from "@mui/material";
import { UI } from "@utils/constantsUI";

interface ControlSearchProps {
  onSearch: () => void;
  handleOnSearchTextChange: (searchText: string) => void;
  searchText: string;
}

export const ControlSearch = ({
  onSearch,
  searchText,
  handleOnSearchTextChange,
}: ControlSearchProps) => (
  <Grid container>
    <Grid item xs={8}>
      <TextField
        fullWidth
        value={searchText}
        onChange={(event) => handleOnSearchTextChange(event.target.value)}
      />
    </Grid>
    <Grid item xs={4}>
      <Button onClick={onSearch} type="button" color="secondary">
        {UI.BUTTON_TEXT_SEARCH}
      </Button>
    </Grid>
  </Grid>
);
