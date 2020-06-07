import React, { Component } from "react";
//react-router-dom
import { withRouter } from "react-router-dom";
//theme
import theme from "../../Theme.js";
import { fade, withStyles } from "@material-ui/core/styles";
//input
import Input from "@material-ui/core/Input";

const useStyles = withStyles({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
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
  fontStylePrimary: {
    fontFamily: theme.typography.body.fontFamily,
    fontWeight: theme.typography.body.fontWeight,
  },
});

class AppBarAppSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
    };

    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleSubmitBtn = this.handleSubmitBtn.bind(this);
  }

  handleInputValue(event) {
    this.setState({ inputValue: event.target.value });
  }

  handleSubmitBtn(event) {
    event.preventDefault();
    this.props.history.push(`/search?q=${this.state.inputValue}`);
    this.props.handleSubmit(`/search?q=${this.state.inputValue}`);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.search}>
        <form onSubmit={this.handleSubmitBtn}>
          <Input
            className={classes.fontStylePrimary}
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            required={true}
            value={this.state.inputValue}
            onChange={this.handleInputValue}
          />
        </form>
      </div>
    );
  }
}

export default useStyles(withRouter(AppBarAppSearch));
