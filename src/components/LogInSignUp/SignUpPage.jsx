import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// Utils
import {
  validateEmail,
  validatePasswordInput,
} from "../../Data/Validation/validate";
// Hook
import useDB_Connection from "../../Data/DB-hook/connection-hook";

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
    this.signUserUp = this.signUserUp.bind(this);
    // local
    this.signUpForm = this.signUpForm.bind(this);
    this.signUpView = this.signUpView.bind(this);
    // hooks
    this.useDB_Connection = useDB_Connection;
    // utils
    // validation
    this.validateEmail = validateEmail;
    this.validatePasswordInput = validatePasswordInput;
  }

  //url, method = "GET", body = null, headers = {}
  signUserUp(userEmail, password, firstName, lastName) {
    let requestBody = JSON.stringify({
      userEmail: userEmail,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });
    useDB_Connection(
      "http://localhost:5000/userAPI/signUp",
      "POST",
      requestBody,
      {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    ).then(() => {
      this.logInOrSignUpSwitch();
      this.setState({ redirectUser: true });
    });
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
    // console.log(
    //   "Received: ",
    //   credentials.userEmailSignUp,
    //   credentials.userPswSignUp,
    //   credentials.userFirstNameSignUp,
    //   credentials.userLastNameSignUp
    // );
    if (
      this.validateAccessCredentials(
        credentials.userEmailSignUp,
        credentials.userPswSignUp
      ) === true
    ) {
      console.log("proper input on sign up form");
      this.signUserUp(
        credentials.userEmailSignUp,
        credentials.userPswSignUp,
        credentials.userFirstNameSignUp,
        credentials.userLastNameSignUp
      );
    } else {
      console.log(
        "Could not sign up.",
        credentials.userEmailSignUp.length,
        credentials.userPswSignUp.length,
        credentials.userFirstNameSignUp.length,
        credentials.userLastNameSignUp.length
      );
    }
  }

  redirectUser() {
    return <Redirect to="/login" />;
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
        <button className="buttonStyle" onClick={this.handleSubmitSignUpForm}>
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
