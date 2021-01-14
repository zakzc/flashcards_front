import React, { Component } from "react";
// import history from "../../utils/history";
import { Redirect } from "react-router-dom";
// hooks
//import { useDB_Connection } from "../../DB/DB-hook/connection-hook";

export default class SelectNewStack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userIsLoggedIn: props.userIsLoggedIn,
      currentStack: props.currentStack,
      currentUser: props.currentUser,
      chosenStackId: "",
      chosenStackName: "",
      confirmation: false,
      redirect: false,
    };
    // methods from parent comp
    this.setCurrentStack = props.setCurrentStack;
    //this.selectStackUpdatedStack = props.selectStackUpdatedStack;
    // local methods
    this.stackSelector = this.stackSelector.bind(this);
    this.chooseNewStack = this.chooseNewStack.bind(this);

    this.getNewStackName = this.getNewStackName.bind(this);
    this.confirmNewStack = this.confirmNewStack.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
    //this.reloadApp = this.reloadApp.bind(this);
    // views
    this.chooseNewStackView = this.chooseNewStackView.bind(this);
    this.preSelectView = this.preSelectView.bind(this);
    this.afterSelectView = this.afterSelectView.bind(this);
  }

  getNewStackName(newStackID) {
    let listOfStacks = this.state.currentUser.userStacks;
    for (let l in listOfStacks) {
      // console.log("Checking: ", l, listOfStacks[l].stack_id);
      if (newStackID === listOfStacks[l].stack_id) {
        return listOfStacks[l].stack_name;
      }
    }
  }

  // Chooses new option
  chooseNewStack(e) {
    let newStack = e.target.value;
    let newStackName = this.getNewStackName(newStack);
    // console.log("choose stack: ", newStack, "name: ", newStackName);
    this.setState({
      chosenStackId: newStack,
      chosenStackName: newStackName,
      confirmation: true,
    });
  }

  stackSelector() {
    return (
      <select className="select-css" onChange={this.chooseNewStack}>
        <option value="0">Select new stack</option>
        {this.state.currentUser.userStacks.map((s) => {
          return (
            <option key={s.stack_name} value={s.stack_id}>
              {s.stack_name}
            </option>
          );
        })}
      </select>
    );
  }

  renderRedirect() {
    if (this.state.redirect) {
      return (
        <Redirect
          to="/consolidateChanges"
          userIsLoggedIn={this.state.userIsLoggedIn}
        />
      );
    }
  }

  confirmNewStack() {
    this.setState({ redirect: true });
    this.setCurrentStack(this.state.chosenStackId);
  }

  ////////////////
  // View methods
  ////////////////

  confirmationButton() {
    return (
      <div>
        <h3> You chose: {this.state.chosenStackName}</h3>
        {this.renderRedirect()}
        <button
          className="buttonStyle"
          type="button"
          onClick={this.confirmNewStack}
        >
          Confirm change
        </button>
      </div>
    );
  }

  preSelectView() {
    return (
      <div id="StackSelection">
        <h2>
          Hi there. Your current stack of cards is:{" "}
          <strong className="currentSelectedStack">
            {this.state.currentStack.stackName}
            {". "}
          </strong>
        </h2>
        <h3>Which stack do you want to select?</h3>
        {this.stackSelector()}
      </div>
    );
  }

  afterSelectView() {
    return (
      <div id="confirmation">
        {this.state.confirmation ? this.confirmationButton() : <br />}
      </div>
    );
  }

  chooseNewStackView() {
    return (
      <div>
        {this.state.confirmation
          ? this.afterSelectView()
          : this.preSelectView()}
      </div>
    );
  }

  selectNewStackView() {
    return (
      <div id="cardSetView">
        {this.state.userIsLoggedIn ? (
          <div id="loggedInView">{this.chooseNewStackView()}</div>
        ) : (
          <Redirect to="/" />
        )}
      </div>
    );
  }

  render() {
    return <React.Fragment>{this.selectNewStackView()}</React.Fragment>;
  }
}
