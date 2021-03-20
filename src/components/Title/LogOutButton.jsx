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

  // logUserOut() {
  //   this.logOut_User();
  // }

  render() {
    return (
      <div id="LogOutButton">
        <button
          className="buttonStyle"
          type="button"
          onClick={this.logOut_User}
        >
          <NavLink to="/">
            <div className="flipMenu">
              <div className="flipMenuInner">
                <div className="flipMenuFront">
                  <LogOut />
                </div>
                <span className="buttonMessage"> Log Out</span>
              </div>
            </div>
          </NavLink>
        </button>
      </div>
    );
  }
}
