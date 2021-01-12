// import React from "react";
import useDB_Connection from "../DB-hook/connection-hook";

const connectToDB = useDB_Connection;

async function updateCurrentStack(stackNo) {
  // console.log("Update current stack: ", stackNo);
  let url = "http://localhost:5000/cardApi/" + String(stackNo);
  // console.log("request to: ", url, "received: ", stackNo);
  const getStackData = await connectToDB(url);
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

export default updateCurrentStack;
