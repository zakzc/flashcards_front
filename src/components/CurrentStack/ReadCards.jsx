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

  render() {
    return (
      <React.Fragment>
        <h2>
          Hi there. Your current stack of cards is:{" "}
          <strong className="currentSelectedStack">
            {this.state.currentStack.stackName}
            {". "}
          </strong>
        </h2>
        Hover over the card to see the back, or click on it if you are on a
        mobile.
        {this.state.currentStack.cards.map((m, j) => {
          return (
            <div className="flipCard" key={j}>
              <div className="flipCardInner" label={m.back}>
                <li value={m.front}>
                  <div className="flipCardFront"> {m.front} </div>
                  <div className="flipCardBack">{m.back}</div>
                </li>
              </div>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}
