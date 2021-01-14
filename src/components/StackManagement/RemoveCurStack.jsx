import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// Data update
import RemoveCurrentStack from "../../Data/Data_Update/removeCurStack";
// Icon
import Trash from "../icons/trash";

export default class RemoveCurStack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      currentStack: props.currentStack,
      redirectUser: false,
    };
    // DB actions
    this.removeThisStack = RemoveCurrentStack;
    // methods from app.js
    this.setCurrentStack = props.setCurrentStack;
    // local
    this.warning = this.warning.bind(this);
    this.deleteButton = this.deleteButton.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.deleteStackView = this.deleteStackView.bind(this);
  }

  ////////////////
  // Implementation methods
  ////////////////

  deleteHandler() {
    console.log("Request for delete on frontend");
    this.removeThisStack(this.state.currentStack.id);
    console.log("current state: ", this.state);
    let newStack = this.state.currentUser.userStacks[0].stack_id;
    console.log("new stack should be: ", newStack);
    this.setCurrentStack(newStack);
    this.setState({ redirectUser: true });
  }

  ////////////////
  // View methods
  ////////////////

  deleteButton() {
    return (
      <div id="confirmDeleteButton_Positioning">
        <div className="flipContainer">
          <div className="flipInner">
            <button
              // className="buttonStyle"
              className="buttonStyle"
              type="button"
              onClick={this.deleteHandler}
            >
              <div className="flipFront">
                <Trash className="deleteButtonIcon" />
              </div>
              <div className="flipBack">
                <span className="buttonMessage">Confirm DELETE</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  warning() {
    return (
      <div>
        <h3>
          Your current stack is:
          <strong className="currentSelectedStack">
            {" "}
            {this.state.currentStack.stackName}
          </strong>
        </h3>
        <p>
          Clicking the button will delete the stack. If you want to delete
          another stack, you must go to current stack and select the stack you
          want to delete.
        </p>
        <p>
          But, before you continue,aAre you sure about this? This action can't
          be undone.
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
      <div id="deleteCurStackWrapper">
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
