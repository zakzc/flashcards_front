// import React from "react";
import useDB_Connection from "../DB-hook/connection-hook";

const connectToDB = useDB_Connection;

async function updateUserData(userID) {
  // console.log("Update User Data triggered on app");
  let url = "http://localhost:5000/userAPI/" + String(userID);
  // console.log("request to: ", url, "received: ", userID);
  // Get new User Data
  const getUserData = await connectToDB(url);
  let newUserData = JSON.parse(getUserData.response);
  // console.log("Received:", newUserData);
  // this.setState({
  //   currentUser: {
  //     id: newUserData.id,
  //     userEmail: newUserData.userEmail,
  //     firstName: newUserData.firstName,
  //     lastName: newUserData.lastName,
  //     userStacks: newUserData.userStacks,
  //   },
  // });
  // let newCurrentStack = newUserData.userStacks[0].id;
  // console.log(
  //   "New current stack will be: ",
  //   newCurrentStack,
  //   typeof newCurrentStack
  // );
  console.log("Stack to update: ", newUserData.userStacks.id);
  //this.updateCurrentStack(newCurrentStack);
  return newUserData;
}

export default updateUserData;
