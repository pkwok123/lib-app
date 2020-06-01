import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import mccLogo from "../../../images/mcc_logo.png";

const useStyles = withStyles({
  imgMccLogo: {
    maxWidth: 100,
    marginBottom: 10,
  },
});

class HomeBtn extends Component {
  render() {
    const { classes } = this.props;
    return <img src={mccLogo} className={classes.imgMccLogo} />;
  }
}

export default useStyles(HomeBtn);
