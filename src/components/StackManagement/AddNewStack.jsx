import React, { Component } from "react";
// hooks
import useDB_Connection from "../../Data/DB-hook/connection-hook";
// Icons
import Consolidate from "../icons/consolidate";
import Plus from "../icons/plus";
import Right from "../icons/right";

export default class AddNewStack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      currentStack: props.currentStack,

      newFront: "",
      newBack: "",
      newStackName: "",
      newCardsToStack: [],

      readyToSend: true,
    };
    this.handleSubmitAddCardHandler = this.handleSubmitAddCardHandler.bind(
      this
    );
    this.handleFrontCardChange = this.handleFrontCardChange.bind(this);
    this.StackNameSubmitHandler = this.StackNameSubmitHandler.bind(this);
    this.AddCardForm = this.AddCardForm.bind(this);
    this.consolidateNewStack = this.consolidateNewStack.bind(this);
    this.handleSubmitReady = this.handleSubmitReady.bind(this);
    this.consolidateButtonStack = this.consolidateButtonStack.bind(this);
    this.infoCard = this.infoCard.bind(this);
    this.checkButton = this.checkButton.bind(this);
    this.AddCardButton = this.AddCardButton.bind(this);
  }

  handleAddNewStack() {
    // gets the data form the state, creates the new stack and invokes consolidate
    // to send the data to API
    console.log("handle new stack");
  }

  consolidateNewStack(newStack) {
    // let requestBody = newStack;
    let requestBody = JSON.stringify(newStack);
    useDB_Connection(
      "http://localhost:5000/cardApi/addNewStack",
      "POST",
      requestBody,
      {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    );
  }

  StackNameSubmitHandler = (event) => {
    event.preventDefault();
    let newName = this.stackNewName.value;
    console.log("--> ", newName);
    this.setState((state) => {
      return {
        newStackName: newName,
      };
    });
    console.log("stack name handler");
    console.table(this.state);
  };

  checkButton() {
    return (
      <div id="editCardButton_Positioning">
        <div className="flipContainer">
          <div className="flipInner">
            <button
              className="buttonStyle"
              type="button"
              onClick={this.StackNameSubmitHandler}
            >
              <div className="flipFront">
                <Right className="buttonStyle" />
              </div>
              <div className="flipBack">
                <span className="buttonMessage">Add name</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  newStackNameForm() {
    return (
      <React.Fragment>
        {this.state.newStackName >= 0 ? (
          <div id="letsAddSection">
            <h4>
              Let's <strong className="statInfo"> add </strong> a new stack,
              shall we? First, what is the name of your new stack:
            </h4>
            <form>
              <input
                id="formAddNewStack"
                type="text"
                ref={(input) => (this.stackNewName = input)}
              ></input>
              <div>{this.checkButton()}</div>
            </form>
          </div>
        ) : (
          <div id="addCardsToStack">
            <p>
              Great, so, the name is: <strong>{this.state.newStackName}</strong>
            </p>
            <p>
              Now, let's add <strong>one</strong> card to it. After that, go to{" "}
              <strong>Manage Your Stacks</strong> to keep adding more cards to
              it.
            </p>
            {this.AddCardForm()}
          </div>
        )}
      </React.Fragment>
    );
  }

  AddCardButton() {
    return (
      <div id="addCardButton_Positioning">
        <div className="flipContainer">
          <div className="flipInner">
            <button
              className="buttonStyle"
              type="button"
              onClick={this.handleSubmitAddCardHandler}
            >
              <div className="flipFront">
                <Plus className="addCardIcon" />
              </div>
              <div className="flipBack">
                <span className="buttonMessage">Add new card</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  consolidateButtonStack() {
    return (
      <div id="consolidateButton_Positioning">
        <div className="flipContainer">
          <div className="flipInner">
            <button
              className="buttonStyle"
              type="button"
              onClick={this.handleSubmitReady}
            >
              <div className="flipFront">
                <Consolidate className="consolidateStackIcon" />
              </div>
              <div className="flipBack">
                <span className="buttonMessage">CONSOLIDATE Changes</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  infoCard() {
    return (
      <div id="infoCardWrap">
        <div className="flipInfoCard">
          <div className="flipInfoCardInner">
            <p className="flipInfoCardFront">
              In order to make the new card, click on plus (+).
            </p>
            <p className="flipInfoCardBack">
              After you finish adding all the cards, click on consolidate button
              to save all the changes. Your stack must have at least 3 cards.
            </p>
          </div>
        </div>
      </div>
    );
  }

  handleSubmitAddCardHandler = (event) => {
    event.preventDefault();
    let newCard = { front: this.state.newFront, back: this.state.newBack };
    console.log("New: ", newCard);
    this.setState({
      newCardsToStack: this.state.newCardsToStack.concat([newCard]),
    });
    console.log("new state: ", this.state);
  };

  handleFrontCardChange = (e) => {
    let addFront = e.target.value;
    console.log("handle: ", addFront);
    this.setState({ newFront: addFront });
  };

  handleBackCardChange = (e) => {
    let addBack = e.target.value;
    console.log("handle back: ", addBack);
    this.setState({ newBack: addBack });
  };

  handleSubmitReady() {
    console.table(this.state);
    console.log(
      "Ready to submit",
      this.state.newStackName,
      this.state.currentUser.id,
      this.state.newFront,
      this.state.newBack
    );
    const newStack = {
      stackName: this.state.newStackName,
      createdBy: this.state.currentUser.id,
      cards: [
        {
          front: this.state.newFront,
          back: this.state.newBack,
        },
      ],
    };
    console.log("NewStack", newStack);
    this.consolidateNewStack(newStack);
  }

  AddCardForm() {
    return (
      <React.Fragment>
        <div>
          <form>
            <div className="formElement">
              <label>Front of the card</label>
              <input
                className="cardInput"
                type="text"
                name="front"
                onChange={this.handleFrontCardChange}
              />
            </div>
            <div className="formElement">
              <label>Back of the card</label>
              <input
                className="cardInput"
                type="text"
                name="front"
                onChange={this.handleBackCardChange}
              />
            </div>
            <br />
            <div id="AddCardButtons">
              {this.AddCardButton()}
              {this.consolidateButtonStack()}
            </div>
            {this.infoCard()}
          </form>
          {this.state.readyToSend ? <div></div> : <div></div>}
        </div>
      </React.Fragment>
    );
  }

  render() {
    return <React.Fragment>{this.newStackNameForm()}</React.Fragment>;
  }
}
