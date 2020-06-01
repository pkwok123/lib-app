import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import theme from "../../Theme";
import { withStyles } from "@material-ui/core";
import ModuleSearch from "../../components/data-display/ModuleSearch";
import ListSearch from "../../components/data-display/ListSearch";

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
  render() {
    const { classes } = this.props;
    //const query = new URLSearchParams(this.props.location.search.substring(1)); //qdfd
    const q = this.props.location.search; //?q=dfd
    //const qe = qu.slice(1); //q=dfd
    //const q = query.get("q"); //dfd
    if (this.props.currentSearchInput != q) {
      this.props.getItems(`/search${q}`);
    }
    // if (this.props.passFilterValueRelevance === "relevance") {
    //   var passItems = this.props.passFetchedItems;
    // } else {
    //   var passItems = this.props.passItems;
    // }
    return (
      <div className={classes.container}>
        {q == null ? null : this.props.toggleViewValue === "module" ? (
          <ModuleSearch items={this.props.passItems} />
        ) : (
          <ListSearch items={this.props.passItems} />
        )}
      </div>
    );
  }
}

export default useStyles(withRouter(SearchView));
