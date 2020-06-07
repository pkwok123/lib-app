import React, { Component } from "react";
//react-router-dom
import { Switch, Route, Link, Redirect } from "react-router-dom";
//theme
import theme from "./Theme.js";
import { ThemeProvider } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
//nav
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuListComposition from "./components/navigation/MenuListComposition.js";
//icons
import HomeBtn from "./components/data-display/icons/HomeBtn";
import SearchBar from "./components/inputs/SearchBar";
import HideFilterBtn from "./components/data-display/icons/HideFilterBtn";
import CartBtn from "./components/data-display/icons/CartBtn";
//views
import AdvSearchView from "./views/app/AdvSearchView.js";
import BrowseView from "./views/app/BrowseView";
import CartView from "./views/app/CartView";
import FavoriteView from "./views/app/FavoriteView.js";
import ItemView from "./views/app/ItemView";
import NotificationView from "./views/app/NotificationView";
import ProfileView from "./views/app/ProfileView.js";
import SearchView from "./views/app/SearchView";
import SettingsView from "./views/app/SettingsView.js";
import NoMatchView from "./views/app/NoMatchView.js";

const useStyles = withStyles({
  containerApp: {
    minHeight: "100vh",
    minWidth: "100%",
    backgroundImage: theme.background.image,
    backgroundSize: theme.background.size,
    backgroundRepeat: "repeat-y",
    // position: "absolute",
    // top: 0,
    // left: 0,
    // zIndex: -1,
  },
  // containerContent: {
  //   display: "flex",
  //   flexDirection: "column",
  //   minHeight: "90vh",
  // },
  // appBar: {
  //   minHeight: "10vh",
  // },
  // toolBar: {
  //   minHeight: "10vh",
  // },
  containerHomeBtn: {
    flexGrow: 1,
    paddingLeft: 10,
  },
  containerSearchBar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    paddingRight: 15,
    paddingBottom: 10,
  },
  containerAdvSearch: {
    position: "absolute",
    minHeight: 4,
    paddingTop: 35,
    paddingRight: 5,
  },
  fontAdvSearch: {
    color: "#000000",
    textDecoration: "none",
    "&:hover": {
      fontWeight: "bold",
    },
  },
  fontStyle: {
    fontFamily: theme.typography.header.fontFamily,
    fontSize: 15,
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadedSearch: false,
      isLoadedItem: false,
      errorSearch: null,
      errorItem: null,
      searchInput: "",
      filterInput: ["relevance", "all", "module"],
      fetchedItems: [],
      fetchedItem: {},
      sortedTypeItems: [],
      sortedA_ZItems: [],
      searchItems: [],
      shouldAnimate: true,
    };

    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleItemFetch = this.handleItemFetch.bind(this);
    this.handleFilterInput = this.handleFilterInput.bind(this);
    this.sortA_Z = this.sortA_Z.bind(this);
    this.sortType = this.sortType.bind(this);
  }

  handleSearchInput(passSearchInput) {
    if (
      this.state.searchInput !== passSearchInput &&
      passSearchInput !== null
    ) {
      this.setState(
        {
          searchInput: passSearchInput,
          isLoadedSearch: false,
          errorSearch: null,
          shouldAnimate: true,
        },
        () => {
          fetch(`/api/items${this.state.searchInput}`)
            .then((res) => res.json())
            .then(
              (result) => {
                this.setState(
                  {
                    isLoadedSearch: true,
                    fetchedItems: result,
                  },
                  () => {
                    const sortA_Z = this.sortA_Z(
                      this.state.fetchedItems,
                      this.state.filterInput[0]
                    );
                    this.setState({ sortedA_ZItems: sortA_Z }, () => {
                      const sortType = this.sortType(
                        this.state.sortedA_ZItems,
                        this.state.filterInput[1]
                      );
                      this.setState({
                        sortedTypeItems: sortType,
                        searchItems: sortType,
                      });
                    });
                  }
                );
              },
              (errorSearch) => {
                this.setState({
                  isLoadedSearch: true,
                  errorSearch,
                });
              }
            );
        }
      );
    }
  }

  handleItemFetch(itemID) {
    this.setState({ shouldAnimate: false });
    const fetched = this.state.fetchedItems.filter(
      (item) => item._id === itemID
    );
    if (fetched.length !== 0) {
      this.setState({ fetchedItem: fetched[0] });
    } else {
      //If single item is loaded as the first page of the history stack
      fetch(`/api/items/item?_id=${itemID}`)
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({ isLoadedItem: true, fetchedItem: result });
          },
          (errorItem) => {
            this.setState({ isLoadedItem: true, errorItem });
          }
        );
    }
  }

  handleFilterInput(passFilterInput) {
    if (
      this.state.filterInput[1] !== passFilterInput[1] ||
      this.state.filterInput[2] !== passFilterInput[2]
    ) {
      this.setState({ shouldAnimate: true });
    }
    //fix? optimize? by filter
    if (this.state.filterInput !== passFilterInput) {
      this.setState({ filterInput: passFilterInput }, () => {
        if (this.state.fetchedItems !== []) {
          const sortA_Z = this.sortA_Z(
            this.state.fetchedItems,
            this.state.filterInput[0]
          );
          this.setState({ sortedA_ZItems: sortA_Z }, () => {
            const sortType = this.sortType(
              this.state.sortedA_ZItems,
              this.state.filterInput[1]
            );
            this.setState({
              sortedTypeItems: sortType,
              searchItems: sortType,
            });
          });
        }
      });
    }
  }

  sortA_Z(items, sortValue) {
    if (sortValue === "ratingAmazon" || sortValue === "ratingMcc") {
      let rating = "rating";
      let value = "mcc";
      if (sortValue === "ratingAmazon") {
        value = "amazon";
      }
      return [...items].sort((a, b) => {
        var varA = a[rating][value];
        var varB = b[rating][value];
        if (varA < varB) {
          return 1;
        }
        if (varA > varB) {
          return -1;
        }
        return 0;
      });
    } else if (sortValue !== "relevance") {
      return [...items].sort((a, b) => {
        var varA = a[sortValue];
        var varB = b[sortValue];
        if (varA < varB) {
          return -1;
        }
        if (varA > varB) {
          return 1;
        }
        return 0;
      });
    } else {
      return items;
    }
  }

  sortType(items, sortValue) {
    if (sortValue !== "all") {
      return [...items].filter((items) => items.type === sortValue);
    } else {
      return items;
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <div className={classes.containerApp}>
          {/* Nav */}
          <AppBar position="sticky" className={classes.appBar}>
            <Toolbar className={classes.toolBar}>
              <MenuListComposition />
              <div className={classes.containerHomeBtn}>
                <Link to="/browse">
                  <HomeBtn />
                </Link>
              </div>
              <div className={classes.containerSearchBar}>
                <SearchBar handleSubmit={this.handleSearchInput} />
                <div className={classes.containerAdvSearch}>
                  <Link to="/advsearch" className={classes.fontAdvSearch}>
                    <Typography
                      variant="caption"
                      align="right"
                      className={classes.fontStyle}
                    >
                      Advance Search
                    </Typography>
                  </Link>
                </div>
              </div>
              <HideFilterBtn
                filterInput={this.state.filterInput}
                handleFilterInput={this.handleFilterInput}
              />
              <Link to="/cart">
                <CartBtn />
              </Link>
            </Toolbar>
          </AppBar>
          {/* Routes */}
          <div className={classes.containerContent}>
            <Switch>
              <Redirect exact from="/" to="/browse" />
              <Route path="/browse" component={BrowseView} />
              <Route
                path={`/search`}
                render={(props) => (
                  <SearchView
                    {...props}
                    isLoadedSearch={this.state.isLoadedSearch}
                    errorSearch={this.state.errorSearch}
                    passItems={this.state.searchItems}
                    toggleViewValue={this.state.filterInput[2]}
                    currentSearchInput={this.state.searchInput}
                    getItems={this.handleSearchInput}
                    shouldAnimate={this.state.shouldAnimate}
                  />
                )}
              ></Route>
              <Route path="/advsearch" component={AdvSearchView} />
              <Route path="/cart" render={(props) => <CartView />} />
              <Route path="/profile" component={ProfileView} />
              <Route path="/favorite" component={FavoriteView} />
              <Route path="/notification" component={NotificationView} />
              <Route path="/settings" component={SettingsView} />
              <Route
                path={`/item`}
                render={(props) => (
                  <ItemView
                    {...props}
                    passItem={this.state.fetchedItem}
                    getItemID={this.handleItemFetch}
                    errorItem={this.state.errorItem}
                  />
                )}
              />
              <Route component={NoMatchView} />
            </Switch>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

export default useStyles(App);
