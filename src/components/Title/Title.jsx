import React, { Component } from "react";
import LogoOutButton from "./LogOutButton";
import PileLogo from "../../assets/icons/pileLogo";

export default class Title extends Component {
  constructor(props) {
    super(props);
    // methods from App
    this.logOut_User = props.logOut_User;
  }
  render() {
    return (
      <React.Fragment>
        <div id="titlePage">
          <div id="titleLogo">
            <h1 className="title">
              Flashcards <PileLogo className="pileLogo" />
            </h1>
          </div>
          <div id="logUserOut">
            <LogoOutButton logOut_User={this.logOut_User} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
