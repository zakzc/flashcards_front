import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// hooks
import addNewSet from "../../utils/Data_Update/addNewSet";
import { CheckForInvalidCharacters } from "../../Data/utils/validate";
// Icons
import Consolidate from "../../assets/icons/consolidate";
import Plus from "../../assets/icons/plus";
import Right from "../../assets/icons/right";

export default class AddNewStack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      currentStack: props.currentStack,
      token: props.token,
      messageToUser:
        "In order to make the new card, click on plus (+). After you finish adding at least 3 new cards, click on consolidate button.",
      messageToUserBack: "Your stack must have at least 3 cards.",
      frontValue: "",
      backValue: "",
      newFront: "",
      newBack: "",
      newStackName: "",
      newCardsToStack: [],
      readyToSend: true,
      numberOfCardsAdded: 0,
      redirect: false,
    };
    // utils
    this.CheckForInvalidCharacters = CheckForInvalidCharacters;
    // methods
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
    this.renderRedirect = this.renderRedirect.bind(this);
    this.cardNumbering = this.cardNumbering.bind(this);
  }

  ////////////////
  // Implementation methods
  ////////////////

  async consolidateNewStack(newStack) {
    console.log("Consolidate Add stack");
    const addSet = await addNewSet(JSON.stringify(newStack), this.state.token);
    if (addSet) {
      this.setState({ redirect: true });
    } else {
      this.setState({ messageToUser: "Error on adding new Stack (error 52)." });
    }
  }

  StackNameSubmitHandler = (event) => {
    event.preventDefault();
    let newName = this.stackNewName.value;
    this.setState((state) => {
      return {
        newStackName: newName,
      };
    });
  };

  handleSubmitReady() {
    this.setState({
      messageToUser:
        "Consolidating changes and sending the new data to your database.",
    });
    const newStack = {
      stackName: this.state.newStackName,
      createdBy: this.state.currentUser.id,
      cards: this.state.newCardsToStack,
    };
    this.consolidateNewStack(newStack);
  }

  handleSubmitAddCardHandler = (event) => {
    event.preventDefault();
    this.setState({
      messageToUser:
        "Now add more cards and, when done, click on consolidate changes.",
    });
    if (
      this.validateInput(this.state.newFront) &&
      this.validateInput(this.state.newBack)
    ) {
      this.state.newCardsToStack.push({
        front: this.state.newFront,
        back: this.state.newBack,
      });
      this.setState({
        frontValue: "",
        backValue: "",
        numberOfCardsAdded: this.state.numberOfCardsAdded + 1,
      });
      console.log("new cards to stack: ", this.state.newCardsToStack);
    } else {
      this.setState({
        messageToUser: "Your input is invalid. Please correct it.",
      });
    }
  };

  validateInput(newData) {
    if (!this.CheckForInvalidCharacters(newData)) {
      this.setState({
        messageToUser: "You entered an invalid character",
        messageToUserBack:
          "You can't add and non-alpha characters or punctuations except for fod(.)",
      });
      return false;
    } else {
      this.setState({
        messageToUser: "Valid input",
      });
      return true;
    }
  }

  handleFrontCardChange = (e) => {
    this.setState({ frontValue: e.target.value });
    let addFront = e.target.value;
    console.log("handle: ", addFront);
    if (addFront) {
      this.setState({
        newFront: addFront,
        messageToUser: "don't forget to add the back of the card.",
      });
    }
  };

  handleBackCardChange = (e) => {
    this.setState({ backValue: e.target.value });
    let addBack = e.target.value;
    console.log("handle back: ", addBack);
    if (addBack) {
      this.setState({
        newBack: addBack,
        messageToUser: "Did you already add the back of the card?",
      });
    }
  };

  ////////////////
  // View methods
  ////////////////

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

  infoCard() {
    return (
      <div id="infoCardWrap">
        <div className="flipInfoCard">
          <div className="flipInfoCardInner">
            <p className="flipInfoCardFront">{this.state.messageToUser}</p>
            <p className="flipInfoCardBack">{this.state.messageToUserBack}</p>
          </div>
        </div>
      </div>
    );
  }

  cardNumbering() {
    return (
      <div>
        <h4>You added, so far {this.state.newCardsToStack.length} cards</h4>
        <p>
          You need to add, at least, 3 cards in order to be able to consolidate
          and make a new stack.
        </p>
        {this.state.newCardsToStack.length > 2 ? (
          <p>You can consolidate now, or keep adding cards.</p>
        ) : (
          <p>
            You will see the consolidate button, after you add, at least 3
            cards.
          </p>
        )}
      </div>
    );
  }

  checkButton() {
    return (
      <button
        className="buttonStyle"
        type="button"
        onClick={this.StackNameSubmitHandler}
      >
        <div className="flipContainer">
          <div className="flipInner">
            <div className="flipFront">
              <Right />
            </div>
            <div className="flipBack">
              <span className="buttonMessage">Add name</span>
            </div>{" "}
          </div>{" "}
        </div>
      </button>
    );
  }

  consolidateButtonStack() {
    if (this.state.numberOfCardsAdded > 2) {
      return (
        <button
          className="buttonStyle"
          type="button"
          onClick={this.handleSubmitReady}
        >
          <div className="flipContainer">
            <div className="flipInner">
              <div className="flipFront">
                <Consolidate />
              </div>
              <div className="flipBack">
                <span className="buttonMessage">CONSOLIDATE Changes</span>
              </div>
            </div>
          </div>
        </button>
      );
    } else {
      return <div></div>;
    }
  }

  AddCardButton() {
    return (
      <button
        className="buttonStyle"
        type="button"
        onClick={this.handleSubmitAddCardHandler}
      >
        <div className="flipContainer">
          <div className="flipInner">
            <div className="flipFront">
              <Plus />
            </div>
            <div className="flipBack">
              <span className="buttonMessage">Add new card</span>
            </div>
          </div>
        </div>
      </button>
    );
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
                value={this.state.frontValue}
                onChange={this.handleFrontCardChange}
              />
            </div>
            <div className="formElement">
              <label>Back of the card</label>
              <input
                className="cardInput"
                type="text"
                name="front"
                value={this.state.backValue}
                onChange={this.handleBackCardChange}
              />
            </div>
            <br />
            <div id="AddCardButtons">
              <div>{this.AddCardButton()}</div>
              {this.cardNumbering()}
              <div> {this.consolidateButtonStack()}</div>
            </div>
          </form>
          {this.infoCard()}
          {this.renderRedirect()}
        </div>
      </React.Fragment>
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

  render() {
    return <React.Fragment>{this.newStackNameForm()}</React.Fragment>;
  }
}
