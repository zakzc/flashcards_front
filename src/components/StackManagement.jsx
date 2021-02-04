import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// Data Methods
import RemoveCurStack from "./StackManagement/RemoveCurStack";
import AddNewStack from "./StackManagement/AddNewStack";
import ExportStack from "./StackManagement/exportStack";
// DB
// import { useDB_Connection } from "../DB/DB-hook/connection-hook";
// Standard Log out page
import UserIsLoggedOut from "./views/UserIsLoggedOut";
// Icon
import Plus from "./icons/plus";
import Trash from "./icons/trash";
import Export from "./icons/export";

export default class StackManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userIsLoggedIn: props.userIsLoggedIn,
      currentUser: props.currentUser,
      currentStack: props.currentStack,
      token: props.token,
      add: true,
      export: false,
      delete: false,
    };
    // * Methods
    // hooks
    // this.useDB_Connection = useDB_Connection;
    // methods from app.js
    this.setCurrentStack = props.setCurrentStack;
    // local
    this.UserIsLoggedOut = UserIsLoggedOut;
    this.AddSwitch = this.AddSwitch.bind(this);
    this.exportSwitch = this.exportSwitch.bind(this);
    this.deleteSwitch = this.deleteSwitch.bind(this);
    this.addStackButton = this.addStackButton.bind(this);
    this.exportStackButton = this.exportStackButton.bind(this);
    this.deleteStackButton = this.deleteStackButton.bind(this);
    this.stackNav = this.stackNav.bind(this);
    this.StackMessage = this.StackMessage.bind(this);
    this.chosenFunctionality = this.chosenFunctionality.bind(this);
    this.StackManagementLayout = this.StackManagementLayout.bind(this);
  }

  ////////////////
  // Implementation methods
  ////////////////

  AddSwitch() {
    this.setState((state) => ({
      add: true,
      export: false,
      delete: false,
    }));
  }

  exportSwitch() {
    this.setState((state) => ({
      add: false,
      export: true,
      delete: false,
    }));
  }

  deleteSwitch() {
    this.setState((state) => ({
      add: false,
      export: false,
      delete: true,
    }));
  }

  ////////////////
  // View methods
  ////////////////

  addStackButton() {
    return (
      <button
        // className="buttonStyle"
        className={this.state.add ? "buttonIsActive" : "buttonIsOff"}
        type="button"
        onClick={this.AddSwitch}
      >
        <div className="flipContainer">
          <div className="flipInner">
            <div className="flipFront">
              <Plus />
            </div>
            <div className="flipBack">
              <span className="buttonMessage">NEW stack</span>
            </div>
          </div>
        </div>
      </button>
    );
  }

  exportStackButton() {
    return (
      <button
        // className="buttonStyle"
        className={this.state.export ? "buttonIsActive" : "buttonIsOff"}
        type="button"
        onClick={this.exportSwitch}
      >
        <div className="flipContainer">
          <div className="flipInner">
            <div className="flipFront">
              <Export />
            </div>
            <div className="flipBack">
              <span className="buttonMessage">Download</span>
            </div>
          </div>
        </div>
      </button>
    );
  }

  deleteStackButton() {
    return (
      <button
        // className="buttonStyle"
        className={this.state.delete ? "buttonIsActive" : "buttonIsOff"}
        type="button"
        onClick={this.deleteSwitch}
      >
        <div className="flipContainer">
          <div className="flipInner">
            <div className="flipFront">
              <Trash />
            </div>
            <div className="flipBack">
              <span className="buttonMessage">Delete</span>
            </div>{" "}
          </div>
        </div>
      </button>
    );
  }

  stackNav() {
    return (
      <div id="StackNav">
        <div id="stackNavLeft" className="optionIsActive">
          {this.addStackButton()}
        </div>
        <div id="stackNavCenter">{this.exportStackButton()}</div>
        <div id="stackNavRight">{this.deleteStackButton()}</div>
      </div>
    );
  }

  chosenFunctionality() {
    return (
      <div id="chosenFunctionalityArea">
        {this.state.add ? (
          <AddNewStack
            userIsLoggedIn={this.state.userIsLoggedIn}
            currentUser={this.state.currentUser}
            currentStack={this.state.currentStack}
            token={this.state.token}
          />
        ) : (
          <div></div>
        )}
        {this.state.export ? (
          <ExportStack
            userIsLoggedIn={this.state.userIsLoggedIn}
            currentUser={this.state.currentUser}
            currentStack={this.state.currentStack}
            stackName={this.state.currentStack.stackName}
            // setCurrentStack={this.setCurrentStack}
          />
        ) : (
          <div></div>
        )}
        {this.state.delete ? (
          <RemoveCurStack
            userIsLoggedIn={this.state.userIsLoggedIn}
            currentUser={this.state.currentUser}
            currentStack={this.state.currentStack}
            setCurrentStack={this.setCurrentStack}
            stackName={this.state.currentStack.stackName}
            token={this.state.token}
          />
        ) : (
          <div></div>
        )}
      </div>
    );
  }

  StackMessage() {
    return (
      <div id="stackMessage">
        <h2>
          Here you can manage your stack. You can: add a new stack, download or
          delete the current stack. Choose the option bellow:
        </h2>
      </div>
    );
  }

  StackManagementLayout() {
    return (
      <React.Fragment>
        <div id="stackManLayout">
          {this.StackMessage()}
          {this.stackNav()}
          {this.chosenFunctionality()}
        </div>
      </React.Fragment>
    );
  }

  StackManagementView() {
    // console.log("STACK MANAGEMENT");
    return (
      <div id="StackManagementView">
        {this.state.userIsLoggedIn ? (
          <div id="loggedInView">{this.StackManagementLayout()}</div>
        ) : (
          <Redirect to="/login" />
        )}
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        <div id="StackManagementView">{this.StackManagementView()}</div>
      </React.Fragment>
    );
  }
}
