import React, { Component } from "react";
//react-router-dom
import { withRouter, Link } from "react-router-dom";
//theme
import theme from "../../Theme.js";
import { withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
//dialog
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
//nav
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import HomeBtn from "../data-display/icons/HomeBtn";
import CloseIcon from "@material-ui/icons/Close";
//item List
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
//item table
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
//item detail
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
//icons
import IconButton from "@material-ui/core/IconButton";
import TooltipFavBtn from "../data-display/icons/TooltipFavBtn";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { ListItemIcon } from "@material-ui/core";
//tooltip
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = withStyles({
  containerGrow: {
    flexGrow: 1,
  },
  containerContent: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
    background: theme.palette.primary.main,
  },
  containerImgItem: {
    width: "40vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "10vh",
    backgroundImage: theme.background.image,
    backgroundSize: theme.background.image,
    backgroundRepeat: theme.background.image,
  },
  containerList: {
    width: "50vw",
    margin: "auto",
    background: theme.palette.primary.main,
  },
  containerItemInfo: {
    width: "60vw",
    paddingTop: "8vh",
    background: theme.palette.primary.main,
  },
  imgItem: {
    width: "15vw",
  },
  fontStyle: {
    fontFamily: theme.typography.body.fontFamily,
    fontWeight: theme.typography.body.fontWeight,
  },
  fontStylesHeader: {
    fontFamily: theme.typography.header.fontFamily,
  },
  fontStylesBody: {
    fontFamily: theme.typography.body.fontFamily,
    fontWeight: theme.typography.body.fontWeight,
  },
  fontCapitalize: {
    textTransform: "capitalize",
  },
  tab: {
    paddingLeft: 20,
  },
  table: {
    maxWidth: "80ch",
    margin: "auto",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  btnDetail: {
    display: "flex",
    justifyContent: "center",
  },
  hideTableRowBorder: {
    "&:last-child th, &:last-child td": {
      borderBottom: 0,
    },
  },
});

const LightTooltip = withStyles({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
})(Tooltip);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

class FullScreenDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenDetail: false,
    };

    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleDetailOpen = this.handleDetailOpen.bind(this);
  }

  handleDialogClose() {
    if (this.props.history.length === 2) {
      //If first load is item page
      this.props.history.push("/browse");
    } else {
      this.props.history.goBack();
    }

    // this.props.history.push(this.props.location.state.from, { from: "/item" });
  }
  handleDetailOpen() {
    this.setState({ isOpenDetail: !this.state.isOpenDetail });
  }

  render() {
    const { classes, item } = this.props;
    console.log(this.props.history);
    return (
      <Dialog
        fullScreen
        open={true}
        onClose={this.handleDialogClose}
        TransitionComponent={Transition}
        transitionDuration={600}
      >
        {/* Nav */}
        <AppBar position="relative">
          <Toolbar>
            <div className={classes.tab} />
            <div className={classes.containerGrow}>
              <Link to="/browse">
                <HomeBtn />
              </Link>
            </div>
            <IconButton
              edge="end"
              color="inherit"
              onClick={this.handleDialogClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Item Content */}
        <div className={classes.containerContent}>
          {/* Item Img */}
          <div className={classes.containerImgItem}>
            <img
              alt={`img${item.title}`}
              src={item.cover_url}
              className={classes.imgItem}
            />
          </div>
          {/* List Item Info */}
          <div className={classes.containerItemInfo}>
            {/* List Item Info Main */}
            <List className={classes.containerList}>
              <ListItem>
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
                {/* <TooltipFavBtn /> */}
                <ListItemText
                  className={classes.tab}
                  primary={
                    <Typography className={classes.fontStyle}>
                      {item.title}
                    </Typography>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                        className={classes.fontStyle}
                      >
                        {`By: ${Object.values(item.author).join(", ")}`}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              {/* List Item Info Detail */}
              <ListItem
                button
                className={classes.btnDetail}
                onClick={this.handleDetailOpen}
              >
                {this.state.isOpenDetail ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse
                in={this.state.isOpenDetail}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  <ListItem button className={classes.nested}>
                    <ListItemText
                      className={classes.listItemText}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                            className={classes.fontStyle}
                          >
                            {item.series !== "None"
                              ? `Series: ${item.series}`
                              : null}
                            <div className={classes.fontCapitalize}>
                              {`Type: ${item.type}`}
                            </div>
                            {`Publisher: ${item.publish_name}`}
                            {` (${item.publish_year})`}
                            <br />
                            Subject:
                            <ul>
                              {item.subject.map((e, index) => (
                                <li key={index}>{e}</li>
                              ))}
                            </ul>
                            <br />
                            Summary: <br />
                            <span className={classes.tab} /> {item.summary}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </List>
              </Collapse>
            </List>
            {/* Table Item Avaliablility */}
            <TableContainer className={classes.table}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" className={classes.fontStyle}>
                      ISBN
                    </TableCell>
                    <TableCell align="center" className={classes.fontStyle}>
                      Avaliable
                    </TableCell>
                    <TableCell align="center" className={classes.fontStyle}>
                      Add to Cart
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {item.isbn.map((e, index) => (
                    <TableRow
                      key={index}
                      className={classes.hideTableRowBorder}
                    >
                      <TableCell
                        varient="body"
                        align="center"
                        component="th"
                        scope="row"
                        className={classes.fontStyle}
                      >
                        {e.number}
                      </TableCell>
                      <TableCell
                        align="center"
                        varient="body"
                        className={classes.fontStyle}
                      >
                        {e.available}
                      </TableCell>
                      <TableCell align="center" varient="body">
                        <IconButton aria-label="add-to-cart-btn">
                          <ShoppingCartOutlinedIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default useStyles(withRouter(FullScreenDialog));
