import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
// Visual elements
import Pile from "../icons/pile";
import Play from "../icons/play";
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
          <h4>The changes you made re consolidated in the Database</h4>
          <br />
          <p> Now you can :</p>
          <br />
          <ul>
            <div className="flipMenu">
              <li className="navigationLink">
                <NavLink to="/curStack" className="flipMenuInner">
                  <div className="flipMenuFront">
                    <Pile className="flipMenuFront" />
                  </div>
                  <div className="flipMenuBack">
                    Read Stack or select another one
                  </div>
                </NavLink>
              </li>
              <li className="navigationLink">
                <NavLink to="/cardSet" className="flipMenuInner">
                  <div className="flipMenuFront">
                    <Play className="flipMenuFront" />
                  </div>
                  <div className="flipMenuBack">Play the current Stack</div>
                </NavLink>
              </li>
            </div>
          </ul>
          <br />
          <h4>
            Note that some changes (adding a new stack, for example) will only
            be visible when you reload the application (or, log out and back
            in).{" "}
          </h4>
          <p>Now let's flip some cards. :-D </p>
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
    console.log("CONSOLIDATE CHANGES");
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
