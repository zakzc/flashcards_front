// import React from "react";
import useDB_Connection from "../Connection/connection-hook";

const connectToDB = useDB_Connection;

async function updateUserData(userID) {
  let url = process.env.REACT_APP_BACKEND_URL + "/userAPI/" + String(userID);
  const getUserData = await connectToDB(url);
  let newUserData = JSON.parse(getUserData.response);
  return newUserData;
}

export default updateUserData;
