async function useDB_Connection(url, method = "GET", body = null, headers) {
  console.log("Connection hook IN for: ", url, method, body, headers);
  let response;
  try {
    response = await fetch(url, {
      method,
      body,
      headers,
    });
  } catch (err) {
    console.log("Connection error on connection hook: ", err);
    return false;
  }

  // receives data
  const rawData = await response.text();
  // processes to json
  const responseData = await JSON.parse(rawData);

  if (!response.ok) {
    throw new Error(responseData.message);
  }
  console.table("Sending Back: ", responseData);
  console.log("which is: \n", typeof responseData);
  console.log("Connection hook OUT");
  // returns data processed
  return responseData;
}

export default useDB_Connection;
