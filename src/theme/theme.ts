import { createTheme } from "@material-ui/core/styles";
import { red, common } from "@material-ui/core/colors";

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
