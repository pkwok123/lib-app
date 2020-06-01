import React, { Component } from "react";
//theme
import theme from "../../../Theme";
import { withStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
//tooltip
import Tooltip from "@material-ui/core/Tooltip";
//icons
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";

// Fix? It doesn't change the arrow color
const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

const useStyles = withStyles({
  fontStylesHeader: {
    fontFamily: theme.typography.header.fontFamily,
  },
});

class TooltipFavBtn extends Component {
  render() {
    const { classes } = this.props;
    return (
      <LightTooltip
        title={
          <Typography className={classes.fontStylesHeader}>
            Add Favorites
          </Typography>
        }
        placement="bottom"
        arrow
      >
        <IconButton edge="end" aria-label="favorite">
          <FavoriteBorderOutlinedIcon />
        </IconButton>
      </LightTooltip>
    );
  }
}

export default useStyles(TooltipFavBtn);
