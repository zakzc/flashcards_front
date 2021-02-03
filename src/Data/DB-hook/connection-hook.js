async function useDB_Connection(url, method = "GET", body = null, headers) {
  // Data. Body must be string (.stringfy(data)), headers is an object.
  console.log("Connect to DB for: ", url, method, body, headers);
  console.log(
    "Types: ",
    typeof url,
    typeof method,
    typeof body,
    typeof headers
  );
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
  // returns data processed
  return responseData;
}

export default useDB_Connection;
