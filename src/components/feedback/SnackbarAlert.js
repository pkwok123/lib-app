import React, { Component } from "react";
//theme
import theme from "../../Theme.js";
import { withStyles } from "@material-ui/core/styles";
//snackbar
import Snackbar from "@material-ui/core/Snackbar";
//alert
import MuiAlert from "@material-ui/lab/Alert";
import { AlertTitle } from "@material-ui/lab/";

function Alert(props) {
  return <MuiAlert variant="filled" elevation={6} {...props} />;
}

const useStyles = withStyles({
  //Must apply width to snackbar and alert to vary the width
  root: {
    width: "100%",
  },
  anchorOriginTopCenter: {
    top: "12vh",
    width: "65vh",
  },
  fontStyle: {
    fontFamily: theme.typography.body.fontFamily,
    fontWeight: 600,
  },
});

class SnackbarAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vertical: "top",
      horizontal: "center",
    };
  }

  render() {
    const { vertical, horizontal } = this.state;
    const { classes, handleAlertClose } = this.props;

    return (
      <Snackbar
        open={this.props.openAlert}
        autoHideDuration={6000}
        anchorOrigin={{ vertical, horizontal }}
        onClose={handleAlertClose}
        className={classes.anchorOriginTopCenter}
      >
        <Alert className={classes.root} severity="error">
          <AlertTitle className={classes.fontStyle}>
            {this.props.errorMsg}
          </AlertTitle>
          {this.props.secondaryMsg}
        </Alert>
      </Snackbar>
    );
  }
}

export default useStyles(SnackbarAlert);
