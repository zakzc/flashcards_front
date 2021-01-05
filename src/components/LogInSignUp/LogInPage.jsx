import React, { Component } from "react";
import useDB_Connection from "../../Data/DB-hook/connection-hook";
import {
  validateEmail,
  validatePasswordInput,
} from "../../Data/Validation/validate";

export default class LogInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      userIsLoggedIn: props.userIsLoggedIn,
      errorMessage: " ",
    };
    // methods from parent
    //this.updateUser = props.updateUser.bind(this);
    //this.logUserIn = this.logUserIn.bind(this);
    this.logIn_User = props.logIn_User.bind(this);
    this.handleSubmitLogInForm = this.handleSubmitLogInForm.bind(this);
    //local methods
    this.logInView = this.logInView.bind(this);
    this.logInForm = this.logInForm.bind(this);
    this.validateCredentials = this.validateCredentials.bind(this);
    // hooks
    this.useDB_Connection = useDB_Connection;
    // validation
    this.validateEmail = validateEmail;
    this.validatePasswordInput = validatePasswordInput;
  }

  logUserIn = async (email, psw) => {
    let requestBody = JSON.stringify({
      userEmail: email,
      password: psw,
    });
    const userLogInCheck = await useDB_Connection(
      "http://localhost:5000/userAPI/logIn",
      "POST",
      requestBody,
      {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    );
    const data = userLogInCheck;
    console.log("data from hook", data);
    try {
      let userData = JSON.parse(data.response);
      console.log("Data handling --> ", userData.id, typeof userData);
      if (data.returnStatus === 401) {
        this.setState({
          errorMessage:
            "Error on log In. Error type: Access not authorized. Please contact website administrator and report the problem.",
        });
        console.log("Access not authorized");
      } else if (data.returnStatus === 200) {
        console.log("calling Update user", userData);
        this.logIn_User(userData);
      }
    } catch (error) {
      this.setState({
        errorMessage:
          "Error on log in. Error type: No data was returned from API. Please contact website administrator and report the problem.",
      });
      console.log("error on log in: ", error);
    }
  };

  validateCredentials(e, p) {
    if (this.validateEmail(e) === true) {
      if (this.validatePasswordInput(p) === true) {
        this.logUserIn(e, p);
        console.log("proper input");
      }
    } else {
      this.setState({ errorMessage: "improper input on log in form" });
    }
  }

  handleSubmitLogInForm(event) {
    event.preventDefault();
    console.log(
      "Received: ",
      this.userEmail.value,
      " and ",
      this.userPsw.value
    );
    this.validateCredentials(this.userEmail.value, this.userPsw.value);
  }

  logInForm() {
    return (
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
        <button className="buttonStyle" onClick={this.handleSubmitLogInForm}>
          Log me in
        </button>
      </form>
    );
  }

  logInView() {
    return (
      <div id="loggedInPageView">
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
