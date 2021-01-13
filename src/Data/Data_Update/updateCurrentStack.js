// import React from "react";
import useDB_Connection from "../DB-hook/connection-hook";

const connectToDB = useDB_Connection;

async function updateCurrentStack(stackNo) {
  let url = "http://localhost:5000/cardApi/" + String(stackNo);
  const getStackData = await connectToDB(url);
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

export default updateCurrentStack;
