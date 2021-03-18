import React, { Component } from "react";
import PileLogo from "../../assets/icons/pileLogo";

export default class Title extends Component {
  render() {
    return (
      <React.Fragment>
        <div id="titlePage">
          <h1 className="title">
            Flashcards <PileLogo className="pileLogo" />
          </h1>
        </div>
      </React.Fragment>
    );
  }
}
