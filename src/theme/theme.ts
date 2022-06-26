import { createTheme } from "@mui/material/styles";
import { red, common } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: common.black,
    },
  },
});

export default theme;
