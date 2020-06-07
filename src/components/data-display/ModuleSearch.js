import React, { Component } from "react";
//react-router-dom
import { withRouter } from "react-router-dom";
//theme
import theme from "../../Theme.js";
import { withStyles } from "@material-ui/core";
//listsubheader - results
//import { List } from "@material-ui/core";
//import { ListSubheader } from "@material-ui/core/";
//grid
import { Grid } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import Grow from "@material-ui/core/Grow";

const useStyles = withStyles({
  container: {
    //minHeight: "90vh", //height: "100%",
    //minWidth: "100%",
    paddingTop: "5vh",
  },
  containerList: {
    //height: "100%",
    maxWidth: "80ch",
    margin: "auto",
    backgroundColor: theme.palette.primary.main,
    fontFamily: theme.typography.header.fontFamily,
  },
  containerGridRoot: {
    flexGrow: 1,
    width: "100%",
    margin: 0,
  },
  containerGridPaper: {
    width: "100%",
    margin: 0,
  },
  paper: {
    height: 140,
    width: 100,
    textAlign: "center",
  },
  imgItem: {
    height: 140,
    width: 100,
  },
  fontStylesBody: {
    fontFamily: theme.typography.body.fontFamily,
    fontWeight: theme.typography.body.fontWeight,
  },
});

class ModuleSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //istransition: true,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  // Method: Exit transition executes after rerender unmounts items
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.items !== this.props.items) {
  //     const timer = 1000 + 100 * this.props.items.length;
  //     this.setState({ istransition: false });
  //     setTimeout(
  //       function () {
  //         this.setState({ istransition: true });
  //       }.bind(this),
  //       timer
  //     );
  //   }
  // }

  // Another Method to Update Transition
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.items !== this.props.items) {
  //     //this.setState({ istransition: false }, () =>
  //     this.setState({ istransition: true });
  //     //  );
  //   }
  // }

  handleClick(event) {
    this.props.history.push(`/item?_id=${event.target.name}`);
    // this.props.history.push(`/item?_id=${event.target.name}`, {
    //   from: this.props.location.pathname,
    // });
  }

  render() {
    const { classes, items } = this.props;
    // const shouldAnimate = this.props.location.state !== undefined? this.props.location.state.from !== "/items":true;
    return (
      //   <List
      //     subheader={
      //       <ListSubheader className={classes.fontStylesBody}>
      //         {items.length} Results
      //       </ListSubheader>
      //     }
      //     className={classes.containerList}
      //   />

      <div className={classes.container}>
        <Grid container className={classes.containerGridRoot} spacing={2}>
          <Grid item xs={12}>
            <Grid
              container
              justify="center"
              spacing={4}
              className={classes.containerGridPaper}
            >
              {items.map((item, index) => (
                <Grid item key={item._id}>
                  {this.props.shouldAnimate === true ? (
                    <Grow in={true} timeout={1000 + 100 * index}>
                      <Paper className={classes.paper} elevation={4}>
                        <img
                          alt={`img${item.title}`}
                          className={classes.imgItem}
                          key={item._id}
                          name={item._id}
                          src={item.cover_url}
                          onClick={this.handleClick}
                        />
                      </Paper>
                    </Grow>
                  ) : (
                    <Paper className={classes.paper} elevation={4}>
                      <img
                        alt={`img${item.title}`}
                        className={classes.imgItem}
                        key={item._id}
                        name={item._id}
                        src={item.cover_url}
                        onClick={this.handleClick}
                      />
                    </Paper>
                  )}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
      // </div>
    );
  }
}

export default useStyles(withRouter(ModuleSearch));
