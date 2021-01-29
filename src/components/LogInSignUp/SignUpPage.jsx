import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// Utils
import {
  validateEmail,
  validatePasswordInput,
} from "../../Data/Validation/validate";
// Connection to DB
// import useDB_Connection from "../../Data/DB-hook/connection-hook";
import SignUserUp from "../../Data/Data_Update/signUserUp";

export default class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      userIsLoggedIn: props.userIsLoggedIn,
      redirectUser: false,
    };
    // from parent
    this.logInOrSignUpSwitch = props.logInOrSignUpSwitch;
    // this.updateUser = props.updateUser.bind(this);
    this.validateCredentials = this.validateAccessCredentials.bind(this);
    this.handleSubmitSignUpForm = this.handleSubmitSignUpForm.bind(this);
    // this.SignUserUp = this.SignUserUp.bind(this);
    // local
    this.signUpForm = this.signUpForm.bind(this);
    this.signUpView = this.signUpView.bind(this);
    // Data from API
    this.SignUserUp = SignUserUp.bind(this);
    // utils
    // validation
    this.validateEmail = validateEmail;
    this.validatePasswordInput = validatePasswordInput;
  }

  proceedToSignUp(userEmail, userPsw, userFirstName, userLastName) {
    try {
      this.SignUserUp(userEmail, userPsw, userFirstName, userLastName);
    } catch {
      console.log("Error on Sign up Process");
      return false;
    }
    this.logInOrSignUpSwitch(true);
    this.setState({ redirectUser: true });
  }

  validateAccessCredentials(userEmail, userPassword) {
    // console.log("validate: ", userEmail, userPassword);

    if (this.validateEmail(userEmail) === true) {
      if (this.validatePasswordInput(userPassword) === true) {
        // console.log("validated");
        // console.log("proper input");
        return true;
      }
    } else {
      console.log("invalid input");
      return false;
    }
  }

  handleSubmitSignUpForm(event) {
    event.preventDefault();
    const credentials = {
      userEmailSignUp: this.userEmail.value,
      userPswSignUp: this.userPsw.value,
      userFirstNameSignUp: this.firstName.value,
      userLastNameSignUp: this.lastName.value,
    };
    console.log(
      "Received: ",
      credentials.userEmailSignUp,
      credentials.userPswSignUp,
      credentials.userFirstNameSignUp,
      credentials.userLastNameSignUp
    );
    if (
      this.validateAccessCredentials(
        credentials.userEmailSignUp,
        credentials.userPswSignUp
      ) === true
    ) {
      console.log("proper input on sign up form");
      this.proceedToSignUp(
        credentials.userEmailSignUp,
        credentials.userPswSignUp,
        credentials.userFirstNameSignUp,
        credentials.userLastNameSignUp
      );
    } else {
      console.log(
        "Could not sign up.",
        credentials.userEmailSignUp,
        credentials.userPswSignUp,
        credentials.userFirstNameSignUp,
        credentials.userLastNameSignUp
      );
    }
  }

  redirectUser() {
    return <Redirect to="/logIn" />;
  }

  signUpForm() {
    return (
      <form>
        <div className="formElement">
          <label>Enter email</label>
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
        <div className="formElement">
          <label>Enter your first name</label>
          <br />
          <input
            type="email"
            label="enter your name here"
            ref={(input) => (this.firstName = input)}
          ></input>
        </div>
        <div className="formElement">
          <label>Enter your last name</label>
          <br />
          <input
            type="email"
            label="enter your name here"
            ref={(input) => (this.lastName = input)}
          ></input>
        </div>
        <button
          className="simpleButtonStyle"
          onClick={this.handleSubmitSignUpForm}
        >
          Register
        </button>
      </form>
    );
  }

  signUpView() {
    return (
      <div id="signUpView">
        <h2>Sign Up Page</h2>
        {this.signUpForm()}
        {this.state.redirectUser ? this.redirectUser() : <div></div>}
      </div>
    );
  }

  render() {
    return <React.Fragment>{this.signUpView()}</React.Fragment>;
  }
}
