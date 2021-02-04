// import React from "react";
import useDB_Connection from "../DB-hook/connection-hook";

const connectToDB = useDB_Connection;

async function addNewSet(stack, token) {
  // sequence: url, (method = "GET"), (body = null), (headers = {});
  console.log("Add new SET OF CARDS, received: ", stack, typeof stack);
  let requestBody = JSON.stringify(stack);
  console.log("BODY is: ", requestBody, "which is: ", typeof requestBody);
  let header = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer " + token,
  };
  ///
  console.log("--- send to Hook");
  const addNewSet = await connectToDB(
    "http://localhost:5000/cardAPI/addNewStack",
    "POST",
    requestBody,
    header
  );
  ///
  console.log("Return: ", addNewSet);
  // let newStackData = JSON.parse(getStackData);
  // console.log("Return from API: ", newStackData);
  if (
    addNewSet.status === false ||
    addNewSet.message === "Error on adding new stack"
  ) {
    console.log("Error on gathering data");
    return false;
  } else {
    console.log("New stack data return ", addNewSet);
    return true;
  }
}

export default addNewSet;
