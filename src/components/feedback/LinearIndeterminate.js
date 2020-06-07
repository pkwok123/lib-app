import React, { Component } from "react";
import theme from "../../Theme";
import { withStyles } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = withStyles({
  containerLinearProgress: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  root: {
    height: 10,
  },
  colorPrimary: {
    backgroundColor: "#F5DEB3", //"#D2B48C", //"#FFE4C4",
  },
  barColorPrimary: {
    backgroundColor: theme.palette.primary.main,
  },
});

class LinearIndeterminate extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.containerLinearProgress}>
        <LinearProgress
          {...this.props}
          classes={{
            root: classes.root,
            colorPrimary: classes.colorPrimary,
            barColorPrimary: classes.barColorPrimary,
          }}
        />
      </div>
    );
  }
}

export default useStyles(LinearIndeterminate);
