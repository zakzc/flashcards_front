// import React from "react";
import useDB_Connection from "../DB-hook/connection-hook";

const connectToDB = useDB_Connection;

async function LogUserIn(email, psw) {
  let requestBody = JSON.stringify({
    userEmail: email,
    password: psw,
  });
  console.log("Log User In");
  const userLogInCheck = await connectToDB(
    process.env.REACT_APP_BACKEND_URL + "/userAPI/logIn",
    "POST",
    requestBody,
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  );
  const data = userLogInCheck;
  console.log("Log in data handler. Received: ", data, typeof data);
  if (!data || data === false) {
    console.log("Error on log in. No data received.");
  }
  try {
    return data;
  } catch (error) {
    console.log("error on Log in: ", error);
    return false;
  }
}

export default LogUserIn;
