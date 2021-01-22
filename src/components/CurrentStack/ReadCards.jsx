import React, { Component } from "react";
// hooks
//import { useDB_Connection } from "../../DB/DB-hook/connection-hook";

export default class ReadCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      currentStack: props.currentStack,
    };
  }

  showCurrentStack() {
    if (this.state.currentStack.stackName) {
      return (
        <div id="cardListContainer">
          {this.state.currentStack.cards.map((m, j) => {
            return (
              <div className="flipCard" key={j}>
                <li className="flipCardInner" value={m.front}>
                  <div className="flipCardFront">
                    <div className="cardTextPositioning">{m.front}</div>
                  </div>
                  <div className="flipCardBack">
                    <div className="cardTextPositioning">{m.back}</div>
                  </div>
                  {console.log("card: ", m.front, m.back)}
                </li>
              </div>
            );
          })}
          <div></div>
        </div>
      );
    } else {
      return (
        <div>
          <h3>
            There was an error retrieving your cards. Please, Reload the
            application and if the problem persists, inform the developer.
          </h3>
        </div>
      );
    }
  }

  render() {
    return <React.Fragment>{this.showCurrentStack()}</React.Fragment>;
  }
}
