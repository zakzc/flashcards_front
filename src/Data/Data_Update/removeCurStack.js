// import React from "react";
import useDB_Connection from "../DB-hook/connection-hook";

const connectToDB = useDB_Connection;

async function RemoveCurrentStack(stackNo, token) {
  console.log("Delete handler: ", stackNo);
  let stackToKill = stackNo;
  let header = { Authorization: "Bearer " + token };
  const url = "http://localhost:5000/cardApi/" + stackToKill;
  connectToDB(url, "DELETE", null, header);
}

export default RemoveCurrentStack;
