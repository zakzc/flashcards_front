import React, { Component } from "react";
import LogInPage from "./LogInSignUp/LogInPage";
import SignUpPage from "./LogInSignUp/SignUpPage";
// import { useDB_Connection } from "../DB/DB-hook/connection-hook";
// Style
import "../../src/index.css";

export default class LogInSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      userIsLoggedIn: props.userIsLoggedIn,
      logInOrSignUpState: true,
    };
    // ** Binding
    //this.updateUser = props.updateUser.bind(this);
    //this.updateStack = props.updateStack.bind(this);
    this.logIn_User = props.logIn_User.bind(this);
    this.LogInPage = LogInPage.bind(this);
    this.SignUpPage = SignUpPage.bind(this);
    this.logInOrSignUpSwitch = this.logInOrSignUpSwitch.bind(this);
    this.logInOrSignUpDisplay = this.logInOrSignUpDisplay.bind(this);
    this.logInSignUpView = this.logInSignUpView.bind(this);
  }

  ////////////////
  // Implementation methods
  ////////////////

  logInOrSignUpSwitch() {
    this.setState((state) => ({
      logInOrSignUpState: !state.logInOrSignUpState,
    }));
  }

  ////////////////
  // View methods
  ////////////////

  logInOrSignUpDisplay() {
    return (
      <div id="logInOrSignUpLayout">
        <div id="buttonArea">
          <button
            type="button"
            className="buttonStyle"
            onClick={this.logInOrSignUpSwitch}
          >
            {this.state.logInOrSignUpState ? (
              <p>Sign up instead</p>
            ) : (
              <p> Log in instead</p>
            )}
          </button>
        </div>
        <div id="logInOrSignUpViewSwitch">
          {this.state.logInOrSignUpState ? (
            <LogInPage
              user={this.state.currentUser}
              currentStack={this.state.currentStack}
              logIn_User={this.logIn_User}
            />
          ) : (
            <SignUpPage
              user={this.state.currentUser}
              currentStack={this.state.currentStack}
              updateUser={this.updateUser}
              logInOrSignUpSwitch={this.logInOrSignUpSwitch}
            />
          )}
        </div>
      </div>
    );
  }

  logInSignUpView() {
    console.log("LOG IN SIGN UP");
    return (
      <React.Fragment>
        <div id="loggedInOrSignUpView">
          {this.state.userIsLoggedIn
            ? this.state.userIsLoggedIn
            : this.logInOrSignUpDisplay()}
        </div>
      </React.Fragment>
    );
  }

  render() {
    return <React.Fragment>{this.logInSignUpView()}</React.Fragment>;
  }
}
