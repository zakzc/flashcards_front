// import React from "react";
import useDB_Connection from "../DB-hook/connection-hook";

const connectToDB = useDB_Connection;

async function updateCurrentStack(stackNo) {
  console.log("Up stack will request: ", stackNo);
  let url = "http://localhost:5000/cardApi/" + String(stackNo);
  const getStackData = await connectToDB(url);
  if (!getStackData || getStackData === undefined) {
    return false;
  } else {
    return getStackData;
  }
}

export default updateCurrentStack;
