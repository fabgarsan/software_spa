import { createTheme, adaptV4Theme } from "@mui/material/styles";
import { red, common } from "@mui/material/colors";

const theme = createTheme(
  adaptV4Theme({
    palette: {
      primary: {
        main: red[500],
      },
      secondary: {
        main: common.black,
      },
    },
  })
);

export default theme;
