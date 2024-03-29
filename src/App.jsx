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
import Navigation from "./components/Navigation/NavBar_0";
import Title from "./components/Title/Title";
// Routed layout
import StackManagement from "./components/StackManagement/StackMan_0";
import CardManagement from "./components/CardManagement/CardMan_0";
import LogInSignUp from "./components/LogInSignUp/LogSign_0";
import CurrentStack from "./components/CurrentStack/CurStack_0";
// import Page404 from "./components/views/Page404";
import ConsolidateChanges from "./components/views/ConsolidateChanges";
import CardSet from "./components/CardSet/CardSet_0";
// hooks
// import useDB_Connection from "./Data/DB-hook/connection-hook";
// data update functions
import updateCurrentStack from "./utils/Data_Update/updateCurrentStack";
// import updateUserData from "./Data/Data_Update/updateUserData";
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
      token: "",
      messageToUser: "Welcome to Flashcards. Log in or Sign up.",
    };
    // Hooks
    // this.useDB_Connection = useDB_Connection;
    // data (API) methods
    this.updateCurrentStack = updateCurrentStack;
    // this.updateUserData = updateUserData;
    // state handling
    this.setCurrentStack = this.setCurrentStack.bind(this);
    this.logIn_User = this.logIn_User.bind(this);
    this.logOut_User = this.logOut_User.bind(this);
    // views
    this.loggedOutView = this.loggedOutView.bind(this);
    this.loggedInView = this.loggedInView.bind(this);
    this.InformationCard_App = this.InformationCard_App.bind(this);
    // this.baseView = this.baseView.bind(this);
    this.appView = this.appView.bind(this);
  }

  ///
  //* State handling
  ///

  // TODO: update app to reflect changes on the API feedback.
  async setCurrentStack(stackNo) {
    // retrieve new stack data from API
    // console.log("STACK IN\n. Request for: ", stackNo);
    let letsUpdateStack;
    letsUpdateStack = await updateCurrentStack(stackNo, this.state.token)
      .then((letsUpdateStack) => {
        this.setState({ currentStack: letsUpdateStack });
      })
      .then(() => {
        this.setState({
          userIsLoggedIn: !!this.state.currentUser.token,
        });
      })
      .catch((err) => {
        console.log("Error on Stack Update. Error 76.\n", err);
        this.setState({
          messageToUser: "There was an error on the Log In(error 76).",
        });
      });
    if (!letsUpdateStack) {
      letsUpdateStack = false;
      return letsUpdateStack;
    }
  }

  logIn_User(userData) {
    let stackId = userData.userStacks[0].stack_id;
    const logInToken = userData.token;
    this.setState({
      currentUser: userData,
      messageToUser: "Log in being processed.",
      token: logInToken,
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

  InformationCard_App() {
    return (
      <div className="infoCard">
        <p>{this.state.messageToUser}</p>
      </div>
    );
  }

  loggedInView() {
    return (
      // <div className="flex-container">
      <Router>
        <Title logOut_User={this.logOut_User} />
        <div id="Main_contents">
          <div id="navBar">
            <Navigation
              currentUser={this.state.currentUser}
              userIsLoggedIn={this.state.userIsLoggedIn}
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
                    token={this.state.token}
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
                    token={this.state.token}
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
                    cards={this.state.currentStack.cards}
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
        </div>{" "}
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
              <LogInSignUp
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
        {this.InformationCard_App()}
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
