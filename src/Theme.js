import { createMuiTheme } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
import red from "@material-ui/core/colors/red";

const Theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[50],
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    header: {
      fontFamily: "Great Vibes",
    },
    body: {
      fontFamily: "Playfair Display",
      fontWeight: 600,
    },
  },
  background: {
    image: `url("https://previews.123rf.com/images/misslina/misslina1710/misslina171000005/87673611-seamless-golden-floral-victorian-style-damask-wallpaper-pattern-this-image-is-a-vector-illustration-.jpg")`,
    size: "100%",
    repeat: "repeat",
  },
});

export default Theme;
