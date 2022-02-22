import { createTheme, responsiveFontSizes } from "@mui/material";
import { grey } from "@mui/material/colors";

// Create a theme instance.
let theme = createTheme({
  palette: {
    background: {
      default: grey[200],
    },
  },
  text: {},
});

theme = responsiveFontSizes(theme);

export default theme;
