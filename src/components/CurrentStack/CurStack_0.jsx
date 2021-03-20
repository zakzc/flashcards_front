import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// internal components
import ReadCards from "./CurStack_ReadCards";
import SelectNewStack from "./CurStack_SelectNewStack";
// Standard Log out page
import UserIsLoggedOut from "../views/UserIsLoggedOut";
// Style
import "../../../src/index.css";
// Icons
import Collection from "../../assets/icons/collection";
import CheckEye from "../../assets/icons/checkEye";

export default class CurrentStack extends Component {
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
    this.currentStackView = this.currentStackView.bind(this);
  }

  ////////////////
  // Implementation methods
  ////////////////

  readSelectSwitch() {
    this.setState((state) => ({
      readOrSelect: !state.readOrSelect,
    }));
  }

  ////////////////
  // View methods
  ////////////////

  SelectDifferentStackButton() {
    return (
      <button
        className="buttonStyle"
        type="button"
        onClick={this.readSelectSwitch}
      >
        <div className="flipContainer">
          <div className="flipInner">
            <div className="flipFront">
              <Collection />
            </div>
            <div className="flipBack">
              <span className="buttonMessage">Select stack</span>
            </div>
          </div>
        </div>
      </button>
    );
  }

  ReadStackButton() {
    return (
      <button
        className="buttonStyle"
        type="button"
        onClick={this.readSelectSwitch}
      >
        <div className="flipContainer">
          <div className="flipInner">
            <div className="flipFront">
              <CheckEye />
            </div>
            <div className="flipBack">
              <span className="buttonMessage">Read stack</span>
            </div>
          </div>
        </div>
      </button>
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
          <div id="tinyNavBar">
            <div id="saluteTheUser">
              <h3>Hi {this.state.currentUser.firstName}, welcome back </h3>
              <br />
              <p>
                The current stack is:{" "}
                <span className="highlight">
                  {this.state.currentStack.stackName}
                </span>
              </p>
              <p>
                Hover over the card to see the back, or click on it if you are
                on
              </p>
              a mobile.
            </div>
            {this.changeStackButton()}
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
    // console.log("CURRENT STACK");
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
