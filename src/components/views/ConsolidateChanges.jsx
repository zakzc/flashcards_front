import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import Loader from "./Loader";

class ConsolidateChanges extends Component {
  constructor(props) {
    super(props);
    this.state = { userIsLoggedIn: props.userIsLoggedIn, viewSwitch: true };
    this.initialView = this.initialView.bind(this);
    this.finalView = this.finalView.bind(this);
    this.ConsolidateChangesLayout = this.ConsolidateChangesLayout.bind(this);
    this.ConsolidateChangesView = this.ConsolidateChangesView.bind(this);
  }

  initialView() {
    return (
      <div id="initialView">
        <h1>Processing changes</h1>
        <div id="loading">
          <Loader />
        </div>
      </div>
    );
  }

  finalView() {
    return (
      <div id="finalView">
        <h1>Changes were consolidated</h1>
        <p> Navigate to desired link</p>
        <ul>
          <li>
            <NavLink to="/curStack">Read Stack </NavLink>
          </li>
          <li>
            <NavLink to="/cardSet">Play Stack </NavLink>
          </li>
        </ul>
      </div>
    );
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ viewSwitch: false });
    }, 800);
  }

  ConsolidateChangesLayout() {
    return (
      <div id="Consolidate">
        {this.state.viewSwitch ? this.initialView() : this.finalView()}
      </div>
    );
  }

  ConsolidateChangesView() {
    return (
      <div id="cardSetView">
        {this.state.userIsLoggedIn ? (
          <div id="loggedInView">{this.ConsolidateChangesLayout()}</div>
        ) : (
          <Redirect to="/" />
        )}
      </div>
    );
  }

  render() {
    return <React.Fragment>{this.ConsolidateChangesView()}</React.Fragment>;
  }
}

export default ConsolidateChanges;
