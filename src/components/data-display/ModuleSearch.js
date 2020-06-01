import React, { Component } from "react";
//react-router-dom
import { withRouter } from "react-router-dom";
//theme
import theme from "../../Theme.js";
import { withStyles } from "@material-ui/core";
//listsubheader - results
import { List } from "@material-ui/core";
import { ListSubheader } from "@material-ui/core/";
//grid
import { Grid } from "@material-ui/core";
import { Paper } from "@material-ui/core";

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

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.history.push(`/item?_id=${event.target.name}`);
  }

  render() {
    const { classes, items } = this.props;

    return (
      <div>
        <List
          subheader={
            <ListSubheader className={classes.fontStylesBody}>
              {items.length} Results
            </ListSubheader>
          }
          className={classes.containerList}
        />
        <div className={classes.container}>
          <Grid container className={classes.containerGridRoot} spacing={2}>
            <Grid item xs={12}>
              <Grid
                container
                justify="center"
                spacing={4}
                className={classes.containerGridPaper}
              >
                {items.map((item) => (
                  <Grid item key={item._id}>
                    <Paper className={classes.paper} elevation={4}>
                      <img
                        className={classes.imgItem}
                        key={item._id}
                        name={item._id}
                        src={item.cover_url}
                        onClick={this.handleClick}
                      />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default useStyles(withRouter(ModuleSearch));
