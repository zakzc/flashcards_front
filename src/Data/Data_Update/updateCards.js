// import React from "react";
import useDB_Connection from "../DB-hook/connection-hook";

const connectToDB = useDB_Connection;

async function updateCards(stack, token) {
  // sequence: url, (method = "GET"), (body = null), (headers = {});
  const urlUpdateCards = "http://localhost:5000/cardAPI/" + String(stack.id);
  let requestBody = JSON.stringify(stack);
  let header = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer " + token,
  };
  const getStackData = await connectToDB(
    urlUpdateCards,
    "PATCH",
    requestBody,
    header
  );
  let newStackData = JSON.parse(getStackData.response);
  if (
    newStackData.status === false ||
    newStackData.message === "Error on getting stack by id: "
  ) {
    console.log("Error on gathering data");
    return false;
  } else {
    return newStackData;
  }
}

export default updateCards;
