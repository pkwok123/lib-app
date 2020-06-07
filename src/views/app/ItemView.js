import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import FullScreenDialog from "../../components/feedback/FullScreenDialog";
import SnackbarAlert from "../../components/feedback/SnackbarAlert";

class ItemView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idParam: "",
    };

    this.handleAlertClose = this.handleAlertClose.bind(this);
  }

  handleAlertClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ openAlert: false });
  }

  render() {
    // Get Item ID from URL (Pushed from data-display Components)
    const urlParams = new URLSearchParams(window.location.search);
    const _idParam = urlParams.get("_id");
    // Prevent Unnecessary Passing of Item ID
    if (this.state.idParam !== _idParam) {
      this.setState({ idParam: _idParam }, () =>
        // Pass Item ID to App
        this.props.getItemID(this.state.idParam)
      );
    }

    return (
      <div>
        {this.props.errorItem !== null ? (
          <SnackbarAlert
            openAlert={true}
            errorMsg={this.props.errorItem.message}
            secondaryMsg="We are sorry for the inconvience! Send us a ticket (located in settings) about the error, so that we can address the issue as soon as possible!...At this time this option is underconstruction, contact us through other channels."
            handleAlertClose={this.handleAlertClose}
          />
        ) : //Check all Item Data is Defined: Especially Arrays
        this.props.passItem.author !== undefined ? (
          <FullScreenDialog item={this.props.passItem} />
        ) : null}
      </div>
    );
  }
}

export default withRouter(ItemView);
