import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TemporaryDrawerFilter from "../../navigation/TemporaryDrawerFilter";

class HideFilterBtn extends Component {
  render() {
    if (
      //Show Filter Btn Only for Below Routes
      this.props.location.pathname.match("/search") ||
      this.props.location.pathname.match("/advsearch")
    ) {
      return (
        <TemporaryDrawerFilter
          handleFilterInput={this.props.handleFilterInput}
        />
      );
    } else {
      return null;
    }
  }
}

export default withRouter(HideFilterBtn);
