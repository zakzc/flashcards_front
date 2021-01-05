import React, { Component } from "react";
// Icons
import Consolidate from "../icons/consolidate";
import EditCardIcon from "../icons/cardEdit";

export default class ManageCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.currentUser,
      currentStack: props.currentStack,
      cardForEditing: "",
      cardForEditingId: "",
      editingMode: false,
      tempNewFront: "",
      tempNewBack: "",
      newStack: "",
      updatedItemMessage: false,
    };
    // this.manageCurrentStack = this.manageCurrentStack.bind(this);
    this.makeNewStack = this.makeNewStack.bind(this);
    this.editCard = this.editCard.bind(this);
    this.cardsInCurrentStack = this.cardsInCurrentStack.bind(this);
    this.getCardToEdit = this.getCardToEdit.bind(this);
    this.frontEditHandler = this.frontEditHandler.bind(this);
    this.backEditHandler = this.backEditHandler.bind(this);
    this.editButtonHandler = this.editButtonHandler.bind(this);
    this.makeNewCardSet = this.makeNewCardSet.bind(this);
    this.chooseCard = this.chooseCard.bind(this);
    this.stackWasUpdated = this.stackWasUpdated.bind(this);
    this.plusButton = this.editButton.bind(this);
    this.consolidateButton = this.consolidateButton.bind(this);
    this.inputForm = this.inputForm.bind(this);
    this.manageCardsLayout = this.manageCardsLayout.bind(this);
  }

  // TODO Connects to API and make new cardset
  makeNewStack() {
    console.log("preparation: ", this.state.currentStack.cards);
  }

  getCardToEdit(c) {
    console.log("The card SELECTED: ", this.state.currentStack.cards[c]);
    console.log("==> ", c);
    this.setState({ cardForEditingId: c });
    console.table(this.state);
  }

  frontEditHandler(e) {
    // e.preventDefault();
    this.setState({ tempNewFront: e.target.value });
    console.log("card edit handler: ", this.state.tempNewFront);
  }

  backEditHandler(f) {
    // e.preventDefault();
    this.setState({ tempNewBack: f.target.value });
    console.log("card edit handler back: ", this.state.tempNewFront);
  }

  // gets the new values for front and back
  editButtonHandler(e) {
    e.preventDefault();
    let newValueFront = this.state.tempNewFront;
    let newValueBack = this.state.tempNewBack;
    console.log(
      "Edit BUTTON handler: ",
      this.state.currentStack.cards[this.state.cardForEditing].back,
      newValueBack,
      newValueFront
    );
    this.makeNewCardSet(newValueFront, newValueBack);
  }

  // make a new cardset to substitute the older one
  makeNewCardSet(newFront, newBack) {
    // makes a new version of the cardSet
    let updatedStack = this.state.currentStack;
    console.log("current card set: ", updatedStack);
    updatedStack.cards[this.state.cardForEditing].back = newBack;
    updatedStack.cards[this.state.cardForEditing].front = newFront;
    console.log("should update: ", updatedStack);
    // updates local state
    this.setState((state) => ({
      currentStack: updatedStack,
      editingMode: false,
      updatedItemMessage: true,
    }));
    // calls for update on the API
  }

  chooseCard(e) {
    let selectedCard = e.target.value;
    console.log("---> ", selectedCard);
    this.setState(() => ({
      cardForEditing: selectedCard,
      editingMode: true,
    }));
    console.log("new value: ", this.state.cardForEditing);
    this.getCardToEdit(selectedCard);
  }

  infoCard() {
    return (
      <div className="flipInfoCard">
        <div className="flipInfoCardInner">
          <p className="flipInfoCardFront">
            If you only want to edit one element (front OR back), leave the
            other element empty.
          </p>
          <p className="flipInfoCardBack">
            After you change the element locally, you need to click "Consolidate
            changes" button in order to reflect these changes in the actual
            stack.
          </p>
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
                <Consolidate className="buttonStyle" />
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
      <div id="editCardButton_Positioning">
        <div className="flipContainer">
          <div className="flipInner">
            <button
              className="buttonStyle"
              type="button"
              onClick={this.editButtonHandler}
            >
              <div className="flipFront">
                <EditCardIcon className="editCardButtonStyle" />
              </div>
              <div className="flipBack">
                <span className="buttonMessage">Click to make changes</span>
              </div>
            </button>
          </div>
        </div>
      </div>
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

  currentStack() {
    return (
      <React.Fragment>
        <div>
          <h3>
            Your current stack is:{" "}
            <strong className="emphasis">
              {" "}
              {this.state.currentStack.stackName}{" "}
            </strong>
          </h3>
        </div>
      </React.Fragment>
    );
  }

  manageCardsLayout() {
    return (
      <React.Fragment>
        <div id="manageCardsWrapper">
          <h1>Let's manage your cards</h1>
          <div id="consolidateButton">
            {this.state.updatedItemMessage ? (
              this.consolidateButton()
            ) : (
              <div></div>
            )}
          </div>
          <div id="manageCardsArea">
            {this.currentStack()}
            {this.cardsInCurrentStack()}
            {this.state.updatedItemMessage ? (
              this.stackWasUpdated()
            ) : (
              <div></div>
            )}
            {this.state.editingMode ? this.editCard() : <div></div>}
          </div>
        </div>
      </React.Fragment>
    );
  }

  render() {
    return <React.Fragment>{this.manageCardsLayout()}</React.Fragment>;
  }
}
