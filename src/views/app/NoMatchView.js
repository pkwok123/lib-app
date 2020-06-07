import React, { Component } from "react";
import theme from "../../Theme.js";
import { withStyles, Typography } from "@material-ui/core";
import SecurityIcon from "@material-ui/icons/Security";

const useStyles = withStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "90vh",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    // height: "100vh",
  },
  containerContent: {
    display: "flex",
    justifyContent: "center",
    height: "65vh",
    width: "80vh",
    background: theme.palette.primary.main,
    borderRadius: "10%",
    flexDirection: "column",
    alignItems: "center",
  },
  fontStyle: {
    fontFamily: theme.typography.header.fontFamily,
    fontWeight: "bold",
    textAlign: "center",
  },
  fontStyleH1: {
    fontFamily: theme.typography.header.fontFamily,
    textAlign: "center",
  },
  icon: {
    marginBottom: 30,
  },
});
class NoMatchView extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.containerContent}>
          <SecurityIcon fontSize="large" className={classes.icon} />

          <Typography variant="h1" className={classes.fontStyle}>
            404 Page
          </Typography>
          <Typography variant="h4" className={classes.fontStyleH1}>
            ...
            <br />
            <br />
            Page Not Found!
          </Typography>
        </div>
      </div>
    );
  }
}

export default useStyles(NoMatchView);
