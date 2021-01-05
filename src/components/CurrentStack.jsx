import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// internal componentes
import ReadCards from "./CurrentStack/ReadCards";
import SelectNewStack from "./CurrentStack/SelectNewStack";
// Standard Log out page
import UserIsLoggedOut from "./views/UserIsLoggedOut";
// Style
import "../../src/index.css";
// Icons
import Collection from "./icons/collection";
import CheckEye from "./icons/checkEye";

export default class currentStack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      userIsLoggedIn: props.userIsLoggedIn,
      userStacks: props.userStacks,
      currentStack: props.currentStack,
      readOrSelect: true,
      update: false,
    };
    // components
    this.UserIsLoggedOut = UserIsLoggedOut;
    this.ReadCards = ReadCards;
    this.selectNewStack = SelectNewStack;
    // methods from app.js
    this.setCurrentStack = props.setCurrentStack;
    // Methods
    this.changeStackButton = this.changeStackButton.bind(this);
    this.currentStackLayout = this.currentStackLayout.bind(this);
    this.readSelectSwitch = this.readSelectSwitch.bind(this);
    this.SelectDifferentStackButton = this.SelectDifferentStackButton.bind(
      this
    );
    // Views
    this.currentStackView = this.currentStackView.bind(this);
  }

  readSelectSwitch() {
    console.log("read, select");
    this.setState((state) => ({
      readOrSelect: !state.readOrSelect,
    }));
  }

  SelectDifferentStackButton() {
    return (
      <div id="readSelectButton_Positioning">
        <div className="flipContainer">
          <div className="flipInner">
            <button
              className="buttonStyle"
              type="button"
              onClick={this.readSelectSwitch}
            >
              <div className="flipFront">
                <Collection className="readSelectButtonStyle" />
              </div>
              <div className="flipBack">
                <span className="buttonMessage">Select a different stack</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  ReadStackButton() {
    return (
      <div id="readSelectButton_Positioning">
        <div className="flipContainer">
          <div className="flipInner">
            <button
              className="buttonStyle"
              type="button"
              onClick={this.readSelectSwitch}
            >
              <div className="flipFront">
                <CheckEye className="readSelectButtonStyle" />
              </div>
              <div className="flipBack">
                <span className="buttonMessage">Read current stack</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  changeStackButton() {
    return (
      <div id="buttonArea">
        {this.state.readOrSelect ? (
          <div>{this.SelectDifferentStackButton()}</div>
        ) : (
          <div>{this.ReadStackButton()}</div>
        )}
      </div>
    );
  }

  currentStackLayout() {
    return (
      <React.Fragment>
        <div id="currentStackLayout">
          {this.changeStackButton()}
          <div id="saluteTheUser">
            <h3>Hi {this.state.currentUser.firstName}, welcome back </h3>
            <br />
            <p>The current stack is: {this.state.currentStack.stackName}</p>
          </div>
          <div className="cardViewWrap">
            {this.state.readOrSelect ? (
              <ReadCards
                userIsLoggedIn={this.state.userIsLoggedIn}
                currentUser={this.state.currentUser}
                currentStack={this.state.currentStack}
              />
            ) : (
              <SelectNewStack
                userIsLoggedIn={this.state.userIsLoggedIn}
                currentStack={this.state.currentStack}
                currentUser={this.state.currentUser}
                setCurrentStack={this.setCurrentStack}
              />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }

  currentStackView() {
    return (
      <div id="currentStackView">
        {this.state.userIsLoggedIn ? (
          <div id="loggedInView">{this.currentStackLayout()}</div>
        ) : (
          <div>
            <Redirect to="/" />
          </div>
        )}
        {/* {this.checkForConsistency()} */}
      </div>
    );
  }

  render() {
    return <React.Fragment>{this.currentStackView()}</React.Fragment>;
  }
}
