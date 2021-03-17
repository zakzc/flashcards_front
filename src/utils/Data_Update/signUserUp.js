import useDB_Connection from "../Connection/connection-hook";
const connectToDB = useDB_Connection;

//url, method = "GET", body = null, headers = {}
async function SignUserUp(userEmail, password, firstName, lastName) {
  let requestBody = JSON.stringify({
    userEmail: userEmail,
    password: password,
    firstName: firstName,
    lastName: lastName,
  });
  const userSignUpCheck = await connectToDB(
    process.env.REACT_APP_BACKEND_URL + "/userAPI/signUp",
    "POST",
    requestBody,
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  );
  const data = userSignUpCheck;
  console.log("Data from Sign up: ", data);
}

export default SignUserUp;
