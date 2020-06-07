import React, { Component } from "react";
import { withRouter } from "react-router-dom";
//theme
import theme from "../../Theme.js";
import { withStyles, Fade } from "@material-ui/core";
//import { Toolbar } from "@material-ui/core";
import { Typography } from "@material-ui/core";
//list
import { List } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { ListSubheader } from "@material-ui/core/";
import { ListItemText } from "@material-ui/core";
import { ListItemAvatar } from "@material-ui/core";
import { ListItemIcon } from "@material-ui/core";
//import { ListItemSecondaryAction } from "@material-ui/core";
//tooltip
import Tooltip from "@material-ui/core/Tooltip";
//icons
import TooltipFavBtn from "./icons/TooltipFavBtn.js";

const useStyles = withStyles({
  containerList: {
    height: "100%",
    maxWidth: "80ch",
    margin: "auto",
    backgroundColor: theme.palette.primary.main,
    fontFamily: theme.typography.header.fontFamily,
  },
  containerListItemText: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  containerListItemIcon: {
    margin: 0,
  },
  fontStylesHeader: {
    fontFamily: theme.typography.header.fontFamily,
  },
  fontStylesBody: {
    fontFamily: theme.typography.body.fontFamily,
    fontWeight: theme.typography.body.fontWeight,
  },
  imgItem: {
    height: 140,
    width: 100,
  },
  hideListItemBorder: {
    "&:last-child": {
      borderBottom: 0,
    },
  },
});

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

class ListSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //istransition: true,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  //Another Method to Update Transition
  // componentDidUpdate(prevProps) {
  //   if (prevProps.items !== this.props.items)
  //     this.setState({ istransition: false }, () =>
  //       this.setState({ istransition: true })
  //     );
  // }

  handleClick(id) {
    this.props.history.push(`/item?_id=${id}`);
  }

  render() {
    const { classes, items } = this.props;

    return (
      <List
        subheader={
          <ListSubheader className={classes.fontStylesBody}>
            {items.length} Results
          </ListSubheader>
        }
        className={classes.containerList}
      >
        {items.map((item, index) =>
          this.props.shouldAnimate === true ? (
            <Fade in={true} timeout={1000 + 1000 * index}>
              <ListItem
                key={item._id}
                alignItems="flex-start"
                divider={true}
                className={classes.hideListItemBorder}
              >
                <ListItemAvatar
                  margin={20}
                  onClick={() => this.handleClick(item._id)}
                >
                  <img
                    alt={item.title}
                    src={item.cover_url}
                    className={classes.imgItem}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography className={classes.fontStylesBody}>
                      {item.title}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      className={classes.fontStylesBody}
                      variant="body2"
                      color="textPrimary"
                    >
                      {item.publish_year} By: {""}
                      {Object.values(item.author).join(", ")}
                      <br />
                      Subject:
                      <ul>
                        {item.subject.map((e) => (
                          <li>{e}</li>
                        ))}
                      </ul>
                    </Typography>
                  }
                  onClick={() => this.handleClick(item._id)}
                  className={classes.containerListItemText}
                />

                <ListItemIcon className={classes.containerListItemIcon}>
                  <TooltipFavBtn />
                  <LightTooltip
                    title={
                      <Typography className={classes.fontStylesHeader}>
                        Amazon Rating
                      </Typography>
                    }
                    placement="top"
                    arrow
                    className={classes.fontStylesBody}
                  >
                    <Typography>{item.rating.amazon}</Typography>
                  </LightTooltip>
                </ListItemIcon>
              </ListItem>
            </Fade>
          ) : (
            <ListItem
              key={item._id}
              alignItems="flex-start"
              divider={true}
              className={classes.hideListItemBorder}
            >
              <ListItemAvatar
                margin={20}
                onClick={() => this.handleClick(item._id)}
              >
                <img
                  alt={item.title}
                  src={item.cover_url}
                  className={classes.imgItem}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography className={classes.fontStylesBody}>
                    {item.title}
                  </Typography>
                }
                secondary={
                  <Typography
                    className={classes.fontStylesBody}
                    variant="body2"
                    color="textPrimary"
                  >
                    {item.publish_year} By: {""}
                    {Object.values(item.author).join(", ")}
                    <br />
                    Subject:
                    <ul>
                      {item.subject.map((e) => (
                        <li>{e}</li>
                      ))}
                    </ul>
                  </Typography>
                }
                onClick={() => this.handleClick(item._id)}
                className={classes.containerListItemText}
              />

              <ListItemIcon className={classes.containerListItemIcon}>
                <TooltipFavBtn />
                <LightTooltip
                  title={
                    <Typography className={classes.fontStylesHeader}>
                      Amazon Rating
                    </Typography>
                  }
                  placement="top"
                  arrow
                  className={classes.fontStylesBody}
                >
                  <Typography>{item.rating.amazon}</Typography>
                </LightTooltip>
              </ListItemIcon>
            </ListItem>
          )
        )}
      </List>
    );
  }
}

export default useStyles(withRouter(ListSearch));
