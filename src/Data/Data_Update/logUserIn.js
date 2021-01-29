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
  console.log("data from Log in:", data);
  try {
    let userData = JSON.parse(data.response);
    // console.log("Data handling --> ", userData.id, typeof userData);
    if (data.returnStatus === 401) {
      console.log("Access not authorized");
      return false;
    } else if (data.returnStatus === 200) {
      // console.log("calling Update user", userData);
      this.logIn_User(userData);
    }
  } catch (error) {
    console.log("error on Log in: ", error);
    return false;
  }
  if (data.status == false) {
    console.log("Error on log in. Received False", error);
  }
}

export default LogUserIn;
