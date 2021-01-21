import React from "react";
import { Redirect } from "react-router-dom";
// import { TransitionGroup, Transition } from "react-transition-group";
import { AnimatePresence, motion } from "framer-motion";
// Standard Log out page
import UserIsLoggedOut from "./views/UserIsLoggedOut";
// module
import Stats from "./CardSet/Stats";
import Score from "./CardSet/Score";
// icons
import Check from "./icons/check";
import Right from "./icons/right";
import Wrong from "./icons/wrong";

export default class CardSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userIsLoggedIn: props.userIsLoggedIn,
      currentStack: props.currentStack,
      cards: props.currentStack.cards,
      current: 0,
      face: true,
      right: 0,
      wrong: 0,
      lengthOfStack: props.currentStack.cards.length,
      stackIsOver: false,
    };
    // external modules
    this.UserIsLoggedOut = UserIsLoggedOut;
    this.Stats = Stats;
    this.Score = Score;
    // icons
    // this.turning = turning;
    // methods associated with rendering
    this.cardSide = this.cardSide.bind(this);
    this.cardCount = this.cardCount.bind(this);
    this.buttonArea = this.buttonArea.bind(this);
    this.controlButtons = this.controlButtons.bind(this);
    this.flipButton = this.flipButton.bind(this);
    /*     this.score = this.score.bind(this); */
    // methods for child comp
    this.reSetGame = this.reSetGame.bind(this);
    // methods associated with cards
    this.handleClick = this.handleClick.bind(this);
    this.removeFromPile = this.removeFromPile.bind(this);
    this.setAnswerRight = this.setAnswerRight.bind(this);
    this.setAnswerWrong = this.setAnswerWrong.bind(this);
    this.nextCardAvailable = this.nextCardAvailable.bind(this);
    this.updateCurrentCard = this.updateCurrentCard.bind(this);
    this.playCardSet = this.playCardSet.bind(this);
    this.cardSetLayout = this.cardSetLayout.bind(this);
    this.cardSetView = this.cardSetView.bind(this);
    this.infoCard = this.infoCard.bind(this);
  }

  // Reload method, will be called from Stats
  reSetGame() {
    this.setState({
      userIsLoggedIn: this.props.userIsLoggedIn,
      currentStack: this.props.currentStack,
      cards: this.props.currentStack.cards,
      current: 0,
      face: true,
      right: 0,
      wrong: 0,
      lengthOfStack: this.props.currentStack.cards.length,
      stackIsOver: false,
    });
  }

  ////////////////
  // Implementation methods
  ////////////////

  // Removes the item from the pile (called upon Right answer)
  removeFromPile() {
    // Most checks are done in the nextCard() method, however, some need to
    // be performed here or there will be errors on render().
    const newCardSet = this.state.cards.slice();
    newCardSet.splice(this.state.current, 1);
    this.setState(() => ({
      cards: newCardSet,
    }));
    this.updateCurrentCard();
  }

  // These functions set answerIsRight/wrong in the card array of objects to true/false,
  // Then, it calls the next functions depending on the conditions/
  setAnswerRight() {
    this.setState(() => ({
      face: true,
      right: this.state.right + 1,
    }));
    // No need to increment, on removing, the array will set back in
    // we need, though, to check if on removing, the pile won't collapse
    if (this.nextCardAvailable(this.state)) {
      this.removeFromPile(this.state);
    } else {
      // if, on removing, the pile is empty, the stack is over
      this.setState({
        stackIsOver: true,
      });
    }
    return;
  }

  setAnswerWrong() {
    this.setState(() => ({
      face: true,
      wrong: this.state.wrong + 1,
    }));
    if (this.nextCardAvailable(this.state)) {
      this.updateCurrentCard();
    }
    return;
  }

  // Sequence of logical checks to determine if we should call a next card or not
  nextCardAvailable() {
    // Is the pile empty?
    if (this.state.cards.length === 0) {
      this.setState(() => ({ stackIsOver: true }));
      return false;
    } else {
      return true;
    }
  }

  // Updates the number of the current cards
  updateCurrentCard() {
    // key aspect is increment or decrement current, to keep the
    // app from looking for a card number that doesn't exist
    let next = this.state.current + 1;
    if (next >= this.state.cards.length - 1) {
      next = 0;
    }
    this.setState(() => ({
      current: next,
    }));
    return;
  }

  // * Page rendering functions

  // This function shows the back of the current card (works like a switch button)
  handleClick() {
    this.setState((state) => ({
      face: !state.face,
    }));
  }

  ////////////////
  // View methods
  ////////////////

  infoCard() {
    return (
      <div id="shortMessage" className="infoCard_cardSet">
        <p>
          Flip the card with the flip button. Then, indicate ✓ for right answer
          or ✘ for wrong answer.
        </p>
      </div>
    );
  }

  cardSide() {
    try {
      if (this.state.cards.length === 0 || this.state.stackIsOver) {
        this.setState({ stackIsOver: true });
      } else {
        return (
          <React.Fragment>
            <motion.div
              /*     transition={{ ease: "easeIn", duration: 0.7 }} */
              className="cardText"
            >
              {this.state.face ? (
                <AnimatePresence>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    /*               initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }} */
                    /*    exit={{ rotateX: 360 }} */
                    id="cardFront"
                  >
                    {this.state.cards[this.state.current].front}
                  </motion.div>
                </AnimatePresence>
              ) : (
                /*            <AnimatePresence> */
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  animate={{ rotateY: 360 }}
                  transition={{ ease: "easeInOut", duration: 0.7 }}
                  id="cardBack"
                >
                  {this.state.cards[this.state.current].back}
                </motion.div>
                /*               </AnimatePresence> */
              )}
            </motion.div>
          </React.Fragment>
        );
      }
    } catch (E) {
      console.log("error on rendering", E);
      console.log(
        "Review state:",
        this.state,
        "length: ",
        this.state.cards.length
      );
    }
  }

  flipButton() {
    return (
      <div id="flipButton_Positioning">
        <div className="flipContainer">
          <div className="flipInner">
            <button
              className="buttonStyle"
              type="button"
              onClick={this.handleClick}
            >
              <div className="flipFront">
                <Check />
              </div>
              <div className="flipBack">
                <span className="buttonMessage">Flip</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  rightAnswerButton() {
    return (
      <div id="correctButton_Positioning">
        <div className="flipContainer">
          <div className="flipInner">
            <button
              className="buttonStyle"
              type="button"
              onClick={() => this.setAnswerRight(this.state)}
            >
              {" "}
              <div onClick={this.handleClick}>
                <div className="flipFront">
                  <Right />
                </div>
                <div className="flipBack">
                  <span className="buttonMessage">Right</span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  wrongAnswerButton() {
    return (
      <div id="wrongButton_Positioning">
        <div className="flipContainer">
          <div className="flipInner">
            <button
              className="buttonStyle"
              type="button"
              onClick={() => this.setAnswerWrong(this.state)}
            >
              <div onClick={this.handleClick}>
                <div className="flipFront">
                  <Wrong />
                </div>
                <div className="flipBack">
                  <span className="buttonMessage">Wrong</span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // rendering of right or wrong buttons and call for the setCard
  controlButtons() {
    // only shows when the card is in the back view (face===false)
    if (!this.state.face)
      return (
        <React.Fragment>
          <div id="buttonsWrapper">
            {this.rightAnswerButton()}
            {this.wrongAnswerButton()}
          </div>
        </React.Fragment>
      );
  }

  buttonArea() {
    return (
      <div id="buttonsArea">
        <div id="flipButton">{this.flipButton()}</div>
        <div id="controlButtons">{this.controlButtons()}</div>
      </div>
    );
  }

  cardCount() {
    if (
      this.state.cards.length !== 0 ||
      (this.state.current !== 0 && this.state.cards.length !== 0)
    ) {
      return (
        <React.Fragment>
          <div className="scoreArea">
            <div id="currentCard">
              Card number:
              <div className="scoreNumbers">
                <p>
                  {this.state.current + 1}/{this.state.cards.length}
                </p>
              </div>
            </div>
            <br />
          </div>
        </React.Fragment>
      );
    }
  }

  playCardSet() {
    return (
      <React.Fragment>
        <div id="cardArea">
          <div id="card">{this.cardSide()}</div>
        </div>
        <div id="controlCardArea">
          {this.buttonArea()}
          <div id="info">{this.infoCard()}</div>
          <div id="scoreCardArea">
            <Score
              rightAnswers={this.state.right}
              wrongAnswers={this.state.wrong}
            />
            <div id="cardCount"> {this.cardCount()} </div>

            <br />
            <div id="currentPlayStack">
              {" "}
              <p>Current stack is: </p>
              <strong className="currentSelectedStack">
                {" "}
                {this.state.currentStack.stackName}
              </strong>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  cardSetLayout() {
    return (
      <div id="cardSetLayout">
        {this.state.stackIsOver ? (
          <Stats
            right={this.state.right}
            wrong={this.state.wrong}
            lengthOfStack={this.state.lengthOfStack}
            reSetGame={this.reSetGame}
          />
        ) : (
          <div id="cardAreaWrapper">{this.playCardSet()}</div>
        )}
      </div>
    );
  }

  cardSetView() {
    console.log("CARD SET PLAY");
    return (
      <div id="cardSetView">
        {this.state.userIsLoggedIn ? (
          <div id="loggedInView">{this.cardSetLayout()}</div>
        ) : (
          <Redirect to="/" />
        )}
      </div>
    );
  }

  render() {
    return <React.Fragment>{this.cardSetView()}</React.Fragment>;
  }
}
