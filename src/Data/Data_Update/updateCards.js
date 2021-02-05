// import React from "react";
import useDB_Connection from "../DB-hook/connection-hook";

const connectToDB = useDB_Connection;

async function updateCards(stack, token) {
  // sequence: url, (method = "GET"), (body = null), (headers = {});
  const urlUpdateCards =
    process.env.REACT_APP_BACKEND_URL + "/cardAPI/" + String(stack._id);
  let requestBody = JSON.stringify(stack);
  let header = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer " + token,
  };
  ///
  const getStackData = await connectToDB(
    urlUpdateCards,
    "PATCH",
    requestBody,
    header
  );
  ///
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
