// import React from "react";
import useDB_Connection from "../Connection/connection-hook";

const connectToDB = useDB_Connection;

async function RemoveCurrentStack(stackNo, token) {
  console.log("Delete handler: ", stackNo);
  let stackToKill = stackNo;
  let header = { Authorization: "Bearer " + token };
  const url = process.env.REACT_APP_BACKEND_URL + "/cardApi/" + stackToKill;
  connectToDB(url, "DELETE", null, header);
}

export default RemoveCurrentStack;
