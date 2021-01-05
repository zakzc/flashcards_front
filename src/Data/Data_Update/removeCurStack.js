// import React from "react";
import useDB_Connection from "../DB-hook/connection-hook";

const connectToDB = useDB_Connection;

async function RemoveCurrentStack(stackNo) {
  let stackToKill = stackNo;
  console.log(
    "Request for deletion, send it to backend: ",
    stackToKill,
    typeof stackToKill
  );
  const url = "http://localhost:5000/cardApi/" + stackToKill;
  connectToDB(url, "DELETE");
}

export default RemoveCurrentStack;
