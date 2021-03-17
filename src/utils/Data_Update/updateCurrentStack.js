// import React from "react";
import useDB_Connection from "../Connection/connection-hook";

const connectToDB = useDB_Connection;

async function updateCurrentStack(stackNo, token) {
  // console.log("Up stack will request: ", stackNo);
  let url = process.env.REACT_APP_BACKEND_URL + "/cardApi/" + String(stackNo);
  let header = { Authorization: "Bearer " + token };
  const getStackData = await connectToDB(url, "GET", null, header);
  if (!getStackData || getStackData === undefined) {
    return false;
  } else {
    return getStackData;
  }
}

export default updateCurrentStack;
