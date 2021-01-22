import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// Style
import "./index.scss";
//* Navigation elements
// Base layout
import Navigation from "./components/views/Navigation";
import Title from "./components/views/Title";
// Routed layout
import StackManagement from "./components/StackManagement";
import CardManagement from "./components/CardManagement";
import LogInPage from "./components/LogInSignUp";
import CurrentStack from "./components/CurrentStack";
// import Page404 from "./components/views/Page404";
import ConsolidateChanges from "./components/views/ConsolidateChanges";
import CardSet from "./components/CardSet";
// hooks
import useDB_Connection from "./Data/DB-hook/connection-hook";
// import history from "./utils/history";
// data update functions
import updateCurrentStack from "./Data/Data_Update/updateCurrentStack";
import updateUserData from "./Data/Data_Update/updateUserData";
// dummy data: used for tests and dev
// import dummyUser from "./Data/DummyData/user.json";
// import dummyStack from "./Data/DummyData/technology.json";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userIsLoggedIn: false,
      currentUser: "",
      currentStack: "",
    };
    // Hooks
    this.useDB_Connection = useDB_Connection;
    // data (API) methods
    this.updateCurrentStack = updateCurrentStack;
    this.updateUserData = updateUserData;
    // state handling
    this.setCurrentStack = this.setCurrentStack.bind(this);
    this.logIn_User = this.logIn_User.bind(this);
    this.logOut_User = this.logOut_User.bind(this);
    // views
    this.loggedOutView = this.loggedOutView.bind(this);
    this.loggedInView = this.loggedInView.bind(this);
    // this.baseView = this.baseView.bind(this);
    this.appView = this.appView.bind(this);
  }

  ///
  //* State handling
  ///

  setCurrentStack(stackNo) {
    // retrieve new stack data from API
    updateCurrentStack(stackNo)
      .then((response) => {
        this.setState({
          currentStack: response,
        });
      })
      .then(() => {
        if (
          this.state.currentStack === '{message: "no data found on Card API"}'
        ) {
          console.log("Error retrieving data from API or non existing stack");
        }
      })
      .then(() => {
        this.setState({
          userIsLoggedIn: true,
        });
      })
      .catch((err) =>
        console.log(
          "There was an error fetching the stack data from the API:" + err
        )
      );
  }

  logIn_User(userData) {
    let stackId = userData.userStacks[0].stack_id;
    this.setState({
      currentUser: userData,
    });
    // update stack
    this.setCurrentStack(stackId);
  }

  logOut_User() {
    this.setState({
      userIsLoggedIn: false,
      currenUser: " ",
      currentStack: " ",
    });
    window.location.reload();
  }

  ///
  //* Views
  ///

  loggedInView() {
    return (
      // <div className="flex-container">
      <Router>
        <Title />
        <div id="Main_contents">
          <div id="navBar">
            <Navigation
              currentUser={this.state.currentUser}
              userIsLoggedIn={this.state.userIsLoggedIn}
              logOut_User={this.logOut_User}
            />
          </div>
          <div id="currentView">
            <Switch>
              {/* <Route exact path="/" component={BaseRoute} /> */}
              <Route
                exact
                path="/curStack"
                render={(props) => (
                  <CurrentStack
                    {...props}
                    userIsLoggedIn={this.state.userIsLoggedIn}
                    currentUser={this.state.currentUser}
                    currentStack={this.state.currentStack}
                    setCurrentStack={this.setCurrentStack}
                  />
                )}
              />
              <Route
                exact
                path="/cardManagement"
                render={(props) => (
                  <CardManagement
                    {...props}
                    userIsLoggedIn={this.state.userIsLoggedIn}
                    currentUser={this.state.currentUser}
                    userStacks={this.state.currentUser.userStacks}
                    currentStack={this.state.currentStack}
                  />
                )}
              />
              <Route
                exact
                path="/stackManagement"
                render={(props) => (
                  <StackManagement
                    {...props}
                    userIsLoggedIn={this.state.userIsLoggedIn}
                    currentUser={this.state.currentUser}
                    userStacks={this.state.currentUser.userStacks}
                    currentStack={this.state.currentStack}
                    setCurrentStack={this.setCurrentStack}
                  />
                )}
              />
              <Route
                exact
                path="/cardSet"
                render={(props) => (
                  <CardSet
                    {...props}
                    userIsLoggedIn={this.state.userIsLoggedIn}
                    currentStack={this.state.currentStack}
                  />
                )}
              />
              <Route
                exact
                path="/consolidateChanges"
                render={(props) => (
                  <ConsolidateChanges
                    {...props}
                    userIsLoggedIn={this.state.userIsLoggedIn}
                    currentStack={this.state.currentStack}
                  />
                )}
              />
              <Route exact path="/logIn">
                {this.state.userIsLoggedIn ? (
                  <Redirect to="/curStack" />
                ) : (
                  <Redirect to="/logIn" />
                )}
              </Route>
              {/* <Route exact path="/">
              <Redirect to="/curStack" />
            </Route> */}
              <Route exact path="*">
                {this.state.userIsLoggedIn ? (
                  <Redirect to="/curStack" />
                ) : (
                  <Redirect to="/logIn" />
                )}
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
      // </div>
    );
  }

  loggedOutView() {
    return (
      <div id="loggedOutView">
        <Router>
          <Route
            exact
            path="/logIn"
            render={(props) => (
              <LogInPage
                {...props}
                userIsLoggedIn={this.state.userIsLoggedIn}
                currentUser={this.state.currentUser}
                logIn_User={this.logIn_User}
              />
            )}
          />
          <Route exact path="*">
            {this.state.userIsLoggedIn ? (
              <Redirect to="/curStack" />
            ) : (
              <Redirect to="/logIn" />
            )}
          </Route>
        </Router>
      </div>
    );
  }

  appView() {
    // console.log("APP View reload");
    if (this.state.userIsLoggedIn === true) {
      return <div id="user_is_logged_in">{this.loggedInView()}</div>;
    } else {
      return <div id="user_is_logged_out">{this.loggedOutView()}</div>;
    }
  }

  render() {
    return <div id="App_View">{this.appView()}</div>;
  }
}
