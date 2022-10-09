import { createTheme } from "@mui/material/styles";
import { red, common, green, blue, yellow } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: common.black,
    },
    success: {
      main: green[500],
    },
    error: {
      main: red[500],
    },
    info: {
      main: blue[500],
    },
    warning: {
      main: yellow[500],
    },
    background: {
      default: common.white,
    },
  },
});

export default theme;
