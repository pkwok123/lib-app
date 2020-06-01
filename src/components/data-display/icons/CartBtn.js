import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";

class CartBtn extends Component {
  render() {
    return (
      <IconButton aria-label="cart">
        <ShoppingCartOutlinedIcon />
      </IconButton>
    );
  }
}

export default CartBtn;
