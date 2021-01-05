import React, { Component } from "react";

export default class Score extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="scoreArea">
          <div id="ongoingScore">
            Right answers:{" "}
            <div className="scoreNumbers">{this.props.rightAnswers}</div>
            Wrong answers:{" "}
            <div className="scoreNumbers">{this.props.wrongAnswers}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
