import React, { Component } from "react";
import { NavLink } from "react-router-dom";
// icons
import LogOut from "../../assets/icons/logOut";

export default class LogOutButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      userIsLoggedIn: props.userIsLoggedIn,
    };
    // methods from App
    this.logOut_User = props.logOut_User.bind(this);
  }

  render() {
    return (
      <div id="LogOutButton">
        <button
          className="buttonStyle"
          type="button"
          onClick={this.logOut_User}
        >
          <NavLink to="/">
            <div className="flipContainer">
              <div className="flipInner">
                <div className="flipFront">
                  <LogOut />
                </div>
                <div className="flipBack">
                  <span className="buttonMessage"> Log Out</span>
                </div>
              </div>
            </div>
          </NavLink>
        </button>
      </div>
    );
  }
}
