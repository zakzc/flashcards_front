// import React from "react";
import useDB_Connection from "../DB-hook/connection-hook";

const connectToDB = useDB_Connection;

async function updateUserData(userID) {
  let url = "http://localhost:5000/userAPI/" + String(userID);
  const getUserData = await connectToDB(url);
  let newUserData = JSON.parse(getUserData.response);
  return newUserData;
}

export default updateUserData;
