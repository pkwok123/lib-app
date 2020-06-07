import React, { Component } from "react";
//react-router-dom
import { withRouter } from "react-router-dom";
//theme
import theme from "../../Theme.js";
import {
  withStyles,
  //IconButton,
  Button,
  Typography,
  //Menu,
  //fade,
  //TextField,
} from "@material-ui/core";
//form
//import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
//import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
//import OutlinedInput from "@material-ui/core/OutlinedInput";
import { Select } from "@material-ui/core";
//import PageviewIcon from "@material-ui/icons/Pageview";
import MenuItem from "@material-ui/core/MenuItem";
//snackbar&alert
import SnackbarAlert from "../../components/feedback/SnackbarAlert";

const useStyles = withStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "90vh",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    // height: "100vh",
  },
  containerForm: {
    display: "flex",
    justifyContent: "center",
    height: "65vh",
    width: "80vh",
    background: theme.palette.primary.main,
    borderRadius: "10%",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    "& > *": {
      margin: theme.spacing(1),
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  marginForm: {
    "& > *": {
      margin: theme.spacing(1),
    },
    display: "flex",
    justifyContent: "space-evenly",
  },
  fontStyle: {
    fontFamily: theme.typography.body.fontFamily,
    fontWeight: theme.typography.body.fontWeight,
    //textTransform: "none",
  },
  fontStyleH1: {
    fontFamily: theme.typography.header.fontFamily,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
});

class AdvSearchView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isbn: "",
      type: "",
      title: "",
      series: "",
      author: "",
      subject: "",
      publish_name: "",
      publish_year: "",
      openAlert: false,
      errorMsg: "Error: Fill at least 1 field!",
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormTypeChange = this.handleFormTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAlertClose = this.handleAlertClose.bind(this);
  }

  handleFormChange(event) {
    this.setState({ ...this.state, [event.target.id]: event.target.value });
  }
  handleFormTypeChange(event) {
    //For some reason <Select> does not work with <MenuItem> (material ui components)
    //Will add subject as a <Select> later
    this.setState({ type: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    var queryValues = Object.values(this.state);
    var queryKeys = Object.keys(this.state);
    //Fix? Find a more concise if statement later and a better alert msg (Use material ui: snackbars)
    if (
      queryValues[0] === "" &&
      queryValues[1] === "" &&
      queryValues[2] === "" &&
      queryValues[3] === "" &&
      queryValues[4] === "" &&
      queryValues[5] === "" &&
      queryValues[6] === "" &&
      queryValues[7] === ""
    ) {
      return this.setState({ openAlert: true });
    } else {
      var query = "";
      var count = 0;
      for (var i = queryValues.length - 3; i >= 0; i--) {
        queryValues[i] = queryValues[i].trim();
        if (queryValues[i] !== "" && count === 0) {
          query = queryKeys[i] + "=" + queryValues[i];
          count++;
        } else if (queryValues[i] !== "" && count > 0) {
          query = query + "&" + queryKeys[i] + "=" + queryValues[i];
        }
      }
      this.props.history.push(`/search?${query}`);
    }
  }

  handleAlertClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ openAlert: false });
  }

  render() {
    const {
      isbn,
      type,
      title,
      series,
      author,
      subject,
      publish_name,
      publish_year,
    } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <SnackbarAlert
          openAlert={this.state.openAlert}
          errorMsg={this.state.errorMsg}
          handleAlertClose={this.handleAlertClose}
        />
        <div className={classes.containerForm}>
          <Typography variant="h3" className={classes.fontStyleH1}>
            Advance Search
          </Typography>

          <form
            onSubmit={this.handleSubmit}
            className={classes.form}
            //Fix? Will add autoComplete later but need to fix hightlighted autofill color
            autoComplete="off"
          >
            <div className={classes.marginForm}>
              <FormControl>
                <InputLabel htmlFor="isbn" className={classes.fontStyle}>
                  ISBN
                </InputLabel>
                <Input
                  id="isbn"
                  value={isbn}
                  onChange={this.handleFormChange}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ className: classes.input }}
                  className={classes.fontStyle}
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="title" className={classes.fontStyle}>
                  Title
                </InputLabel>
                <Input
                  id="title"
                  value={title}
                  onChange={this.handleFormChange}
                  className={classes.fontStyle}
                />
              </FormControl>
            </div>
            <div className={classes.marginForm}>
              <FormControl>
                <InputLabel htmlFor="series" className={classes.fontStyle}>
                  Series
                </InputLabel>
                <Input
                  id="series"
                  value={series}
                  onChange={this.handleFormChange}
                  className={classes.fontStyle}
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="author" className={classes.fontStyle}>
                  Author
                </InputLabel>
                <Input
                  id="author"
                  value={author}
                  onChange={this.handleFormChange}
                  className={classes.fontStyle}
                />
              </FormControl>
            </div>
            <div className={classes.marginForm}>
              <FormControl>
                <InputLabel
                  htmlFor="publish_name"
                  className={classes.fontStyle}
                >
                  Publisher
                </InputLabel>
                <Input
                  id="publish_name"
                  value={publish_name}
                  onChange={this.handleFormChange}
                  className={classes.fontStyle}
                />
              </FormControl>
              <FormControl>
                <InputLabel
                  htmlFor="publish_year"
                  className={classes.fontStyle}
                >
                  Year Published
                </InputLabel>
                <Input
                  id="publish_year"
                  value={publish_year}
                  onChange={this.handleFormChange}
                  className={classes.fontStyle}
                />
              </FormControl>
            </div>

            <div className={classes.marginForm}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="type" className={classes.fontStyle}>
                  Type
                </InputLabel>
                <Select
                  value={type}
                  onChange={this.handleFormTypeChange}
                  label="type"
                  name="type"
                  id="type"
                  className={classes.fontStyle}
                >
                  <MenuItem
                    className={classes.fontStyle}
                    aria-label="None"
                    value=""
                  />
                  <MenuItem className={classes.fontStyle} value={"book"}>
                    Books
                  </MenuItem>
                  <MenuItem className={classes.fontStyle} value={"dvd"}>
                    DVDs
                  </MenuItem>
                  <MenuItem className={classes.fontStyle} value={"cd"}>
                    CDs
                  </MenuItem>
                  <MenuItem className={classes.fontStyle} value={"misc"}>
                    Misc
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="subject" className={classes.fontStyle}>
                  Subject
                </InputLabel>
                <Input
                  id="subject"
                  value={subject}
                  onChange={this.handleFormChange}
                  className={classes.fontStyle}
                />
              </FormControl>
            </div>
            <Button
              variant="outlined"
              type="submit"
              className={classes.fontStyle}
            >
              Search
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default useStyles(withRouter(AdvSearchView));

//  Fix? Overriding the autofill highlight color with WebkitBoxShadow but it covers the label text

//     inputRoot: {
//     color: "inherit",
//   },
//   inputInput: {
//     "&:-internal-autofill-selected": {
//       backgroundColor: theme.palette.primary.main,
//     },
//   },
//   input: {
//     WebkitBoxShadow: `0 0 0 1000px ${theme.palette.primary.main} inset`,
//   },

//   <FormControl>
// <InputLabel htmlFor="isbn" className={classes.fontStyle}>
//   ISBN
// </InputLabel>
// <Input
//   placeholder="ISBN"
//   id="isbn"
//   value={isbn}
//   onChange={this.handleFormChange}
//   classes={{
//     root: classes.inputRoot,
//     input: classes.inputInput,
//   }}
//   inputProps={{ className: classes.input }}
//   className={classes.fontStyle}
// />
// </FormControl>
