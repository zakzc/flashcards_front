import React, { Component } from "react";
//import useDB_Connection from "../../Data/DB-hook/connection-hook";
// Connection
import LogUserIn from "../../Data/Data_Update/logUserIn";
// hooks and util
import {
  validateEmail,
  validatePasswordInput,
} from "../../Data/utils/validate";

export default class LogInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      userIsLoggedIn: props.userIsLoggedIn,
      errorMessage: " ",
    };
    // data from AI
    this.LogUserIn = LogUserIn.bind(this);
    // methods from parent
    this.logIn_User = props.logIn_User.bind(this);
    this.handleSubmitLogInForm = this.handleSubmitLogInForm.bind(this);
    //local methods
    this.logInView = this.logInView.bind(this);
    this.logInForm = this.logInForm.bind(this);
    this.validateCredentials = this.validateCredentials.bind(this);
    // hooks
    // this.useDB_Connection = useDB_Connection;
    // validation
    this.validateEmail = validateEmail;
    this.validatePasswordInput = validatePasswordInput;
    this.logInProcess = this.logInProcess.bind(this);
  }

  //////////////////////////
  // Implementation methods
  //////////////////////////

  async logInProcess(em, psw) {
    const logInData = await LogUserIn(em, psw);
    // console.log("log in for: ", logInData);
    if (logInData) {
      this.logIn_User(logInData);
    } else {
      console.log("Error on login process. Error 47.");
    }
  }

  validateCredentials(e, p) {
    if (this.validateEmail(e) === true) {
      if (this.validatePasswordInput(p) === true) {
        this.logInProcess(e, p);
      }
    } else {
      this.setState({ errorMessage: "improper input on log in form" });
    }
  }

  handleSubmitLogInForm(event) {
    event.preventDefault();
    this.validateCredentials(this.userEmail.value, this.userPsw.value);
  }

  ////////////////
  // View methods
  ////////////////

  logInForm() {
    return (
      <div id="form">
        <form>
          <div className="formElement">
            <label>Enter your email</label>
            <br />
            <input
              type="email"
              label="enter your email here"
              ref={(input) => (this.userEmail = input)}
            ></input>
          </div>
          <div className="formElement">
            <label>Enter password</label>
            <br />
            <input
              type="password"
              label="enter your password here"
              ref={(input) => (this.userPsw = input)}
            ></input>
          </div>
          <button
            className="simpleButtonStyle"
            onClick={this.handleSubmitLogInForm}
          >
            Log me in
          </button>
        </form>
      </div>
    );
  }

  logInView() {
    return (
      <div id="loggedInView">
        <h2>Log In Page</h2>
        {this.logInForm()}
        <div id="errorMessage">{this.state.errorMessage}</div>
      </div>
    );
  }

  render() {
    return <React.Fragment>{this.logInView()}</React.Fragment>;
  }
}
