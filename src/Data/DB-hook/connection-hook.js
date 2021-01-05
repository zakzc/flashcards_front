// import React from "react";

async function useDB_Connection(
  url,
  method = "GET",
  body = null,
  headers = {}
) {
  console.log("Connection to API requested");
  try {
    const data = await fetch(url, {
      method,
      body,
      headers,
    })
      .then((response) =>
        Promise.all([response.ok, response.text(), response.status])
      )
      .then((data) => ({
        status: data[0],
        response: data[1],
        returnStatus: data[2],
      }));
    // });
    // const responseData = await returnData.json();
    // console.log("response: ", responseData);
    console.log(data);
    // if (!responseData.ok) {
    //   console.log("error on return Data");
    //   throw new Error(responseData.message);
    // }
    // return responseData;
    return data;
  } catch (err) {
    console.log("Connection error on connection hook: ", err);
  }
}

export default useDB_Connection;
