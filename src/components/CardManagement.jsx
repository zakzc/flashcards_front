import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// Standard Log out page
import UserIsLoggedOut from "./views/UserIsLoggedOut";
import ManageCards from "./CardManagement/ManageCards";

export default class CardManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userIsLoggedIn: props.userIsLoggedIn,
      currentUser: props.currentUser,
      currentStack: props.currentStack,
      addOrManage: false,
    };
    // * Methods
    this.UserIsLoggedOut = UserIsLoggedOut;
  }

  ////////////////
  // View methods
  ////////////////

  cardManagementLayout() {
    return (
      <React.Fragment>
        <div id="cardManagementLayout">
          <ManageCards
            userIsLoggedIn={this.state.userIsLoggedIn}
            currentUser={this.state.currentUser}
            currentStack={this.state.currentStack}
          />
        </div>
      </React.Fragment>
    );
  }

  cardManagementView() {
    // console.log("CARD MANAGEMENT");
    return (
      <React.Fragment>
        <div id="cardManagementView">
          {this.state.userIsLoggedIn ? (
            <div id="loggedInView">{this.cardManagementLayout()}</div>
          ) : (
            <Redirect to="/login" />
          )}
        </div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        <div id="cardManagementView">{this.cardManagementView()}</div>
      </React.Fragment>
    );
  }
}
