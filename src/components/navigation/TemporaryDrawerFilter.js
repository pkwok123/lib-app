import React, { Component } from "react";
//theme
import theme from "../../Theme.js";
import { withStyles } from "@material-ui/core/styles";
//drawer
import Drawer from "@material-ui/core/Drawer";
//select
import { FormControl } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { Select } from "@material-ui/core";
//toggle
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
//icons
import IconButton from "@material-ui/core/IconButton";
import FilterListRoundedIcon from "@material-ui/icons/FilterListRounded";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import ViewListIcon from "@material-ui/icons/ViewList";

const useStyles = withStyles({
  fullList: {
    width: "auto",
    display: "flex",
    justifyContent: "center",
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
  },
  toggleContainer: {
    margin: theme.spacing(2.5),
  },
});

class TemporaryDrawerFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      sortA_ZValue: "relevance",
      sortTypeValue: "all",
      searchViewValue: "module",
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(event) {
    this.setState({ isOpen: true });
  }
  handleClose(event) {
    this.setState({ isOpen: false });
  }

  handleChange(event, viewValue) {
    if (viewValue === undefined) {
      viewValue = this.props.filterInput[2];
    }
    this.setState(
      {
        ...this.state,
        [event.target.name]: event.target.value,
        searchViewValue: viewValue,
      },
      () => {
        const filterValue = [
          this.state.sortA_ZValue,
          this.state.sortTypeValue,
          this.state.searchViewValue,
        ];
        this.props.handleFilterInput(filterValue);
      }
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <IconButton
          color="inherit"
          aria-label="filterBtn"
          name="filterBtn"
          onClick={this.handleClick}
        >
          <FilterListRoundedIcon />
        </IconButton>

        <Drawer
          anchor="bottom"
          open={this.state.isOpen}
          onClose={this.handleClose}
        >
          <div className={classes.fullList}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-sort-native-simple">
                Sort
              </InputLabel>
              <Select
                native
                value={this.props.filterInput[0]}
                onChange={this.handleChange}
                label="Sort"
                inputProps={{
                  name: "sortA_ZValue",
                  id: "outlined-sort-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                <option value={"relevance"}>Relevance</option>
                <option value={"ratingAmazon"}>Rating - Amazon</option>
                <option value={"title"}>Title</option>
                <option value={"author"}>Author</option>
                <option value={"subject"}>Subject</option>
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-type-native-simple">
                Type
              </InputLabel>
              <Select
                native
                value={this.props.filterInput[1]}
                onChange={this.handleChange}
                label="Type"
                inputProps={{
                  name: "sortTypeValue",
                  id: "outlined-type-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                <option value={"all"}>All</option>
                <option value={"book"}>Books</option>
                <option value={"dvd"}>DVDs</option>
                <option value={"cd"}>CDs</option>
                <option value={"misc"}>Misc</option>
              </Select>
            </FormControl>
            <div className={classes.toggleContainer}>
              <ToggleButtonGroup
                value={this.props.filterInput[2]}
                name="searchViewValue"
                exclusive
                onChange={this.handleChange}
                aria-label="searchViewValue"
              >
                <ToggleButton value="module" aria-label="module">
                  <ViewModuleIcon />
                </ToggleButton>
                <ToggleButton value="list" aria-label="list">
                  <ViewListIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>
        </Drawer>
      </React.Fragment>
    );
  }
}

export default useStyles(TemporaryDrawerFilter);
