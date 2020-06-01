import React, { Component } from "react";
import { withStyles, Typography } from "@material-ui/core";
import theme from "../../Theme.js";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";

const useStyles = withStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "90vh",
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
class BrowseView extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.containerContent}>
          <ImportContactsIcon fontSize="large" className={classes.icon} />
          <Typography variant="h2" className={classes.fontStyle}>
            The Browser
          </Typography>
          <Typography variant="h3" className={classes.fontStyleH1}>
            ...
            <br />
            <br />
            This Page is Under Construction!
          </Typography>
        </div>
      </div>
    );
  }
}

export default useStyles(BrowseView);
