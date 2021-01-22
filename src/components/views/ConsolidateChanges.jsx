import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
// Visual elements
import Loader from "./Loader";

class ConsolidateChanges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userIsLoggedIn: props.userIsLoggedIn,
      viewSwitch: true,
      errorMessage: "",
    };
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
        <div id="backToBeginning">
          <div id="confirm">
            <h4>The changes you made re consolidated in the Database</h4>

            <p> Now you can :</p>
          </div>
          <div id="backToApp">
            <p>
              Now you can
              <NavLink to="/curStack">
                <strong className="highlight"> READ </strong>
              </NavLink>
              the new current stack or{" "}
              <NavLink to="/cardSet">
                <strong className="highlight"> PLAY </strong>
              </NavLink>{" "}
              it.
            </p>
          </div>
          <div id="warn">
            <h4>
              Note that some changes (adding a new stack, for example) will only
              be visible when you reload the application.
            </h4>
            <p>Now let's flip some cards. :-D </p>
          </div>
        </div>
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
    // console.log("CONSOLIDATE CHANGES");
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
