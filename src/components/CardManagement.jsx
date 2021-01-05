import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// DB
// import { useDB_Connection } from "../DB/DB-hook/connection-hook";
// Standard Log out page
import UserIsLoggedOut from "./views/UserIsLoggedOut";
import ManageCards from "./CardManagement/ManageCards";

export default class StackManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userIsLoggedIn: props.userIsLoggedIn,
      currentUser: props.currentUser,
      currentStack: props.currentStack,
      addOrManage: false,
    };
    // * Methods
    // this.useDB_Connection = useDB_Connection;
    // presentational methods
    this.UserIsLoggedOut = UserIsLoggedOut;
  }

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
