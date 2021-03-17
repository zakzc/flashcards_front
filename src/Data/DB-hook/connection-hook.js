async function useDB_Connection(url, method = "GET", body = null, headers) {
  let response;
  try {
    response = await fetch(url, {
      method,
      body,
      headers,
    });
  } catch (err) {
    console.log("Connection error on connection hook (10): ", err);
    return false;
  }

  // receives data
  const rawData = await response.text();
  // processes to json
  let responseData;
  try {
    responseData = await JSON.parse(rawData);
  } catch (e) {
    console.log("Error on json parsing (21):\n", e);
    return false;
  }
  // console.log("Response was: ", responseData);
  if (!response.status === 200) {
    console.log("Error on response from API (26).");
    throw new Error(responseData.message);
  }
  // returns data processed
  if (responseData) {
    return responseData;
  } else {
    console.log("Error gathering data(33)");
  }
  return false;
}

export default useDB_Connection;
