async function useDB_Connection(url, method = "GET", body = null, headers) {
  // Data. Body must be string (.stringfy(data)), headers is an object.
  // console.log("Connect to DB for: ");
  // console.table(url, method, body, headers);
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
    console.log("Error on response from API (error 23).");
    throw new Error(responseData.message);
  }
  // returns data processed
  return responseData;
}

export default useDB_Connection;
