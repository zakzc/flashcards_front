import React, { Component } from "react";
import { NavLink } from "react-router-dom";
// icons
import Pile from "../../assets/icons/pile";
import Play from "../../assets/icons/play";
import EditCard from "../../assets/icons/editCard";
import EditStacks from "../../assets/icons/editStacks";
import LogOut from "../../assets/icons/logOut";

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      userIsLoggedIn: props.userIsLoggedIn,
    };
    // methods from App
    this.logUserOut = this.logUserOut.bind(this);
  }

  logUserOut() {
    this.logOut_User();
  }

  render() {
    return (
      <div id="LogInNavBar">
        <ul
          style={{ listStyleType: "none", padding: 0 }}
          activeclassname="active"
          id="menuBar"
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
            <NavLink to="/">
              <div className="flipMenu">
                <div className="flipMenuInner">
                  <div className="flipMenuFront">
                    <LogOut />
                  </div>
                  <div className="flipMenuBack" onClick={this.logUserOut}>
                    Log Out
                  </div>
                </div>
              </div>
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}
