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
        <div id="readCards">
          {this.state.currentStack.cards.map((m, j) => {
            return (
              <div className="flipCard" key={j}>
                <div className="flipCardInner" label={m.back}>
                  <li value={m.front}>
                    <div className="flipCardFront">{m.front}</div>
                    <div className="flipCardBack">{m.back}</div>
                  </li>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div>
          <h3>
            There was an error retrieving your cards. Please, Reload the
            application and if the problem persists, inform the owner of the
            application.
          </h3>
        </div>
      );
    }
  }

  render() {
    return <React.Fragment>{this.showCurrentStack()}</React.Fragment>;
  }
}
