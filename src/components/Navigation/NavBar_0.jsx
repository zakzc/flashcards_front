import React, { Component } from "react";
import { Link } from "react-router-dom";
// icons
import LogIn from "../../assets/icons/logIn";
// my imports
import Burger from "./NavBar_burgerMen";

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      userIsLoggedIn: props.userIsLoggedIn,
    };
    // methods from App
    this.logOut_User = this.props.logOut_User;
    this.loggedInNavBar = this.loggedInNavBar.bind(this);
    this.loggedOutNavBar = this.loggedOutNavBar.bind(this);
    this.logUserOut = this.logUserOut.bind(this);
  }

  logUserOut() {
    this.logOut_User();
  }

  logInButton() {
    return (
      <React.Fragment>
        <button
          id="logOutButton"
          type="button"
          onClick={() => {
            window.location.reload();
          }}
        ></button>
      </React.Fragment>
    );
  }

  loggedInNavBar() {
    return (
      <div id="LogInNavBar">
        <Burger />
      </div>
    );
  }

  loggedOutNavBar() {
    return (
      <div id="LogOutNavBar">
        <ul
          style={{ listStyleType: "none", padding: 0 }}
          activeclassname="active"
        >
          <li className="navigationLink">
            <Link to="/logIn" className="flipMenuInner">
              <div className="flipMenuFront">
                <LogIn className="logInIcon" />
              </div>{" "}
              <div className="flipMenuBack">Log in</div>
            </Link>
          </li>
        </ul>
      </div>
    );
  }

  navigationLayout() {
    return (
      <div>
        {this.state.userIsLoggedIn ? (
          <div id="userIsLoggedIn">{this.loggedInNavBar()}</div>
        ) : (
          <div id="userIsLoggedOut">{this.loggedOutNavBar()}</div>
        )}
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        <div id="navigation">{this.navigationLayout()}</div>
      </React.Fragment>
    );
  }
}
