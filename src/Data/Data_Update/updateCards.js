// import React from "react";
import useDB_Connection from "../DB-hook/connection-hook";

const connectToDB = useDB_Connection;

async function updateCards(stack) {
  console.log("UPDATE CARDS", stack, " || ", String(stack));
  // sequence: url, (method = "GET"), (body = null), (headers = {});
  const urlUpdateCards = "http://localhost:5000/cardAPI/" + String(stack.id);
  let requestBody = JSON.stringify(stack);
  console.log("Sanity? ", urlUpdateCards, requestBody);
  const getStackData = await connectToDB(urlUpdateCards, "PATCH", requestBody, {
    "Content-Type": "application/json",
    Accept: "application/json",
  });
  let newStackData = JSON.parse(getStackData.response);
  // console.log("Received from API: ", newStackData);
  if (
    newStackData.status === false ||
    newStackData.message === "Error on getting stack by id: "
  ) {
    console.log("Error on gathering data");
    return false;
  } else {
    // console.log("back to app:", newStackData);
    return newStackData;
  }
}

export default updateCards;
