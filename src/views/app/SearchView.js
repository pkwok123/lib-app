import React, { Component } from "react";
import { withRouter } from "react-router-dom";
//import theme from "../../Theme";
import { withStyles } from "@material-ui/core";
import ModuleSearch from "../../components/data-display/ModuleSearch";
import ListSearch from "../../components/data-display/ListSearch";
import SnackbarAlert from "../../components/feedback/SnackbarAlert";
import LinearIndeterminate from "../../components/feedback/LinearIndeterminate";

const useStyles = withStyles({
  container: {
    //display: "flex",
    //flexDirection: "column",
    //justifyContent: "center",
    //alignItems: "center",
    //minHeight: "90vh",
    //height: "100%",
    // marginTop: "10vh",
    // backgroundImage: theme.background.image,
    // backgroundSize: theme.background.size,
    // backgroundRepeat: theme.background.repeat,
  },
});

class SearchView extends Component {
  constructor(props) {
    super(props);

    this.handleAlertClose = this.handleAlertClose.bind(this);
  }

  handleAlertClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ openAlert: false });
  }

  render() {
    const { classes } = this.props;
    //const query = new URLSearchParams(this.props.location.search.substring(1)); //qdfd
    const q = this.props.location.search; //?q=dfd
    //const qe = qu.slice(1); //q=dfd
    //const q = query.get("q"); //dfd
    if (this.props.currentSearchInput !== q) {
      this.props.getItems(`/search${q}`);
    }
    // if (this.props.passFilterValueRelevance === "relevance") {
    //   var passItems = this.props.passFetchedItems;
    // } else {
    //   var passItems = this.props.passItems;
    // }
    return (
      <div className={classes.container}>
        {q == null ? null : this.props.errorSearch !== null ? (
          <SnackbarAlert
            openAlert={true}
            errorMsg={this.props.errorSearch.message}
            secondaryMsg="We are sorry for the inconvience! Send us a ticket (located in settings) about the error, so that we can address the issue as soon as possible!...At this time this option is underconstruction, contact us through other channels."
            handleAlertClose={this.handleAlertClose}
          />
        ) : this.props.isLoadedSearch !== true ? (
          <LinearIndeterminate />
        ) : this.props.toggleViewValue === "module" ? (
          <ModuleSearch
            items={this.props.passItems}
            istransitionFilter={this.props.istransitionFilter}
            shouldAnimate={this.props.shouldAnimate}
          />
        ) : (
          <ListSearch
            items={this.props.passItems}
            istransitionFilter={this.props.istransitionFilter}
            shouldAnimate={this.props.shouldAnimate}
          />
        )}
        }
      </div>
    );
  }
}

export default useStyles(withRouter(SearchView));
