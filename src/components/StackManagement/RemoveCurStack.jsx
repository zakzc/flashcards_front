import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// Data update
import RemoveCurrentStack from "../../Data/Data_Update/removeCurStack";
// Icon
import Trash from "../icons/trash";
// In case there are no stacks
import sampleStack from "../../Data/DummyData/sampleCards.json";

export default class RemoveCurStack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      currentStack: props.currentStack,
      stackName: props.stackName,
      token: props.token,
      redirectUser: false,
      messageToUser:
        "Clicking the button will delete the stack. If you want to delete another stack, you must go to current stack and select the stack you want to delete.",
    };
    // DB actions
    // this.removeThisStack = RemoveCurrentStack;
    // methods from app.js
    this.setCurrentStack = props.setCurrentStack;
    // local
    this.warning = this.warning.bind(this);
    this.deleteButton = this.deleteButton.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.deleteStackView = this.deleteStackView.bind(this);
    // fallback stack
    this.sampleStack = sampleStack;
  }
  ////////////////
  // Implementation methods
  ////////////////

  async deleteHandler() {
    console.log(
      "Check pre deletion: ",
      this.state.currentStack._id,
      this.state.currentUser.userStacks.length
    );
    if (this.state.currentUser.userStacks.length === 1) {
      this.setState({
        messageToUser:
          "You cannot delete your only stack. You need to have at least one stack.",
      });
    } else {
      let removeProcess;
      removeProcess = await RemoveCurrentStack(
        this.state.currentStack._id,
        this.state.token
      )
        .then(() => {
          if (
            this.state.currentUser.userStacks[0].stack_id &&
            this.state.currentUser.userStacks[0].stack_id !== undefined
          ) {
            this.setCurrentStack(this.state.currentUser.userStacks[0].stack_id);
          } else {
            this.setCurrentStack(sampleStack);
          }
        })
        .then(() => {
          this.setState({ redirectUser: true });
        })
        .catch((err) => {
          console.log("Error on deletion process (error 36). ", err);
        });
      if (!removeProcess) {
        removeProcess = false;
        return removeProcess;
      }
    }
  }

  ////////////////
  // View methods
  ////////////////

  deleteButton() {
    return (
      <button
        // className="buttonStyle"
        className="buttonStyle"
        type="button"
        onClick={this.deleteHandler}
      >
        <div className="flipContainer">
          <div className="flipInner">
            <div className="flipFront">
              <Trash />
            </div>
            <div className="flipBack">
              <span className="buttonMessage">Confirm DELETE</span>
            </div>{" "}
          </div>
        </div>
      </button>
    );
  }

  warning() {
    return (
      <div>
        <h3>
          Your current stack is:
          <strong className="currentSelectedStack">
            {" "}
            {this.state.stackName}
          </strong>
        </h3>
        <div className="infoCard">{this.state.messageToUser}</div>
        <p></p>
        <p>
          But, before you continue,are you sure about this? This action can't be
          undone.
        </p>
      </div>
    );
  }

  redirectToConsolidate() {
    return (
      <div>
        <Redirect to="/consolidateChanges" />
      </div>
    );
  }

  deleteStackView() {
    return (
      <div id="deleteCurStackLayout">
        <div id="deleteWarning">{this.warning()}</div>
        <div id="deleteButtonConfirmation">{this.deleteButton()}</div>
        {this.state.redirectUser ? this.redirectToConsolidate() : <div></div>}
      </div>
    );
  }

  render() {
    return <div id="deleteStackView"> {this.deleteStackView()}</div>;
  }
}
