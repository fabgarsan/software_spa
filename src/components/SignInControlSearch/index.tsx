import React from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import { UI } from "@utils/constants";

interface SignInControlSearchProps {
  onSearch: () => void;
  handleOnSearchTextChange: (searchText: string) => void;
  searchText: string;
}

const SignInControlSearch = ({
  onSearch,
  searchText,
  handleOnSearchTextChange,
}: SignInControlSearchProps) => (
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
export default SignInControlSearch;
