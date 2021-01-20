import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
// icons
import Pile from "../icons/pile";
import Play from "../icons/play";
import EditCard from "../icons/editCard";
import EditStacks from "../icons/editStacks";
import LogOut from "../icons/logOut";
import LogIn from "../icons/logIn";

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
    // Methods
    // this.logInLogOut = props.logInLogOut();
  }

  logUserOut() {
    console.log("Log me out");
    this.setState({
      currentUser: "",
      userIsLoggedIn: false,
    });
    this.logOut_User();
  }

  logInButton() {
    return (
      <React.Fragment>
        <button
          id="logOutButton"
          type="button"
          onClick={() => {
            this.logUserOut();
          }}
        ></button>
      </React.Fragment>
    );
  }

  loggedInNavBar() {
    return (
      <React.Fragment>
        <ul
          style={{ listStyleType: "none", padding: 0 }}
          activeclassname="active"
        >
          <div className="flipMenu">
            <li className="navigationLink">
              <NavLink to="/curStack" className="flipMenuInner">
                <div className="flipMenuFront">
                  <Pile className="flipMenuFront" />
                </div>{" "}
                <div className="flipMenuBack">Current Stack</div>
              </NavLink>
            </li>
          </div>
          <div className="flipMenu">
            <li className="navigationLink">
              <NavLink to="/cardSet" className="flipMenuInner">
                <div className="flipMenuFront">
                  <Play className="flipMenuFront" />
                </div>{" "}
                <div className="flipMenuBack">Play stack</div>
              </NavLink>
            </li>
          </div>
          <div className="flipMenu">
            <li className="navigationLink">
              <NavLink to="/cardManagement" className="flipMenuInner">
                <div className="flipMenuFront">
                  <EditCard className="flipMenuFront" />
                </div>{" "}
                <div className="flipMenuBack">Manage cards</div>
              </NavLink>
            </li>
          </div>
          <div className="flipMenu">
            <li className="navigationLink">
              <NavLink to="/stackManagement" className="flipMenuInner">
                <div className="flipMenuFront">
                  <EditStacks className="flipMenuFront" />
                </div>{" "}
                <div className="flipMenuBack">Manage stacks</div>
              </NavLink>
            </li>
          </div>
          <div className="flipMenu">
            <li className="navigationLink">
              <NavLink to="/logIn" className="flipMenuInner">
                <div className="flipMenuFront">
                  <LogOut className="logOutIcon" />
                </div>{" "}
                <div className="flipMenuBack" onClick={this.logUserOut}>
                  Log Out
                </div>
              </NavLink>
            </li>
          </div>
        </ul>
      </React.Fragment>
    );
  }

  loggedOutNavBar() {
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }

  navigationLayout() {
    return (
      <div>
        {this.state.userIsLoggedIn ? (
          <div id="navigation">{this.loggedInNavBar()}</div>
        ) : (
          <div id="navigation">{this.loggedOutNavBar()}</div>
        )}
      </div>
    );
  }

  render() {
    return <React.Fragment>{this.navigationLayout()}</React.Fragment>;
  }
}
