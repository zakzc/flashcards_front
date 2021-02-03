import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// hooks
import updateCards from "../../Data/Data_Update/updateCards";
import { CheckForInvalidCharacters } from "../../Data/Validation/validate";
// Icons
import Consolidate from "../icons/consolidate";
import EditCardIcon from "../icons/cardEdit";

export default class ManageCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userIsLoggedIn: props.userIsLoggedIn,
      user: props.currentUser,
      currentStack: props.currentStack,
      token: props.token,
      cardForEditing: "",
      cardForEditingId: "",
      editingMode: false,
      tempNewFront: "",
      tempNewBack: "",
      newStack: "",
      updatedItemMessage: false,
      redirect: false,
      messageToUser:
        "If you only want to edit one element (front OR back), leave the other element empty",
      messageToUserBack:
        "After you change the element locally, you need to click Consolidate changes button in order to reflect these changes in the actual stack.",
    };
    // utils
    this.CheckForInvalidCharacters = CheckForInvalidCharacters;
    // this.manageCurrentStack = this.manageCurrentStack.bind(this);
    this.editCard = this.editCard.bind(this);
    this.cardsInCurrentStack = this.cardsInCurrentStack.bind(this);
    this.frontEditHandler = this.frontEditHandler.bind(this);
    this.backEditHandler = this.backEditHandler.bind(this);
    this.editButtonHandler = this.editButtonHandler.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.makeNewCardSet = this.makeNewCardSet.bind(this);
    this.chooseCard = this.chooseCard.bind(this);
    this.stackWasUpdated = this.stackWasUpdated.bind(this);
    this.plusButton = this.editButton.bind(this);
    this.consolidateButton = this.consolidateButton.bind(this);
    this.consolidateButtonView = this.consolidateButtonView.bind(this);
    this.inputForm = this.inputForm.bind(this);
    this.showCurrentStack = this.showCurrentStack.bind(this);
    this.manageCardsView = this.manageCardsView.bind(this);
    this.manageCardsLayout = this.manageCardsLayout.bind(this);
  }

  ////////////////
  // Implementation methods
  ////////////////

  async handleSubmitReady() {
    let updateCardsProcess;
    updateCardsProcess = await updateCards(
      this.state.newStack,
      this.state.token
    )
      .then(() => {
        this.setState({
          messageToUser:
            "Consolidating changes and sending the new data to your database.",
          messageToUserBack: "You will be redirected",
        });
      })
      .then(() => {
        this.setState({ redirect: true });
      })
      .catch((err) => {
        this.setState({
          messageToUser: "Error on updating process (error 29)",
        });
      });
    if (!updateCardsProcess) {
      updateCardsProcess = false;
      return updateCardsProcess;
    }
  }

  frontEditHandler(e) {
    // e.preventDefault();
    this.setState({ tempNewFront: e.target.value });
  }

  backEditHandler(f) {
    // e.preventDefault();
    this.setState({ tempNewBack: f.target.value });
  }

  // gets the new values for front and back
  editButtonHandler(e) {
    e.preventDefault();
    let newValueFront;
    if (this.state.tempNewFront) {
      newValueFront = this.state.tempNewFront;
    } else {
      newValueFront = this.state.currentStack.cards[this.state.cardForEditing]
        .front;
    }
    let newValueBack;
    if (this.state.tempoNewBack) {
      newValueBack = this.state.tempNewBack;
    } else {
      newValueBack = this.state.currentStack.cards[this.state.cardForEditing]
        .back;
    }
    this.makeNewCardSet(newValueFront, newValueBack);
  }

  validateInput(front, back) {
    if (!this.CheckForInvalidCharacters(front)) {
      this.setState({
        messageToUser: "You entered an invalid character in the front card",
      });
      return false;
    }
    if (!this.CheckForInvalidCharacters(back)) {
      this.setState({
        messageToUser: "You entered an invalid character in the back card",
      });
      return false;
    }
    this.setState({
      messageToUser: "Valid input",
    });
    return true;
  }

  makeNewCardSet(newFront, newBack) {
    if (this.validateInput(newFront, newBack) === true) {
      // makes a new version of the cardSet
      let updatedStack = this.state.currentStack;
      if (newBack) {
        updatedStack.cards[this.state.cardForEditing].back = newBack;
      } else {
        updatedStack.cards[
          this.state.cardForEditing
        ].back = this.state.currentStack.cards[this.state.cardForEditing].back;
      }
      if (newFront) {
        updatedStack.cards[this.state.cardForEditing].front = newFront;
      } else {
        updatedStack.cards[
          this.state.cardForEditing
        ].front = this.state.currentStack.cards[
          this.state.cardForEditing
        ].front;
      }
      // updates local state
      this.setState((state) => ({
        newStack: updatedStack,
        editingMode: false,
        updatedItemMessage: true,
      }));
    } else {
      this.setState({ messageToUser: "invalid input" });
    }
  }

  chooseCard(e) {
    let selectedCard = e.target.value;
    this.setState(() => ({
      cardForEditing: selectedCard,
      editingMode: true,
    }));
    this.setState({ cardForEditingId: selectedCard });
  }

  ////////////////
  // View methods
  ////////////////

  infoCard() {
    return (
      <div className="flipInfoCard">
        <div className="flipInfoCardInner">
          <p className="flipInfoCardFront">{this.state.messageToUser}</p>
          <p className="flipInfoCardBack">{this.state.messageToUserBack}</p>
        </div>
      </div>
    );
  }

  consolidateButton() {
    return (
      <div id="flipButton_Positioning">
        <div className="flipContainer">
          <div className="flipInner">
            <button
              className="buttonStyle"
              type="button"
              onClick={this.handleSubmitReady}
            >
              <div className="flipFront">
                <Consolidate />
              </div>
              <div className="flipBack">
                <span className="buttonMessage">Consolidate changes</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  editButton() {
    return (
      <button
        className="buttonStyle"
        type="button"
        onClick={this.editButtonHandler}
      >
        <div className="flipContainer">
          <div className="flipInner">
            <div className="flipFront">
              <EditCardIcon />
            </div>
            <div className="flipBack">
              <span className="buttonMessage">Change</span>
            </div>{" "}
          </div>
        </div>
      </button>
    );
  }

  inputForm() {
    return (
      <form id="inputFormCardEdit">
        <p>
          The current card Front is{" "}
          <strong className="detach">
            {this.state.currentStack.cards[this.state.cardForEditing].front}
          </strong>
        </p>
        <p>
          Inform new card <strong className="emphasis">front</strong>
        </p>
        <input type="text" name="newFront" onChange={this.frontEditHandler} />
        <p>
          The current card back is{" "}
          <strong className="detach">
            {this.state.currentStack.cards[this.state.cardForEditing].back}
          </strong>
        </p>
        <p>
          Inform new card <strong className="emphasis">back</strong>
        </p>
        <input type="text" name="newBack" onChange={this.backEditHandler} />
        <br />
        {this.editButton()}
      </form>
    );
  }

  editCard() {
    return (
      <React.Fragment>
        <div id="editCardArea">
          {this.inputForm()}
          {this.infoCard()}
        </div>
      </React.Fragment>
    );
  }

  stackWasUpdated() {
    return (
      <div id="shortMessage" className="infoCard_cardSet">
        <p>
          Card was updated locally. Select another card to update or consolidate
          changes by selecting any card and clicking on the consolidate button.
        </p>
      </div>
    );
  }

  cardsInCurrentStack() {
    return (
      <React.Fragment>
        <h4>Now, select the card you want to manage</h4>
        <div>
          <select className="select-css" onChange={this.chooseCard}>
            <option value="0">Select card</option>
            {this.state.currentStack.cards.map((c, i) => {
              return (
                <option key={i} value={i}>
                  {c.front} - {c.back}
                </option>
              );
            })}
          </select>
        </div>
      </React.Fragment>
    );
  }

  showCurrentStack() {
    return (
      <React.Fragment>
        <div>
          <h3>
            Your current stack is:{" "}
            <strong className="emphasis">
              {this.state.currentStack.stackName}
            </strong>
          </h3>
        </div>
      </React.Fragment>
    );
  }

  consolidateButtonView() {
    return (
      <div id="consolidateButton">
        {this.state.updatedItemMessage ? this.consolidateButton() : <div></div>}
      </div>
    );
  }

  manageCardsLayout() {
    return (
      <div id="manageCardsWrapper">
        <h1>Let's manage your cards</h1>

        <div id="manageCardsArea">
          {this.showCurrentStack()}
          {this.cardsInCurrentStack()}
          {this.state.updatedItemMessage ? this.stackWasUpdated() : <div></div>}
          {this.state.editingMode ? this.editCard() : <div></div>}
          {this.consolidateButtonView()}
          {this.state.redirect ? (
            <Redirect
              to="/consolidateChanges"
              userIsLoggedIn={this.state.userIsLoggedIn}
            />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  }

  manageCardsView() {
    // console.log("MANAGE CARDS");
    return (
      <div id="manageCardsLayout">
        {this.state.userIsLoggedIn ? (
          <div id="loggedInView">{this.manageCardsLayout()}</div>
        ) : (
          <Redirect to="/login" />
        )}
      </div>
    );
  }

  render() {
    return <React.Fragment>{this.manageCardsView()}</React.Fragment>;
  }
}
