import React, { Component, createRef } from "react";
//react-router-dom
import { Link } from "react-router-dom";
//theme
import theme from "../../Theme";
import { withStyles, IconButton } from "@material-ui/core";
import { fade } from "@material-ui/core/styles";
//menu
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
//icons
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SettingsIcon from "@material-ui/icons/Settings";

const useStyles = withStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },

  //
  root: {
    display: "flex",
  },
  // paper: {
  //   marginRight: theme.spacing(2),
  // },
  fontStyle: {
    fontFamily: theme.typography.body.fontFamily,
    fontWeight: 595,
    color: "inherit", //"#757575", //"#616161",
  },
  widthListItemIcon: {
    minWidth: 40,
    color: "inherit",
  },
  // favColor: {
  //   minWidth: 40,
  //   color: "red",
  // },
  arrow: {
    position: "absolute",
    right: 110,
    top: -25,
  },
  paper: {
    backgroundColor: theme.palette.primary.main,
  },
  fontLink: {
    color: "#000000",
    textDecoration: "none",
  },
}));

class MenuListComposition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      inputValue: "",
    };

    this.anchorRef = createRef(null);
    this.prevOpen = createRef(this.state.isOpen);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);

    //this.arrowRef = createRef(null);
  }

  handleToggle(event) {
    event.preventDefault();
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleClose(event) {
    if (
      this.anchorRef.current &&
      this.anchorRef.current.contains(event.target)
    ) {
      return;
    }

    this.setState({ isOpen: false });
  }

  handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      this.setState({ isOpen: false });
    }
  }

  //return focus to the button when we transitioned from !open -> open
  componentDidUpdate(prevProps, prevState) {
    if (this.state.isOpen !== prevState.isOpen) {
      if (this.prevOpen.current === true && this.state.isOpen === false) {
        this.anchorRef.current.focus();
      }

      this.prevOpen.current = this.state.isOpen;
    }
  }

  render() {
    const { isOpen } = this.state;
    const { classes } = this.props;

    //const arrow = document.getElementById("arrow");

    return (
      <div className={classes.root}>
        <div>
          <IconButton
            ref={this.anchorRef}
            aria-controls={isOpen ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={this.handleToggle}
          >
            <AccountCircle />
          </IconButton>

          <Popper
            open={isOpen}
            anchorEl={this.anchorRef.current}
            role={undefined}
            transition
            disablePortal
            popperOptions={{
              modifiers: {
                flip: {
                  enabled: true,
                },
                // preventOverflow: {
                //   enabled: true,
                //   boundariesElement: 'scrollParent',
                // },
                // arrow: {
                //   enabled: true,
                //   element: arrow,
                // },
                offset: {
                  offset: "0,14",
                },
              },
            }}
          >
            <div className={classes.arrow}>
              <ExpandMoreRoundedIcon />
            </div>

            {/* {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              > */}

            <Paper className={classes.paper}>
              {/* <ExpandMoreIcon /> */}
              <ClickAwayListener onClickAway={this.handleClose}>
                <MenuList
                  autoFocusItem={isOpen}
                  id="menu-list-grow"
                  onKeyDown={this.handleListKeyDown}
                >
                  <Link to="/profile" className={classes.fontLink}>
                    <MenuItem
                      className={classes.fontStyle}
                      onClick={this.handleClose}
                    >
                      <ListItemIcon className={classes.widthListItemIcon}>
                        <AssignmentIndIcon />
                      </ListItemIcon>
                      Profile
                    </MenuItem>
                  </Link>

                  <Link to="/favorite" className={classes.fontLink}>
                    <MenuItem
                      className={classes.fontStyle}
                      onClick={this.handleClose}
                    >
                      <ListItemIcon className={classes.widthListItemIcon}>
                        <FavoriteBorderOutlinedIcon />
                      </ListItemIcon>
                      Favorites
                    </MenuItem>
                  </Link>
                  <Link to="/notification" className={classes.fontLink}>
                    <MenuItem
                      className={classes.fontStyle}
                      onClick={this.handleClose}
                    >
                      <ListItemIcon className={classes.widthListItemIcon}>
                        <NotificationsIcon />
                      </ListItemIcon>
                      Notifications
                    </MenuItem>
                  </Link>
                  <Link to="/settings" className={classes.fontLink}>
                    <MenuItem
                      className={classes.fontStyle}
                      onClick={this.handleClose}
                    >
                      <ListItemIcon className={classes.widthListItemIcon}>
                        <SettingsIcon />
                      </ListItemIcon>
                      Settings
                    </MenuItem>
                  </Link>
                </MenuList>
              </ClickAwayListener>
            </Paper>
            {/* </Grow>
            )} */}
          </Popper>
        </div>
      </div>
    );
  }
}

export default useStyles(MenuListComposition);
