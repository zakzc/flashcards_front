// import React from "react";
import useDB_Connection from "../DB-hook/connection-hook";

const connectToDB = useDB_Connection;

async function LogUserIn(email, psw) {
  let requestBody = JSON.stringify({
    userEmail: email,
    password: psw,
  });
  const userLogInCheck = await connectToDB(
    "http://localhost:5000/userAPI/logIn",
    "POST",
    requestBody,
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  );
  const data = userLogInCheck;
  console.log("data from Log in: hook", data);
  try {
    let userData = JSON.parse(data.response);
    // console.log("Data handling --> ", userData.id, typeof userData);
    if (data.returnStatus === 401) {
      this.setState({
        errorMessage:
          "Error on log In. Error type: Access not authorized. Please contact website administrator and report the problem.",
      });
      console.log("Access not authorized");
    } else if (data.returnStatus === 200) {
      // console.log("calling Update user", userData);
      this.logIn_User(userData);
    }
  } catch (error) {
    this.setState({
      errorMessage:
        "Error on log in. Error type: No data was returned from API. Please contact website administrator and report the problem.",
    });
    console.log("error on log in: ", error);
  }
}

export default LogUserIn;
