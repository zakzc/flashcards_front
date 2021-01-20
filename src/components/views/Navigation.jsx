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
      <div id="NavigationMenu">
        <ul
          style={{ listStyleType: "none", padding: 0 }}
          activeclassname="active"
        >
          <li className="navigationLink ">
            <NavLink to="/curStack">
              <div className="flipMenu">
                <div className="flipMenuInner">
                  <div className="flipMenuFront">
                    <Pile />
                  </div>
                  <div className="flipMenuBack">Current Stack</div>
                </div>
              </div>
            </NavLink>
          </li>
          <li className="navigationLink">
            <NavLink to="/cardSet">
              <div className="flipMenu">
                <div className="flipMenuInner">
                  <div className="flipMenuFront">
                    <Play />
                  </div>
                  <div className="flipMenuBack">Play stack</div>
                </div>
              </div>
            </NavLink>
          </li>
          <li className="navigationLink">
            <NavLink to="/cardManagement">
              <div className="flipMenu">
                <div className="flipMenuInner">
                  <div className="flipMenuFront">
                    <EditCard />
                  </div>
                  <div className="flipMenuBack">Manage cards</div>
                </div>
              </div>
            </NavLink>
          </li>
          <li className="navigationLink">
            <NavLink to="/stackManagement">
              <div className="flipMenu">
                <div className="flipMenuInner">
                  <div className="flipMenuFront">
                    <EditStacks />
                  </div>{" "}
                  <div className="flipMenuBack">Manage stacks</div>
                </div>
              </div>
            </NavLink>
          </li>
          <li className="navigationLink">
            <NavLink to="/logIn">
              <div className="flipMenuInner">
                <div className="flipMenu">
                  <div className="flipMenuFront">
                    <LogOut className="logOutIcon" />
                  </div>{" "}
                  <div className="flipMenuBack" onClick={this.logUserOut}>
                    Log Out
                  </div>
                </div>{" "}
              </div>
            </NavLink>
          </li>
        </ul>
      </div>
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
