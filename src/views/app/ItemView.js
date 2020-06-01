import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import FullScreenDialog from "../../components/feedback/FullScreenDialog";

class ItemView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idParam: "",
    };
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
        {/*Check all Item Data is Defined: Especially Arrays*/}
        {this.props.passItem.author !== undefined ? (
          <FullScreenDialog item={this.props.passItem} />
        ) : null}
      </div>
    );
  }
}

export default withRouter(ItemView);
