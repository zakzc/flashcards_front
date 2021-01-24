async function useDB_Connection(
  url,
  method = "GET",
  body = null,
  headers = {}
) {
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
    return data;
  } catch (err) {
    console.log("Connection error on connection hook: ", err);
    return false;
  }
}

export default useDB_Connection;
