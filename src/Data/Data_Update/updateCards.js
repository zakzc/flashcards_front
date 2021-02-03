// import React from "react";
import useDB_Connection from "../DB-hook/connection-hook";

const connectToDB = useDB_Connection;

async function updateCards(stack, token) {
  // sequence: url, (method = "GET"), (body = null), (headers = {});
  console.log("UPDATE CARDS, received: ", stack, typeof stack);
  const urlUpdateCards = "http://localhost:5000/cardAPI/" + String(stack._id);
  let requestBody = JSON.stringify(stack);
  console.log("Url: ", urlUpdateCards);
  // let requestBody = {
  //   id: stack._id,
  //   stackName: stack.stackName,
  //   createdBy: stack.createdBy,
  //   cards: stack.cards,
  // }.stringify();
  console.log("BODY is: ", requestBody, "which is: ", typeof requestBody);
  let header = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer " + token,
  };
  ///
  console.log("send to API");
  const getStackData = await connectToDB(
    urlUpdateCards,
    "PATCH",
    requestBody,
    header
  );
  ///
  console.log("Return: ", getStackData, "which is: ", typeof getStackData);
  // let newStackData = JSON.parse(getStackData);
  // console.log("Return from API: ", newStackData);
  if (
    getStackData.status === false ||
    getStackData.message === "Error on getting stack by id: "
  ) {
    console.log("Error on gathering data");
    return false;
  } else {
    console.log("New stack data return ", getStackData);
    return true;
  }
}

export default updateCards;
